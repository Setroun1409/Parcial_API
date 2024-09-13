import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supermercado } from './supermercado.entity';

@Injectable()
export class SupermercadoService {
  constructor(
    @InjectRepository(Supermercado)
    private supermercadoRepository: Repository<Supermercado>,
  ) {}

  async findAll(): Promise<Supermercado[]> {
    return this.supermercadoRepository.find();
  }

  async findOne(id: number): Promise<Supermercado> {
    const supermercado = await this.supermercadoRepository.findOne(id);
    if (!supermercado) {
      throw new NotFoundException('Supermercado no encontrado');
    }
    return supermercado;
  }

  async create(createDto: Partial<Supermercado>): Promise<Supermercado> {
    if (createDto.nombre.length <= 10) {
      throw new BadRequestException('El nombre del supermercado debe tener más de 10 caracteres');
    }
    const supermercado = this.supermercadoRepository.create(createDto);
    return this.supermercadoRepository.save(supermercado);
  }

  async update(id: number, updateDto: Partial<Supermercado>): Promise<Supermercado> {
    const supermercado = await this.findOne(id);
    if (updateDto.nombre && updateDto.nombre.length <= 10) {
      throw new BadRequestException('El nombre del supermercado debe tener más de 10 caracteres');
    }
    Object.assign(supermercado, updateDto);
    return this.supermercadoRepository.save(supermercado);
  }

  async delete(id: number): Promise<void> {
    const result = await this.supermercadoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Supermercado no encontrado');
    }
 
