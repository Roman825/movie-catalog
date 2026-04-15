import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // GET /api/movies
  // GET /api/movies?genreId=4
  @Get()
  findAll(@Query('genreId') genreId?: string) {
    return this.moviesService.findAll(genreId ? Number(genreId) : undefined);
  }

  // GET /api/movies/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  // POST /api/movies  → 201 Created
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  // PATCH /api/movies/:id  → часткове оновлення
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  // DELETE /api/movies/:id  → 200 з повідомленням
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
