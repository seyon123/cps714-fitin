import React, { useEffect, useState } from "react";
import moment from "moment";
import { getDoc, doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import "./RoutineWorkoutItem.css";

function RoutineWorkoutItem({ id, docRef, sets, reps, date }) {
	const { currentUser } = useAuth();
	const [workout, setWorkout] = useState();
	const [workoutCompleted, setWorkoutCompleted] = useState(false);

	useEffect(() => {
		async function getWorkout() {
			const workoutDocSnap = await getDoc(docRef);
			setWorkout({ ...workoutDocSnap.data(), id: workoutDocSnap.id });
		}
		getWorkout();
	}, [docRef]);

	useEffect(() => {
		async function checkChecked() {
			const dateString = moment(date).format("YYYY-MM-DD");
			const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
			const docScheduleSnap = await getDoc(docRef);
			if (docScheduleSnap.data()?.completed?.includes(id)) {
				setWorkoutCompleted(true);
			}
		}
		checkChecked();
	}, [date, id, currentUser.uid]);

	async function handleWorkoutCompleted(checked) {
		setWorkoutCompleted(checked);
		const dateString = moment(date).format("YYYY-MM-DD");
		const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
		if (checked) {
			await updateDoc(docRef, { completed: arrayUnion(id) });
		} else {
			await updateDoc(docRef, { completed: arrayRemove(id) });
		}

		// TODO: Update workout completed status in Firestore DB

		// TEMP LOGIC
		// var workoutById = workoutObj.find((workout) => workout.id === id);
		// workoutById.completed = !workoutById.completed;
	}

	return (
		<Card className="workoutItemCard hover-overlay shadow-1-strong" onClick={() => handleWorkoutCompleted(!document.getElementById(`checkbox-${id}`).checked)}>
			<Card.Body role="button">
				<img className="workoutItemImg float-start" src={workout?.imageURL} alt={workout?.name}></img>
				<Card.Title className="text-light">
					{workout?.name}
					<input className="form-check-input float-end" type="checkbox" id={`checkbox-${id}`} onChange={(e) => handleWorkoutCompleted(e.target.checked)} checked={workoutCompleted}></input>
				</Card.Title>
				<Card.Subtitle className="mb-2 text-light">
					{sets} sets | {reps} reps
				</Card.Subtitle>
			</Card.Body>
		</Card>
	);
}

export default RoutineWorkoutItem;
