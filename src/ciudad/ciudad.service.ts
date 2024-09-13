import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find();
  }

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne(id);
    if (!ciudad) {
      throw new NotFoundException('Ciudad no encontrada');
    }
    return ciudad;
  }

  async create(createDto: Partial<Ciudad>): Promise<Ciudad> {
    if (!['Argentina', 'Ecuador', 'Paraguay'].includes(createDto.pais)) {
      throw new BadRequestException('El país no es válido');
    }
    const ciudad = this.ciudadRepository.create(createDto);
    return this.ciudadRepository.save(ciudad);
  }

  async update(id: number, updateDto: Partial<Ciudad>): Promise<Ciudad> {
    const ciudad = await this.findOne(id);
    if (updateDto.pais && !['Argentina', 'Ecuador', 'Paraguay'].includes(updateDto.pais)) {
      throw new BadRequestException('El país no es válido');
    }
    Object.assign(ciudad, updateDto);
    return this.ciudadRepository.save(ciudad);
  }

  async delete(id: number): Promise<void> {
    const result = await this.ciudadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Ciudad no encontrada');
    }
  }
}
