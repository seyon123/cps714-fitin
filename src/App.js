import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useAuth } from "./contexts/AuthContext";
import MainPage from "./pages/MainPage";
import { Navigate } from "react-router-dom";

function App() {
	const { getUser } = useAuth();
	const user = getUser();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={!user ? <LandingPage authComponent={<SignUp />} /> : <Navigate to="/" replace />} />
				<Route path="/login" element={!user ? <LandingPage authComponent={<Login />} /> : <Navigate to="/" replace />} />
				<Route path="/" element={user ? <MainPage /> : <Navigate to="/signup" replace />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
