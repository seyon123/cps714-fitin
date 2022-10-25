import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { doc, addDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { MdAddCircleOutline } from "react-icons/md";
import ExerciseItem from "./ExerciseItem";
import "./CreateRoutine.css";

function CreateRoutine({ show, onHide, setModalShow }) {
	const { currentUser } = useAuth();
	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [routineName, setRoutineName] = useState("New Routine");
	const [showWorkoutList, viewWorkoutList] = useState(false);

	useEffect(
		() =>
			onSnapshot(collection(db, `workouts`), (snapshot) => {
				setWorkouts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			}),
		[currentUser.uid]
	);

	const workoutList = workouts.map(({ id, name }) => {
		return (
			<Row className="exercise-row" key={id}>
				<Col md="auto">
					<input
						type="checkbox"
						value={name}
						name="workout"
						onChange={(event) => {
							event.target.checked ? addToRoutine(`workouts/${id}`) : removeFromRoutine(`workouts/${id}`);
						}}
					/>
				</Col>
				<Col md="auto">
					<label htmlFor={name}>{name}</label>
				</Col>
			</Row>
		);
	});

	const resetState = () => {
		setExercises([]);
		setRoutineName("New Routine");
		viewWorkoutList(false);
	};

	const addToRoutine = (workoutPath) => {
		const workoutDocumentRef = doc(db, workoutPath);
		const exercisesList = exercises;
		exercisesList.push({ ref: workoutDocumentRef, sets: 0, reps: 0 });
		setExercises(exercises);
	};

	const removeFromRoutine = async (workoutPath) => {
		const docRefToRemove = await getDoc(doc(db, workoutPath));
		const results = await filter(exercises, async ({ref}) => {
			const docRef = await getDoc(ref);
			return docRefToRemove.id !== docRef.id;
		});
		setExercises(results);
	};

	async function filter(arr, callback) {
		const fail = Symbol()
		return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
	}

	async function onSubmit() {
		resetState();
		setModalShow(false);
		await addDoc(collection(db, `users/${currentUser.uid}/routines`), {
			name: routineName,
			exercises: exercises,
		});
	}

	return (
		<Modal show={show} onHide={onHide} setModalShow={setModalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onExit={() => resetState()} className="create-routine">
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title id="contained-modal-title-vcenter">
					<input className="routine-title" type="text" placeholder={routineName} onChange={(e) => setRoutineName(e.target.value)} style={{ display: !showWorkoutList ? "block" : "none" }} />
					<h3 style={{ display: showWorkoutList ? "block" : "none" }}>Select Workouts</h3>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Container className="routine-modalContainer" style={{ display: !showWorkoutList ? "block" : "none" }}>
					{exercises.map(({ ref, sets, reps }) => (
						<ExerciseItem docRef={ref} exercises={exercises} setExercises={setExercises} removeFromRoutine={removeFromRoutine} />
					))}

					<Row className="exercise-row add-exercise" onClick={() => viewWorkoutList(true)}>
						<Col md="auto">
							<MdAddCircleOutline size="4em" />
						</Col>
						<Col>
							<h4>Add Workout</h4>
						</Col>
					</Row>
				</Container>

				<Container className="workouts-selection-container" style={{ display: showWorkoutList ? "block" : "none" }}>
					{workoutList}
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
