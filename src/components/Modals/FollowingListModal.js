import { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import "./FollowersListModal";
import FollowUser from "../FollowUser";

function FollowingListModal({ show, onHide, setModalShow, userOfPage }) {
	const { currentUser } = useAuth();
	const [users, setUsers] = useState();

	useEffect(() => {
		onSnapshot(collection(db, `users/${userOfPage.uid}/following`), (snapshot) => {
			setUsers(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
	}, [userOfPage]);

	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton closeVariant="white">
				{(userOfPage.uid === currentUser?.uid) ? (
					<Modal.Title>People you follow:</Modal.Title>
				) : (
					<Modal.Title>People {userOfPage.name} follows:</Modal.Title>
				)}
			</Modal.Header>

			<Modal.Body>
				<Container fluid className="">
					<div className="follow-list-body">
						{users?.length > 0 ? 
							users?.map(({ id }) => (
								<FollowUser onHide={onHide} id={id} key={id} />
							)) : 
								`${userOfPage.name} isn't following anyone.`
						}
					</div>
				</Container>
			</Modal.Body>

		</Modal>
	);
}

export default FollowingListModal;
