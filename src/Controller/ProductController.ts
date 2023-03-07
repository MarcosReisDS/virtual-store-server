const express = require('express');
const router = express.Router();
import { Request, Response } from "express";
import ProductRepository from "../Repositories/ProductRepository";
const productRepository = new ProductRepository();

class productController {
    constructor() {
        router.get('/showall', this.getAllProducts)
        router.get('/show/:id?', this.getProduct)
        router.post('/create', this.postProduct)
        router.put('/edit/:id?', this.putProduct)
        router.delete('/delete', this.deleteProduct)
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const product = await productRepository.showAllProducts()

            if (!product) {
                res.status(400).send('usuário não encontrado')
                return null
            }

            res.send(product)
        } catch (e) {
            res.status(400).send('erro ao buscar')
        }
    }

    async getProduct(req: Request, res: Response) {
        try {
            const product = await productRepository.showProduct(req.params.id)

            if (!product) {
                res.status(400).send('Produto não encontrado')
                return null
            }

            res.send(product)
        } catch (e) {
            res.status(400).send('erro ao buscar')
        }
    }

    async postProduct(req: Request, res: Response) {
        try {
            const product = await productRepository.createProduct(req.body)

            if (!product) {
                res.status(400).send("Não foi possivel adicionar o produto")
                return null
            }

            res.send(product)
        } catch (error) {
            res.status(400).send('não foi possível criar o produto')
        }
    }

    async putProduct(req: Request, res: Response) {
        try {
            const product = await productRepository.createProduct(req.body, req.params.id)

            if (!product) {
                res.status(400).send("Não foi possivel adicionar o produto")
                return null
            }

            res.send(product)
        } catch (error) {
            res.status(400).send('não foi possível criar o produto')
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const idProduct: any = req.query.hasOwnProperty("id") ? req.query.id : null

            const productDeleted = await productRepository.deleteProduct(idProduct)

            if (!productDeleted) {
                res.status(400).send('Não foi possível deletar produto')
                return null
            }

            res.send(productDeleted)
        } catch (error) {
            res.status(400).send('não foi possível deletar o produto')
        }
    }
}

new productController();
export default router;