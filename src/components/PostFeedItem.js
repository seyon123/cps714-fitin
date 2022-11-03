import "./PostFeedItem.css";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaTag } from "react-icons/fa";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import Moment from "react-moment";
import "moment";
import "moment-timezone";

function PostFeedItem({ id, userRef, timestamp, tags, image, description, likes, comments }) {
	const { currentUser } = useAuth();
	const [user, setUser] = useState(null);
	const [like, setLike] = useState(false);

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
		//set like to true if in likes
		if (likes) {
			console.log(likes.includes(currentUser.uid));
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

	return (
		<Card bg="dark" text="white" className="postFeedItem">
			<Card.Body>
				<div className="d-flex align-items-center justify-content-start">
					<img src={user?.photoURL} className="postItemProfileImg rounded-circle me-1" alt={user?.name} />
					<div>
						<Card.Title>{user?.name}</Card.Title>
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
			</Card.Body>
		</Card>
	);
}

export default PostFeedItem;
