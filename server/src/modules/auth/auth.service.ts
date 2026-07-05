import bcrypt from "bcrypt";
import { prisma } from "../../prisma.js";
import type { SignupResponseDto } from "./auth.dto.js";
import { AppError } from "../../utils/AppError.js";

export const signupService = async (name:string, email:string, password:string) => {
    const existingUser = await prisma.user.findUnique({
        where: {email}
    });

    if (existingUser) {
        throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const response: SignupResponseDto = {
        id: user.id,
        name: user.name,
        email: user.email
    }

    return response;
}