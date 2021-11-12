import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimatedDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  mileage: number;

  @IsNumber()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number;

  @IsNumber()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;
}
