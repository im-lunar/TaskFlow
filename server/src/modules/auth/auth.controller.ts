import type { Request, Response } from "express";
import { signupService } from "./auth.service.js";

export const signupController= async (
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