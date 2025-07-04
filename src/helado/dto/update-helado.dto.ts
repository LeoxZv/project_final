import { PartialType } from '@nestjs/mapped-types';
import { CreateHeladoDto, DetalleSaborDto, DetalleToppingDto } from './create-helado.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateHeladoDto extends PartialType(CreateHeladoDto) {
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => DetalleSaborDto)
    sabores?: DetalleSaborDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => DetalleToppingDto)
    toppings?: DetalleToppingDto[];
}
