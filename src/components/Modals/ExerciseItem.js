import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
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
			<Row key={workout.id} className="exercise-row">
				<Col md="auto">
					<img src={workout.data().imageURL} alt="Exercise Thumbnail" className="img-thumbnail" />
				</Col>
				<Col>
					<h4>{workout.data().name}</h4>
				</Col>
				<Col md="auto">
					<span className="up-button" onClick={() => updateSets(docRef, 1)}></span>
					<h5>{numSets} sets</h5>
					<span className="down-button" onClick={() => updateSets(docRef, -1)}></span>
				</Col>
				<Col md="auto">
					<span className="up-button" onClick={() => updateReps(docRef, 1)}></span>
					<h5>{numReps} reps</h5>
					<span className="down-button" onClick={() => updateReps(docRef, -1)}></span>
				</Col>
				<Col md={1} className="align-right" onClick={() => removeFromRoutine(`workouts/${workout.id}`)}>
					{" "}
					X{" "}
				</Col>
			</Row>
		)
	);
}

export default ExerciseItem;
