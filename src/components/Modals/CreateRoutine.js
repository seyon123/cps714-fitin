import { useState, useEffect } from "react";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { doc, addDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { MdAddCircleOutline } from "react-icons/md";
import ExerciseItem from "./ExerciseItem";
import SelectWorkoutItem from "./SelectWorkoutItem";
import "./CreateRoutine.css";

function CreateRoutine({ show, onHide, setModalShow, currentRoutine }) {
	const { currentUser } = useAuth();
	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [routineName, setRoutineName] = useState("");
	const [showWorkoutList, viewWorkoutList] = useState(false);

	useEffect(
		() =>
			onSnapshot(collection(db, `workouts`), (snapshot) => {
				setWorkouts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			}),
		[currentUser.uid]
	);

	useEffect(() => {
		setExercises(currentRoutine.exercises);
		setRoutineName(currentRoutine.name);
	}, [currentRoutine]);

	const resetState = () => {
		setExercises([]);
		setRoutineName("");
		viewWorkoutList(false);
	};

	const addToRoutine = async (workoutPath) => {
		const docRef = doc(db, workoutPath);
		const docSnap = await getDoc(docRef);
		let exercisesList = exercises;
		exercisesList.push({ ref: docRef, id: docSnap.id, sets: 3, reps: 10 });
		setExercises(exercisesList);
	};

	const removeFromRoutine = async (workoutPath) => {
		const docToRemove = await getDoc(doc(db, workoutPath));
		let exercisesList = exercises;
		exercisesList = exercisesList.filter((item) => item.id !== docToRemove.id);
		setExercises(exercisesList);
	};

	async function onSubmit() {
		setModalShow(false);
		await addDoc(collection(db, `users/${currentUser.uid}/routines`), {
			name: routineName,
			exercises: exercises,
		});
		resetState();
	}

	return (
		<Modal show={show} onHide={onHide} setModalShow={setModalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onExit={() => resetState()} className="create-routine">
			<Modal.Header closeButton closeVariant="white">
				{console.log(currentRoutine)}
				<Modal.Title id="contained-modal-title-vcenter">
					<input
						maxlength="50"
						value={routineName}
						className="routine-title"
						type="text"
						placeholder="New Routine Name"
						onChange={(e) => setRoutineName(e.target.value)}
						style={{ display: !showWorkoutList ? "block" : "none" }}
					/>
					<h3 style={{ display: showWorkoutList ? "block" : "none" }}>Select Workouts</h3>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Container className="routine-modalContainer" style={{ display: !showWorkoutList ? "block" : "none" }}>
					{exercises?.map(({ id, ref }) => (
						<ExerciseItem key={id} docRef={ref} exercises={exercises} setExercises={setExercises} removeFromRoutine={removeFromRoutine} />
					))}
					<Card className="workoutItemCard hover-overlay" role="button" onClick={() => viewWorkoutList(true)}>
						<Card.Body className="d-flex align-items-center justify-content-center">
							<span className="pe-3">
								<MdAddCircleOutline size="3em" />
							</span>
							<h3>Add Workout</h3>
						</Card.Body>
					</Card>
				</Container>

				<Container className="workouts-selection-container" style={{ display: showWorkoutList ? "block" : "none" }}>
					{workouts.map(({ id, name, imageURL }) => {
						return <SelectWorkoutItem key={id} id={id} name={name} imageURL={imageURL} exercises={exercises} addToRoutine={addToRoutine} removeFromRoutine={removeFromRoutine} />;
					})}
				</Container>
			</Modal.Body>

			<Modal.Footer className="border-0">
				<Button closeButton className="btn-secondary" style={{ display: showWorkoutList ? "block" : "none" }} onClick={() => viewWorkoutList(false)}>
					Select
				</Button>
				<Button className="submit-button" style={{ display: !showWorkoutList ? "block" : "none" }} onClick={() => onSubmit()}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateRoutine;
