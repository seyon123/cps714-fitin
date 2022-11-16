import { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { getDoc } from "firebase/firestore";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
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

	useEffect(() => {
		exercises.forEach((item) => {
			if (item.ref === docRef) {
				setNumSets(item.sets);
				setNumReps(item.reps);
			}
		});
	}, [exercises, docRef]);

	const updateSets = (docRef, amount) => {
		const exercisesList = exercises;
		exercisesList.forEach((item) => {
			if (item.ref === docRef) {
				setNumSets(Math.max(1, item.sets + amount));
				item.sets = Math.max(1, item.sets + amount);
			}
		});
		setExercises(exercisesList);
	};

	const updateReps = (docRef, amount) => {
		const exercisesList = exercises;
		exercisesList.forEach((item) => {
			if (item.ref === docRef) {
				setNumReps(Math.max(1, item.reps + amount));
				item.reps = Math.max(1, item.reps + amount);
			}
		});
		setExercises(exercisesList);
	};

	return (
		workout && (
			<Card key={workout.id} className="exercise-row">
				<Card.Body className="d-flex align-items-center justify-content-between">
					<div>
						<Image src={workout.data().imageURL} alt="Exercise Thumbnail" className="workoutItemImg float-start" />
						<h4 className="float-end">{workout.data().name}</h4>
					</div>
					<div className="d-flex align-items-center justify-content-between w-30">
						<div className="d-flex flex-column align-items-center justify-content-between w-100">
							<span role="button" onClick={() => updateSets(docRef, 1)}>
								<FaChevronUp size="2em" />
							</span>
							<h5 className="text-center">
								{numSets} {numSets > 1 ? "sets" : "set"}
							</h5>
							<span role="button" onClick={() => updateSets(docRef, -1)}>
								<FaChevronDown size="2em" />
							</span>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-between w-100">
							<span role="button" onClick={() => updateReps(docRef, 1)}>
								<FaChevronUp size="2em" />
							</span>
							<h5 className="text-center">
								{numReps} {numReps > 1 ? "reps" : "rep"}
							</h5>
							<span role="button" onClick={() => updateReps(docRef, -1)}>
								<FaChevronDown size="2em" />
							</span>
						</div>
						<div>
							<span role="button" onClick={() => removeFromRoutine(`workouts/${workout.id}`)}>
								<MdDelete color="white" size="2em" />
							</span>
						</div>
					</div>
				</Card.Body>
			</Card>
		)
	);
}

export default ExerciseItem;
