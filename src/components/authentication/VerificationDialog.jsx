import React, { useState, useEffect, useCallback } from "react";
import styles from "./VerificationDialog.module.scss";
import OtpInput from "./OtpInput";

const VerificationDialog = ({ isOpen, onVerify, onResend, phone }) => {
	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const [timer, setTimer] = useState(60);
	const [canResend, setCanResend] = useState(false);

	useEffect(() => {
		let interval;
		if (isOpen && timer > 0) {
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else if (timer === 0) {
			setCanResend(true);
		}
		return () => clearInterval(interval);
	}, [isOpen, timer]);

	const handleResend = useCallback(() => {
		if (canResend) {
			setTimer(60);
			setCanResend(false);
			onResend();
		}
	}, [canResend, onResend]);

	const handleVerify = useCallback(() => {
		if (code.length !== 6) {
			setError("Please enter all 6 characters");
			return;
		}
		setError("");
		onVerify(code);
	}, [code, onVerify]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
			<div className={styles.dialog}>
				<h2 className={styles.title}>Verify Your Phone Number</h2>
				<p className={styles.description}>
					We sent a verification code to your WhatsApp number{" "}
					<strong>{phone}</strong>
				</p>

				<div className={styles.inputGroup}>
					<OtpInput
						length={6}
						onChange={(value) => {
							setError("");
							setCode(value);
						}}
					/>
					{error && <div className={styles.error}>{error}</div>}
				</div>

				<div className={styles.actions}>
					<button
						className={styles.verifyBtn}
						onClick={handleVerify}
						disabled={code.length !== 6}
						type="button"
					>
						Verify Code
					</button>
					<button
						className={styles.resendBtn}
						onClick={handleResend}
						disabled={!canResend}
						type="button"
					>
						Resend Code
					</button>
				</div>

				{!canResend && (
					<div className={styles.timer}>
						Resend code in {formatTime(timer)}
					</div>
				)}
			</div>
		</div>
	);
};

export default VerificationDialog;
