import Users from "../Model/Users";

class UserRepository {
    async showAllUsers() {
        let findUser = await Users.query()

        return findUser
    }

    async showUser(id: string, mail: string) {
        let findUser
        if (mail) {
            let findUser = await Users.query().where("mail", mail).first()
        } else {
            let findUser = await Users.query().where("id", id).first()
        }

        return findUser
    }

    async createUser(user: Users | undefined, id: string | undefined = undefined) {
        let findUser;

        if (id) {
            findUser = await Users.query().where("id", id).first()
        }

        if (!findUser) {
            findUser = new Users()
        }

        findUser.name = user.name || findUser.name
        findUser.mail = user.mail || findUser.mail
        findUser.password = user.password || findUser.password

        await findUser.save()

        return findUser
    }

    async deleteUser(id: number) {
        let finduser = await Users.query().where("id", id).first()

        if (finduser) {
            finduser.delete()
        }

        return finduser
    }
}

export default UserRepository;