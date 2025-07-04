import { Helado } from 'src/helado/entities/helado.entity';
import { Sabor } from 'src/sabor/entities/sabor.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class DetalleHeladoSabor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  helado_id: number;

  @ManyToOne(() => Helado, (helado) => helado.detallesSabores, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'helado_id' })
  helado: Helado;

  @Column()
  sabor_id: number;

  @ManyToOne(() => Sabor, (sabor) => sabor.detallesHeladoSabor)
  @JoinColumn({ name: 'sabor_id' })
  sabor: Sabor;

  @Column({ type: 'int', default: 1 })
  cantidad_bolas: number;
}
