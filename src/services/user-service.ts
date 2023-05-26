import prisma from "../db";
import { hashPassword, comparePassword } from "../utils/passwordHash";
import UnauthorizeError from "../exeptions/UnauthorizedError";

class UserService {
    async create(username, password) {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: await hashPassword(password),
            }
        });
        return user;
    }

    async login(username, password) {
        const user = await prisma.user.findUnique({
            where: {
                username
            },
        })
        const isValid = comparePassword(user.password, password);
        if(!isValid) {
            throw new UnauthorizeError();
        }
        return user;
    }

    async logout(id) {
        await prisma.token.delete({
            where: {
                user_id: id
            }
        })
    }
}

export default UserService;