// PaymentForm.jsx
import React, { useState } from "react";
import styles from "./Recharge.module.scss";
// Import fonts
import "../../../styles/fonts.css";

const Recharge = () => {
	const [cardDetails, setCardDetails] = useState({
		cardHolder: "",
		cardNumber: "",
		expiry: "",
		cvv: "",
	});

	const handleCardHolderChange = (e) => {
		const value = e.target.value;
		setCardDetails((prev) => ({ ...prev, cardHolder: value }));
	};

	const handleCardNumberChange = (e) => {
		let value = e.target.value.replace(/\D/g, "");
		if (value.length > 16) value = value.slice(0, 16);
		const parts = value.match(/.{1,4}/g) || [];
		const formatted = parts.join(" ");
		setCardDetails((prev) => ({ ...prev, cardNumber: formatted }));
	};

	const handleExpiryChange = (e) => {
		let value = e.target.value.replace(/\D/g, "");
		if (value.length > 4) value = value.slice(0, 4);
		let formatted = value;
		if (value.length > 2) {
			formatted = value.slice(0, 2) + "/" + value.slice(2);
		}
		setCardDetails((prev) => ({ ...prev, expiry: formatted }));
	};

	const handleCvvChange = (e) => {
		let value = e.target.value.replace(/\D/g, "");
		if (value.length > 3) value = value.slice(0, 3);
		setCardDetails((prev) => ({ ...prev, cvv: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your payment processing logic here
		console.log("Payment submitted:", cardDetails);
	};

	return (
		<div className={styles.container}>
			<div className={styles.paymentCard}>
				{/* Header */}
				<div className={styles.header}>
					<h2 className={styles.title}>Payment Details</h2>
					<p className={styles.subtitle}>
						Complete your purchase securely
					</p>
				</div>

				{/* Card Preview */}
				<div
					className={`${styles.cardPreview} ${styles.floatAnimation}`}
				>
					<div className={styles.cardLogo}>
						<svg
							className={styles.cardIcon}
							viewBox="0 0 48 48"
							fill="none"
						>
							<path
								d="M45 35c0 2.209-1.791 4-4 4H7c-2.209 0-4-1.791-4-4V13c0-2.209 1.791-4 4-4h34c2.209 0 4 1.791 4 4v22z"
								fill="#ffffff"
							/>
						</svg>
					</div>
					<div className={styles.cardDetails}>
						<div className={styles.cardNumber}>
							{cardDetails.cardNumber || "•••• •••• •••• ••••"}
						</div>
						<div className={styles.cardMeta}>
							<div>
								<div className={styles.cardLabel}>
									Card Holder
								</div>
								<div className={styles.cardValue}>
									{cardDetails.cardHolder || "YOUR NAME"}
								</div>
							</div>
							<div>
								<div className={styles.cardLabel}>Expires</div>
								<div className={styles.cardValue}>
									{cardDetails.expiry || "MM/YY"}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Payment Form */}
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<input
							type="text"
							id="cardHolder"
							className={styles.cardInput}
							placeholder="Card Holder Name"
							value={cardDetails.cardHolder}
							onChange={handleCardHolderChange}
							required
						/>
						<label
							htmlFor="cardHolder"
							className={styles.cardLabel}
						>
							Card Holder Name
						</label>
					</div>

					<div className={styles.inputGroup}>
						<input
							type="text"
							id="cardNumber"
							className={styles.cardInput}
							placeholder="Card Number"
							value={cardDetails.cardNumber}
							onChange={handleCardNumberChange}
							maxLength={19}
							required
						/>
						<label
							htmlFor="cardNumber"
							className={styles.cardLabel}
						>
							Card Number
						</label>
					</div>

					<div className={styles.grid}>
						<div className={styles.inputGroup}>
							<input
								type="text"
								id="expiry"
								className={styles.cardInput}
								placeholder="MM/YY"
								value={cardDetails.expiry}
								onChange={handleExpiryChange}
								maxLength={5}
								required
							/>
							<label
								htmlFor="expiry"
								className={styles.cardLabel}
							>
								Expiry Date
							</label>
						</div>
						<div className={styles.inputGroup}>
							<input
								type="password"
								id="cvv"
								className={styles.cardInput}
								placeholder="CVV"
								value={cardDetails.cvv}
								onChange={handleCvvChange}
								maxLength={3}
								required
							/>
							<label htmlFor="cvv" className={styles.cardLabel}>
								CVV
							</label>
						</div>
					</div>

					<button type="submit" className={styles.submitButton}>
						<span className={styles.buttonIcon}>
							<svg
								className={styles.lockIcon}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</span>
						Pay Now
					</button>
				</form>
			</div>
		</div>
	);
};

export default Recharge;
