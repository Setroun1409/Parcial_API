import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './ciudad.entity';

@Controller('cities')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  findAll(): Promise<Ciudad[]> {
    return this.ciudadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ciudad> {
    return this.ciudadService.findOne(id);
  }

  @Post()
  create(@Body() createDto: Partial<Ciudad>): Promise<Ciudad> {
    return this.ciudadService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: Partial<Ciudad>): Promise<Ciudad> {
    return this.ciudadService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.ciudadService.delete(id);
  }
}
