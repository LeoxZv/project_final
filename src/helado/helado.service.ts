import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHeladoDto } from './dto/create-helado.dto';
import { UpdateHeladoDto } from './dto/update-helado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Helado } from './entities/helado.entity';
import { Repository } from 'typeorm';
import { Sabor } from 'src/sabor/entities/sabor.entity';
import { Topping } from 'src/topping/entities/topping.entity';
import { User } from 'src/user/entities/user.entity';
import { DetalleHeladoSabor } from 'src/detalle_helado_sabor/entities/detalle_helado_sabor.entity';
import { DetalleHeladoTopping } from 'src/detalle_helado_topping/entities/detalle_helado_topping.entity';
import { UpdateStatusHelado } from './dto/update-status-helado.dto';

@Injectable()
export class HeladoService {
  constructor(
    @InjectRepository(Helado)
    private heladosRepository: Repository<Helado>,
    @InjectRepository(Sabor)
    private saboresRepository: Repository<Sabor>,
    @InjectRepository(Topping)
    private toppingsRepository: Repository<Topping>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(DetalleHeladoSabor)
    private detalleSaborRepository: Repository<DetalleHeladoSabor>,
    @InjectRepository(DetalleHeladoTopping)
    private detalleToppingRepository: Repository<DetalleHeladoTopping>,
  ) {}

  private async calcularTotal(
    saboresData: { sabor_id: number; cantidad_bolas: number }[],
    ToppingsData: { topping_id: number; cantidad: number }[],
  ): Promise<number> {
    let total = 0;
    //Calcular costo de sabores
    for (const item of saboresData) {
      const sabor = await this.saboresRepository.findOneBy({
        id: item.sabor_id,
      });
      if (!sabor) {
        throw new HttpException(`Sabor NOT FOUND`, HttpStatus.NOT_FOUND);
      }
      total += sabor.precio_bola * item.cantidad_bolas;
    }

    //Calcular costo de topppings
    for (const item of ToppingsData) {
      const topping = await this.toppingsRepository.findOneBy({
        id: item.topping_id,
      });
      if (!topping) {
        throw new HttpException(`Topping NOT FOUND`, HttpStatus.NOT_FOUND);
      }
      total += topping.precio * item.cantidad;
    }
    return total;
  }

  async create(createHeladoDto: CreateHeladoDto): Promise<Helado> {
    //verificar la existencia del cliente
    const user = await this.usersRepository.findOneBy({
      id: createHeladoDto.cliente_id,
    });
    if (!user) {
      throw new HttpException(`Cliente NOT FOUND`, HttpStatus.NOT_FOUND);
    }
    //calcular total del pedido
    const total_pedido = await this.calcularTotal(
      createHeladoDto.sabores,
      createHeladoDto.toppings || [],
    );

    const helado = this.heladosRepository.create({
      cliente_id: createHeladoDto.cliente_id,
      total_pedido: total_pedido,
    });

    //Crear detalle sabores

    helado.detallesSabores = createHeladoDto.sabores.map((s) =>
      this.detalleSaborRepository.create({
        sabor_id: s.sabor_id,
        cantidad_bolas: s.cantidad_bolas,
      }),
    );

    //crear detalle toppings (Si existen)

    if (createHeladoDto.toppings && createHeladoDto.toppings.length > 0) {
      helado.detallesTopping = createHeladoDto.toppings.map((t) =>
        this.detalleToppingRepository.create({
          topping_id: t.topping_id,
          cantidad: t.cantidad,
        }),
      );
    }
    return this.heladosRepository.save(helado);
  }

  async findAll(): Promise<Helado[]> {
    return this.heladosRepository.find({
      relations: [
        'user',
        'detallesSabores',
        'detallesSabores.sabor',
        'detallesToppings',
        'detallesToppings.topping',
      ],
    });
  }

  async findOne(id: number): Promise<Helado> {
    const helado = await this.heladosRepository.findOne({
      where: { id },
      relations: [
        'user',
        'detallesSabores',
        'detallesSabores.sabor',
        'detallesToppings',
        'detallesToppings.topping',
      ],
    });
    if (!helado) {
      throw new HttpException(`Helado Not Found`, HttpStatus.NOT_FOUND);
    }
    return helado;
  }

  async update(id: number, updateHeladoDto: UpdateHeladoDto): Promise<Helado> {
    const helado = await this.heladosRepository.findOne({
      where: { id },
      relations: ['detallesSabores', 'detallesTopping'],
    });
    if (!helado) {
      throw new HttpException(`helado Not found`, HttpStatus.NOT_FOUND);
    }

    if (updateHeladoDto.sabores) {
      await this.detalleSaborRepository.delete({ helado_id: id });
      helado.detallesSabores = updateHeladoDto.sabores.map((s) =>
        this.detalleSaborRepository.create({
          sabor_id: s.sabor_id,
          cantidad_bolas: s.cantidad_bolas,
          helado_id: id,
        }),
      );
    }
    if (updateHeladoDto.toppings) {
      await this.detalleToppingRepository.delete({ helado_id: id });
      helado.detallesTopping = updateHeladoDto.toppings.map((t) =>
        this.detalleToppingRepository.create({
          topping_id: t.topping_id,
          cantidad: t.cantidad,
          helado_id: id,
        }),
      );
    }
    if (updateHeladoDto.sabores || updateHeladoDto.toppings) {
      const saboresActuales =
        updateHeladoDto.sabores ||
        helado.detallesSabores.map((d) => ({
          sabor_id: d.sabor_id,
          cantidad_bolas: d.cantidad_bolas,
        }));
      const toppingsActuales =
        updateHeladoDto.toppings ||
        helado.detallesTopping.map((d) => ({
          topping_id: d.topping_id,
          cantidad: d.cantidad,
        }));
      helado.total_pedido = await this.calcularTotal(
        saboresActuales,
        toppingsActuales,
      );
    }
    return this.heladosRepository.save(helado);
  }

  async updateStatus(id: number, status: UpdateStatusHelado): Promise<Helado> {
    const existingHelado = await this.heladosRepository.findOneBy({ id });
    if (!existingHelado) {
      throw new HttpException(` Helado Not Found `, HttpStatus.NOT_FOUND);
    }
    existingHelado.estado_pedido = status.status;
    return this.heladosRepository.save(existingHelado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.heladosRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Helado Not Found`, HttpStatus.NOT_FOUND);
    }
  }
}
