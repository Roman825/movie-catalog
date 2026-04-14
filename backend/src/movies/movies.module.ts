import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [GenresModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
