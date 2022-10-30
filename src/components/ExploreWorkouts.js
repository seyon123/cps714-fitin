import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import ExerciseInfoModal from "./Modals/ExerciseInfoModal";
import "./ExploreWorkouts.css";

function ExploreWorkouts({ workouts }) {
	const [show, setShow] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
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
			<Container fluid className="p-0 mb-3">
				<div className="categoriesContainer">
					<Row className="m-0" style={{ flexWrap: "unset" }}>
						<Col className="p-2" onClick={() => setSelectedCategory(null)}>
							<Button>
								<h5 style={{ margin: "0px" }} className="text-nowrap mx-3">
									All
								</h5>
							</Button>
						</Col>
						{categories?.map(({ id, name }) => (
							<Col key={id} className="p-2" onClick={() => setSelectedCategory(id)}>
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
					<Row className="m-0" style={{ flexWrap: "unset", overflowX: "auto" }}>
						{/* Show workouts for the selected category */}
						{workouts
							.filter(({ categories }) => {
								if (selectedCategory) {
									return categories?.includes(selectedCategory);
								} else {
									return true;
								}
							})
							.map(({ id, name, description, imageURL }) => (
								<Col key={id} className="p-2" style={{ maxWidth: "300px", minWidth: "300px" }}>
									<Card className="workoutCard" bg="dark" role="button" onClick={() => handleShow(name, description.images, description.instructions)}>
										<Card.Img className="workoutCardImg" variant="top" src={imageURL} />
										<Card.Body style={{ minHeight: "50px" }}>
											<Card.Title className="m-0">{name}</Card.Title>
										</Card.Body>
									</Card>
								</Col>
							))}
						{/* Show when there are no workouts for the selected category */}
						{workouts.filter(({ categories }) => {
							if (selectedCategory) {
								return categories?.includes(selectedCategory);
							} else {
								return true;
							}
						}).length === 0 && (
							<Col className="text-center">
								<h3>No workouts found for selected category.</h3>
								<Button variant="secondary" onClick={() => setSelectedCategory(null)}>
									<h5 style={{ margin: "0px" }} className="text-nowrap mx-3">
										Clear Search
									</h5>
								</Button>
							</Col>
						)}
					</Row>
				</div>
			</Container>
			<ExerciseInfoModal show={show} onClose={handleClose} workoutName={workoutName} workoutImage={workoutImage} workoutDescription={workoutDescription} />
			<br></br>
		</div>
	);
}

export default ExploreWorkouts;
