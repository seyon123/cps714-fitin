import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { getDoc } from "firebase/firestore";
import "./ExerciseItem.css";

function ExerciseItem({ docRef, exercises, setExercises, removeFromRoutine }) {
	const [workout, setWorkout] = useState();
	const [numSets, setNumSets] = useState(3);
	const [numReps, setNumReps] = useState(10);

	const fetchDocByRef = async (docRef) => {
		setWorkout(await getDoc(docRef));
	};

	useEffect(() => {
		fetchDocByRef(docRef);
	}, [docRef]);

	const updateSets = (docRef, amount) => {
		const exercisesList = exercises;
		exercisesList.forEach((item) => {
			if (item.ref === docRef) {
				setNumSets(Math.max(0, item.sets + amount));
				item.sets = Math.max(0, item.sets + amount);
			}
		});
		setExercises(exercisesList);
	};

	const updateReps = (docRef, amount) => {
		const exercisesList = exercises;
		exercisesList.forEach((item) => {
			if (item.ref === docRef) {
				setNumReps(Math.max(0, item.reps + amount));
				item.reps = Math.max(0, item.reps + amount);
			}
		});
		setExercises(exercisesList);
	};

	return (
		workout && (
			<Card key={workout.id} className="exercise-row">
				<Card.Body className="d-flex align-items-center justify-content-between">
					<div className="">
						<img src={workout.data().imageURL} alt="Exercise Thumbnail" className="workoutItemImg float-start" />
						<h4 className="float-end">{workout.data().name}</h4>
					</div>
					<div className="d-flex align-items-center justify-content-between w-25">
						<div>
							<span className="up-button" onClick={() => updateSets(docRef, 1)}></span>
							<h5>{numSets} sets</h5>
							<span className="down-button" onClick={() => updateSets(docRef, -1)}></span>
						</div>
						<div>
							<span className="up-button" onClick={() => updateReps(docRef, 1)}></span>
							<h5>{numReps} reps</h5>
							<span className="down-button" onClick={() => updateReps(docRef, -1)}></span>
						</div>
						<div role="button">
							<MdDelete color="white" size="2em" />
						</div>
					</div>
				</Card.Body>
			</Card>
		)
	);
}

export default ExerciseItem;
