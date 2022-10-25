import React, { useState } from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Row, Col, Button, Container } from "react-bootstrap";
import "./ExploreWorkouts.css";
import Card from "react-bootstrap/Card";
import ExerciseInfoModal from "./Modals/ExerciseInfoModal";

function ExploreWorkouts() {
	const workouts = [
		{ id: 1, type: 1, images: ["workoutPlaceholder.png"], name: "Aerobics", description: ["description 1" ] },
		{ id: 2, type: 2, images: ["workoutplaceholder2.jpg"], name: "Circuit Training", description: ["description 2"] },
		{ id: 3, type: 3, images: ["workoutPlaceholder.png", "workoutplaceholder2.jpg"], name: "Cycling", description: ["description 3","description 312312", "description 3312"] },
		{ id: 4, type: 4, images: ["workoutplaceholder2.jpg"], name: "Hiking", description: ["description 4"] },
		{ id: 5, type: 5, images: ["workoutPlaceholder.png"], name: "Running", description: ["description 5"] },
		{ id: 6, type: 6, images: ["workoutPlaceholder.png"], name: "Skipping Rope", description: ["description 6"] },
		{ id: 7, type: 7, images: ["workoutPlaceholder.png"], name: "Swimming", description: ["description 7"] },
		{ id: 8, type: 8, images: ["workoutPlaceholder.png"], name: "Walking", description: ["description 8"] },
	];

	const workoutTypes = [
		{ id: 1, type: "Back" },
		{ id: 2, type: "Chest" },
		{ id: 3, type: "Yoga" },
		{ id: 4, type: "Legs" },
		{ id: 5, type: "Stretches" },
		{ id: 6, type: "Weights" },
		{ id: 7, type: "Machines" },
		{ id: 9, type: "Back" },
		{ id: 10, type: "Chest" },
		{ id: 11, type: "Yoga" },
		{ id: 12, type: "Legs" },
		{ id: 13, type: "Stretches" },
		{ id: 16, type: "Dumbell Only"}
	];

	const [show, setShow] = useState(false);
	const [workoutName, setWorkoutName] = useState("");
	const [workoutImage, setWorkoutImage] = useState([]);
	const [workoutDescription, setWorkoutDescription] = useState([]);

    const handleShow = (name, images, description) => {
		setWorkoutName(name);
		setWorkoutImage(images);
		setWorkoutDescription(description);
		setShow(true);
	}
    const handleClose = () => {
		setWorkoutName([]);
		setWorkoutImage([]);
		setShow(false);
	}

	return (
		<div className="exploreWorkoutsContainer">
			<Container fluid>
				<Row>
					<h3>Categories</h3>
				</Row>
				<div className="categoriesContainer">
					<Row style={{flexWrap: "unset"}}>
						{workoutTypes.map(({ id, type }) => (
							<Col key={id} style={{paddingRight: "1%"}}>
								<Button>
									<h4 style={{paddingRight: "20px", paddingLeft: "20px", margin: "0px"}} className="text-nowrap">{type}</h4>
								</Button>
							</Col>
						))}
					</Row>
				</div>
			</Container>
				<br/><br/>
			<Container fluid>
				<Row>
					<h3>Fitin Workouts</h3>
				</Row>
				<div className="workoutsContainer">
					<Row style={{flexWrap: "unset"}}>
						{workouts.map(({ id, name, images, description }) => (
							<Col className="colWorkout" key={id}>
								<Card className="workoutCard" bg="dark" role="button" onClick={() => handleShow(name, images, description)}>
									<Card.Img className="workoutCardImg" variant="top" src={images[0]} />
									<Card.Body style={{ minHeight: "70px" }}>
										<Card.Title>{name}</Card.Title>
									</Card.Body>
								</Card>
							</Col>
					))}
					</Row>
				</div>
			</Container>
			<ExerciseInfoModal show={show} onClose={handleClose} workoutName={workoutName} workoutImage={workoutImage} workoutDescription={workoutDescription}/>
		</div>
	);
}

export default ExploreWorkouts;
