// LoginPage.jsx
import React, { useCallback } from "react";
import styles from "./LoginPage.module.scss";

// REACT HOOK FORM
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login-schema";
// APIS AND ROUTER
import { Link, useNavigate } from "react-router";
import axios from "axios";
// COMPONENTS
import Spinner from "../shared/Spinner";

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	// NAVIGATE
	const navigate = useNavigate();

	const onSubmit = useCallback(async (data) => {
		await axios
			.get(`http://64.251.10.84:8181/ords/charge/login/logim`, {
				params: {
					p_username: data.phone.replace("+", ""),
					p_password: data.password,
				},
			})
			.then((response) => {
				// SAVE THE USER PHONE NUMBER IN LOCAL STORAGE
				localStorage.setItem("userId", data.phone);

				const items = response.data.items;
				const responseObj = items[0];
				if (responseObj?.val > 0) {
					// LOGIN FLAGE 1 || 0 (1: TO MAIN PAGE, 0: TO CHANGE PASSWORD PAGE)
					const loginFlag = responseObj.login_flag;
					// SAVE THE LOGIN FLAG IN LOCAL STORAGE
					localStorage.setItem("loginFlag", responseObj.login_flag);
					localStorage.setItem("userName", data?.phone?.replace("+", ""));
					localStorage.setItem("isAuth", "true");
					// VALIDATION
					if (loginFlag === 0) {
						// NAVIGATE TO CHANGE PASSWORD PAGE
						navigate("/auth/change-password");
					} else {
						// NAVIGATE TO MAIN PAGE
						navigate("/");
					}
				} else {
					setError("phone", {
						type: "manual",
						message: "Invalid phone number or password",
					});
					setError("password", {
						type: "manual",
						message: "Invalid phone number or password",
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className={styles.body}>
			<div className={styles.floatingShape1}></div>
			<div className={styles.floatingShape2}></div>
			<div className={styles.floatingShape3}></div>
			<div className={styles.loginContainer}>
				<div className={styles.loginForm}>
					<div className={styles.logoContainer}>
						<img
							src="/logo.png"
							alt="Company Logo"
							className={styles.logo}
						/>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h1>Welcome Back 👋</h1>
						<p>
							A brand new day is here. It's your day to shape.
							Sign in and get started on your projects.
						</p>

						<div className={styles.formGroup}>
							<label htmlFor="phone">Phone Number</label>
							<input
								{...register("phone")}
								type="tel"
								id="phone"
								placeholder="20123456789"
							/>
							{errors.phone && (
								<span className={styles.errorMessage}>
									{errors.phone.message}
								</span>
							)}
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="password">Password</label>
							<input
								{...register("password")}
								type="password"
								id="password"
								placeholder="كلمة المرور"
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

						<button
							type="submit"
							className={styles.signinBtn}
							disabled={isSubmitting}
						>
							{isSubmitting ? <Spinner /> : "Sign in"}
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
