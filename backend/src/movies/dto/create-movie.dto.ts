import { IsString, IsNumber, IsInt, Min, Max, MinLength } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(2)
  director: string;

  @IsInt()
  @Min(1888)
  @Max(2100)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsInt()
  genreId: number;
}
