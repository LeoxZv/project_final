import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

export class DetalleSaborDto {
  @IsNumber({}, { message: 'El sabor ID debe ser un numero. ' })
  sabor_id: number;

  @IsNumber({}, { message: 'La cantidad de bolas debe ser un numero. ' })
  @Min(1, { message: 'La cantidad de bolas debe ser al menos 1. ' })
  cantidad_bolas: number;
}

export class DetalleToppingDto {
  @IsNumber({}, { message: 'El topping ID debe ser un numero. ' })
  topping_id: number;

  @IsNumber({}, { message: 'La cantidad de topping debe ser almenos 1. ' })
  @Min(1, { message: 'La cantidad del topping debe ser al menos 1' })
  cantidad: number;
}

export class CreateHeladoDto {
  @IsNumber({}, { message: 'El ID del cliente debe ser un numero. ' })
  cliente_id: number;

  @IsArray({ message: 'Los sabores deben ser un arreglo. ' })
  @ArrayMinSize(1, { message: 'Un helado debe tener almenos un sabor' })
  @ValidateNested({ each: true })
  @Type(() => DetalleSaborDto)
  sabores: DetalleSaborDto[];

  @IsOptional()
  @IsArray({ message: 'Los toppings deben ser un arreglo.' })
  @ValidateNested({ each: true })
  @Type(() => DetalleToppingDto)
  toppings?: DetalleToppingDto[];
}
