export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  rating: number;
  genreId: number;
  genreName: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CreateMovieData {
  title: string;
  director: string;
  year: number;
  rating: number;
  genreId: number;
}

export interface UpdateMovieData {
  title?: string;
  director?: string;
  year?: number;
  rating?: number;
  genreId?: number;
}

export interface CreateGenreData {
  name: string;
}
