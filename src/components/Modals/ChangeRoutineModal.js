import { Button, Card, Modal } from "react-bootstrap";
import moment from "moment";
import { db } from "../../firebase";
import "./ChangeRoutineModal.css";
import { doc, getDoc, updateDoc, deleteField, setDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

function ChangeRoutineModal({ show, onHide, setModalShow, routines, dayData, date }) {
	const { currentUser } = useAuth();

	// Cnange the routine for the current day to the selected routine
	async function setTodaysRoutine(id) {
		const dateString = moment(date).format("YYYY-MM-DD");
		const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
		const todaysRoutineRef = doc(db, `users/${currentUser.uid}/routines`, id);
		const docSnap = await getDoc(todaysRoutineRef);
		if (dayData) {
			await updateDoc(docRef, { name: docSnap.data().name, exercises: docSnap.data().exercises, completed: [] });
		} else {
			await setDoc(docRef, { ...docSnap.data() });
		}

		setModalShow(false);
	}
	// Delete the current routine for the current day
	async function removeRoutine() {
		const dateString = moment(date).format("YYYY-MM-DD");
		const removeConfirm = window.confirm("Are you sure you want to remove the routine for " + dateString + "?");
		if (removeConfirm) {
			updateDoc(doc(db, `users/${currentUser.uid}/schedule`, dateString), {
				exercises: deleteField(),
				completed: deleteField(),
				name: deleteField(),
			});
			setModalShow(false);
		}
	}

	// Select Routine Modal for Change Routine Button
	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Select Routine</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* Show the workouts in the routine */}
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
			{/* Show remove button if there is a routine selected */}
			{dayData?.name && (
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
