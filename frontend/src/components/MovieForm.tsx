import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Genre, Movie } from '../types';
import { genresApi } from '../api';

const schema = z.object({
  title: z.string().min(1, 'Назва обов\'язкова'),
  director: z.string().min(2, 'Мінімум 2 символи'),
  year: z.coerce.number().int().min(1888, 'Мін. 1888').max(2100, 'Макс. 2100'),
  rating: z.coerce.number().min(0, 'Мін. 0').max(10, 'Макс. 10'),
  genreId: z.coerce.number().int().min(1, 'Оберіть жанр'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  movie?: Movie;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  title: string;
}

export default function MovieForm({ movie, onSubmit, onCancel, title }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: movie ? {
      title: movie.title,
      director: movie.director,
      year: movie.year,
      rating: movie.rating,
      genreId: movie.genreId,
    } : { year: 2024, rating: 7 },
  });

  useEffect(() => {
    genresApi.getAll().then(setGenres);
  }, []);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__title">{title}</div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="field__label">Назва</label>
            <input className={`field__input${errors.title ? ' error' : ''}`} {...register('title')} placeholder="Inception" />
            {errors.title && <span className="field__error">{errors.title.message}</span>}
          </div>

          <div className="field">
            <label className="field__label">Режисер</label>
            <input className={`field__input${errors.director ? ' error' : ''}`} {...register('director')} placeholder="Christopher Nolan" />
            {errors.director && <span className="field__error">{errors.director.message}</span>}
          </div>

          <div className="form__row">
            <div className="field">
              <label className="field__label">Рік</label>
              <input type="number" className={`field__input${errors.year ? ' error' : ''}`} {...register('year')} />
              {errors.year && <span className="field__error">{errors.year.message}</span>}
            </div>
            <div className="field">
              <label className="field__label">Рейтинг (0–10)</label>
              <input type="number" step="0.1" className={`field__input${errors.rating ? ' error' : ''}`} {...register('rating')} />
              {errors.rating && <span className="field__error">{errors.rating.message}</span>}
            </div>
          </div>

          <div className="field">
            <label className="field__label">Жанр</label>
            <select className={`field__input${errors.genreId ? ' error' : ''}`} {...register('genreId')}>
              <option value="">— Оберіть жанр —</option>
              {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            {errors.genreId && <span className="field__error">{errors.genreId.message}</span>}
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>Скасувати</button>
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isSubmitting ? 'Збереження...' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
