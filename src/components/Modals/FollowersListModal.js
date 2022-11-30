import { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import "./FollowersListModal";
import FollowUser from "../FollowUser";


function FollowersListModal({ show, onHide, setModalShow, userOfPage }) {
	const { currentUser } = useAuth();
	const [users, setUsers] = useState();
	// const [isFollowing, setIsFollowing] = useState(null);
	// let navigate = useNavigate();

	useEffect(() => {
			onSnapshot(collection(db, `users/${userOfPage.uid}/followers`), (snapshot) => {
					setUsers(
							snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
					);
			});
	}, [userOfPage]);

	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton closeVariant="white">
				{(userOfPage.uid === currentUser?.uid) ? (
					<Modal.Title>Your Followers:</Modal.Title>
				) : (
					<Modal.Title>{userOfPage.name}'s Followers:</Modal.Title>
				)}
			</Modal.Header>

			<Modal.Body>
				<Container fluid className="">
					<div className="follow-list-body">
						{users?.length > 0 ? 
							users?.map(({ id }) => (
								<FollowUser onHide={onHide} id={id} key={id} />
							)) : 
								`${userOfPage.name} doesn't have any followers (you should follow them :D)`
						}
					</div>
				</Container>
			</Modal.Body>

		</Modal>
	);
}

export default FollowersListModal;
