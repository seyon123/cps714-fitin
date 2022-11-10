import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FriendsList from "../components/FriendsList";
import PostFeedItem from "../components/PostFeedItem";
import { db } from "../firebase";

export default function SinglePostPage() {
	const [post, setPost] = useState(null);
	const { postid } = useParams();

	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, `posts`, postid), (doc) => {
			if (doc.exists()) {
				setPost({ ...doc.data(), id: doc.id });
			}
		});
		return () => {
			unsubscribe();
		};
	}, [postid]);

	return (
		<Container fluid className="mainPage">
			<div className="row">
				<FriendsList />
				<div className="p-0 m-0 col-md-3"></div>
				<div className="p-0 m-0 col-md-2"></div>
				<div className="m-0 col-md-5">
					<Col>
						{post ? (
							<PostFeedItem id={post.id} userRef={post.userRef} tags={post.tags} image={post.image} timestamp={post.timestamp} description={post.description} likes={post.likes} />
						) : (
							<h1 className="text-center mt-3">Post does not exist</h1>
						)}
					</Col>
				</div>
				<div className="p-0 m-0 col-md-2"></div>
			</div>
		</Container>
	);
}
