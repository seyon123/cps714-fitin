import React, { useEffect, useState } from "react";
import { Container, Card, InputGroup, Form, Button }  from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { DayPicker } from "react-day-picker";
import { MdAddCircle, MdAddCircleOutline } from "react-icons/md";
import "react-day-picker/dist/style.css";
import "./WorkoutPage.css";

import RoutineItem from "../components/RoutineItem";
import RoutineWorkoutItem from "../components/RoutineWorkoutItem";
import ExploreWorkouts from "../components/ExploreWorkouts";
import CreateRoutine from "../components/Modals/CreateRoutine";

function WorkoutPage() {
	const [date, setDate] = useState(new Date());
	const [modalShow, setModalShow] = useState(false);
	const [routines, setRoutines] = useState([]);
	const [pageSteps, setPageSteps] = useState(4000); // pagesteps should be independant of what we have in firebase
	const { currentUser } = useAuth();

	const dummyWorkouts = [
		{ id: 1, name: "Deadlift", reps: "12", sets: "4", image: "dead-lift.png", completed: false },
		{ id: 2, name: "Bentover Row", reps: "12", sets: "4", image: "bentoverrow.png", completed: false },
		{ id: 3, name: "Deadlift", reps: "12", sets: "4", image: "dead-lift.png", completed: true },
		{ id: 4, name: "Bentover Row", reps: "12", sets: "4", image: "bentoverrow.png", completed: true },
		{ id: 5, name: "Deadlift", reps: "12", sets: "4", image: "dead-lift.png", completed: false },
		{ id: 6, name: "Bentover Row", reps: "12", sets: "4", image: "bentoverrow.png", completed: false },
	];

	useEffect(() => {
		document.title = `Workout Page | FitIn`;
	}, []);

	useEffect(
		() =>
			onSnapshot(collection(db, `users/${currentUser.uid}/routines`), (snapshot) => {
				setRoutines(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			}),
		[currentUser.uid]
	);

	function changeRoutine() {
		alert("Change Routine");
	}

	function getStepsOfDay() {
		// Using the current date as a filter, get the steps field from firebase
		// setPageSteps(300);
		return pageSteps;
	}

	function setStepsOfDay() {
		var newSteps = document.getElementById('newSteps').value;
		setPageSteps(Number(newSteps));
	}

	function addToSteps(n) {
		var currentSteps = document.getElementById('newSteps').value
		document.getElementById('newSteps').value = Number(currentSteps) + n;
	}

	return (
		<Container fluid className="mainPage px-4">
			<CreateRoutine show={modalShow} onHide={() => setModalShow(false)} setModalShow={setModalShow}></CreateRoutine>

			<h1 className="pt-4">My Workouts</h1>
			<hr></hr>

			<div className="row">
				<div className="col-md-3">
					<div className="calendarStyle">
						<DayPicker required numberOfMonths={1} pagedNavigation mode="single" onSelect={setDate} selected={date} />
					</div>
					<div className="col-md-22">
						<Card bg="dark">
							<Card.Header className="currentStepHead">Track your steps for this day</Card.Header>
							<Card.Body style={{ overflowY: "auto", maxHeight: "50vh" }}>
								<br/>
								<h3>Your steps: {pageSteps}</h3>
								<br/>
								<InputGroup>
									<Button onClick={() => addToSteps(-10)} variant="outline-secondary">-10</Button>
									<Button onClick={() => addToSteps(10)} variant="outline-secondary">+10</Button>
									<Form.Control
										id="newSteps"
										defaultValue="3000"
										placeholder="Update your steps"
										aria-label="Update your steps for today."
									></Form.Control>
									<Button variant="primary" type="submit" onClick={setStepsOfDay}>Update</Button>
								</InputGroup>
							</Card.Body>
						</Card>
					</div>
					<br/>
				</div>
				<div className="col-md-6">
					<Card className="currentRoutine" bg="dark">
						<Card.Header className="currentRoutineHead">{date?.toDateString()}</Card.Header>
						<Card.Title>
							<p className="m-3">
								<span>Routine: </span> <span>"My Pull Day"</span>
								<span className="float-end" role="button" onClick={changeRoutine}>
									<MdAddCircle />
									&nbsp; Change Routine
								</span>
							</p>
						</Card.Title>
						<Card.Body style={{ overflowY: "auto", maxHeight: "50vh" }}>
							{dummyWorkouts.map(({ id, name, completed, image, sets, reps }) => (
								<RoutineWorkoutItem key={id} id={id} name={name} completed={completed} image={image} sets={sets} reps={reps} />
							))}
						</Card.Body>
					</Card>
				</div>

				<div className="col-md-3">
					<Card bg="dark" className="h-100">
						<Card.Header className="myRoutines">My Routines</Card.Header>
						<Card.Body style={{ overflowY: "auto", maxHeight: "50vh" }}>
							{routines?.length > 0 && routines.map(({ id, name, exercises }) => <RoutineItem key={id} id={id} name={name} exercises={exercises} />)}
							{/* Add New Routine */}
							<Card className="newRoutine" bg="dark" border="white" role="button" onClick={() => setModalShow(true)}>
								<Card.Body className="d-flex align-items-center justify-content-between">
									<Card.Title className="text-light mb-0">New Routine</Card.Title>
									<span>
										<MdAddCircleOutline size="2em" />
									</span>
								</Card.Body>
							</Card>
						</Card.Body>
					</Card>
				</div>
			</div>

			<h1 className="pt-4">Explore Workouts</h1>
			<hr></hr>

			<ExploreWorkouts />
			<br></br>
			<br></br>
		</Container>
	);
}

export default WorkoutPage;