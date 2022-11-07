import "./PostFeedItem.css";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaTag } from "react-icons/fa";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import Moment from "react-moment";
import "moment";
import "moment-timezone";
import { useNavigate } from "react-router-dom";

function Comment({ comment }) {
	const [user, setUser] = useState();

	useEffect(() => {
		//Get User from database
		async function findUser() {
			const docUserSnap = await getDoc(comment?.userRef);
			if (docUserSnap.exists()) {
				setUser({ ...docUserSnap.data(), id: docUserSnap.id });
			}
		}
		comment?.userRef && findUser();
	}, [comment?.userRef]);

	return (
		<div>
			<strong>{user?.name}</strong>: {comment?.comment}
		</div>
	);
}

export default function PostFeedItem({ id, userRef, timestamp, tags, image, description, likes }) {
	const { currentUser } = useAuth();
	const [user, setUser] = useState(null);
	const [like, setLike] = useState(false);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		//Get User from database
		async function findUser() {
			const docUserSnap = await getDoc(userRef);
			if (docUserSnap.exists()) {
				setUser({ ...docUserSnap.data(), id: docUserSnap.id });
			}
		}
		userRef && findUser();
	}, [userRef]);

	useEffect(() => {
		onSnapshot(query(collection(db, `posts/${id}/comments`), orderBy("timestamp", "desc"), limit(5)), (snapshot) => {
			setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, [id]);

	useEffect(() => {
		//set like to true if in likes
		if (likes) {
			setLike(likes.includes(currentUser.uid));
		}
	}, [likes, currentUser.uid]);

	async function likePost() {
		const postRef = doc(db, "posts", id);
		await updateDoc(postRef, { likes: arrayUnion(currentUser.uid) });
		setLike(true);
	}
	async function unlikePost() {
		const postRef = doc(db, "posts", id);
		await updateDoc(postRef, { likes: arrayRemove(currentUser.uid) });
		setLike(false);
	}

	function checkDateBeforeYesterday(date) {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 2);
		return date < yesterday;
	}

	function navigateToUser() {
		navigate(`/users/${user?.id}`);
	}

	async function handleComment(e) {
		e.preventDefault();
		await addDoc(collection(db, `posts/${id}/comments`), {
			userRef: doc(db, `users`, currentUser.uid),
			comment: comment,
			timestamp: serverTimestamp(),
		});
		setComment("");
	}

	return (
		<Card bg="dark" text="white" className="postFeedItem">
			<Card.Body>
				<div className="d-flex align-items-center justify-content-start">
					<img style={{ cursor: "pointer" }} src={user?.photoURL} className="postItemProfileImg pe-auto rounded-circle me-1" alt={user?.name} onClick={() => navigateToUser()} />
					<div>
						<Card.Title style={{ cursor: "pointer" }} onClick={() => navigateToUser()}>
							{user?.name}
						</Card.Title>
						{tags?.length > 0 && (
							<Card.Subtitle className="mb-2 text-muted d-flex align-items-center justify-content-start">
								{tags.map((tag, id) => (
									<div className="ms-1" key={id}>
										<FaTag />
										<Card.Link className="postTagLink ms-1" href={tag}>
											{tag}
										</Card.Link>
									</div>
								))}
							</Card.Subtitle>
						)}
					</div>
				</div>
				<div>
					{image && <img src={image} className="postImage rounded mt-1" alt={description} />}
					<div className="postItemMarginRightSmall mt-1">
						<Card.Text>{description}</Card.Text>
					</div>
					<div className="mt-2 postTime">
						{checkDateBeforeYesterday(timestamp.toDate()) ? <Moment format="LL">{timestamp.toDate()}</Moment> : <Moment fromNow>{timestamp.toDate()}</Moment>}
					</div>
				</div>
				<div className="mt-2">
					{like ? <FaHeart color="red" size="20px" role="button" onClick={() => unlikePost()} /> : <FaRegHeart size="20px" role="button" onClick={() => likePost()} />}{" "}
					{likes?.length > 0 && likes.length}
				</div>
				<div className="mt-2">
					<Form onSubmit={handleComment}>
						<Form.Group className="mt-3" controlId="commentPost">
							<Form.Label>Comment</Form.Label>
							<div className="d-flex">
								<Form.Control
									type="text"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									required
									placeholder="Post comment"
									style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
								/>
								<Button className="d-inline-flex" variant="primary" type="submit" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
									Post
								</Button>
							</div>
							<Form.Text className="text-muted">This comment will be visible to anyone who sees this post.</Form.Text>
						</Form.Group>
					</Form>
				</div>
				<div className="mt-2">
					{comments.map((comment, id) => (
						<Comment comment={comment} key={id} />
					))}
				</div>
			</Card.Body>
		</Card>
	);
}
