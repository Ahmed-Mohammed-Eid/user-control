import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import styles from "../../components/authentication/LoginPage.module.scss";
import VerificationDialog from "../../components/authentication/VerificationDialog";
import { generateVerificationCode } from "../../utils/generateCode";
import { sendWhatsappMessage } from "../../utils/sendWhatsappMessage";
import {
	resetPasswordPhoneSchema,
	resetPasswordSchema,
} from "../../schemas/reset-password-schema";
import axios from "axios";

// Import the Inter font
import "../../styles/fonts.css";

const ResetPassword = () => {
	const [step, setStep] = useState("phone"); // phone, verification, reset
	const [phone, setPhone] = useState("");
	const [showVerification, setShowVerification] = useState(false);

	// ROUTER
	const navigate = useNavigate();

	const {
		register: registerPhone,
		handleSubmit: handlePhoneSubmit,
		formState: { errors: phoneErrors },
	} = useForm({
		resolver: zodResolver(resetPasswordPhoneSchema),
		mode: "onChange",
	});

	const {
		register: registerPassword,
		handleSubmit: handlePasswordSubmit,
		formState: { errors: passwordErrors },
	} = useForm({
		resolver: zodResolver(resetPasswordSchema),
		mode: "onChange",
	});

	const onPhoneSubmit = (data) => {
		console.log("Phone number submitted", data);
		setPhone(data.phone);
		const code = generateVerificationCode();
		sendWhatsappMessage(data.phone, `Your verification code is: ${code}`);

		// SAVE DATA TO LOCAL STORAGE
		// #1) Save the phone number
		localStorage.setItem("resetPasswordPhone", data.phone);
		// #2) Save the verification code
		localStorage.setItem("resetPasswordCode", code);

		// Move to the next step
		setShowVerification(true);
	};

	const handleVerify = useCallback((enteredCode) => {
		const savedCode = localStorage.getItem("resetPasswordCode");
		if (enteredCode === savedCode) {
			localStorage.removeItem("resetPasswordCode");
			setShowVerification(false);
			setStep("reset");
		} else {
			console.log("Invalid verification code");
		}
	}, []);

	const handleResend = useCallback(() => {
		const code = generateVerificationCode();
		localStorage.setItem("resetPasswordCode", code);
		sendWhatsappMessage(
			phone,
			`Your verification code to reset your password is: ${code}`
		);
	}, [phone]);

	const onResetSubmit = (data) => {
		console.log("Password reset successful", data);
		// Here you would typically make an API call to update the password
		axios
			.put(
				"http://64.251.10.84:8181/ords/charge/change_password/change_password",
				{},
				{
					params: {
						p_username: phone.replace("+", ""),
						p_pass: data.password,
					},
				}
			)
			.then((response) => {
				console.log(response);

				// Clear the phone number from local storage
				localStorage.removeItem("resetPasswordPhone");
				// CLEAR THE  CODE FROM LOCAL STORAGE
				localStorage.removeItem("resetPasswordCode");
				// Redirect to the login page
				navigate("/auth/login");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const customStyles = {
		fontFamily:
			"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	};

	return (
		<div className={styles.body} style={customStyles}>
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

					{step === "phone" && (
						<form onSubmit={handlePhoneSubmit(onPhoneSubmit)}>
							<h1
								style={{
									fontWeight: 700,
									letterSpacing: "-0.5px",
								}}
							>
								Reset Password 🔐
							</h1>
							<p>
								Enter your phone number to receive a
								verification code.
							</p>

							<div className={styles.formGroup}>
								<label
									htmlFor="phone"
									style={{
										fontWeight: 500,
										letterSpacing: "0.3px",
									}}
								>
									Phone Number
								</label>
								<input
									{...registerPhone("phone")}
									type="tel"
									id="phone"
									placeholder="+201234567890"
									style={{ fontFamily: "inherit" }}
								/>
								{phoneErrors.phone && (
									<span
										className={styles.errorMessage}
										style={{ fontWeight: 500 }}
									>
										{phoneErrors.phone.message}
									</span>
								)}
							</div>

							<button
								type="submit"
								className={styles.signinBtn}
								style={{
									fontWeight: 600,
									fontFamily: "inherit",
								}}
							>
								Send Code
							</button>

							<div className={styles.signupLink}>
								Remember your password?{" "}
								<Link
									to="/auth/login"
									style={{ fontWeight: 600 }}
								>
									Sign in
								</Link>
							</div>
						</form>
					)}

					{step === "reset" && (
						<form onSubmit={handlePasswordSubmit(onResetSubmit)}>
							<h1
								style={{
									fontWeight: 700,
									letterSpacing: "-0.5px",
								}}
							>
								Create New Password 🔐
							</h1>
							<p>Enter your new password below.</p>

							<div className={styles.formGroup}>
								<label
									htmlFor="password"
									style={{
										fontWeight: 500,
										letterSpacing: "0.3px",
									}}
								>
									New Password
								</label>
								<input
									{...registerPassword("password")}
									type="password"
									id="password"
									placeholder="Enter new password"
									style={{ fontFamily: "inherit" }}
								/>
								{passwordErrors.password && (
									<span
										className={styles.errorMessage}
										style={{ fontWeight: 500 }}
									>
										{passwordErrors.password.message}
									</span>
								)}
							</div>

							<div className={styles.formGroup}>
								<label
									htmlFor="confirmPassword"
									style={{
										fontWeight: 500,
										letterSpacing: "0.3px",
									}}
								>
									Confirm Password
								</label>
								<input
									{...registerPassword("confirmPassword")}
									type="password"
									id="confirmPassword"
									placeholder="Confirm new password"
									style={{ fontFamily: "inherit" }}
								/>
								{passwordErrors.confirmPassword && (
									<span
										className={styles.errorMessage}
										style={{ fontWeight: 500 }}
									>
										{passwordErrors.confirmPassword.message}
									</span>
								)}
							</div>

							<button
								type="submit"
								className={styles.signinBtn}
								style={{
									fontWeight: 600,
									fontFamily: "inherit",
								}}
							>
								Reset Password
							</button>
						</form>
					)}

					<VerificationDialog
						isOpen={showVerification}
						onClose={() => setShowVerification(false)}
						onVerify={handleVerify}
						onResend={handleResend}
						phone={phone}
					/>

					<div className={styles.copyright}>
						© 2025 ALL RIGHTS RESERVED
					</div>
				</div>
				<div className={styles.loginImage}></div>
			</div>
		</div>
	);
};

export default ResetPassword;
