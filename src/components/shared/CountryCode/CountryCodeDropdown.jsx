import React, { useState, useEffect, useRef } from "react";
import styles from "./CountryCodeDropdown.module.scss";

const CountryCodeDropdown = ({ value, onChange, error }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(null);
	const dropdownRef = useRef(null);

	// بيانات الدول: العلم، الكود، والمفتاح
	const countries = [
		{
			name: "السعودية",
			code: "sa",
			dialCode: "+966",
			flag: "https://flagcdn.com/w40/sa.png",
		},
		{
			name: "الإمارات",
			code: "ae",
			dialCode: "+971",
			flag: "https://flagcdn.com/w40/ae.png",
		},
		{
			name: "مصر",
			code: "eg",
			dialCode: "+20",
			flag: "https://flagcdn.com/w40/eg.png",
		},
		{
			name: "الأردن",
			code: "jo",
			dialCode: "+962",
			flag: "https://flagcdn.com/w40/jo.png",
		},
		{
			name: "البحرين",
			code: "bh",
			dialCode: "+973",
			flag: "https://flagcdn.com/w40/bh.png",
		},
		{
			name: "الجزائر",
			code: "dz",
			dialCode: "+213",
			flag: "https://flagcdn.com/w40/dz.png",
		},
		{
			name: "العراق",
			code: "iq",
			dialCode: "+964",
			flag: "https://flagcdn.com/w40/iq.png",
		},
		{
			name: "الكويت",
			code: "kw",
			dialCode: "+965",
			flag: "https://flagcdn.com/w40/kw.png",
		},
		{
			name: "لبنان",
			code: "lb",
			dialCode: "+961",
			flag: "https://flagcdn.com/w40/lb.png",
		},
		{
			name: "ليبيا",
			code: "ly",
			dialCode: "+218",
			flag: "https://flagcdn.com/w40/ly.png",
		},
		{
			name: "المغرب",
			code: "ma",
			dialCode: "+212",
			flag: "https://flagcdn.com/w40/ma.png",
		},
		{
			name: "عمان",
			code: "om",
			dialCode: "+968",
			flag: "https://flagcdn.com/w40/om.png",
		},
		{
			name: "قطر",
			code: "qa",
			dialCode: "+974",
			flag: "https://flagcdn.com/w40/qa.png",
		},
		{
			name: "السودان",
			code: "sd",
			dialCode: "+249",
			flag: "https://flagcdn.com/w40/sd.png",
		},
		{
			name: "سوريا",
			code: "sy",
			dialCode: "+963",
			flag: "https://flagcdn.com/w40/sy.png",
		},
		{
			name: "تونس",
			code: "tn",
			dialCode: "+216",
			flag: "https://flagcdn.com/w40/tn.png",
		},
		{
			name: "اليمن",
			code: "ye",
			dialCode: "+967",
			flag: "https://flagcdn.com/w40/ye.png",
		},
		{
			name: "موريتانيا",
			code: "mr",
			dialCode: "+222",
			flag: "https://flagcdn.com/w40/mr.png",
		},
		{
			name: "فلسطين",
			code: "ps",
			dialCode: "+970",
			flag: "https://flagcdn.com/w40/ps.png",
		},
		{
			name: "جيبوتي",
			code: "dj",
			dialCode: "+253",
			flag: "https://flagcdn.com/w40/dj.png",
		},
		{
			name: "جزر القمر",
			code: "km",
			dialCode: "+269",
			flag: "https://flagcdn.com/w40/km.png",
		},
		{
			name: "الصومال",
			code: "so",
			dialCode: "+252",
			flag: "https://flagcdn.com/w40/so.png",
		},
	];

	// Set default country to Saudi Arabia
	useEffect(() => {
		const defaultCountry = countries.find((c) => c.code === "sa");
		setSelectedCountry(defaultCountry);
		if (onChange && !value) {
			onChange(defaultCountry.dialCode);
		}
	}, []);

	// Filter countries based on search term
	const filteredCountries = searchTerm
		? countries.filter(
				(country) =>
					country.name.includes(searchTerm) ||
					country.dialCode.includes(searchTerm)
		  )
		: countries;

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleCountrySelect = (country) => {
		setSelectedCountry(country);
		setIsOpen(false);
		if (onChange) {
			onChange(country.dialCode);
		}
	};

	return (
		<div className={styles.countryCodeDropdown} ref={dropdownRef}>
			<div
				className={`${styles.selectedCountry} ${
					error ? styles.error : ""
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedCountry && (
					<>
						<img
							src={selectedCountry.flag}
							alt={`${selectedCountry.name} flag`}
							className={styles.flag}
						/>
						<span className={styles.dialCode}>
							{selectedCountry.dialCode}
						</span>
					</>
				)}
				<span className={styles.arrow}>▼</span>
			</div>

			{isOpen && (
				<div className={styles.dropdown}>
					<div className={styles.searchContainer}>
						<input
							type="text"
							placeholder="ابحث..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onClick={(e) => e.stopPropagation()}
							className={styles.searchInput}
						/>
					</div>
					<div className={styles.countriesList}>
						{filteredCountries.map((country) => (
							<div
								key={country.code}
								className={styles.countryItem}
								onClick={() => handleCountrySelect(country)}
							>
								<img
									src={country.flag}
									alt={`${country.name} flag`}
									className={styles.flag}
								/>
								<span className={styles.countryName}>
									{country.name}
								</span>
								<span className={styles.dialCode}>
									{country.dialCode}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CountryCodeDropdown;
