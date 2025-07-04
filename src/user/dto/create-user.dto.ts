import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(10, 50)
  nombre: string;
  @IsString()
  @Length(10, 50)
  apellido: string;
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  @Length(7, 15)
  telefono?: string;
  s;
}
