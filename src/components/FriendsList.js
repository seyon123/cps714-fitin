import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";
import "./FriendsList.css";

function FriendsList() {
	const [users, setUsers] = useState();
	let navigate = useNavigate();

	useEffect(() => {
		onSnapshot(collection(db, `users`), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, []);

	//const [friends] = useState(dummyFriends);

	return (
		<Container fluid className="friends-list-wrap p-0">
			<div className="friends-list-header m-0">
				<h3 className=" text-center p-3 m-0">Users</h3>
			</div>

			<div className="friends-list-body p-2">
				{users?.map(({ id, photoURL, name }) => (
					<Card
						className="workoutItemCard hover-overlay shadow-1-strong p-2"
						key={id}
						role="button"
						onClick={() => {
							navigate(`/users/${id}`);
						}}
					>
						<Card.Body className="d-flex align-items-center justify-content-start p-0">
							<img src={photoURL} height="50px" className="rounded-circle me-3" alt={name} />
							<Card.Title className="text-light m-0">{name}</Card.Title>
						</Card.Body>
					</Card>
				))}
			</div>
		</Container>
	);
}

export default FriendsList;
