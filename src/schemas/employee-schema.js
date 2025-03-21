import { z } from "zod";

export const employeeSchema = z
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
		mobile: z
			.string()
			.min(1, { message: "Mobile number is required" })
			.regex(/^[0-9+]{10,14}$/, {
				message: "Invalid mobile number format",
			}),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Please confirm your password" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
