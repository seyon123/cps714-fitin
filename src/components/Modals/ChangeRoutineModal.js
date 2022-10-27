import { Card, Modal } from "react-bootstrap";
import moment from "moment";
import { db } from "../../firebase";
import "./ChangeRoutineModal.css";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

function ChangeRoutineModal({ show, onHide, setModalShow, routines, date }) {
	const { currentUser } = useAuth();

	async function setTodaysRoutine(id) {
		const dateString = moment(date).format("YYYY-MM-DD");
		const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
		await setDoc(docRef, { ref: doc(db, `users/${currentUser.uid}/routines`, id) });
		setModalShow(false);
	}

	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Change Today's Routine</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Select from your existing routines:</p>
				{routines.map(({ id, name, exercises }) => (
					<Card key={id} className="workoutItemCard hover-overlay shadow-1-strong" role="button" onClick={() => setTodaysRoutine(id)}>
						<Card.Body className="d-flex align-items-center justify-content-between">
							<div>
								<Card.Title className="text-light">{name}</Card.Title>
								<Card.Subtitle className="text-light">{exercises.length} exercises</Card.Subtitle>
							</div>
						</Card.Body>
					</Card>
				))}
			</Modal.Body>
		</Modal>
	);
}

export default ChangeRoutineModal;
