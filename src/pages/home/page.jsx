import React from "react";
import styles from "./page.module.scss";

// Home page component
import Navbar from "../../components/main/navbar/Navbar";
import UserProfileCard from "../../components/main/usercard/UserCard";

function Page() {
	return (
		<div className={styles.container}>
			<Navbar />
			<div className={styles.Cards}>
				<UserProfileCard
					balance="$3,250.00"
					userName="John Smith"
					profileImage="/P1.jpg"
				/>

				<UserProfileCard
					balance="$1,875.50"
					userName="Emily Chen"
					profileImage="/P2.jpg"
				/>

				<UserProfileCard
					balance="$4,120.75"
					userName="Michael Johnson"
					profileImage="/P3.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>

				<UserProfileCard
					balance="$2,980.25"
					userName="Sarah Williams"
					profileImage="/P4.jpg"
				/>
			</div>
		</div>
	);
}

export default Page;
