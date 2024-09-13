import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { SupermercadoModule } from './supermercado/supermercado.module';
import { Ciudad } from './ciudad/ciudad.entity';
import { Supermercado } from './supermercado/supermercado.entity';
import { CiudadController } from './ciudad/ciudad.controller';
import { SupermercadoController } from './supermercado/supermercado.controller';
import { CiudadSupermercadoController } from './ciudad/ciudad-supermercado.controller'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432, 
      username: 'user', 
      password: 'password', 
      database: 'database', 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Ciudad, Supermercado]), 
    CiudadModule,
    SupermercadoModule,
  ],
  controllers: [
    CiudadController,
    SupermercadoController,
    CiudadSupermercadoController, 
  ],
  providers: [],
})
export class AppModule {}
