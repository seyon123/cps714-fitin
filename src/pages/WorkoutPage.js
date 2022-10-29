import { useEffect, useState } from "react";
import moment from "moment";
import { Container, Card, InputGroup, Form, Button } from "react-bootstrap";
import { collection, onSnapshot, doc, getDoc, query, orderBy } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { DayPicker } from "react-day-picker";
import { MdAddCircleOutline, MdEdit } from "react-icons/md";
import "react-day-picker/dist/style.css";
import "./WorkoutPage.css";

import RoutineItem from "../components/RoutineItem";
import RoutineWorkoutItem from "../components/RoutineWorkoutItem";
import ExploreWorkouts from "../components/ExploreWorkouts";
import CreateRoutineModal from "../components/Modals/CreateRoutineModal";
import ChangeRoutineModal from "../components/Modals/ChangeRoutineModal";

function WorkoutPage() {
	const [date, setDate] = useState(new Date());
	const [modalShow, setModalShow] = useState(false);
	const [changeRoutineShow, setChangeRoutineShow] = useState(false);
	const [routines, setRoutines] = useState([]);
	const [pageSteps, setPageSteps] = useState(4000); // pagesteps should be independant of what we have in firebase
	const [currentRoutine, setCurrentRoutine] = useState({ name: "", exercises: [] });
	const [todaysWorkouts, setTodaysWorkouts] = useState(null);
	// const [completedWorkouts, setCompletedWorkouts] = useState([]);

	const { currentUser } = useAuth();

	// const updateCompletedWorkouts = (list) => {
	// 	setCompletedWorkouts(list);
	// };

	// Set the page title
	useEffect(() => {
		document.title = `Workout Page | FitIn`;
	}, []);

	// Get all user defined routines
	useEffect(
		() =>
			onSnapshot(query(collection(db, `users/${currentUser.uid}/routines`), orderBy("name")), (snapshot) => {
				setRoutines(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			}),
		[currentUser.uid]
	);
	// Get a list of all the workouts for the current day
	useEffect(() => {
		async function getTodaysRoutine() {
			const dateString = moment(date).format("YYYY-MM-DD");
			const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
			const docScheduleSnap = await getDoc(docRef);
			if (docScheduleSnap.exists()) {
				setTodaysWorkouts({ ...docScheduleSnap.data(), id: docScheduleSnap.id });
			} else {
				setTodaysWorkouts(null);
			}
		}
		getTodaysRoutine();
	}, [date, currentUser.uid, changeRoutineShow]);

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
			<h1 className="pt-4">My Workouts</h1>
			<hr></hr>

			<div className="row">
				{/* Calendar Widget */}
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

				{/* Today's Workouts */}
				<div className="col-md-6">
					<Card className="currentRoutine" bg="dark">
						<Card.Header className="currentRoutineHead">{date?.toDateString()}</Card.Header>
						<Card.Title className="m-3 d-flex justify-content-between align-items-center">
							<span className="h3 m-0">{todaysWorkouts ? todaysWorkouts.name : "No routine selected 😞"}</span>
							{/* Change Routine Button */}
							{todaysWorkouts && (
								<span className="d-flex align-items-center justify-content-between" role="button" onClick={() => setChangeRoutineShow(true)}>
									{" Change Routine"}
									<MdEdit size="1.2em" className="ms-2" />
								</span>
							)}
						</Card.Title>

						<Card.Body style={{ overflowY: "auto", maxHeight: "50vh" }}>
							{/* Seect Routine Button */}
							{!todaysWorkouts && (
								<Card className="workoutItemCard hover-overlay" role="button" onClick={() => setChangeRoutineShow(true)}>
									<Card.Body className="d-flex align-items-center justify-content-center ">
										<span className="pe-3">
											<MdAddCircleOutline size="3em" />
										</span>
										<h3 className="text-light mb-0">Select Routine</h3>
									</Card.Body>
								</Card>
							)}
							{/* List of Workouts for Day*/}
							{todaysWorkouts?.exercises.map(({ id, ref, sets, reps }) => (
								<RoutineWorkoutItem
									key={id}
									id={id}
									docRef={ref}
									sets={sets}
									reps={reps}
									date={date}
									todaysWorkouts={todaysWorkouts}
									// updateCompletedWorkouts={updateCompletedWorkouts}
								/>
							))}
						</Card.Body>
						{/* <Card.Footer>{`${completedWorkouts?.length}/${todaysWorkouts?.exercises.length} exercises completed`}</Card.Footer> */}
					</Card>
				</div>

				{/* My Routines */}
				<div className="col-md-3">
					<Card bg="dark" className="h-100">
						<Card.Header className="myRoutines">My Routines</Card.Header>
						<Card.Body style={{ overflowY: "auto", maxHeight: "50vh" }}>
							{/* List of Routines */}
							{routines?.length > 0 &&
								routines.map(({ id, name, exercises }) => (
									<RoutineItem key={id} id={id} name={name} exercises={exercises} setModalShow={setModalShow} setCurrentRoutine={setCurrentRoutine} />
								))}

							{/* New Routine Button */}
							<Card className="newRoutine" bg="dark" border="white" role="button" onClick={() => setModalShow(true)}>
								<Card.Body className="d-flex align-items-center justify-content-between">
									<Card.Title className="text-light mb-0">Create Routine</Card.Title>
									<span>
										<MdAddCircleOutline size="2em" />
									</span>
								</Card.Body>
							</Card>
						</Card.Body>
					</Card>
				</div>
			</div>

			{/* Explore Workouts Component */}
			<ExploreWorkouts />

			{/* Create Routine Modal */}
			<CreateRoutineModal show={modalShow} onHide={() => setModalShow(false)} setModalShow={setModalShow} setCurrentRoutine={setCurrentRoutine} currentRoutine={currentRoutine} />

			{/* Change Routine Modal */}
			<ChangeRoutineModal
				show={changeRoutineShow}
				onHide={() => setChangeRoutineShow(false)}
				setModalShow={setChangeRoutineShow}
				routines={routines}
				todaysWorkouts={todaysWorkouts}
				date={date}
			/>
		</Container>
	);
}

export default WorkoutPage;
