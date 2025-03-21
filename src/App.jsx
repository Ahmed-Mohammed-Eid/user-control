// ROUTER # ROUTER
import { HashRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";

// PAGES
// #1) AUTH
const LoginPage = lazy(() => import("./pages/login/page"));
const Signup = lazy(() => import("./pages/signup/page"));
const ResetPassword = lazy(() => import("./pages/reset-password/page"));

// #2) HOME
const Home = lazy(() => import("./pages/home/page"));
const ChangePassword = lazy(() => import("./pages/change-password/page"));
const UpdateUserForm = lazy(() => import("./pages/update-user-form/page"));
const InsertEmployeesPage = lazy(() => import("./pages/insert-employees/page"));
const Recharge = lazy(() => import("./components/main/payment/Recharge"));

// STYLES
import "./App.css";

// Loading component
const Loading = () => <div className="loading">Loading...</div>;

function App() {
	return (
		<>
			<HashRouter>
				<Suspense fallback={<Loading />}>
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
						<Route
							path="/update-user"
							element={<UpdateUserForm />}
						/>
						<Route
							path="/insert-employees"
							element={<InsertEmployeesPage />}
						/>
						<Route path="/recharge" element={<Recharge />} />
					</Routes>
				</Suspense>
			</HashRouter>
		</>
	);
}

export default App;
