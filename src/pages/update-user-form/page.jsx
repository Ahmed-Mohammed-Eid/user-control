import React from "react";
import UpdateUserForm from "../../components/main/updateUserForm/updateUserForm";
// STYLES
import classes from "./updateUser.module.scss";

function page() {
	return (
		<div className={classes.container}>
			<UpdateUserForm />
		</div>
	);
}

export default page;
