import React from "react";
import styles from "./UserCard.module.scss";

// NAVIGATE
import { useNavigate } from "react-router";

// Import fonts
import "../../../styles/fonts.css";

const UserProfileCard = ({
	userName = "",
	balance = "",
	profileImage = "",
	enableAddButton = false,
	enableUpdateButton = true,
	enableRechargeButton = true,
}) => {
	// NAVIGATE
	const navigate = useNavigate();

	return (
		<div className={styles.card}>
			<div className={styles.profileSection}>
				<div className={styles.profileImageContainer}>
					<div className={styles.profileImageWrapper}>
						<img
							className={styles.profileImage}
							src={profileImage}
							alt={`${userName} profile picture`}
						/>
					</div>
					<div className={styles.verificationBadge}>
						<svg
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
						</svg>
					</div>
				</div>

				<h2 className={styles.userName}>{userName}</h2>
				<div className={styles.balance}>{balance}</div>
				<div className={styles.balanceLabel}>Available Balance</div>

				<div className={styles.buttonRow}>
					{enableRechargeButton && (
						<button
							className={`${styles.actionButton} ${styles.primary}`}
							onClick={() => navigate("/recharge")}
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								stroke="currentColor"
							>
								<path
									d="M12 4V20M4 12H20"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					)}

					{enableUpdateButton && (
						<button
							className={styles.actionButton}
							onClick={() => navigate("/update-user")}
						>
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
						</button>
					)}

					{enableAddButton && (
						<button className={styles.actionButton}>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								stroke="currentColor"
							>
								<path
									d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					)}
				</div>

				<div className={styles.buttonLabels}>
					{enableRechargeButton && (
						<div className={styles.buttonLabel}>Recharge</div>
					)}
					{enableUpdateButton && (
						<div className={styles.buttonLabel}>Update</div>
					)}
					{enableAddButton && (
						<div className={styles.buttonLabel}>Add</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfileCard;
