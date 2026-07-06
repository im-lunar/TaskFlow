import type { Request, Response } from "express";
import { getCurrentUserService, loginService, signupService } from "./auth.service.js";

export const signupController = async (
    req: Request, 
    res: Response
) => {
    const { name, email, password } = req.body;

    const user = await signupService(name, email, password);

    res.status(200).json({
        message: "User created successfully",
        user
    });
};

export const loginController = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await loginService(email, password);

    res.status(200).json({
        message: "Login successful",
        ...response
    });
}

export const getCurrentUserController = async(req:Request, res:Response) => {
    const user = await getCurrentUserService(req.user.userId);

    res.status(200).json({
        success: true,
        user
    });
}