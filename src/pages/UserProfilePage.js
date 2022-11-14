import React, { useEffect, useState } from "react";
import { Image, Container, Row, Button, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { doc, collection, getDoc, setDoc, getDocs, deleteDoc, onSnapshot, query, orderBy, limit } from "firebase/firestore";
// Add where up here leaving out temporarily so we don't get a warning
// Make relevant edits to line 65
import { useAuth } from "../contexts/AuthContext";
import PostFeedItem from "../components/PostFeedItem";
import { db } from "../firebase";

import "./UserProfilePage.css";

function UserProfilePage() {
	const { currentUser } = useAuth();

	const [user, setUser] = useState();
	const [posts, setPosts] = useState([]);
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

	useEffect(() => {
		// where('userid', '==', userid),  < add this line into the query
		onSnapshot(query(collection(db, `posts`), orderBy("timestamp", "desc"), limit(5)), (snapshot) => {
			setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, [currentUser]); // < Throw in parameter we need here

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
		<Container className="mainPage" style={{ color: "white" }}>
			<br />
			<div className="card bg-dark text-white">
			<Container>
				<Row>
						{/* This column holds the profile image */}
						<Col className="m-4 col-md-2"> 
							<Image roundedCircle height="200px" src={user?.photoURL} />
						</Col>
						<Col className="m-4 mt-9 col-md-5">
							<br />
							<h2><Row className="noMargin fs-2 fw-bold">{user?.name}</Row></h2>
							
							<p><Row className="noMargin">Email: {user?.email}  ID: {user?.uid}</Row></p>
							
						</Col>
						<Col>
							<Row>
							{currentUser?.uid !== userid && (isFollowing ? <Button onClick={() => unfollowUser()}>Unfollow</Button> : <Button onClick={() => followUser()}>Follow</Button>)}
							<Button onClick={() => unfollowUser()}>Unfollow</Button>
							</Row>
							<Row className="d-flex align-items-center justify-content-between">
								<Col className="col-md-4">
									<div>
										<h4>Followers:</h4>
										{followersCount}
									</div>
								</Col>
								<Col className="col-md-4">
									<div>
										<h4>Following:</h4>
										{followingCount}
									</div>
								</Col>
							</Row>
						</Col>
				</Row>
			</Container>
			</div>
			<br />
				<Container className="d-flex align-items-center justify-content-between" style={{width : "69%"}}>
					<Col>
						{posts?.length > 0 ? (
							posts.map(({ id, userRef, tags, timestamp, image, description, likes }) => (
								<PostFeedItem id={id} userRef={userRef} tags={tags} image={image} timestamp={timestamp} description={description} likes={likes} key={id} />
							))
						) : (
							<h1 className="text-center mt-3">No posts yet</h1>
						)}
					</Col>
				</Container>
		</Container>
	);
}

export default UserProfilePage;
