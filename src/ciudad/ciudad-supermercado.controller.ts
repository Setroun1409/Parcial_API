import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { SupermercadoService } from '../supermercado/supermercado.service';

@Controller('cities/:cityId/supermarkets')
export class CiudadSupermercadoController {
  constructor(
    private readonly ciudadService: CiudadService,
    private readonly supermercadoService: SupermercadoService
  ) {}

  @Post(':supermarketId')
  async addSupermarketToCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number
  ): Promise<void> {
    const ciudad = await this.ciudadService.findOne(cityId);
    const supermercado = await this.supermercadoService.findOne(supermarketId);
    ciudad.supermercados.push(supermercado);
    await this.ciudadService.update(cityId, ciudad);
  }

  @Get()
  async findSupermarketsFromCity(@Param('cityId') cityId: number) {
    const ciudad = await this.ciudadService.findOne(cityId);
    return ciudad.supermercados;
  }

  @Get(':supermarketId')
  async findSupermarketFromCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number
  ) {
    const ciudad = await this.ciudadService.findOne(cityId);
    return ciudad.supermercados.find(s => s.id === supermarketId);
  }

  @Put()
  async updateSupermarketsFromCity(
    @Param('cityId') cityId: number,
    @Body() updateSupermarketsDto: { supermarketIds: number[] }
  ) {
    const ciudad = await this.ciudadService.findOne(cityId);
    const supermercados = await Promise.all(
      updateSupermarketsDto.supermarketIds.map(id => this.supermercadoService.findOne(id))
    );
    ciudad.supermercados = supermercados;
    await this.ciudadService.update(cityId, ciudad);
  }

  @Delete(':supermarketId')
  async deleteSupermarketFromCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number
  ) {
    const ciudad = await this.ciudadService.findOne(cityId);
    ciudad.supermercados = ciudad.supermercados.filter(s => s.id !== supermarketId);
    await this.ciudadService.update(cityId, ciudad);
  }
}
