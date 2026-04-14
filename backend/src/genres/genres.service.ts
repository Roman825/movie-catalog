import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';

export interface Genre {
  id: number;
  name: string;
}

@Injectable()
export class GenresService {
  private genres: Genre[] = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
    { id: 3, name: 'Comedy' },
    { id: 4, name: 'Sci-Fi' },
    { id: 5, name: 'Horror' },
  ];
  private nextId = 6;

  findAll(): Genre[] {
    return this.genres;
  }

  findOne(id: number): Genre {
    const genre = this.genres.find((g) => g.id === id);
    if (!genre) throw new NotFoundException(`Genre with id ${id} not found`);
    return genre;
  }

  create(dto: CreateGenreDto): Genre {
    const exists = this.genres.find(
      (g) => g.name.toLowerCase() === dto.name.toLowerCase(),
    );
    if (exists) throw new ConflictException(`Genre "${dto.name}" already exists`);

    const genre: Genre = { id: this.nextId++, name: dto.name };
    this.genres.push(genre);
    return genre;
  }
}
