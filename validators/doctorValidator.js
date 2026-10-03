import { z } from "zod";

export const doctorSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.string().email("Invalid email address"),

    specialization: z
        .string()
        .min(2, "Specialization is required"),

    experience: z
        .number()
        .min(0, "Experience cannot be negative")
});