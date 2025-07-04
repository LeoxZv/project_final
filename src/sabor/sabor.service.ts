import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSaborDto } from './dto/create-sabor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sabor } from './entities/sabor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaborService {
  constructor(
    @InjectRepository(Sabor)
    private readonly saborRepository: Repository<Sabor>,
  ) {}

  async create(sabor: CreateSaborDto) {
    const newSabor = await this.saborRepository.create(sabor as Partial<Sabor>);
    return this.saborRepository.save(newSabor);
  }

  async findAll(): Promise<Sabor[]> {
    return this.saborRepository.find();
  }

  async findOne(id: number): Promise<Sabor> {
    const sabor = await this.saborRepository.findOneBy({ id });
    if (!sabor) {
      throw new HttpException(`Sabpr Not Found`, HttpStatus.NOT_FOUND);
    }
    return sabor;
  }

  async update(id: number, sabor: Partial<Sabor>): Promise<Sabor> {
    const existingSabor = await this.saborRepository.findOneBy({ id });
    if (!existingSabor) {
      throw new HttpException(`Sabor Not Found`, HttpStatus.NOT_FOUND);
    }
    const updatedSabor = Object.assign(existingSabor, sabor);
    return this.saborRepository.save(updatedSabor);
  }

  async remove(id: number): Promise<void> {
    const result = await this.saborRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Sabor Not Found`, HttpStatus.NOT_FOUND);
    }
  }
}
