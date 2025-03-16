// ROUTER # ROUTER
import { HashRouter, Routes, Route } from "react-router";

// PAGES
// #1) AUTH
import LoginPage from "./pages/login/page";
import Signup from "./pages/signup/page";
import ResetPassword from "./pages/reset-password/page";

// #2) HOME
import Home from "./pages/home/page";
import ChangePassword from "./pages/change-password/page";
import UpdateUserForm from "./pages/update-user-form/page";
import InsertEmployeesPage from "./pages/insert-employees/page";

// #3) LAYOUT
import CanvasCursor from "./components/shared/CanvasCursor";

// STYLES
import "./App.css";

function App() {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth/signup" element={<Signup />} />
					<Route path="/auth/login" element={<LoginPage />} />

					<Route
						path="/auth/reset-password"
						element={<ResetPassword />}
					/>
					<Route
						path="/auth/change-password"
						element={<ChangePassword />}
					/>
					<Route path="/update-user" element={<UpdateUserForm />} />
					<Route
						path="/insert-employees"
						element={<InsertEmployeesPage />}
					/>
				</Routes>
			</HashRouter>
			<CanvasCursor />
		</>
	);
}

export default App;
