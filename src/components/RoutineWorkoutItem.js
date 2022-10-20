import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./RoutineWorkoutItem.css";

function RoutineWorkoutItem({ id, name, completed, image, sets, reps }) {
	const [workoutCompleted, setWorkoutCompleted] = useState(completed);

	function handleWorkoutCompleted(checked) {
		setWorkoutCompleted(checked);

		// TODO: Update workout completed status in Firestore DB

		// TEMP LOGIC
		// var workoutById = workoutObj.find((workout) => workout.id === id);
		// workoutById.completed = !workoutById.completed;
	}

	return (
		<Card className="workoutItemCard" onClick={() => handleWorkoutCompleted(!document.getElementById(`checkbox-${id}`).checked)}>
			<Card.Body role="button">
				<img className="workoutItemImg float-start" src={image} alt={name}></img>
				<Card.Title className="text-light">
					{name}
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
