import { DevDataSource } from "../connections/dbDev";
import { Fornecedor } from "../models/fornecedor";



const cursor = DevDataSource.getRepository(Fornecedor)



type newFornecedorRequest = {
    nome:string,
    tipo: string,
    cnpj: string,
    endereco: string
}

type findFornecedorRequest = {
    id: string 
}

type updateFornecedorRequest = {
    id: string,
    nome:string,
    tipo: string,
    cnpj: string,
    endereco: string
}

export class FornecedorService {
    async createFornecedor({nome, tipo, cnpj, endereco}:newFornecedorRequest):Promise<Fornecedor | Error> {
        try {
                
            const fornecedor = cursor.create({
            nome, tipo,cnpj,endereco
        })
        
        await cursor.save(fornecedor)  
        return fornecedor  
        }
        catch(err) {
            return new Error("Unexpected error saving fornecedor!")
        }

}

async readOneFornecedor({ id } : findFornecedorRequest) : Promise<Fornecedor | Error> { 
    try {
      
      const fornecedor = await cursor.findOne({ where: {id}}) 
    if(!fornecedor) {
        return new Error("Fornecedor not found!") 
    } 
       return fornecedor  
    }
    catch(err) {
        return new Error("Unexpected error reading fornecedor!")
    }
}

async readAllFornecedor(): Promise<Fornecedor[] | Error> {
     try {
       const fornecedores = await cursor.find()
       return fornecedores 
     }
     catch(err) {
        return new Error("Unexpected error reading fornecidores!")
     }
}

async updateFornecedor({ id,nome, tipo, cnpj, endereco } : updateFornecedorRequest): Promise<Fornecedor | Error> {
    try{
    const fornecedor = await cursor.findOne({ where: {id}}) 
    if(!fornecedor) {
        return new Error("Fornecedor not found!") 
    }



    fornecedor.nome = nome
    fornecedor.tipo = tipo
    fornecedor.cnpj = cnpj
    fornecedor.endereco =  endereco


    await cursor.save(fornecedor)
    return fornecedor
    }
     catch(err) {
        return new Error("Unexpected error updating fornecedor!")
     }
}

async deleteFornecedor({ id } : findFornecedorRequest): Promise<String | Error> {
    try{
        const fornecedor = await cursor.findOne({ where: {id}}) 
        if(!fornecedor) {
            return new Error("Fornecedor not found!") 
        }
        await cursor.delete(fornecedor.id)
        return "Fornecedor removed sucessfully!"
    }
    catch(err) {
        return new Error("Unexpected error deleting fornecedor!")
    }
}
}


