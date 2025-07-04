import { Helado } from "src/helado/entities/helado.entity";
import { Topping } from "src/topping/entities/topping.entity";
import { Column, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class DetalleHeladoTopping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    helado_id: number;

    @ManyToOne(()=> Helado, (helado) => helado.detallesTopping, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'helado_id'} )
    helado: Helado;

    @Column()
    topping_id: number;

    @ManyToOne(() => Topping, (topping) => topping.detallesHeladoTopping)
    @JoinColumn({ name: 'topping_id' })
    topping: Topping;

    @Column({ type: 'int', default: 1 })
    cantidad: number;
}
