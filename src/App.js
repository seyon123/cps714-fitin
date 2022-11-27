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
import HelpPage from "./pages/HelpPage";
import SinglePostPage from "./pages/SinglePostPage";
import SettingsPage from "./pages/SettingsPage";
import AppCardPage from "./pages/AppCardPage";

function App() {
    const { currentUser } = useAuth();
    const user = currentUser;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/signup"
                    element={
                        !user ? (
                            <LandingPage authComponent={<SignUp />} />
                        ) : (
                            <Navigate to="/app" replace />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        !user ? (
                            <LandingPage authComponent={<Login />} />
                        ) : (
                            <Navigate to="/app" replace />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        user ? (
                            <Navigate to="/app" replace />
                        ) : (
                            <Navigate to="/signup" replace />
                        )
                    }
                />
                <Route
                    path="/app"
                    element={
                        user ? (
                            <>
                                <AppCardPage />
                            </>
                        ) : (
                            <Navigate to="/signup" replace />
                        )
                    }
                />
                <Route
                    path="/workout"
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
                    path="/settings"
                    element={
                        user ? (
                            <>
                                <NavBar />
                                <SettingsPage />
                            </>
                        ) : (
                            <Navigate to="/signup" replace />
                        )
                    }
                />
                <Route
                    path="/help"
                    element={
                        user ? (
                            <>
                                <NavBar />
                                <HelpPage />
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
                <Route
                    path="/posts/:postid"
                    element={
                        user ? (
                            <>
                                <NavBar />
                                <SinglePostPage />
                            </>
                        ) : (
                            <Navigate to="/signup" replace />
                        )
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        !user ? (
                            <LandingPage authComponent={<ResetPassword />} />
                        ) : (
                            <Navigate to="/signup" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
