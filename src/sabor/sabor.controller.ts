import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SaborService } from './sabor.service';
import { CreateSaborDto } from './dto/create-sabor.dto';
import { UpdateSaborDto } from './dto/update-sabor.dto';

@Controller('sabor')
export class SaborController {
  constructor(private readonly saborService: SaborService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateSaborDto) {
    return this.saborService.create(body);
  }

  @Get()
  findAll() {
    return this.saborService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saborService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaborDto: UpdateSaborDto) {
    return this.saborService.update(+id, updateSaborDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.saborService.remove(+id);
  }
}
