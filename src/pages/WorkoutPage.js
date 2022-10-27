import { useEffect, useState } from "react";
import moment from "moment";
import { Container, Card } from "react-bootstrap";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { DayPicker } from "react-day-picker";
import { MdAddCircleOutline } from "react-icons/md";
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
	const [currentRoutine, setCurrentRoutine] = useState({ name: "", exercises: [] });
	const [todaysWorkouts, setTodaysWorkouts] = useState(null);
	const { currentUser } = useAuth();

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

	useEffect(() => {
		async function getTodaysRoutine() {
			const dateString = moment(date).format("YYYY-MM-DD");
			const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
			const docScheduleSnap = await getDoc(docRef);
			if (docScheduleSnap.exists()) {
				const docRoutineSnap = await getDoc(docScheduleSnap.data().ref);
				if (docRoutineSnap.exists()) {
					setTodaysWorkouts({ ...docRoutineSnap.data(), id: docRoutineSnap.id });
				}
			} else {
				setTodaysWorkouts(null);
			}
		}
		getTodaysRoutine();
	}, [date, currentUser.uid, changeRoutineShow]);

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
				</div>

				{/* Today's Workouts */}
				<div className="col-md-6">
					<Card className="currentRoutine" bg="dark">
						<Card.Header className="currentRoutineHead">{date?.toDateString()}</Card.Header>
						<Card.Title>
							<p className="m-3">
								<span>{todaysWorkouts?.name}</span>

								{/* Change Routine Button */}
								<span className="float-end" role="button" onClick={() => setChangeRoutineShow(true)}>
									<MdAddCircleOutline />
									&nbsp; {todaysWorkouts ? "Change Routine" : "Add Routine"}
								</span>
							</p>
						</Card.Title>

						{/* List of Workouts */}
						<Card.Body style={{ overflowY: "auto", maxHeight: "50vh" }}>
							{todaysWorkouts?.exercises.map(({ id, ref, completed, sets, reps }) => (
								<RoutineWorkoutItem key={id} id={id} docRef={ref} completed={completed} sets={sets} reps={reps} date={date} />
							))}
						</Card.Body>
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

			{/* Explore Workouts Component */}
			<ExploreWorkouts />

			{/* Create Routine Modal */}
			<CreateRoutineModal show={modalShow} onHide={() => setModalShow(false)} setModalShow={setModalShow} setCurrentRoutine={setCurrentRoutine} currentRoutine={currentRoutine} />

			{/* Change Routine Modal */}
			<ChangeRoutineModal show={changeRoutineShow} onHide={() => setChangeRoutineShow(false)} setModalShow={setChangeRoutineShow} routines={routines} date={date} />
		</Container>
	);
}

export default WorkoutPage;
