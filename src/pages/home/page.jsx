import React from "react";
import { Link } from "react-router";
import styles from "./page.module.scss";

function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>Welcome to Our Platform</h1>
				<p className={styles.subtitle}>
					We're currently working on something awesome. Our platform
					is under development to bring you the best possible
					experience. Stay tuned!
				</p>
				<div className={styles.buttonGroup}>
					<Link
						to="/auth/signup"
						className={`${styles.button} ${styles.primary}`}
					>
						Sign Up
					</Link>
					<Link
						to="/auth/login"
						className={`${styles.button} ${styles.secondary}`}
					>
						Log In
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Page;
