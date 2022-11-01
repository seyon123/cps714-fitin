import React, { useEffect, useState } from "react";
import { Image, Container, Row, Button, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { doc, collection, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

import "./UserProfilePage.css";

function UserProfilePage() {
	const { currentUser } = useAuth();

	const [user, setUser] = useState();
	const [followersCount, setFollowersCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);
	const [isFollowing, setIsFollowing] = useState(null);
	const { userid } = useParams();

	useEffect(() => {
		document.title = `${user?.name} | FitIn`;
	}, [user]);

	useEffect(() => {
		//Get User from database
		async function findUser() {
			const docRef = doc(db, `users`, userid);
			const docUserSnap = await getDoc(docRef);

			if (docUserSnap.exists()) {
				setUser({ ...docUserSnap.data(), id: docUserSnap.id });
			}
		}
		findUser();
		//Get User from database
		async function getFollowersFollowing() {
			if (userid) {
				const followersRef = collection(db, `users/${userid}`, "followers");
				const docFollowersSnap = await getDocs(followersRef);
				const followingRef = collection(db, `users/${userid}`, "following");
				const docFollowingSnap = await getDocs(followingRef);
				setFollowersCount(docFollowersSnap.size);
				setFollowingCount(docFollowingSnap.size);
			}
		}
		getFollowersFollowing();
	}, [userid]);

	useEffect(() => {
		//check following
		async function checkFollowing() {
			const docRef = doc(db, `users/${currentUser.uid}/following`, userid);
			const docUserSnap = await getDoc(docRef);
			setIsFollowing(docUserSnap.exists());
		}

		checkFollowing();
	}, [currentUser.uid, userid]);

	async function followUser() {
		await setDoc(doc(db, `users/${currentUser.uid}/following`, user.id), {});
		await setDoc(doc(db, `users/${user.id}/followers`, currentUser.uid), {});
		setIsFollowing(true);
		setFollowersCount(followersCount + 1);
	}

	async function unfollowUser() {
		await deleteDoc(doc(db, `users/${currentUser.uid}/following`, user.uid), {});
		await deleteDoc(doc(db, `users/${user.id}/followers`, currentUser.uid), {});
		setIsFollowing(false);
		setFollowersCount(followersCount - 1);
	}

	return (
		<Container fluid className="mainPage" style={{ color: "white" }}>
			<Col>
				<Row className="noMargin">Name: {user?.name}</Row>
				<Row className="noMargin">Email: {user?.email}</Row>
				<Row className="noMargin">ID: {user?.uid}</Row>
				<Image roundedCircle height="100px" src={user?.photoURL} />

				{currentUser?.uid !== userid && (isFollowing ? <Button onClick={() => unfollowUser()}>Unfollow</Button> : <Button onClick={() => followUser()}>Follow</Button>)}

				<h4>Followers: {followersCount}</h4>
				<h4>Following: {followingCount}</h4>
			</Col>
		</Container>
	);
}

export default UserProfilePage;
