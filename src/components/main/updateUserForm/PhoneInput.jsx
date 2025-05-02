// PhoneInput.jsx for UpdateUserForm
import { useState, useEffect, useRef } from "react";
import styles from "../updateUserForm/UpdateUserForm.module.scss";
// Import fonts
import "../../../styles/fonts.css";

const PhoneInput = ({ register, errors, value, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const dropdownRef = useRef(null);

    // Country data: flag, code, dial code
    const countries = [
        {
            name: "Saudi Arabia",
            code: "sa",
            dialCode: "+966",
            flag: "https://flagcdn.com/w40/sa.png",
        },
        {
            name: "United Arab Emirates",
            code: "ae",
            dialCode: "+971",
            flag: "https://flagcdn.com/w40/ae.png",
        },
        {
            name: "Egypt",
            code: "eg",
            dialCode: "+20",
            flag: "https://flagcdn.com/w40/eg.png",
        },
        {
            name: "United States",
            code: "us",
            dialCode: "+1",
            flag: "https://flagcdn.com/w40/us.png",
        },
        {
            name: "United Kingdom",
            code: "gb",
            dialCode: "+44",
            flag: "https://flagcdn.com/w40/gb.png",
        },
        {
            name: "Jordan",
            code: "jo",
            dialCode: "+962",
            flag: "https://flagcdn.com/w40/jo.png",
        },
        {
            name: "Bahrain",
            code: "bh",
            dialCode: "+973",
            flag: "https://flagcdn.com/w40/bh.png",
        },
        {
            name: "Kuwait",
            code: "kw",
            dialCode: "+965",
            flag: "https://flagcdn.com/w40/kw.png",
        },
        {
            name: "Qatar",
            code: "qa",
            dialCode: "+974",
            flag: "https://flagcdn.com/w40/qa.png",
        },
    ];

    // Set default country
    useEffect(() => {
        if (value) {
            const country = countries.find((c) => c.dialCode === value);
            if (country) {
                setSelectedCountry(country);
            } else {
                // Default to Saudi Arabia if the value doesn't match any country
                const defaultCountry = countries.find((c) => c.code === "sa");
                setSelectedCountry(defaultCountry);
                if (onChange) {
                    onChange(defaultCountry.dialCode);
                }
            }
        } else {
            // Default to Saudi Arabia if no value is provided
            const defaultCountry = countries.find((c) => c.code === "sa");
            setSelectedCountry(defaultCountry);
            if (onChange) {
                onChange(defaultCountry.dialCode);
            }
        }
    }, [value, onChange]);

    // Filter countries based on search term
    const filteredCountries = searchTerm
        ? countries.filter(
              (country) =>
                  country.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
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
        <div className={styles.inputWithIcon} ref={dropdownRef}>
            {!disabled && (<div className={styles.countryCodeSelector}>
                <div
                    className={styles.selectedCountry}
                    onClick={() => {
                        if (disabled) return;

                        setIsOpen(!isOpen);
                    }}
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
                            <span className={styles.arrow}>▼</span>
                        </>
                    )}
                </div>

                {isOpen && (
                    <div className={styles.countryDropdown}>
                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search..."
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
            </div>)}
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
                placeholder="Phone number"
                disabled={disabled}
            />
        </div>
    );
};

export default PhoneInput;
