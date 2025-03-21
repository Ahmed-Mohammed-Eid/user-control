// Navbar.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Navbar.module.scss";

// REACT ROUTER
import { useNavigate } from "react-router";

// Import fonts
import "../../../styles/fonts.css";

const Navbar = () => {
	const [isProfileMenuActive, setProfileMenuActive] = useState(false);
	const profileMenuRef = useRef(null);
	const profileButtonRef = useRef(null);

	// REACT ROUTER
	const navigate = useNavigate();

	// REDIRECT TO HOME PAGE FUNCTION
	const redirectToHome = useCallback(() => {
		navigate("/");
	}, [navigate]);
	// REDIRECT TO LOGIN PAGE FUNCTION
	const redirectToLogin = useCallback(() => {
		navigate("/auth/login");
	}, [navigate]);

	const toggleProfileMenu = (e) => {
		e.stopPropagation();
		setProfileMenuActive(!isProfileMenuActive);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target) &&
				!profileButtonRef.current.contains(event.target)
			) {
				setProfileMenuActive(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.navbar}>
			{/* Company Logo and Name Section */}
			<div className={styles.companySection} onClick={redirectToHome}>
				<div className={styles.companyLogo}>
					<img src="/logo.png" alt="SIAN" />
				</div>
				<div className={styles.companyName}>SIAN</div>
			</div>

			{/* Data Section */}
			<div className={styles.dataSection}>
				<div className={styles.dataItems}>
					<div className={`${styles.dataItem} ${styles.codeItem}`}>
						<div className={styles.dataIcon}>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								stroke="white"
							>
								<path
									d="M16 18L22 12L16 6"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8 6L2 12L8 18"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div className={styles.dataContent}>
							<span className={styles.dataLabel}>Code</span>
							<span className={styles.dataValue}>9</span>
						</div>
					</div>

					<div className={`${styles.dataItem} ${styles.nameItem}`}>
						<div className={styles.dataIcon}>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								stroke="white"
							>
								<path
									d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div className={styles.dataContent}>
							<span className={styles.dataLabel}>Name</span>
							<span className={styles.dataValue}>1 1</span>
						</div>
					</div>

					<div className={`${styles.dataItem} ${styles.balanceItem}`}>
						<div className={styles.dataIcon}>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								stroke="white"
							>
								<path
									d="M12 1V23"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div className={styles.dataContent}>
							<span className={styles.dataLabel}>Balance</span>
							<span className={styles.dataValue}>100</span>
						</div>
					</div>
				</div>
			</div>

			{/* Profile Section */}
			<div className={styles.profileSection}>
				<div
					className={styles.profileAvatar}
					ref={profileButtonRef}
					onClick={toggleProfileMenu}
				>
					JD
				</div>
				<div
					className={`${styles.profileMenu} ${
						isProfileMenuActive ? styles.active : ""
					}`}
					ref={profileMenuRef}
				>
					<div className={styles.profileMenuHeader}>
						<div className={styles.profileMenuName}>John Doe</div>
						<div className={styles.profileMenuEmail}>
							john.doe@example.com
						</div>
					</div>
					<div className={styles.profileMenuItems}>
						<div className={styles.profileMenuItem}>
							<div className={styles.profileMenuItemIcon}>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="currentColor"
								>
									<path
										d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<div className={styles.profileMenuItemText}>
								My Profile
							</div>
						</div>
						<div className={styles.profileMenuItem}>
							<div className={styles.profileMenuItemIcon}>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="currentColor"
								>
									<path
										d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0677 20.2376 9.64778 19.6341 9.01997 19.38C8.40287 19.1077 7.68218 19.2383 7.19997 19.71L7.13997 19.77C6.76486 20.1456 6.25578 20.3566 5.72497 20.3566C5.19416 20.3566 4.68508 20.1456 4.30997 19.77C3.93435 19.3949 3.72338 18.8858 3.72338 18.355C3.72338 17.8242 3.93435 17.3151 4.30997 16.94L4.36997 16.88C4.84167 16.3978 4.97231 15.6771 4.69997 15.06C4.44087 14.4555 3.84762 14.0626 3.18997 14.06H2.99997C2.46953 14.06 1.96086 13.8493 1.58579 13.4742C1.21071 13.0991 1 12.5905 1 12.06C1 11.5296 1.21071 11.0209 1.58579 10.6458C1.96086 10.2708 2.46953 10.06 2.99997 10.06H3.08997C3.76237 10.0477 4.36587 9.62775 4.61997 8.99996C4.89231 8.38286 4.76167 7.66217 4.28997 7.17996L4.22997 7.11996C3.85435 6.74485 3.64338 6.23577 3.64338 5.70496C3.64338 5.17415 3.85435 4.66508 4.22997 4.28996C4.60508 3.91434 5.11416 3.70337 5.64497 3.70337C6.17578 3.70337 6.68486 3.91434 7.05997 4.28996L7.11997 4.34996C7.60218 4.82166 8.32287 4.9523 8.93997 4.67996H8.99997C9.60447 4.42086 9.99733 3.82761 9.99997 3.16996V2.99996C9.99997 2.46952 10.2107 1.96085 10.5858 1.58578C10.9608 1.2107 11.4695 0.999992 12 0.999992C12.5304 0.999992 13.0391 1.2107 13.4142 1.58578C13.7892 1.96085 14 2.46952 14 2.99996V3.08996C14.0026 3.74761 14.3955 4.34086 15 4.59996C15.6171 4.8723 16.3378 4.74166 16.82 4.26996L16.88 4.20996C17.2551 3.83434 17.7642 3.62336 18.295 3.62336C18.8258 3.62336 19.3349 3.83434 19.71 4.20996C20.0856 4.58508 20.2966 5.09416 20.2966 5.62496C20.2966 6.15577 20.0856 6.66485 19.71 7.03996L19.65 7.09996C19.1783 7.58217 19.0477 8.30286 19.32 8.91996V8.99996C19.5791 9.60447 20.1724 9.99733 20.83 9.99996H21C21.5304 9.99996 22.0391 10.2107 22.4142 10.5858C22.7893 10.9608 23 11.4695 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<div className={styles.profileMenuItemText}>
								Settings
							</div>
						</div>
						<div
							className={styles.profileMenuItem}
							onClick={() => navigate("/insert-employees")}
						>
							<div className={styles.profileMenuItemIcon}>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="currentColor"
								>
									<path
										d="M12 5V19"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M5 12H19"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<div className={styles.profileMenuItemText}>
								Upload Employees
							</div>
						</div>
					</div>
					<div className={styles.profileMenuFooter}>
						<div
							className={styles.logoutButton}
							onClick={redirectToLogin}
						>
							<span className={styles.logoutButtonIcon}>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="currentColor"
								>
									<path
										d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M16 17L21 12L16 7"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M21 12H9"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
							<span>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
