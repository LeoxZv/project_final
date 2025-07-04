import { PartialType } from '@nestjs/mapped-types';
import { CreateToppingDto } from './create-topping.dto';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdateToppingDto extends PartialType(CreateToppingDto) {
  @IsOptional()
  @IsString()
  @Length(5, 20)
  nombre?: string;
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'El numero debe ser positivo' })
  precio?: number;
  @IsOptional()
  @IsString()
  descripcion?: string;
}
