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

	return (
		<div className={styles.body}>
			<div className={styles.loginContainer}>
				<div className={styles.loginForm}>
					{step === "phone" && (
						<form onSubmit={handlePhoneSubmit(onPhoneSubmit)}>
							<h1>Reset Password 🔐</h1>
							<p>
								Enter your phone number to receive a
								verification code.
							</p>

							<div className={styles.formGroup}>
								<label htmlFor="phone">Phone Number</label>
								<input
									{...registerPhone("phone")}
									type="tel"
									id="phone"
									placeholder="+201234567890"
								/>
								{phoneErrors.phone && (
									<span className={styles.errorMessage}>
										{phoneErrors.phone.message}
									</span>
								)}
							</div>

							<button type="submit" className={styles.signinBtn}>
								Send Code
							</button>

							<div className={styles.signupLink}>
								Remember your password?{" "}
								<Link to="/auth/login">Sign in</Link>
							</div>
						</form>
					)}

					{step === "reset" && (
						<form onSubmit={handlePasswordSubmit(onResetSubmit)}>
							<h1>Create New Password 🔐</h1>
							<p>Enter your new password below.</p>

							<div className={styles.formGroup}>
								<label htmlFor="password">New Password</label>
								<input
									{...registerPassword("password")}
									type="password"
									id="password"
									placeholder="Enter new password"
								/>
								{passwordErrors.password && (
									<span className={styles.errorMessage}>
										{passwordErrors.password.message}
									</span>
								)}
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="confirmPassword">
									Confirm Password
								</label>
								<input
									{...registerPassword("confirmPassword")}
									type="password"
									id="confirmPassword"
									placeholder="Confirm new password"
								/>
								{passwordErrors.confirmPassword && (
									<span className={styles.errorMessage}>
										{passwordErrors.confirmPassword.message}
									</span>
								)}
							</div>

							<button type="submit" className={styles.signinBtn}>
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
