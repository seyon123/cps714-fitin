import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "./SocialPage.css";
import PostFeedItem from "../components/PostFeedItem";
import CreatePost from "../components/CreatePost";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import FriendsList from "../components/FriendsList";

function SocialPage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		document.title = `Social Page | FitIn`;
	}, []);

	useEffect(() => {
		onSnapshot(query(collection(db, `posts`), orderBy("timestamp", "desc"), limit(5)), (snapshot) => {
			setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, []);

	return (
		<Container fluid className="mainPage">
			<div className="row">
				<div className="p-0 m-0 col-md-3">
					<FriendsList />
				</div>
				<div className="p-0 m-0 col-md-2"></div>

				<div className="m-0 col-md-5">
					<Col>
						<CreatePost></CreatePost>
						{posts?.length > 0 ? (
							posts.map(({ id, userRef, tags, timestamp, image, description, likes }) => (
								<PostFeedItem id={id} userRef={userRef} tags={tags} image={image} timestamp={timestamp} description={description} likes={likes} key={id} />
							))
						) : (
							<h1 className="text-center mt-3">No posts yet</h1>
						)}
					</Col>
				</div>
				<div className="p-0 m-0 col-md-2"></div>
			</div>
		</Container>
	);
}

export default SocialPage;
