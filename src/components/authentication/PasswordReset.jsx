import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import passwordSchema from "../../schemas/change-password-schema";
import styles from "./PasswordReset.module.scss";
import axios from "axios";
// REACT ROUTER
import { useNavigate } from "react-router";

// SPINNER
import Spinner from "../shared/Spinner";

const PasswordReset = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// REACT ROUTER
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(passwordSchema),
		mode: "onChange",
	});

	const onSubmit = (data) => {
		// Here you would normally submit to a server
		console.log("Form submitted:", data);

		// GET THE USER ID FROM THE LOCAL STORAGE
		const userId = localStorage.getItem("userId");

		// VALIDATE THE USER ID
		if (!userId) {
			console.error("User ID not found");
			return;
		}

		// SET IS SUBMITTING TO TRUE
		setIsSubmitting(true);

		// AXIOS PUT REQUEST
		axios
			.put(
				"http://64.251.10.84:8181/ords/charge/change_password/change_password",
				{},
				{
					params: {
						p_username: userId,
						p_pass: data?.newPassword,
					},
				}
			)
			.then(() => {
				// SET IS SUBMITTING TO FALSE
				setIsSubmitting(false);
				// SET IS SUBMITTED TO TRUE
				setIsSubmitted(true);
				// REDIRECT TO THE HOME PAGE
				navigate("/");
			})
			.catch((error) => {
				// SET IS SUBMITTING TO FALSE
				setIsSubmitting(false);

				console.error("Error updating password", error);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.illustration}>
					<img
						src={"/undraw_version-control_e4yu.svg"}
						alt="Password Reset Illustration"
					/>
				</div>
				<h1 className={styles.title}>Reset Password</h1>

				{isSubmitted ? (
					<div className={styles.successMessage}>
						<h2>Password Reset Successful!</h2>
						<p>
							Your password has been updated. You will be
							redirected to the login page.
						</p>
					</div>
				) : (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={styles.form}
					>
						<div className={styles.formGroup}>
							<label htmlFor="newPassword">NEW PASSWORD</label>
							<input
								type="password"
								id="newPassword"
								placeholder="Enter your new password"
								{...register("newPassword")}
								className={
									errors.newPassword ? styles.inputError : ""
								}
							/>
							{errors.newPassword && (
								<p className={styles.errorMessage}>
									{errors.newPassword.message}
								</p>
							)}
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="confirmPassword">
								CONFIRM NEW PASSWORD
							</label>
							<input
								type="password"
								id="confirmPassword"
								{...register("confirmPassword")}
								className={
									errors.confirmPassword
										? styles.inputError
										: ""
								}
							/>
							{errors.confirmPassword && (
								<p className={styles.errorMessage}>
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className={styles.btnSubmit}
							disabled={isSubmitting}
						>
							{isSubmitting ? <Spinner /> : "RESET PASSWORD"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default PasswordReset;
