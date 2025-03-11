import React, { useRef, useState } from "react";
import styles from "./OtpInput.module.scss";

const OtpInput = ({ length = 6, onChange }) => {
	const [otp, setOtp] = useState(new Array(length).fill(""));
	const inputRefs = useRef([]);

	const handleChange = (element, index) => {
		const value = element.value.toUpperCase();
		if (value === " ") return; // Only prevent spaces

		const newOtp = [...otp];
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		// Combine the OTP and call onChange
		const otpValue = newOtp.join("");
		onChange(otpValue);

		// Move to next input if current field is filled
		if (value) {
			if (index < length - 1) {
				inputRefs.current[index + 1].focus();
			} else {
				inputRefs.current[index].blur(); // Remove focus from last input
			}
		}
	};

	const handleKeyDown = (e, index) => {
		// Handle backspace
		if (e.key === "Backspace") {
			e.preventDefault();
			if (otp[index]) {
				// Clear current input if it has a value
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
				onChange(newOtp.join(""));
			} else if (index > 0) {
				// Move to previous input if current is empty
				inputRefs.current[index - 1].focus();
			}
		}
		// Handle left arrow
		else if (e.key === "ArrowLeft" && index > 0) {
			e.preventDefault();
			inputRefs.current[index - 1].focus();
		}
		// Handle right arrow
		else if (e.key === "ArrowRight" && index < length - 1) {
			e.preventDefault();
			inputRefs.current[index + 1].focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData
			.getData("text/plain")
			.toUpperCase()
			.slice(0, length);
		const newOtp = [...otp];

		for (let i = 0; i < pastedData.length; i++) {
			if (pastedData[i] === " ") continue; // Skip spaces
			newOtp[i] = pastedData[i];
			if (inputRefs.current[i]) {
				inputRefs.current[i].value = pastedData[i];
			}
		}

		setOtp(newOtp);
		onChange(newOtp.join(""));

		// Focus the next empty input after paste
		const nextEmptyIndex = newOtp.findIndex((x) => !x);
		if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
			inputRefs.current[nextEmptyIndex].focus();
		} else if (nextEmptyIndex === -1) {
			// If all inputs are filled, blur the last input
			inputRefs.current[length - 1].blur();
		}
	};

	return (
		<div className={styles.otpGroup}>
			{otp.map((_, index) => (
				<input
					key={index}
					type="text"
					style={{ textTransform: "uppercase" }}
					ref={(ref) => (inputRefs.current[index] = ref)}
					maxLength={1}
					onChange={(e) => handleChange(e.target, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					onPaste={handlePaste}
					onFocus={(e) => e.target.select()}
					className={styles.otpInput}
					autoFocus={index === 0}
					value={otp[index]}
				/>
			))}
		</div>
	);
};

export default OtpInput;
