import { Module } from '@nestjs/common';
import { HeladoService } from './helado.service';
import { HeladoController } from './helado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Sabor } from 'src/sabor/entities/sabor.entity';
import { Topping } from 'src/topping/entities/topping.entity';
import { Helado } from './entities/helado.entity';
import { DetalleHeladoSabor } from 'src/detalle_helado_sabor/entities/detalle_helado_sabor.entity';
import { DetalleHeladoTopping } from 'src/detalle_helado_topping/entities/detalle_helado_topping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Sabor,
      Topping,
      Helado,
      DetalleHeladoSabor,
      DetalleHeladoTopping,
    ]),
  ],
  controllers: [HeladoController],
  providers: [HeladoService],
})
export class HeladoModule {}
