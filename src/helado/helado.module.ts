import { Module } from '@nestjs/common';
import { HeladoService } from './helado.service';
import { HeladoController } from './helado.controller';

@Module({
  controllers: [HeladoController],
  providers: [HeladoService],
})
export class HeladoModule {}
