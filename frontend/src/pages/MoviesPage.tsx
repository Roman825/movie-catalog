import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, Genre } from '../types';
import { moviesApi, genresApi } from '../api';
import MovieForm from '../components/MovieForm';
import Toast from '../components/Toast';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState<number | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await moviesApi.getAll(activeGenre);
      setMovies(data);
    } catch {
      setToast({ msg: 'Помилка завантаження фільмів', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [activeGenre]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    genresApi.getAll().then(setGenres);
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await moviesApi.create(data);
      setShowForm(false);
      loadMovies();
      setToast({ msg: 'Фільм додано!', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message, type: 'error' });
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editMovie) return;
    try {
      await moviesApi.update(editMovie.id, data);
      setEditMovie(null);
      loadMovies();
      setToast({ msg: 'Фільм оновлено!', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message, type: 'error' });
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Видалити фільм?')) return;
    try {
      await moviesApi.remove(id);
      loadMovies();
      setToast({ msg: 'Фільм видалено', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message, type: 'error' });
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page__header">
          <h1 className="page__title">Фільми</h1>
          <button className="btn btn--primary" onClick={() => setShowForm(true)}>+ Додати фільм</button>
        </div>

        {/* Genre filter */}
        <div className="filter-bar">
          <button
            className={`filter-chip${!activeGenre ? ' active' : ''}`}
            onClick={() => setActiveGenre(undefined)}
          >Всі</button>
          {genres.map(g => (
            <button
              key={g.id}
              className={`filter-chip${activeGenre === g.id ? ' active' : ''}`}
              onClick={() => setActiveGenre(g.id)}
            >{g.name}</button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="state-box">
            <div className="state-box__icon">⏳</div>
            <div className="state-box__text">Завантаження...</div>
          </div>
        ) : movies.length === 0 ? (
          <div className="state-box">
            <div className="state-box__icon">🎬</div>
            <div className="state-box__text">Фільмів не знайдено</div>
          </div>
        ) : (
          <div className="grid">
            {movies.map(movie => (
              <div key={movie.id} className="card" onClick={() => navigate(`/movies/${movie.id}`)}>
                <span className="card__badge">{movie.genreName}</span>
                <div className="card__title">{movie.title}</div>
                <div className="card__meta">
                  <span>🎬 {movie.director}</span>
                  <span>📅 {movie.year}</span>
                </div>
                <div className="card__rating">⭐ {movie.rating}</div>
                <div className="card__actions">
                  <button className="btn btn--ghost btn--sm" onClick={e => { e.stopPropagation(); setEditMovie(movie); }}>
                    Редагувати
                  </button>
                  <button className="btn btn--danger btn--sm" onClick={e => handleDelete(movie.id, e)}>
                    Видалити
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <MovieForm title="Новий фільм" onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}
      {editMovie && (
        <MovieForm title="Редагувати фільм" movie={editMovie} onSubmit={handleUpdate} onCancel={() => setEditMovie(null)} />
      )}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
