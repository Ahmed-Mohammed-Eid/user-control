// SignupPage.jsx
import React, { useState, useCallback } from "react";
import styles from "./SignupPage.module.scss";

// REACT HOOK FORM
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/signup-schema";
import { Link } from "react-router";
import { generateVerificationCode } from "../../utils/generateCode";
import VerificationDialog from "./VerificationDialog";

const SignupPage = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		trigger,
	} = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			type: "individual",
		},
		mode: "onChange",
	});

	const selectedType = watch("type");

	const handleNext = async () => {
		const isStepValid = await trigger([
			"type",
			"companyName",
			"firstName",
			"lastName",
			"phone",
		]);
		if (isStepValid) {
			setCurrentStep(2);
		}
	};

	const [showVerification, setShowVerification] = useState(false);
	const [formData, setFormData] = useState(null);

	const onSubmitForm = async (data) => {
		setFormData(data);
		const code = generateVerificationCode();
		localStorage.setItem("verificationCode", code);
		console.log("WhatsApp Message would be sent with code:", code);
		setShowVerification(true);
	};

	const handleVerify = useCallback(
		(enteredCode) => {
			const savedCode = localStorage.getItem("verificationCode");
			if (enteredCode === savedCode) {
				// Code is valid, proceed with signup
				console.log(
					"Verification successful, submitting data:",
					formData
				);
				localStorage.removeItem("verificationCode");
				setShowVerification(false);
			} else {
				// Invalid code
				console.log("Invalid verification code");
			}
		},
		[formData]
	);

	const handleResend = useCallback(() => {
		const code = generateVerificationCode();
		localStorage.setItem("verificationCode", code);
		console.log("Resending code:", code);
	}, []);

	const getStepClass = (step) => {
		if (step === currentStep) return styles.active;
		if (step < currentStep) return styles.completed;
		return "";
	};

	return (
		<div className={styles.body}>
			<div className={styles.loginContainer}>
				<div className={styles.loginForm}>
					<form onSubmit={handleSubmit(onSubmitForm)}>
						<h1>Create Account 🚀</h1>
						<p>
							Join us today and take control of your business.
							Fill in your details to get started.
						</p>

						<div className={styles.stepper}>
							<div className={styles.step}>
								<div
									className={`${
										styles.stepNumber
									} ${getStepClass(1)}`}
								>
									1
								</div>
								<span
									className={`${
										styles.stepLabel
									} ${getStepClass(1)}`}
								>
									User Info
								</span>
							</div>
							<div className={styles.step}>
								<div
									className={`${
										styles.stepNumber
									} ${getStepClass(2)}`}
								>
									2
								</div>
								<span
									className={`${
										styles.stepLabel
									} ${getStepClass(2)}`}
								>
									Auth Info
								</span>
							</div>
						</div>

						<VerificationDialog
							isOpen={showVerification}
							onClose={() => setShowVerification(false)}
							onVerify={handleVerify}
							onResend={handleResend}
							phone={formData?.phone}
						/>

						<div
							className={`${styles.formStep} ${
								currentStep === 1 ? styles.active : ""
							}`}
						>
							<div className={styles.formGroup}>
								<label>Account Type</label>
								<div
									style={{
										display: "flex",
										gap: "10px",
										marginBottom: "10px",
									}}
								>
									<label
										style={{
											flex: 1,
											padding: "10px",
											border: "1px solid #ddd",
											borderRadius: "6px",
											cursor: "pointer",
											backgroundColor:
												selectedType === "individual"
													? "#625290"
													: "white",
											color:
												selectedType === "individual"
													? "white"
													: "#333",
										}}
									>
										<input
											{...register("type")}
											type="radio"
											value="individual"
											style={{ display: "none" }}
										/>
										Individual
									</label>
									<label
										style={{
											flex: 1,
											padding: "10px",
											border: "1px solid #ddd",
											borderRadius: "6px",
											cursor: "pointer",
											backgroundColor:
												selectedType === "company"
													? "#625290"
													: "white",
											color:
												selectedType === "company"
													? "white"
													: "#333",
										}}
									>
										<input
											{...register("type")}
											type="radio"
											value="company"
											style={{ display: "none" }}
										/>
										Company
									</label>
								</div>
								{errors.type && (
									<span className={styles.errorMessage}>
										{errors.type.message}
									</span>
								)}
							</div>

							{selectedType === "company" && (
								<div className={styles.formGroup}>
									<label htmlFor="companyName">
										Company Name
									</label>
									<input
										{...register("companyName")}
										type="text"
										id="companyName"
										placeholder="Enter company name"
									/>
									{errors.companyName && (
										<span className={styles.errorMessage}>
											{errors.companyName.message}
										</span>
									)}
								</div>
							)}

							<div className={styles.formRow}>
								<div className={styles.formGroup}>
									<label htmlFor="firstName">
										First Name
									</label>
									<input
										{...register("firstName")}
										type="text"
										id="firstName"
										placeholder="Enter your first name"
									/>
									{errors.firstName && (
										<span className={styles.errorMessage}>
											{errors.firstName.message}
										</span>
									)}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="lastName">Last Name</label>
									<input
										{...register("lastName")}
										type="text"
										id="lastName"
										placeholder="Enter your last name"
									/>
									{errors.lastName && (
										<span className={styles.errorMessage}>
											{errors.lastName.message}
										</span>
									)}
								</div>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="phone">Phone Number</label>
								<input
									{...register("phone")}
									type="tel"
									id="phone"
									placeholder="+201234567890"
								/>
								{errors.phone && (
									<span className={styles.errorMessage}>
										{errors.phone.message}
									</span>
								)}
							</div>

							<button
								type="button"
								className={styles.signinBtn}
								onClick={handleNext}
							>
								Next
							</button>
						</div>

						<div
							className={`${styles.formStep} ${
								currentStep === 2 ? styles.active : ""
							}`}
						>
							<div className={styles.formGroup}>
								<label htmlFor="email">Email</label>
								<input
									{...register("email")}
									type="email"
									id="email"
									placeholder="example@email.com"
								/>
								{errors.email && (
									<span className={styles.errorMessage}>
										{errors.email.message}
									</span>
								)}
							</div>

							<div className={styles.formRow}>
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

								<div className={styles.formGroup}>
									<label htmlFor="confirmPassword">
										Confirm Password
									</label>
									<input
										{...register("confirmPassword")}
										type="password"
										id="confirmPassword"
										placeholder="Confirm your password"
									/>
									{errors.confirmPassword && (
										<span className={styles.errorMessage}>
											{errors.confirmPassword.message}
										</span>
									)}
								</div>
							</div>

							<div style={{ display: "flex", gap: "10px" }}>
								<button
									type="button"
									className={styles.signinBtn}
									onClick={() => setCurrentStep(1)}
									style={{ flex: 1 }}
								>
									Back
								</button>
								<button
									type="submit"
									className={styles.signinBtn}
									style={{ flex: 1 }}
								>
									Create Account
								</button>
							</div>
						</div>

						<div className={styles.signupLink}>
							Already have an account?{" "}
							<Link to="/auth/login">Sign in</Link>
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

export default SignupPage;
