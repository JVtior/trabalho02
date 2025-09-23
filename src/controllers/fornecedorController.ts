import { Request, Response } from "express"
import { FornecedorService } from "../services/fornecedorService"

const service = new FornecedorService()

export class FornecedorController {
    async createFornecedor(req: Request, res: Response){
        
        const { nome, tipo, cnpj, endereco } = req.body
      
        const result = await service.createFornecedor({ nome, tipo, cnpj, endereco  })
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        return res.status(201).json(result)

    }
    async readAllFornecedor(req: Request, res: Response){
    
        const result = await service.readAllFornecedor()
        if(result instanceof Error) {
            return res.status(500).json(result.message)
        }
        
        if(result.length == 0) {
           
            return res.status(200).json("No fornecedors found")
        }
        
        return res.status(200).json(result)
    }
    async readOneFornecedor(req: Request, res: Response){
        const { id } = req.params
        const result = await service.readOneFornecedor({id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.json(result)
    }
    async updateFornecedor(req: Request, res: Response){
        const { id } = req.params
        const { nome, tipo, cnpj, endereco  } = req.body
        const result = await service.updateFornecedor({id, nome, tipo, cnpj, endereco })
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
    async deleteFornecedor(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deleteFornecedor({ id })
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}