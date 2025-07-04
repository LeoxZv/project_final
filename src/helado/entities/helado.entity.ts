import { User } from 'src/user/entities/user.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HeladoStatus } from '../status/status-helado';
import { DetalleHeladoSabor } from 'src/detalle_helado_sabor/entities/detalle_helado_sabor.entity';
import { DetalleHeladoTopping } from 'src/detalle_helado_topping/entities/detalle_helado_topping.entity';

export class Helado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @ManyToOne(() => User, (user) => user.Helados)
  @JoinColumn({ name: 'cliente_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_pedido: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_pedido: number;

  @Column({ default: 'Pendiente', type: 'enum', enum: HeladoStatus })
  estado_pedido: HeladoStatus;

  @OneToMany(() => DetalleHeladoSabor, (detalle) => detalle.helado, {
    cascade: true,
  })
  detallesSabores: DetalleHeladoSabor[];

  @OneToMany(() => DetalleHeladoTopping, (detalle) => detalle.helado, {
    cascade: true,
  })
  detallesTopping: DetalleHeladoTopping[];
}
