import { Module } from '@nestjs/common';
import { SaborService } from './sabor.service';
import { SaborController } from './sabor.controller';
import { Sabor } from './entities/sabor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sabor])],
  controllers: [SaborController],
  providers: [SaborService],
  exports: [TypeOrmModule],
})
export class SaborModule {}
