import { Request, Response } from "express"
import { ProdutoService } from "../services/produtoService"

const service = new ProdutoService()

export class ProdutoController {
    async createProduto(req: Request, res: Response){
        
        const { nome, categoria, unidade_media, preco_unitario, id_fornecedor } = req.body
      
        const result = await service.createProduto({ nome, categoria, unidade_media, preco_unitario,id_fornecedor })
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        return res.status(201).json(result)

    }
    async readAllProduto(req: Request, res: Response){
    
        const result = await service.readAllProduto()
        if(result instanceof Error) {
            return res.status(500).json(result.message)
        }
        
        if(result.length == 0) {
           
            return res.status(200).json("No fornecedors found")
        }
        
        return res.status(200).json(result)
    }
    async readOneProduto(req: Request, res: Response){
        const { id } = req.params
        const result = await service.readOneProduto({id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.json(result)
    }
    async updateProduto(req: Request, res: Response){
        const { id } = req.params
        const { nome, categoria, unidade_media, preco_unitario  } = req.body
        const result = await service.updateProduto({id, nome, categoria, unidade_media, preco_unitario })
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
    async deleteProduto(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deleteProduto({ id })
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}