import React from "react";
import InsertEmployees from "../../components/main/insertEmployees/InsertEmployees";
import Navbar from "../../components/main/navbar/Navbar";
// Import fonts
import "../../styles/fonts.css";

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
						#e0f0fa 50%,
						#d7f0ff 100%
					);
					font-family: "Inter", -apple-system, BlinkMacSystemFont,
						"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
						"Open Sans", "Helvetica Neue", sans-serif;
					position: relative;
					overflow: hidden;
				}

				.page-wrapper::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230875b7' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
					opacity: 0.5;
					z-index: 0;
				}

				.page-container {
					flex: 1;
					width: 100%;
					padding: 40px 24px 60px;
					display: flex;
					flex-direction: column;
					position: relative;
					z-index: 1;
				}

				.page-title {
					text-align: center;
					margin-bottom: 40px;
					font-size: 32px;
					font-weight: 700;
					color: #333;
					letter-spacing: -0.5px;
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
