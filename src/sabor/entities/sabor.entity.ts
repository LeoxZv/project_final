import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaborStatus } from "../status/status-sabor";
import { DetalleHeladoSabor } from '../../detalle_helado_sabor/entities/detalle_helado_sabor.entity';

export class Sabor {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_bola: number;
    @Column({ default: 'Disponble', type: 'enum', enum: SaborStatus })
    status: SaborStatus;
    @OneToMany(() => DetalleHeladoSabor, (detalle) => detalle.sabor)
    detallesHeladoSabor: DetalleHeladoSabor[]
}
