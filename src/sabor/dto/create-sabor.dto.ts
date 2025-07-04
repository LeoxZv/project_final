import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateSaborDto {
  @IsString()
  @Length(5, 20)
  nombre?: string;
  @IsString()
  descripcion?: string;
  @IsNumber()
  @IsPositive({ message: 'El precio de cada bola debe ser positivo' })
  precio_bola?: number;
}
