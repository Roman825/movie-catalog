import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GenresService } from '../genres/genres.service';

export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  rating: number;
  genreId: number;
  genreName: string;
}

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010, rating: 8.8, genreId: 4, genreName: 'Sci-Fi' },
    { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972, rating: 9.2, genreId: 2, genreName: 'Drama' },
    { id: 3, title: 'Die Hard', director: 'John McTiernan', year: 1988, rating: 8.2, genreId: 1, genreName: 'Action' },
  ];
  private nextId = 4;

  constructor(private readonly genresService: GenresService) {}

  findAll(genreId?: number): Movie[] {
    if (genreId) {
      return this.movies.filter((m) => m.genreId === genreId);
    }
    return this.movies;
  }

  findOne(id: number): Movie {
    const movie = this.movies.find((m) => m.id === id);
    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);
    return movie;
  }

  create(dto: CreateMovieDto): Movie {
    const genre = this.genresService.findOne(dto.genreId);
    const movie: Movie = {
      id: this.nextId++,
      ...dto,
      genreName: genre.name,
    };
    this.movies.push(movie);
    return movie;
  }
}
