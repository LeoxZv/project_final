import { DetalleHeladoTopping } from 'src/detalle_helado_topping/entities/detalle_helado_topping.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Topping {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;
  @Column()
  descripcion: string;
  @OneToMany(() => DetalleHeladoTopping, (detalle) => detalle.topping)
  detallesHeladoTopping: DetalleHeladoTopping[];
}
