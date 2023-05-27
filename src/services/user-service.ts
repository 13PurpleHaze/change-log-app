import prisma from "../db";
import { hashPassword, comparePassword } from "../utils/passwordHash";
import { UnauthorizedError } from "../exeptions/UnauthorizedError";

class UserService {
    create = async (username, password) => {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: await hashPassword(password),
            }
        });
        return user;
    }

    login = async (username, password) => {
        const user = await prisma.user.findUnique({
            where: {
                username
            },
        })
        const isValid = await comparePassword(password, user.password);
        if(!isValid) {
            throw new UnauthorizedError();
        }
        return user;
    }

    logout = async (id: number) => {
        const result = await prisma.token.delete({
            where: {
                user_id: id
            }
        })
        return result;
    }
}

export default UserService;