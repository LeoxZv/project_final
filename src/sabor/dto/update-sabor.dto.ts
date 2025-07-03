import { PartialType } from '@nestjs/mapped-types';
import { CreateSaborDto } from './create-sabor.dto';
import {IsNumber, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class UpdateSaborDto{
    @IsString()
    @Length(5,20)
    nombre: string;
    @IsOptional()
    @IsString()
    descripcion: string;
    @IsNumber({}, {message: 'El precio por bola debe ser un numero.'})
    @IsPositive({ message: 'El precio de cada bola debe ser positivo'})
    precio_bola: number;
}
