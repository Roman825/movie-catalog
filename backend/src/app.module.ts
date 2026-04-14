import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [MoviesModule, GenresModule],
})
export class AppModule {}
