import {useCallback, useEffect, useState} from "react";
import styles from "./page.module.scss";

// Import fonts
import "../../styles/fonts.css";

// Home page component
import Navbar from "../../components/main/navbar/Navbar";
import UserProfileCard from "../../components/main/usercard/UserCard";

function Page() {

	// STATES
	const [userData, setUserData] = useState([]);


	const getUserData = useCallback(async () => {
		// GET USER NAME FROM LOCAL STORAGE
		const userName = localStorage.getItem("userName");

		if(!userName) {
			window.alert("User not found. Please log in again.");
			// If userName is not found, return an empty array
			return [];
		}

		// Fetch user data from the API
		const response = await fetch(`http://64.251.10.84:8181/ords/charge/CUSTOMERS_home/CUSTOMERS_home?prm=${userName}`);
		const data = await response.json();

		return data?.items ? data.items : [];
	}, []);


	useEffect(() => {
		const fetchData = async () => {
			const data = await getUserData();
			// Update state with fetched data
			setUserData(data);
		};
		fetchData();
	}, [getUserData]);

	return (
		<div className={styles.container}>
			<Navbar />
			<div className={styles.Cards}>

				{
					userData.map((user, index) => (
						<UserProfileCard
							key={index}
							balance={user?.balance}
							userName={user?.customer_name_en}
							profileImage={user?.img || '/404.png'}
						/>
					))
				}
			</div>
		</div>
	);
}

export default Page;
