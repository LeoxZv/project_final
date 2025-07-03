import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SaborModule } from './sabor/sabor.module';
import { ToppingModule } from './topping/topping.module';

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
      }),
    }),
    UserModule,
    SaborModule,
    ToppingModule,
  ],
})
export class AppModule {}
