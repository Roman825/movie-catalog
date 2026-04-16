import { Movie, Genre, CreateMovieData, UpdateMovieData, CreateGenreData } from '../types';

const BASE_URL = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${res.status}`);
  }
  return res.json();
}

// Movies
export const moviesApi = {
  getAll: (genreId?: number) =>
    request<Movie[]>(genreId ? `/movies?genreId=${genreId}` : '/movies'),

  getOne: (id: number) =>
    request<Movie>(`/movies/${id}`),

  create: (data: CreateMovieData) =>
    request<Movie>('/movies', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: number, data: UpdateMovieData) =>
    request<Movie>(`/movies/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  remove: (id: number) =>
    request<{ message: string }>(`/movies/${id}`, { method: 'DELETE' }),
};

// Genres
export const genresApi = {
  getAll: () =>
    request<Genre[]>('/genres'),

  getOne: (id: number) =>
    request<Genre>(`/genres/${id}`),

  create: (data: CreateGenreData) =>
    request<Genre>('/genres', { method: 'POST', body: JSON.stringify(data) }),

  remove: (id: number) =>
    request<{ message: string }>(`/genres/${id}`, { method: 'DELETE' }),
};
