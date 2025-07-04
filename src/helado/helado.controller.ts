import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HeladoService } from './helado.service';
import { CreateHeladoDto } from './dto/create-helado.dto';
import { UpdateHeladoDto } from './dto/update-helado.dto';

@Controller('helado')
export class HeladoController {
  constructor(private readonly heladoService: HeladoService) {}

  @Post()
  create(@Body() createHeladoDto: CreateHeladoDto) {
    return this.heladoService.create(createHeladoDto);
  }

  @Get()
  findAll() {
    return this.heladoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heladoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeladoDto: UpdateHeladoDto) {
    return this.heladoService.update(+id, updateHeladoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heladoService.remove(+id);
  }
}
