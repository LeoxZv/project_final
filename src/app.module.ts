import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SaborModule } from './sabor/sabor.module';
import { ToppingModule } from './topping/topping.module';
import { HeladoModule } from './helado/helado.module';
import { DetalleHeladoTopping } from './detalle_helado_topping/entities/detalle_helado_topping.entity';
import { DetalleHeladoSabor } from './detalle_helado_sabor/entities/detalle_helado_sabor.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (Config: ConfigService) => ({
        type: 'mysql',
        host: Config.get('DB_HOST'),
        port: Config.get('DB_PORT'),
        username: Config.get('DB_USER'),
        // password: Config.get('DB_PASSWORD'),
        database: Config.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    SaborModule,
    ToppingModule,
    DetalleHeladoTopping,
    HeladoModule,
    DetalleHeladoSabor,
],
})
export class AppModule {}
