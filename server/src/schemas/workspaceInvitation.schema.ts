import { z } from "zod";

export const workspaceInvitationSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email address"),
});