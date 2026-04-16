import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { moviesApi } from '../api';
import MovieForm from '../components/MovieForm';
import Toast from '../components/Toast';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!id) return;
    moviesApi.getOne(Number(id))
      .then(setMovie)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleUpdate = async (data: any) => {
    if (!movie) return;
    try {
      const updated = await moviesApi.update(movie.id, data);
      setMovie(updated);
      setEditing(false);
      setToast({ msg: 'Фільм оновлено!', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message, type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!movie || !confirm('Видалити фільм?')) return;
    try {
      await moviesApi.remove(movie.id);
      navigate('/');
    } catch (e: any) {
      setToast({ msg: e.message, type: 'error' });
    }
  };

  if (loading) return (
    <div className="page"><div className="container">
      <div className="state-box"><div className="state-box__text">Завантаження...</div></div>
    </div></div>
  );

  if (!movie) return null;

  return (
    <div className="page">
      <div className="container">
        <a className="detail__back" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          ← Назад
        </a>
        <div className="detail">
          <span className="card__badge">{movie.genreName}</span>
          <h1 className="detail__title">{movie.title}</h1>

          <div className="detail__meta">
            <div className="detail__meta-item">
              <div className="detail__meta-label">Режисер</div>
              <div className="detail__meta-value">{movie.director}</div>
            </div>
            <div className="detail__meta-item">
              <div className="detail__meta-label">Рік</div>
              <div className="detail__meta-value">{movie.year}</div>
            </div>
            <div className="detail__meta-item">
              <div className="detail__meta-label">Рейтинг</div>
              <div className="detail__meta-value detail__meta-value--accent">⭐ {movie.rating}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn--primary" onClick={() => setEditing(true)}>Редагувати</button>
            <button className="btn btn--danger" onClick={handleDelete}>Видалити</button>
          </div>
        </div>
      </div>

      {editing && (
        <MovieForm title="Редагувати фільм" movie={movie} onSubmit={handleUpdate} onCancel={() => setEditing(false)} />
      )}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
