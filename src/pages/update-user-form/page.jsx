import React from "react";
import UpdateUserForm from "../../components/main/updateUserForm/UpdateUserForm";
// STYLES
import classes from "./updateUser.module.scss";
// Import fonts
import "../../styles/fonts.css";

function page() {
	return (
		<div className={classes.container}>
			<UpdateUserForm />
		</div>
	);
}

export default page;
