import React from "react";
import Card from "react-bootstrap/Card";
import { MdEdit } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

function RoutineItem({ id, name, exercises, setModalShow, setCurrentRoutine }) {
	const { currentUser } = useAuth();

	async function handleModal() {
		setModalShow(true);
		const routineRef = doc(db, `users/${currentUser.uid}/routines/`, id);
		const routineSnap = await getDoc(routineRef);
		setCurrentRoutine({ ...routineSnap.data(), id: routineSnap.id });
	}

	return (
		<Card className="newRoutine workoutItemCard hover-overlay shadow-1-strong" role="button" onClick={() => handleModal()}>
			<Card.Body className="d-flex align-items-center justify-content-between">
				<div>
					<Card.Title className="text-light">{name}</Card.Title>
					<Card.Subtitle className="text-light">{exercises.length} workouts</Card.Subtitle>
				</div>
				<span role="button">
					<MdEdit color="white" size="2em" />
				</span>
			</Card.Body>
		</Card>
	);
}

export default RoutineItem;
