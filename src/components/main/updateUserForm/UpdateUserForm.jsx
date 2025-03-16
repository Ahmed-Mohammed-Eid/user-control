import React, { useCallback, useState } from "react";
import styles from "./UpdateUserForm.module.scss";
// REACT HOOK FORM
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../../schemas/update-user-schema";

// NAVIGATE
import { useNavigate } from "react-router";

const UpdateUserForm = ({
	initialData = {
		firstName: "Rene",
		lastName: "Xavier",
		email: "rene.xavier@example.com",
		phoneNumber: "+1 (555) 123-4567",
		profileImage: "/api/placeholder/90/90",
	},
	onSubmit,
}) => {
	// NAVIGATE
	const navigate = useNavigate();

	// Use React Hook Form with Zod validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(updateUserSchema),
		defaultValues: initialData,
		mode: "onChange",
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// Handle form submission with React Hook Form
	const onFormSubmit = (data) => {
		console.log("Form submitted:", data);
		onSubmit?.(data);
	};

	// CANCEL
	const onCancel = useCallback(() => {
		navigate("/");
	}, [navigate]);

	return (
		<div className={styles.formCard}>
			<div className={styles.profileSection}>
				<div className={styles.profileImageContainer}>
					<div className={styles.profileImageWrapper}>
						<img
							className={styles.profileImage}
							src={initialData.profileImage}
							alt="Profile picture"
						/>
					</div>
					<div className={styles.editOverlay}>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="currentColor"
						>
							<path
								d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>

				<h2 className={styles.formTitle}>Update Profile</h2>

				<form
					onSubmit={handleSubmit(onFormSubmit)}
					className={styles.form}
				>
					<div className={styles.formRow}>
						<div className={styles.inputGroup}>
							<label
								htmlFor="firstName"
								className={styles.inputLabel}
							>
								First Name
							</label>
							<div className={styles.inputWithIcon}>
								<svg
									className={styles.inputIcon}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</svg>
								<input
									{...register("firstName")}
									type="text"
									id="firstName"
									className={`${styles.inputField} ${
										errors.firstName ? styles.error : ""
									}`}
								/>
							</div>
							{errors.firstName && (
								<span className={styles.errorMessage}>
									{errors.firstName.message}
								</span>
							)}
						</div>

						<div className={styles.inputGroup}>
							<label
								htmlFor="lastName"
								className={styles.inputLabel}
							>
								Last Name
							</label>
							<div className={styles.inputWithIcon}>
								<svg
									className={styles.inputIcon}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</svg>
								<input
									{...register("lastName")}
									type="text"
									id="lastName"
									className={`${styles.inputField} ${
										errors.lastName ? styles.error : ""
									}`}
								/>
							</div>
							{errors.lastName && (
								<span className={styles.errorMessage}>
									{errors.lastName.message}
								</span>
							)}
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor="email" className={styles.inputLabel}>
							Email
						</label>
						<div className={styles.inputWithIcon}>
							<svg
								className={styles.inputIcon}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
								<polyline points="22,6 12,13 2,6"></polyline>
							</svg>
							<input
								{...register("email")}
								type="email"
								id="email"
								className={`${styles.inputField} ${
									errors.email ? styles.error : ""
								}`}
							/>
						</div>
						{errors.email && (
							<span className={styles.errorMessage}>
								{errors.email.message}
							</span>
						)}
					</div>

					<div className={styles.inputGroup}>
						<label
							htmlFor="phoneNumber"
							className={styles.inputLabel}
						>
							Phone Number
						</label>
						<div className={styles.inputWithIcon}>
							<svg
								className={styles.inputIcon}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
							</svg>
							<input
								{...register("phoneNumber")}
								type="tel"
								id="phoneNumber"
								className={`${styles.inputField} ${
									errors.phoneNumber ? styles.error : ""
								}`}
							/>
						</div>
						{errors.phoneNumber && (
							<span className={styles.errorMessage}>
								{errors.phoneNumber.message}
							</span>
						)}
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor="password" className={styles.inputLabel}>
							Password
						</label>
						<div className={styles.inputWithIcon}>
							<svg
								className={styles.inputIcon}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="3"
									y="11"
									width="18"
									height="11"
									rx="2"
									ry="2"
								></rect>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
							</svg>
							<input
								{...register("password")}
								type={isPasswordVisible ? "text" : "password"}
								id="password"
								className={`${styles.inputField} ${
									errors.password ? styles.error : ""
								}`}
								placeholder="Leave blank to keep current password"
							/>
							<button
								type="button"
								className={styles.passwordToggle}
								onClick={() =>
									setIsPasswordVisible(!isPasswordVisible)
								}
							>
								{isPasswordVisible ? (
									<svg
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
										<circle cx="12" cy="12" r="3"></circle>
									</svg>
								) : (
									<svg
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
										<line
											x1="1"
											y1="1"
											x2="23"
											y2="23"
										></line>
									</svg>
								)}
							</button>
						</div>
						{errors.password && (
							<span className={styles.errorMessage}>
								{errors.password.message}
							</span>
						)}
					</div>

					<div className={styles.inputGroup}>
						<label
							htmlFor="confirmPassword"
							className={styles.inputLabel}
						>
							Confirm Password
						</label>
						<div className={styles.inputWithIcon}>
							<svg
								className={styles.inputIcon}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="3"
									y="11"
									width="18"
									height="11"
									rx="2"
									ry="2"
								></rect>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
							</svg>
							<input
								{...register("confirmPassword")}
								type={isPasswordVisible ? "text" : "password"}
								id="confirmPassword"
								className={`${styles.inputField} ${
									errors.confirmPassword ? styles.error : ""
								}`}
								placeholder="Leave blank to keep current password"
							/>
						</div>
						{errors.confirmPassword && (
							<span className={styles.errorMessage}>
								{errors.confirmPassword.message}
							</span>
						)}
					</div>

					<div className={styles.actionButtons}>
						<button
							type="button"
							className={styles.cancelButton}
							onClick={onCancel}
						>
							<svg
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
							Cancel
						</button>
						<button type="submit" className={styles.saveButton}>
							<svg
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
								<polyline points="17 21 17 13 7 13 7 21"></polyline>
								<polyline points="7 3 7 8 15 8"></polyline>
							</svg>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateUserForm;
