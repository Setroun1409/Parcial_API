import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { Supermercado } from './supermercado.entity';

@Controller('supermarkets')
export class SupermercadoController {
  constructor(private readonly supermercadoService: SupermercadoService) {}

  @Get()
  findAll(): Promise<Supermercado[]> {
    return this.supermercadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Supermercado> {
    return this.supermercadoService.findOne(id);
  }

  @Post()
  create(@Body() createDto: Partial<Supermercado>): Promise<Supermercado> {
    return this.supermercadoService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: Partial<Supermercado>): Promise<Supermercado> {
    return this.supermercadoService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.supermercadoService.delete(id);
  }
}
