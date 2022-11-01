import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import WorkoutPage from "./pages/WorkoutPage";
import SocialPage from "./pages/SocialPage";
import ResetPassword from "./components/ResetPassword";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
	const { getUser } = useAuth();
	const user = getUser();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={!user ? <LandingPage authComponent={<SignUp />} /> : <Navigate to="/" replace />} />
				<Route path="/login" element={!user ? <LandingPage authComponent={<Login />} /> : <Navigate to="/" replace />} />
				<Route
					path="/"
					element={
						user ? (
							<>
								<NavBar />
								<WorkoutPage />
							</>
						) : (
							<Navigate to="/signup" replace />
						)
					}
				/>
				<Route
					path="/social"
					element={
						user ? (
							<>
								<NavBar />
								<SocialPage />
							</>
						) : (
							<Navigate to="/signup" replace />
						)
					}
				/>
				<Route
					path="/users/:userid"
					element={
						user ? (
							<>
								<NavBar />
								<UserProfilePage />
							</>
						) : (
							<Navigate to="/signup" replace />
						)
					}
				/>
				<Route path="/forgot-password" element={!user ? <LandingPage authComponent={<ResetPassword />} /> : <Navigate to="/signup" replace />} />
				<Route path="/" element={user ? <WorkoutPage /> : <Navigate to="/signup" replace />} />
				<Route path="/social" element={user ? <SocialPage /> : <Navigate to="/signup" replace />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
