import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  // GET /api/genres
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  // GET /api/genres/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  // POST /api/genres  → 201 Created
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateGenreDto) {
    return this.genresService.create(dto);
  }

  // PATCH /api/genres/:id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGenreDto) {
    return this.genresService.update(id, dto);
  }

  // DELETE /api/genres/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.remove(id);
  }
}
