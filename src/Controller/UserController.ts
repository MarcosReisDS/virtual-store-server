const express = require('express');
const router = express.Router();
import { Request, Response } from "express";
import UserRepository from "../Repositories/UserRepository";
const userRepository = new UserRepository();

class UserController {
    constructor() {
        router.get('/showall', this.getAllUsers)
        router.get('/show/:id?', this.getUser)
        router.post('/create', this.postUser)
        router.put('/edit/:id?', this.putUser)
        router.delete('/delete', this.deleteUser)
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userRepository.showAllUsers()

            if (!users) {
                res.status(400).send('usuário não encontrado')
                return null
            }

            res.send(users)
        } catch (e) {
            res.status(400).send('erro ao buscar')
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            console.log(req.params)
            console.log(req.body)
            const user = await userRepository.showUser(req.params?.id, req.params?.mail)
            if (!user) {
                res.status(400).send('usuário não encontrado')
                return null
            }

            res.send(user)
        } catch (e) {
            res.status(400).send('erro ao buscar')
        }
    }

    async postUser(req: Request, res: Response) {
        try {
            const user = await userRepository.createUser(req.body)

            if (!user) {
                res.status(400).send("Não foi possivel adicionar o produto")
                return null
            }

            res.send(user)
        } catch (e) {
            res.status(400).send('não foi possível criar o usuário')
        }
    }

    async putUser(req: Request, res: Response) {
        try {
            const user = await userRepository.createUser(req.body, req.params.id)

            if (!user) {
                res.status(400).send("Não foi possivel adicionar o produto")
                return null
            }

            res.send(user)
        } catch (e) {
            res.status(400).send('não foi possível criar o usuário')
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const idUser: any = req.query.hasOwnProperty("id") ? req.query.id : null

            const userDeleted = await userRepository.deleteUser(idUser)

            if (!userDeleted) {
                res.status(400).send('Não foi possível deletar usuário')
                return null
            }

            res.send(userDeleted)
        } catch (error) {
            res.status(400).send('não foi possível deletar o usuário')
        }
    }
}

new UserController();
export default router;