import { useState, useEffect } from "react";
import { Modal, Card, Image, Container } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import "./FollowersListModal";
// import { useAuth } from "../../contexts/AuthContext";

// import "./CreateRoutineModal.css";

function FollowingListModal({ show, onHide, setModalShow }) {
	const [users, setUsers] = useState();
	let navigate = useNavigate();

	useEffect(() => {
			onSnapshot(collection(db, `users`), (snapshot) => {
					setUsers(
							snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
					);
			});
	}, []);

	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>People you Follow</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Container fluid className="">
					<div className="follow-list-body p-2">
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
											<Image
													roundedCircle
													src={photoURL}
													className="me-3"
													alt={name}
													width="50px"
													height="50px"
													style={{ objectFit: "cover" }}
											/>
											<Card.Title className="text-light m-0">
													{name}
											</Card.Title>
									</Card.Body>
							</Card>
						))}
					</div>
				</Container>
				<p>nice!</p>
			</Modal.Body>

			<Modal.Footer style={{ justifyContent: "space-between" }}>
				<p>footer</p>
			</Modal.Footer>
		</Modal>
	);
}

export default FollowingListModal;
