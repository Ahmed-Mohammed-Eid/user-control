import React from "react";
import UpdateUserForm from "../../components/main/updateUserForm/UpdateUserForm";
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
