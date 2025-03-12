import { z } from "zod";

export const loginSchema = z.object({
	phone: z
		.string()
		.min(1, { message: "Phone number is required" })
		.regex(/^[0-9+]{10,14}$/, { message: "Invalid phone number format" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});
