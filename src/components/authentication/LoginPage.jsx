// LoginPage.jsx
import React from "react";
import styles from "./LoginPage.module.scss";

// REACT HOOK FORM
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login-schema";
import { Link } from "react-router";

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		// Handle form submission here
	};

	return (
		<div className={styles.body}>
			<div className={styles.loginContainer}>
				<div className={styles.loginForm}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h1>Welcome Back 👋</h1>
						<p>
							A brand new day is here. It's your day to shape.
							Sign in and get started on your projects.
						</p>

						<div className={styles.formGroup}>
							<label htmlFor="email">Email</label>
							<input
								{...register("email")}
								type="email"
								id="email"
								placeholder="Example@email.com"
							/>
							{errors.email && (
								<span className={styles.errorMessage}>
									{errors.email.message}
								</span>
							)}
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="password">Password</label>
							<input
								{...register("password")}
								type="password"
								id="password"
								placeholder="At least 8 characters"
							/>
							{errors.password && (
								<span className={styles.errorMessage}>
									{errors.password.message}
								</span>
							)}
						</div>

						<div className={styles.forgotPassword}>
							<Link to="/auth/reset-password">
								Forgot Password?
							</Link>
						</div>

						<button type="submit" className={styles.signinBtn}>
							Sign in
						</button>

						<div className={styles.divider}>Or</div>

						<div className={styles.signupLink}>
							Don't you have an account?{" "}
							<Link to="/auth/signup">Sign up</Link>
						</div>

						<div className={styles.copyright}>
							© 2025 ALL RIGHTS RESERVED
						</div>
					</form>
				</div>
				<div className={styles.loginImage}></div>
			</div>
		</div>
	);
};

export default LoginPage;
