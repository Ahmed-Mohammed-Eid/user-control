import { z } from "zod";

export const signupSchema = z
	.object({
		type: z.enum(["individual", "company"], {
			required_error: "Please select account type",
		}),
		companyName: z.string().optional(),
		firstName: z
			.string()
			.min(1, { message: "First name is required" })
			.regex(/^[a-zA-Z\s]*$/, {
				message: "First name should only contain letters",
			}),
		lastName: z
			.string()
			.min(1, { message: "Last name is required" })
			.regex(/^[a-zA-Z\s]*$/, {
				message: "Last name should only contain letters",
			}),
		phone: z
			.string()
			.min(1, { message: "Phone number is required" })
			.regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
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
				return data.companyName && data.companyName.length > 0;
			}
			return true;
		},
		{
			message: "Company name is required for company accounts",
			path: ["companyName"],
		}
	);
