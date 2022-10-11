import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password).catch((error) => {
			// Handle Errors
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error(error);

			if (errorCode === "auth/user-not-found") {
				alert("The email address is not registered.");
			} else if (errorCode === "auth/wrong-password") {
				alert("The password is invalid.");
			} else if (errorCode === "auth/unauthorized-domain") {
				alert("This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.");
			} else {
				alert(errorMessage);
			}

			// ...
		});
	}

	async function signInGoogle() {
		return signInWithPopup(auth, provider).catch((error) => {
			// Handle Errors
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.error(errorCode, errorMessage, email, credential);

			if (errorCode === "auth/popup-closed-by-user") {
				alert("The sign in window was closed before completing the sign in.");
			} else if (errorCode === "auth/unauthorized-domain") {
				alert("This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.");
			} else {
				alert(errorMessage);
			}

			// ...
		});
	}

	async function logOut() {
		return signOut(auth)
			.then(() => {
				alert("Signed Out Successfully");
			})
			.catch((error) => {
				console.error(error);
			});
	}

	async function signUp(email, password, name) {
		return createUserWithEmailAndPassword(auth, email, password)
			.then(() =>
				updateProfile(auth.currentUser, {
					displayName: name,
				})
			)
			.catch((error) => {
				var errorCode = error.code;

				if (errorCode === "auth/weak-password") {
					alert("The password is too weak.");
				} else if (errorCode === "auth/invalid-email") {
					alert("The email address is invalid.");
				} else if (errorCode === "auth/unauthorized-domain") {
					alert("This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.");
				} else {
					console.error(error);
					alert(errorCode);
				}
			});
	}

	function getUser() {
		return currentUser;
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signInGoogle,
		getUser,
		login,
		logOut,
		signUp,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
