// SignupPage.jsx
import React, { useState, useCallback } from "react";
import styles from "./SignupPage.module.scss";

// REACT HOOK FORM
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/signup-schema";
// APIS AND ROUTER
import { Link, useNavigate } from "react-router";
// UTILS
import { generateVerificationCode } from "../../utils/generateCode";
import { sendWhatsappMessage } from "../../utils/sendWhatsappMessage";
// COMPONENTS
import VerificationDialog from "./VerificationDialog";
import Spinner from "../shared/Spinner";
import PhoneInput from "../shared/PhoneInput/PhoneInput";

const SignupPage = () => {
	// NAVIGATION
	const navigate = useNavigate();

	const [countryCode, setCountryCode] = useState("+966");
	const [currentStep, setCurrentStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		trigger,
		reset,
		setError,
	} = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			type: "individual",
		},
		mode: "onChange",
	});

	const selectedType = watch("type");

	const handleNext = async () => {
		const fieldsToValidate = ["type", "phone"];
		if (selectedType === "company") {
			fieldsToValidate.push("companyNameEn", "companyNameAr");
		} else {
			fieldsToValidate.push("fullNameEn", "fullNameAr");
		}

		// VALIDATE THE COUNTRY CODE
		if (!countryCode) {
			setError("phone", {
				type: "manual",
				message: "Please select a country code",
			});
		}

		const isStepValid = await trigger(fieldsToValidate);
		if (isStepValid) {
			setCurrentStep(2);
		}
	};

	const [showVerification, setShowVerification] = useState(false);
	const [formData, setFormData] = useState(null);

	const onSubmitForm = async (data) => {
		setFormData(data);
		if (currentStep === 2) {
			handleGeneratingCodeAndSendToWhatsapp(data);
		}
	};

	const getStepClass = (step) => {
		if (step === currentStep) return styles.active;
		if (step < currentStep) return styles.completed;
		return "";
	};

	// HANDLER FOR FORM SUBMISSION
	const handleGeneratingCodeAndSendToWhatsapp = useCallback(
		(data) => {
			console.log("Generating code and sending to WhatsApp", data);
			const code = generateVerificationCode();
			localStorage.setItem("verificationCode", code);
			setShowVerification(true);

			// PHONE WITH COUNTRY CODE
			const countryPhone = `${countryCode}${data.phone.replace("+", "")}`;
			console.log("Country phone:", countryPhone);

			// SEND CODE TO WHATSAPP
			sendWhatsappMessage(
				countryPhone,
				`Your verification code is: ${code}`
			);
		},
		[countryCode]
	);
	const handleSigningupUser = useCallback(
		(data) => {
			const phoneNumberForWhatsapp = data.phone;
			const passwordToBeSent = data.password;
			const body = {
				EMAIL: data.email,
				MOBILE: `${countryCode}${data.phone.replace("+", "")}`,
				IS_ACTIVE: "1",
			};

			if (data.type === "company") {
				body.COMPANY_NAME_EN = data.companyNameEn;
				body.COMPANY_NAME_AR = data.companyNameAr;
				body.USER_PASSWORD = data.password;
			}
			if (data.type === "individual") {
				body.CUSTOMER_NAME_EN = data.fullNameEn;
				body.CUSTOMER_NAME_AR = data.fullNameAr;
				body.CUSTOMER_PASSWORD = data.password;
				body.CREATED_USER = "test";
				body.COMPANY_ID = "";
			}

			// SET THE LOADING STATE
			setIsSubmitting(true);

			fetch(
				`http://64.251.10.84:8181/ords/charge/api/post_cmp_cust?p_type=${
					data.type === "individual" ? 1 : 2
				}`,
				{
					method: "POST",
					body: JSON.stringify({
						p_json: body,
					}),
				}
			)
				.then((response) => response.json())
				.then(() => {
					// COUNTRY PHONE
					const countryPhone = `${countryCode}${phoneNumberForWhatsapp.replace(
						"+",
						""
					)}`;

					console.log("countryPhone", countryPhone);

					// SEND SUCCESS MESSAGE TO USER VIA WHATSAPP TO CONGRATULATE AND SEND THE USER PHONE AS USERNAME AND THE PASSWORD
					sendWhatsappMessage(
						countryPhone,
						`Congratulations! Your account has been created successfully. Your username is your phone number and your password is ${passwordToBeSent}.`
					);

					// RESET THE LOADING STATE
					setIsSubmitting(false);

					// CLEAR FORM DATA
					setFormData(null);
					// CLEAR ERACT HOOK FORM
					setCurrentStep(1);
					reset();
					// NAVIGATE TO LOGIN PAGE
					navigate("/auth/login");
				})
				.catch((error) => {
					console.error("Error:", error);
					// RESET THE LOADING STATE
					setIsSubmitting(false);
				});
		},
		[navigate, reset, countryCode]
	);

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
				// Reset verification code state
				const verificationDialog = document.querySelector(
					`.${styles.dialog}`
				);
				if (verificationDialog) {
					const inputs =
						verificationDialog.querySelectorAll(
							'input[type="text"]'
						);
					inputs.forEach((input) => (input.value = ""));
				}

				// HANDLE SIGNING UP USER
				console.log(formData);
				handleSigningupUser(formData);
			} else {
				// Invalid code
				console.log("Invalid verification code");
			}
		},
		[formData, handleSigningupUser]
	);

	const handleResend = useCallback(() => {
		handleGeneratingCodeAndSendToWhatsapp(formData);
	}, [formData, handleGeneratingCodeAndSendToWhatsapp]);

	// HANDLE COUNTRY CODE CHANGE
	const handleCountryCode = useCallback((code) => {
		// Update the country code state
		setCountryCode(code);
		// Log the change
		console.log("Country code changed to:", code);
	}, []);

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
							phone={`${countryCode}${formData?.phone}`}
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

							{selectedType === "company" ? (
								<>
									<div className={styles.formRow}>
										<div className={styles.formGroup}>
											<label htmlFor="companyNameEn">
												Company Name (English)
											</label>
											<input
												{...register("companyNameEn")}
												type="text"
												id="companyNameEn"
												placeholder="Enter company name in English"
											/>
											{errors.companyNameEn && (
												<span
													className={
														styles.errorMessage
													}
												>
													{
														errors.companyNameEn
															.message
													}
												</span>
											)}
										</div>

										<div className={styles.formGroup}>
											<label htmlFor="companyNameAr">
												Company Name (Arabic)
											</label>
											<input
												{...register("companyNameAr")}
												type="text"
												id="companyNameAr"
												placeholder="Enter company name in Arabic"
												dir="rtl"
											/>
											{errors.companyNameAr && (
												<span
													className={
														styles.errorMessage
													}
												>
													{
														errors.companyNameAr
															.message
													}
												</span>
											)}
										</div>
									</div>
								</>
							) : (
								<>
									<div className={styles.formRow}>
										<div className={styles.formGroup}>
											<label htmlFor="fullNameEn">
												Full Name (English)
											</label>
											<input
												{...register("fullNameEn")}
												type="text"
												id="fullNameEn"
												placeholder="Enter your full name in English"
											/>
											{errors.fullNameEn && (
												<span
													className={
														styles.errorMessage
													}
												>
													{errors.fullNameEn.message}
												</span>
											)}
										</div>

										<div className={styles.formGroup}>
											<label htmlFor="fullNameAr">
												Full Name (Arabic)
											</label>
											<input
												{...register("fullNameAr")}
												type="text"
												id="fullNameAr"
												placeholder="Enter your full name in Arabic"
												dir="rtl"
											/>
											{errors.fullNameAr && (
												<span
													className={
														styles.errorMessage
													}
												>
													{errors.fullNameAr.message}
												</span>
											)}
										</div>
									</div>
								</>
							)}

							<div className={styles.formGroup}>
								<label htmlFor="phone">Phone Number</label>
								<PhoneInput
									register={register}
									errors={errors}
									setCountryCodeAtParent={handleCountryCode}
									countryCode={countryCode}
								/>
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
									disabled={isSubmitting}
								>
									{isSubmitting ? <Spinner /> : "Sign up"}
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
