import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("fornecedor")
export class Fornecedor {
    @PrimaryColumn()
    id: string

    @Column({ nullable: false })
    nome: string

    @Column()
    tipo: string

    @Column()
    cnpj: string

    @Column()
    endereco: string

    constructor(){
        this.id = uuid()
    }
}