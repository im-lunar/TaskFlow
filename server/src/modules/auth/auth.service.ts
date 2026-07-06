import bcrypt from "bcrypt";
import { prisma } from "../../prisma.js";
import type { SignupResponseDto } from "./auth.dto.js";
import { AppError } from "../../utils/AppError.js";
import { generateToken } from "../../utils/jwt.js";

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

export const loginService = async(email:string, password:string) => {
    const user = await prisma.user.findUnique({
        where: {email}
    });

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

export const getCurrentUserService = async (userId:string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}