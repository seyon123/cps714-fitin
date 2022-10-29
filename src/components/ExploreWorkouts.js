import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import ExerciseInfoModal from "./Modals/ExerciseInfoModal";
import "./ExploreWorkouts.css";

function ExploreWorkouts({ workouts }) {
	const [show, setShow] = useState(false);
	const [categories, setCategories] = useState([]);
	const [workoutName, setWorkoutName] = useState("");
	const [workoutImage, setWorkoutImage] = useState([]);
	const [workoutDescription, setWorkoutDescription] = useState([]);

	useEffect(() => {
		onSnapshot(collection(db, `workoutCategories`), (snapshot) => {
			setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, []);

	const handleShow = (name, images, description) => {
		setWorkoutName(name);
		setWorkoutImage(images);
		setWorkoutDescription(description);
		setShow(true);
	};
	const handleClose = () => {
		setWorkoutName([]);
		setWorkoutImage([]);
		setShow(false);
	};

	return (
		<div className="exploreWorkoutsContainer">
			<h1 className="pt-4">Explore Workouts</h1>
			<hr></hr>
			<Container fluid className="p-0">
				<div className="categoriesContainer">
					<Row className="m-0" style={{ flexWrap: "unset" }}>
						{categories?.map(({ id, name }) => (
							<Col key={id} className="px-2">
								<Button>
									<h5 style={{ margin: "0px" }} className="text-nowrap mx-3">
										{name}
									</h5>
								</Button>
							</Col>
						))}
					</Row>
				</div>
			</Container>

			<Container fluid className="p-0">
				<div className="workoutsContainer">
					<Row style={{ flexWrap: "unset" }}>
						{workouts.map(({ id, name, description, imageURL }) => (
							<Col className="colWorkout" key={id}>
								<Card className="workoutCard" bg="dark" role="button" onClick={() => handleShow(name, description.images, description.instructions)}>
									<Card.Img className="workoutCardImg" variant="top" src={imageURL} />
									<Card.Body style={{ minHeight: "70px" }}>
										<Card.Title>{name}</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</Container>
			<ExerciseInfoModal show={show} onClose={handleClose} workoutName={workoutName} workoutImage={workoutImage} workoutDescription={workoutDescription} />
			<br></br>
		</div>
	);
}

export default ExploreWorkouts;
