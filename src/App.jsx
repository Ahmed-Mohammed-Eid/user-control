// ROUTER # ROUTER
import { HashRouter, Routes, Route } from "react-router";

// PAGES
// #1) AUTH
import LoginPage from "./pages/login/page";
import Signup from "./pages/signup/page";
import ResetPassword from "./pages/reset-password/page";

// #2) HOME
import Home from "./pages/home/page";
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
				</Routes>
			</HashRouter>
		</>
	);
}

export default App;
