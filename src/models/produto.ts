import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("produto")
export class Produto {
    @PrimaryColumn()
    id: string

    @Column()
    nome: string

    @Column()
    categoria: string

    @Column()
    unidade_media: number

    @Column()
    preco_unitario: number

    
    @Column()
    id_fornecedor: string

    constructor(){
        this.id = uuid()
    }
}