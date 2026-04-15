import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;
}
