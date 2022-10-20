import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import RoutineItem from "../components/RoutineItem";
import RoutineWorkoutItem from "../components/RoutineWorkoutItem";
import ExploreWorkouts from "../components/ExploreWorkouts";

import { MdAddCircle, MdAddCircleOutline } from "react-icons/md";

import "./WorkoutPage.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function WorkoutPage() {
	const [date, setDate] = useState(new Date());

	const dummyRoutines = [
		{ id: 1, name: "Push Day", exercises: "4" },
		{ id: 2, name: "Pull Day", exercises: "5" },
	];

	const dummyWorkouts = [
		{ id: 1, name: "Deadlift", reps: "12", sets: "4", image: "deadlift.png", completed: false },
		{ id: 2, name: "Bentover Row", reps: "12", sets: "4", image: "bentoverrow.png", completed: false },
		{ id: 3, name: "Deadlift", reps: "12", sets: "4", image: "deadlift.png", completed: true },
		{ id: 4, name: "Bentover Row", reps: "12", sets: "4", image: "bentoverrow.png", completed: true },
		{ id: 5, name: "Deadlift", reps: "12", sets: "4", image: "deadlift.png", completed: false },
		{ id: 6, name: "Bentover Row", reps: "12", sets: "4", image: "bentoverrow.png", completed: false },
	];

	useEffect(() => {
		document.title = `Workout Page | FitIn`;
	}, []);

	function changeRoutine() {
		alert("Change Routine");
	}

	function newRoutine() {
		alert("Create New Routine");
	}

	return (
		<Container fluid className="mainPage px-4">
			<h1>My Workouts</h1>
			<hr></hr>

			<div className="row">
				<div className="col-md-3">
					<div className="calendarStyle">
						<DayPicker numberOfMonths={1} pagedNavigation mode="single" onSelect={setDate} selected={date} />
					</div>
				</div>
				<div className="col-md-6" style={{ height: "80%" }}>
					<Card className="currentRoutine" bg="dark">
						<Card.Header className="currentRoutineHead">{date.toDateString()}</Card.Header>
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
						<Card.Body style={{ overflowY: "auto" }}>
							{dummyRoutines.map(({ id, name, exercises }) => (
								<RoutineItem key={id} id={id} name={name} exercises={exercises} />
							))}

							{/* Add New Routine */}
							<Card bg="dark" border="white" role="button" onClick={newRoutine}>
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

			<h1>Explore Workouts</h1>
			<hr></hr>

			<ExploreWorkouts />
			<br></br>
			<br></br>
		</Container>
	);
}

export default WorkoutPage;
