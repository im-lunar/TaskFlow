import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: ZodSchema) {
    return (req:Request, res:Response, next:NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                error: result.error.issues
            });
        }

        req.body = result.data;
        
        next();
    }
}