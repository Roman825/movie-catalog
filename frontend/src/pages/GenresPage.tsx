import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Genre } from '../types';
import { genresApi } from '../api';
import Toast from '../components/Toast';

const schema = z.object({
  name: z.string().min(2, 'Мінімум 2 символи'),
});
type FormData = z.infer<typeof schema>;

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const load = async () => {
    setLoading(true);
    try {
      setGenres(await genresApi.getAll());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await genresApi.create(data);
      reset();
      setShowForm(false);
      load();
      setToast({ msg: 'Жанр додано!', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message, type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Видалити жанр?')) return;
    try {
      await genresApi.remove(id);
      load();
      setToast({ msg: 'Жанр видалено', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message, type: 'error' });
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page__header">
          <h1 className="page__title">Жанри</h1>
          <button className="btn btn--primary" onClick={() => setShowForm(v => !v)}>
            {showForm ? 'Скасувати' : '+ Додати жанр'}
          </button>
        </div>

        {showForm && (
          <form className="form" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, marginBottom: 28 }}>
            <div className="field">
              <label className="field__label">Назва жанру</label>
              <input className={`field__input${errors.name ? ' error' : ''}`} {...register('name')} placeholder="Thriller" />
              {errors.name && <span className="field__error">{errors.name.message}</span>}
            </div>
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isSubmitting ? 'Збереження...' : 'Додати'}
            </button>
          </form>
        )}

        {loading ? (
          <div className="state-box"><div className="state-box__text">Завантаження...</div></div>
        ) : (
          <div className="genre-list">
            {genres.map(g => (
              <div key={g.id} className="genre-item">
                <span className="genre-item__name">{g.name}</span>
                <button className="btn btn--danger btn--sm" onClick={() => handleDelete(g.id)}>Видалити</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
