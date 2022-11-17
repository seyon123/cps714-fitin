import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
	signOut,
	updatePassword,
	deleteUser,
	updateEmail,
} from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	async function login(email, password) {
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

	async function resetPassword(email) {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + `/login`,
		}).catch((error) => {
			// Handle Errors
			const errorMessage = error.message;
			console.error(error);

			alert(errorMessage);
		});
	}

	async function signInGoogle() {
		return signInWithPopup(auth, provider)
			.then(async () => {
				//set user
				const docRef = doc(db, "users", auth.currentUser.uid);
				const docSnap = await getDoc(docRef);
				//if user does not exist in db add to db

				if (!docSnap.exists()) {
					setDoc(docRef, {
						name: auth.currentUser.displayName,
						email: auth.currentUser.email,
						photoURL: auth.currentUser.photoURL,
						uid: auth.currentUser.uid,
					});
				}
			})
			.catch((error) => {
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
		return signOut(auth).catch((error) => {
			console.error(error);
		});
	}

	async function signUp(email, password, name) {
		return createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				updateProfile(auth.currentUser, {
					displayName: name,
					photoURL: `https://avatars.dicebear.com/api/initials/${name?.trim()}.svg`,
				});

				//set user in user db
				const docRef = doc(db, "users", auth.currentUser.uid);
				setDoc(docRef, {
					name: name,
					email: auth.currentUser.email,
					photoURL: `https://avatars.dicebear.com/api/initials/${name?.trim()}.svg`,
					uid: auth.currentUser.uid,
				});
			})
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
	async function deleteCurrentUser() {
		const docRef = doc(db, "users", currentUser.uid);
		const docSnap = await getDoc(docRef);

		deleteUser(auth.currentUser)
			.then(async () => {
				console.log("User account deleted");
				if (docSnap.exists()) {
					await deleteDoc(docRef).then(() => {});
				} else {
					console.log("User does not exist or is already deleted.");
				}
				alert("Account deleted successfully");
				logOut();
			})
			.catch((error) => {
				var errorCode = error.code;
				if (errorCode === "auth/requires-recent-login") {
					alert("Please logout and login again to delete account");
				} else {
					console.error(error);
					alert("Error deleting account", errorCode);
				}
			});
	}

	async function updateUserInfo(name, email, photoURL, bio, website) {
		const docRef = doc(db, "users", currentUser?.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			await updateDoc(docRef, {
				name: name,
				email: email,
				photoURL: photoURL,
				bio: bio,
				website: website,
			});
			console.log(currentUser);
			if (name !== currentUser?.displayName) {
				updateProfile(auth.currentUser, {
					displayName: name,
				})
					.then(() => {
						console.log("User name updated successfully");
					})
					.catch((error) => {
						console.error(error).alert("Error updating name");
					});
			}
			if (photoURL !== currentUser?.photoURL) {
				updateProfile(auth.currentUser, {
					photoURL: photoURL,
				})
					.then(() => {
						console.log("User profile picture updated successfully");
					})
					.catch((error) => {
						console.error(error).alert("Error updating profile picture");
					});
			}
			if (email !== currentUser?.email) {
				updateEmail(auth.currentUser, email)
					.then(() => {
						console.log("Email Updated successfully");
					})
					.catch((error) => {
						var errorCode = error.code;
						if (errorCode === "auth/requires-recent-login") {
							alert("Please logout and login again to edit your email");
						} else {
							console.error(error);
							alert("Error editing email", errorCode);
						}
					});
			}
			alert("Account information updated successfully");
		} else {
			// User does not exist
			console.log("User does not exist. Cant update user information.");
		}
	}

	async function updateUserPassword(password) {
		updatePassword(auth.currentUser, password)
			.then(() => {
				logOut();
				alert("Password updated successfully! Please login again");
			})
			.catch((error) => {
				console.error(error);
				var errorCode = error.code;
				if (errorCode === "auth/weak-password") {
					alert("The password is too weak. Try a password greater than 6 characters");
				} else if (errorCode === "auth/requires-recent-login") {
					alert("Please logout and login again to change your password");
				} else {
					alert("Error updating password.", errorCode);
				}
			});
	}

	async function getUser() {
		const docRef = doc(db, "users", currentUser?.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { ...docSnap.data(), id: docSnap.id };
		} else {
			// User does not exist
			console.log("User does not exist or is already deleted.");
		}
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
		deleteCurrentUser,
		updateUserInfo,
		updateUserPassword,
		getUser,
		login,
		logOut,
		resetPassword,
		signUp,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
