import React from "react";
import InsertEmployees from "../../components/main/insertEmployees/InsertEmployees";
import Navbar from "../../components/main/navbar/Navbar";

const InsertEmployeesPage = () => {
	const handleSubmit = (formData) => {
		// Here you would typically send the data to your API
		console.log("Form submitted:", formData);
		// Show success message
		alert("Employee added successfully!");
	};

	return (
		<div className="page-wrapper">
			<Navbar />
			<div className="page-container">
				<InsertEmployees onSubmit={handleSubmit} />
			</div>

			<style jsx="true">{`
				.page-wrapper {
					min-height: 100vh;
					padding: 20px;
					display: flex;
					flex-direction: column;
					background: linear-gradient(
						135deg,
						#f5f7fa 0%,
						#e4e8f0 100%
					);
				}

				.page-container {
					flex: 1;
					width: 100%;
					padding: 40px 24px 60px;
					display: flex;
					flex-direction: column;
				}

				.page-title {
					text-align: center;
					margin-bottom: 40px;
					font-size: 32px;
					font-weight: 700;
					color: #333;
					font-family: "Inter", -apple-system, BlinkMacSystemFont,
						"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
						"Open Sans", "Helvetica Neue", sans-serif;
				}

				@media (max-width: 768px) {
					.page-container {
						padding: 32px 16px 40px;
					}

					.page-title {
						margin-bottom: 32px;
						font-size: 28px;
					}
				}

				@media (max-width: 480px) {
					.page-container {
						padding: 24px 12px 32px;
					}

					.page-title {
						margin-bottom: 24px;
						font-size: 24px;
					}
				}
			`}</style>
		</div>
	);
};

export default InsertEmployeesPage;
