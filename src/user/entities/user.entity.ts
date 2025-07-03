import { Column, PrimaryGeneratedColumn } from "typeorm";

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
}
