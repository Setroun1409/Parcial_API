import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Supermercado } from '../supermercado/supermercado.entity';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  habitantes: number;

  @ManyToMany(() => Supermercado, supermercado => supermercado.ciudades)
  @JoinTable()
  supermercados: Supermercado[];
}
