import "./PostFeedItem.css";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaTag } from "react-icons/fa";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function PostFeedItem({ uid, tags, image, description }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		//Get User from database
		async function findUser() {
			const docRef = doc(db, `users`, uid);
			const docUserSnap = await getDoc(docRef);

			if (docUserSnap.exists()) {
				setUser({ ...docUserSnap.data(), id: docUserSnap.id });
			}
		}
		uid && findUser();
	}, [uid]);

	return (
		<Card bg="dark" text="white" className="postFeedItem">
			{console.log(user)}
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
				</div>
			</Card.Body>
		</Card>
	);
}

export default PostFeedItem;
