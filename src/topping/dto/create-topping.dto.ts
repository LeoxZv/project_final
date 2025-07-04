import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateToppingDto {
  @IsString()
  @Length(5, 20)
  nombre?: string;
  @IsNumber()
  @IsPositive({ message: 'El precio del topping debe ser positivo' })
  precio?: number;
  @IsString()
  descripcion?: string;
}
