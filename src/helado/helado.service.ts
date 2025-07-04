import { Injectable } from '@nestjs/common';
import { CreateHeladoDto } from './dto/create-helado.dto';
import { UpdateHeladoDto } from './dto/update-helado.dto';

@Injectable()
export class HeladoService {
  create(createHeladoDto: CreateHeladoDto) {
    return 'This action adds a new helado';
  }

  findAll() {
    return `This action returns all helado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helado`;
  }

  update(id: number, updateHeladoDto: UpdateHeladoDto) {
    return `This action updates a #${id} helado`;
  }

  remove(id: number) {
    return `This action removes a #${id} helado`;
  }
}
