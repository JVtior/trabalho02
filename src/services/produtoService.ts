import { DevDataSource } from "../connections/dbDev";
import { Produto } from "../models/produto";



const cursor = DevDataSource.getRepository(Produto)



type newProdutoRequest = {
    nome:string,
    categoria: string,
    unidade_media: number,
    preco_unitario: number,
    id_fornecedor: string
}

type findProdutoRequest = {
    id: string 
}

type updateProdutoRequest = {
    id: string,
    nome:string,
    categoria: string,
    unidade_media: number,
    preco_unitario: number
}

export class ProdutoService {
    async createProduto({nome, categoria, unidade_media, preco_unitario,id_fornecedor}:newProdutoRequest):Promise<Produto | Error> {
        try {
             
            const produto = cursor.create({
            nome, categoria, unidade_media, preco_unitario,id_fornecedor
        })
        
        await cursor.save(produto)  
        return produto  
        }
        catch(err) {
            return new Error("Unexpected error saving produto!")
        }

}

async readOneProduto({ id } : findProdutoRequest) : Promise<Produto | Error> { 
    try {

      const produto = await cursor.findOne({ where: {id}}) 
    if(!produto) {
        return new Error("Produto not found!") 
    } 
       return produto  
    }
    catch(err) {
        return new Error("Unexpected error reading produto!")
    }
}

async readAllProduto(): Promise<Produto[] | Error> {
     try {
       
       const produtoes = await cursor.find()
       return produtoes 
     }
     catch(err) {
        return new Error("Unexpected error reading fornecidores!")
     }
}

async updateProduto({ id,nome, categoria, unidade_media, preco_unitario } : updateProdutoRequest): Promise<Produto | Error> {
    try{
    const produto = await cursor.findOne({ where: {id}}) 
    if(!produto) {
        return new Error("Produto not found!") 
    }



    produto.nome = nome
    produto.categoria = categoria
    produto.unidade_media = unidade_media
    produto.preco_unitario =  preco_unitario


    
    await cursor.save(produto)
    return produto
    }
     catch(err) {
        return new Error("Unexpected error updating produto!")
     }
}

async deleteProduto({ id } : findProdutoRequest): Promise<String | Error> {
    try{
        const produto = await cursor.findOne({ where: {id}}) 
        if(!produto) {
            return new Error("Produto not found!") 
        }
        await cursor.delete(produto.id)
        return "Produto removed sucessfully!"
    }
    catch(err) {
        return new Error("Unexpected error deleting produto!")
    }
}
}


