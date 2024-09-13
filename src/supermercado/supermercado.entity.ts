import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Ciudad } from '../ciudad/ciudad.entity';

@Entity()
export class Supermercado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('float')
  longitud: number;

  @Column('float')
  latitud: number;

  @Column()
  paginaWeb: string;

  @ManyToMany(() => Ciudad, ciudad => ciudad.supermercados)
  ciudades: Ciudad[];
}
