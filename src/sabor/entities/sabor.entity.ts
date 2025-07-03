import { Column, PrimaryGeneratedColumn } from "typeorm";
import { SaborStatus } from "../status/status-sabor";

export class Sabor {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    precio_bola: number;
    @Column({ default: 'Disponble', type: 'enum', enum: SaborStatus })
    status: SaborStatus;
}
