import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import styles from "../../components/authentication/LoginPage.module.scss";
import VerificationDialog from "../../components/authentication/VerificationDialog";
import { generateVerificationCode } from "../../utils/generateCode";
import {
	resetPasswordPhoneSchema,
	resetPasswordSchema,
} from "../../schemas/reset-password-schema";

const ResetPassword = () => {
	const [step, setStep] = useState("phone"); // phone, verification, reset
	const [phone, setPhone] = useState("");
	const [showVerification, setShowVerification] = useState(false);

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
		setPhone(data.phone);
		const code = generateVerificationCode();
		localStorage.setItem("resetPasswordCode", code);
		console.log("WhatsApp Message would be sent with code:", code);
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
		console.log("Resending code:", code);
	}, []);

	const onResetSubmit = (data) => {
		console.log("Password reset successful", data);
		// Here you would typically make an API call to update the password
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
