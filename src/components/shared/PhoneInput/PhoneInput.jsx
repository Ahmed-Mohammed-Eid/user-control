// Updated Phone Input Field for SignupPage.jsx
import React from "react";
import CountryCodeDropdown from "../CountryCode/CountryCodeDropdown";
import styles from "./PhoneInput.module.scss";

const PhoneInput = ({
	register,
	errors,
	setCountryCodeAtParent,
	countryCode,
}) => {
	// HANDLERS
	const handleCountryCodeChange = (code) => {
		setCountryCodeAtParent(code);
	};

	return (
		<div className={styles.phoneInputContainer}>
			<CountryCodeDropdown
				value={countryCode}
				onChange={handleCountryCodeChange}
				error={errors.phone}
				register={register}
			/>
			<input
				type="tel"
				id="phone"
				placeholder="رقم الجوال"
				{...register("phone")}
				className={`${styles.phoneInput} ${
					errors.phone ? styles.inputError : ""
				}`}
			/>
		</div>
	);
};

export default PhoneInput;
