import * as z from "zod";

export const resetPasswordPhoneSchema = z.object({
	phone: z
		.string()
		.min(1, "Phone number is required")
		.regex(/^\+?[0-9]{10,}$/, "Please enter a valid phone number"),
});

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
				"Password must contain at least one letter and one number"
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
