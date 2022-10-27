import { Button, Card, Modal } from "react-bootstrap";
import moment from "moment";
import { db } from "../../firebase";
import "./ChangeRoutineModal.css";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

function ChangeRoutineModal({ show, onHide, setModalShow, routines, todaysWorkouts, date }) {
	const { currentUser } = useAuth();

	async function setTodaysRoutine(id) {
		const dateString = moment(date).format("YYYY-MM-DD");
		const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
		await setDoc(docRef, { ref: doc(db, `users/${currentUser.uid}/routines`, id) });
		setModalShow(false);
	}

	async function removeRoutine() {
		const dateString = moment(date).format("YYYY-MM-DD");
		const removeConfirm = window.confirm("Are you sure you want to remove the routine for " + dateString + "?");
		if (removeConfirm) {
			deleteDoc(doc(db, `users/${currentUser.uid}/schedule`, dateString));
			setModalShow(false);
		}
	}

	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Select Routine</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{routines.map(({ id, name, exercises }) => (
					<Card key={id} className="workoutItemCard hover-overlay shadow-1-strong" role="button" onClick={() => setTodaysRoutine(id)}>
						<Card.Body className="d-flex align-items-center justify-content-between">
							<div>
								<Card.Title className="text-light">{name}</Card.Title>
								<Card.Subtitle className="text-light">{exercises.length} workouts</Card.Subtitle>
							</div>
						</Card.Body>
					</Card>
				))}
			</Modal.Body>
			{todaysWorkouts && (
				<Modal.Footer style={{ justifyContent: "space-between" }}>
					<Button variant="danger" size="lg" onClick={() => removeRoutine()}>
						Remove
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
}

export default ChangeRoutineModal;
