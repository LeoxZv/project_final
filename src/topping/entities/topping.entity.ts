import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Topping {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    precio: number;
    @Column()
    descripcion: string;
}
