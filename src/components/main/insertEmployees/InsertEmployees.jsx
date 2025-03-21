import React, { useState, useRef, useEffect } from "react";
import styles from "./InsertEmployees.module.scss";
import useExcelReader from "../../../hooks/useExcelReader";
// REACT HOOK FORM
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "../../../schemas/employee-schema";
// CUSTOM COMPONENTS
import PhoneInput from "./PhoneInput";

const InsertEmployees = ({ onSubmit }) => {
	// Use React Hook Form with Zod validation
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(employeeSchema),
		mode: "onChange",
	});

	// State for password visibility
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	// State for country code
	const [countryCode, setCountryCode] = useState("+966");

	// Refs for file upload
	const fileInputRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploadStatus, setUploadStatus] = useState("");

	// Use the Excel reader hook
	const { data, loading, error, readExcelFile } = useExcelReader();

	// Handle form submission with React Hook Form
	const onFormSubmit = (data) => {
		console.log("Form submitted:", data);
		onSubmit?.(data);
		reset(); // Reset form after submission
	};

	// Handle file selection
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (
				file.type ===
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
				file.type === "application/vnd.ms-excel"
			) {
				setSelectedFile(file);
				setUploadStatus("File selected: " + file.name);
			} else {
				setUploadStatus("Please select an Excel file (.xlsx or .xls)");
				setSelectedFile(null);
			}
		}
	};

	// Handle file upload
	const handleFileUpload = () => {
		if (selectedFile) {
			// Use the Excel reader hook to read the file
			readExcelFile(selectedFile);
			setUploadStatus("Processing file...");
		} else {
			setUploadStatus("Please select a file first");
		}
	};

	// Effect to handle data changes from Excel reader
	useEffect(() => {
		if (data) {
			console.log("Excel data:", data);
			setUploadStatus("File processed successfully!");

			// Log the first sheet data for easier viewing
			const firstSheetName = Object.keys(data)[0];
			if (firstSheetName) {
				console.log(
					`First sheet (${firstSheetName}):`,
					data[firstSheetName]
				);
			}

			// Reset the file input after successful processing
			setTimeout(() => {
				setUploadStatus("");
				setSelectedFile(null);
			}, 3000);
		}
	}, [data]);

	// Effect to handle errors from Excel reader
	useEffect(() => {
		if (error) {
			console.error("Excel reading error:", error);
			setUploadStatus(`Error: ${error}`);
		}
	}, [error]);

	// Effect to update status when loading
	useEffect(() => {
		if (loading) {
			setUploadStatus("Reading file...");
		}
	}, [loading]);

	// Handle country code change
	const handleCountryCodeChange = (code) => {
		setCountryCode(code);
		console.log("Country code changed to:", code);
	};

	// Handle template download
	const handleDownloadTemplate = () => {
		// In a real application, this would download an actual Excel template
		// For now, we'll just simulate the download
		alert("Template download started");
		// You would typically use a link to download the file:
		// const link = document.createElement('a');
		// link.href = '/path/to/template.xlsx';
		// link.download = 'employee_template.xlsx';
		// document.body.appendChild(link);
		// link.click();
		// document.body.removeChild(link);
	};

	return (
		<div className={styles.container}>
			{/* Top section with bulk import options */}
			<div className={styles.topSection}>
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Bulk Employee Import</h2>

					{/* Template Download Section */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							Step 1: Download Template
						</h3>
						<p className={styles.sectionDescription}>
							Download our Excel template and fill it with
							employee information. This template includes all
							required fields for adding multiple employees at
							once.
						</p>
						<button
							className={styles.downloadButton}
							onClick={handleDownloadTemplate}
						>
							<svg
								className={styles.buttonIcon}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="7 10 12 15 17 10"></polyline>
								<line x1="12" y1="15" x2="12" y2="3"></line>
							</svg>
							Download Template
						</button>
					</div>

					{/* File Upload Section */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							Step 2: Upload Filled Template
						</h3>
						<p className={styles.sectionDescription}>
							Upload your completed Excel file with employee data.
							The system will process the file and add all
							employees to the database.
						</p>

						<div className={styles.uploadArea}>
							<div
								className={styles.dropZone}
								onClick={() => fileInputRef.current.click()}
							>
								<svg
									className={styles.uploadIcon}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line>
								</svg>
								<p>
									Click to select or drag and drop your file
									here
								</p>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileChange}
									accept=".xlsx,.xls"
									className={styles.fileInput}
								/>
							</div>

							{uploadStatus && (
								<div className={styles.uploadStatus}>
									{uploadStatus}
								</div>
							)}

							<button
								className={`${styles.uploadButton} ${
									!selectedFile || loading
										? styles.disabled
										: ""
								}`}
								onClick={handleFileUpload}
								disabled={!selectedFile || loading}
							>
								{loading ? (
									"Processing..."
								) : (
									<>
										<svg
											className={styles.buttonIcon}
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
											<polyline points="17 8 12 3 7 8"></polyline>
											<line
												x1="12"
												y1="3"
												x2="12"
												y2="15"
											></line>
										</svg>
										Upload File
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Manual Entry Form */}
			<div className={styles.bottomSection}>
				<div className={styles.formCard}>
					<div className={styles.formSection}>
						<h2 className={styles.formTitle}>
							Add Employee Manually
						</h2>
						<p className={styles.formDescription}>
							Use the form below to add a single employee to the
							system. All fields are required.
						</p>

						<form
							onSubmit={handleSubmit(onFormSubmit)}
							className={styles.form}
						>
							{/* Names Row */}
							<div className={styles.formRow}>
								<div className={styles.inputGroup}>
									<label
										htmlFor="fullNameEn"
										className={styles.inputLabel}
									>
										Full Name (English)
									</label>
									<div className={styles.inputWithIcon}>
										<svg
											className={styles.inputIcon}
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
											<circle
												cx="12"
												cy="7"
												r="4"
											></circle>
										</svg>
										<input
											{...register("fullNameEn")}
											type="text"
											id="fullNameEn"
											className={styles.inputField}
											placeholder="Enter full name in English"
										/>
									</div>
									{errors.fullNameEn && (
										<span className={styles.errorMessage}>
											{errors.fullNameEn.message}
										</span>
									)}
								</div>

								<div className={styles.inputGroup}>
									<label
										htmlFor="fullNameAr"
										className={styles.inputLabel}
									>
										Full Name (Arabic)
									</label>
									<div className={styles.inputWithIcon}>
										<svg
											className={styles.inputIcon}
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
											<circle
												cx="12"
												cy="7"
												r="4"
											></circle>
										</svg>
										<input
											{...register("fullNameAr")}
											type="text"
											id="fullNameAr"
											className={styles.inputField}
											placeholder="Enter full name in Arabic"
											dir="rtl"
										/>
									</div>
									{errors.fullNameAr && (
										<span className={styles.errorMessage}>
											{errors.fullNameAr.message}
										</span>
									)}
								</div>
							</div>

							{/* Email Row */}
							<div className={styles.inputGroup}>
								<label
									htmlFor="email"
									className={styles.inputLabel}
								>
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
										className={styles.inputField}
										placeholder="Enter email address"
									/>
								</div>
								{errors.email && (
									<span className={styles.errorMessage}>
										{errors.email.message}
									</span>
								)}
							</div>

							{/* Phone Row */}
							<div
								className={`${styles.inputGroup} ${styles.phoneInputGroup}`}
							>
								<label
									htmlFor="mobile"
									className={styles.inputLabel}
								>
									Mobile
								</label>
								<PhoneInput
									register={register}
									errors={errors}
									value={countryCode}
									onChange={handleCountryCodeChange}
								/>
								{errors.mobile && (
									<span className={styles.errorMessage}>
										{errors.mobile.message}
									</span>
								)}
							</div>

							{/* Password Fields */}
							<div className={styles.passwordFields}>
								<div className={styles.formRow}>
									<div className={styles.inputGroup}>
										<label
											htmlFor="password"
											className={styles.inputLabel}
										>
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
												type={
													isPasswordVisible
														? "text"
														: "password"
												}
												id="password"
												className={styles.inputField}
												placeholder="Enter password"
											/>
											<button
												type="button"
												className={
													styles.passwordToggle
												}
												onClick={() =>
													setIsPasswordVisible(
														!isPasswordVisible
													)
												}
											>
												{isPasswordVisible ? (
													<svg
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
														<circle
															cx="12"
															cy="12"
															r="3"
														></circle>
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
											<span
												className={styles.errorMessage}
											>
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
												type={
													isConfirmPasswordVisible
														? "text"
														: "password"
												}
												id="confirmPassword"
												className={styles.inputField}
												placeholder="Confirm password"
											/>
											<button
												type="button"
												className={
													styles.passwordToggle
												}
												onClick={() =>
													setIsConfirmPasswordVisible(
														!isConfirmPasswordVisible
													)
												}
											>
												{isConfirmPasswordVisible ? (
													<svg
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
														<circle
															cx="12"
															cy="12"
															r="3"
														></circle>
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
										{errors.confirmPassword && (
											<span
												className={styles.errorMessage}
											>
												{errors.confirmPassword.message}
											</span>
										)}
									</div>
								</div>
							</div>

							<div className={styles.buttonContainer}>
								<button
									type="submit"
									className={styles.submitButton}
								>
									Add Employee
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InsertEmployees;
