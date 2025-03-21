import { z } from "zod";

export const updateUserSchema = z
	.object({
		fullNameEn: z
			.string()
			.min(1, { message: "Full name (English) is required" }),
		fullNameAr: z
			.string()
			.min(1, { message: "Full name (Arabic) is required" }),
		email: z
			.string()
			.min(1, { message: "Email is required" })
			.email({ message: "Invalid email address" }),
		phoneNumber: z
			.string()
			.min(1, { message: "Phone number is required" })
			.regex(/^[0-9+\s()-]{10,20}$/, {
				message: "Invalid phone number format",
			}),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.or(z.literal(""))
			.optional(),
		confirmPassword: z.string().or(z.literal("")).optional(),
	})
	.refine(
		(data) => {
			// If password is empty, no need to check confirmPassword
			if (!data.password) return true;
			// Otherwise, passwords must match
			return data.password === data.confirmPassword;
		},
		{
			message: "Passwords don't match",
			path: ["confirmPassword"],
		}
	);
