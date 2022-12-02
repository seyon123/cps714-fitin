import "./PostFeedItem.css";
import { useEffect, useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { FaTag, FaTrash } from "react-icons/fa";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import Moment from "react-moment";
import "moment";
import "moment-timezone";
import { Link, useNavigate } from "react-router-dom";

function Comment({ comment }) {
	const [user, setUser] = useState();

	useEffect(() => {
		//Get User from database
		async function findUser() {
			const docUserSnap = await getDoc(comment?.userRef);
			if (docUserSnap.exists()) {
				setUser({ ...docUserSnap.data(), id: docUserSnap.id });
			} else {
				setUser({
					name: "Deleted User",
					photoURL: "/fitin_logo.png",
				});
			}
		}
		comment?.userRef && findUser();
	}, [comment?.userRef]);

	return (
		<div>
			<Link style={{ textDecorationLine: "none" }} className="text-light" to={user?.uid && `/users/${user?.id}`}>
				<strong>{user?.name}</strong>
			</Link>
			: {comment?.comment}
			<Moment fromNow className="postTime ms-2">
				{comment?.timestamp?.toDate()}
			</Moment>
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
			} else {
				setUser({
					name: "Deleted User",
					photoURL: "/fitin_logo.png",
				});
			}
		}
		userRef && findUser();
	}, [userRef]);

	useEffect(() => {
		onSnapshot(query(collection(db, `posts/${id}/comments`), orderBy("timestamp", "desc")), (snapshot) => {
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

	function deletePost() {
		const deleteConfirm = window.confirm("Are you sure you want to delete this post? This action is irreversible.");
		if (deleteConfirm) {
			deleteDoc(doc(db, `posts`, id));
		}
	}

	return (
		<Card text="white" className="postFeedItem bgdarkgrey">
			<Card.Body>
				<div className="d-flex align-items-center justify-content-between">
					<div className="d-flex align-items-center justify-content-start">
						<Image
							width="50px"
							height="50px"
							style={{ objectFit: "cover", cursor: "pointer" }}
							src={user?.photoURL}
							className="postItemProfileImg pe-auto rounded-circle me-1"
							alt={user?.name}
							onClick={() => user.uid && navigateToUser()}
						/>
						<div>
							<Card.Title style={{ cursor: "pointer" }} onClick={() => user.uid && navigateToUser()}>
								{user?.name}
							</Card.Title>
							{tags?.length > 0 && (
								<Card.Subtitle className="mb-2 text-muted d-flex align-items-center justify-content-start flex-wrap">
									{tags.map((tag, id) => (
										<div className="me-2" key={id}>
											<FaTag />
											<span className="postTagLink ms-1">{tag}</span>
										</div>
									))}
								</Card.Subtitle>
							)}
						</div>
					</div>
					{user?.uid === currentUser.uid && (
						<div>
							<Button variant="danger" className="m-0 p-2 rounded-circle d-flex align-items-center justify-content-center" onClick={deletePost}>
								<FaTrash title="Delete post" />
							</Button>
						</div>
					)}
				</div>
				<div>
					{image && (
						<Image
							src={image}
							className="postImage rounded mt-1 pointer-event"
							alt={description}
							onClick={() => {
								navigate(`/posts/${id}`);
							}}
						/>
					)}
					<div className="postItemMarginRightSmall mt-1">
						<Card.Text
							style={{ cursor: "pointer" }}
							onClick={() => {
								navigate(`/posts/${id}`);
							}}
							dangerouslySetInnerHTML={{ __html: description?.replace(/\n/g, "<br />") }}
						></Card.Text>
					</div>
					<div className="mt-2 postTime">
						{checkDateBeforeYesterday(timestamp?.toDate()) ? <Moment format="LL">{timestamp?.toDate()}</Moment> : <Moment fromNow>{timestamp?.toDate()}</Moment>}
					</div>
				</div>
				<div className="mt-2">
					{like ? <FaHeart color="red" size="20px" role="button" onClick={() => unlikePost()} /> : <FaRegHeart size="20px" role="button" onClick={() => likePost()} />}{" "}
					{likes?.length > 0 && likes.length}
				</div>
				<div className="mt-2">
					<Form onSubmit={handleComment}>
						<Form.Group className="mt-3" controlId="commentPost">
							<div className="d-flex">
								<Form.Control
									type="text"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									required
									placeholder="Add a comment..."
									style={{
										borderTopRightRadius: "0",
										borderBottomRightRadius: "0",
									}}
								/>
								<Button
									className="d-inline-flex"
									variant="primary"
									type="submit"
									style={{
										borderTopLeftRadius: "0",
										borderBottomLeftRadius: "0",
									}}
								>
									Reply
								</Button>
							</div>
							<Form.Text className="text-muted">This comment will be visible to anyone who sees this post.</Form.Text>
						</Form.Group>
					</Form>
				</div>
				{comments.length > 0 && (
					<div className="mt-2 postComments p-3 rounded">
						{comments.map((comment, id) => (
							<Comment comment={comment} key={id} />
						))}
					</div>
				)}
			</Card.Body>
		</Card>
	);
}
