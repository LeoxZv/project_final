import { Helado } from 'src/helado/entities/helado.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  email: string;
  @Column()
  telefono?: string;
  @OneToMany(() => Helado, (helado) => helado.user)
  Helados: Helado[];
}
