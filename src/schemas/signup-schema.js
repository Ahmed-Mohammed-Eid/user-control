import { z } from "zod";

export const signupSchema = z
	.object({
		type: z.enum(["individual", "company"], {
			required_error: "Please select account type",
		}),
		companyNameEn: z.string().optional(),
		companyNameAr: z.string().optional(),
		fullNameEn: z.string().optional(),
		fullNameAr: z.string().optional(),
		phone: z
			.string()
			.min(1, { message: "Phone number is required" })
			.regex(/^\+?[0-9]{0,}$/, { message: "Invalid phone number" }),
		email: z
			.string()
			.min(1, { message: "Email is required" })
			.email({ message: "Invalid email address" }),
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
	})
	.refine(
		(data) => {
			if (data.type === "company") {
				return (
					data.companyNameEn &&
					data.companyNameEn.length > 0 &&
					data.companyNameAr &&
					data.companyNameAr.length > 0
				);
			}
			return true;
		},
		{
			message:
				"Company names in English and Arabic are required for company accounts",
			path: ["companyNameEn", "companyNameAr"],
		}
	)
	.refine(
		(data) => {
			if (data.type === "individual") {
				return (
					data.fullNameEn &&
					data.fullNameEn.length > 0 &&
					data.fullNameAr &&
					data.fullNameAr.length > 0
				);
			}
			return true;
		},
		{
			message:
				"Full names in English and Arabic are required for individual accounts",
			path: ["fullNameEn", "fullNameAr"],
		}
	);
