import { IsString, IsNumber, IsInt, Min, Max, MinLength, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  director?: string;

  @IsOptional()
  @IsInt()
  @Min(1888)
  @Max(2100)
  year?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsInt()
  genreId?: number;
}
