import { Router } from "express"
import { FornecedorController } from "../controllers/fornecedorController"
import { ProdutoController } from "../controllers/produtoController"


const router = Router()
const controllerFornecedor = new FornecedorController()
const controllerProduto = new ProdutoController()


router.get("/", (request, response) => {
    return response.json("home page")
})

//Fornecedor
router.get("/fornecedores", controllerFornecedor.readAllFornecedor)

router.get("/fornecedores/:id", controllerFornecedor.readOneFornecedor)

router.post("/fornecedores", controllerFornecedor.createFornecedor)

router.put("/fornecedores/:id", controllerFornecedor.updateFornecedor)

router.delete("/fornecedores/:id", controllerFornecedor.deleteFornecedor)

//Produto
router.get("/produtos", controllerProduto.readAllProduto)

router.get("/produtos/:id", controllerProduto.readOneProduto)

router.post("/produtos", controllerProduto.createProduto)

router.put("/produtos/:id", controllerProduto.updateProduto)

router.delete("/produtos/:id", controllerProduto.deleteProduto)

export default router