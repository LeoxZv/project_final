import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topping } from './entities/topping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToppingService {
  constructor(
    @InjectRepository(Topping)
    private readonly toppingRepository: Repository<Topping>
  ){}

  async create(topping: CreateToppingDto) {
    const newTopping = await this.toppingRepository.create(topping as Partial<Topping>)
    return this.toppingRepository.save(newTopping)
  }

  async findAll(): Promise<Topping[]> {
    return this.toppingRepository.find()
  }

  async findOne(id: number): Promise<Topping> {
    const topping = await this.toppingRepository.findOneBy({ id })
    if (!topping) {
      throw new HttpException(`Topping Not Found`, HttpStatus.NOT_FOUND)
    }
    return topping;
  }

  async update(id: number, topping: Partial<Topping>): Promise<Topping> {
    const existingTopping = await this.toppingRepository.findOneBy({ id })
    if (!existingTopping) {
      throw new HttpException(`Topping Not Found`, HttpStatus.NOT_FOUND)
    }
    const updatedTopping = Object.assign(existingTopping, topping)
    return this.toppingRepository.save(updatedTopping)
  }

  async remove(id: number): Promise<void> {
    const result =  await this.toppingRepository.delete(id)
    if(result.affected === 0){
      throw new HttpException(`Sabor Not Found`, HttpStatus.NOT_FOUND); 
    }
  }
}
