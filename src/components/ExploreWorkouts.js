import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ExploreWorkouts.css";
import Card from "react-bootstrap/Card";

function ExploreWorkouts() {
	const workouts = [
		{ id: 1, type: 1, image: "workoutPlaceholder.png", name: "Aerobics", description: "description 1" },
		{ id: 2, type: 2, image: "workoutplaceholder2.jpg", name: "Circuit Training", description: "description 2" },
		{ id: 3, type: 3, image: "workoutPlaceholder.png", name: "Cycling", description: "description 3" },
		{ id: 4, type: 4, image: "workoutplaceholder2.jpg", name: "Hiking", description: "description 4" },
		{ id: 5, type: 5, image: "workoutPlaceholder.png", name: "Running", description: "description 5" },
		{ id: 6, type: 6, image: "workoutPlaceholder.png", name: "Skipping Rope", description: "description 6" },
		{ id: 7, type: 7, image: "workoutPlaceholder.png", name: "Swimming", description: "description 7" },
		{ id: 8, type: 8, image: "workoutPlaceholder.png", name: "Walking", description: "description 8" },
	];

	const workoutTypes = [
		{ id: 1, type: "Back" },
		{ id: 2, type: "Chest" },
		{ id: 3, type: "Yoga" },
		{ id: 4, type: "Legs" },
		{ id: 5, type: "Stretches" },
		{ id: 6, type: "Weights" },
		{ id: 7, type: "Machines" },
		{ id: 8, type: "Dumbell Only" },
		{ id: 9, type: "Back" },
		{ id: 10, type: "Chest" },
		{ id: 11, type: "Yoga" },
		{ id: 12, type: "Legs" },
		{ id: 13, type: "Stretches" },
		{ id: 14, type: "Weights" },
		{ id: 15, type: "Machines" },
		{ id: 16, type: "Dumbell Only" },
	];

	return (
		<div className="exploreWorkoutsContainer d-flex" style={{ paddingTop: "30px" }}>
			<Col xs={2} md={2}>
				<Row>
					<h3>Categories</h3>
				</Row>
				<div className="categoriesContainer">
					<Row style={{ width: "95%", margin: "10px 0px" }}>
						<button type="button" className="btn btn-dark">
							<h5>All Categories</h5>
						</button>
					</Row>
					{workoutTypes.map(({ id, type }) => (
						<Row key={id} style={{ width: "95%", margin: "10px 0px" }}>
							<button type="button" className="btn btn-dark">
								<h5>{type}</h5>
							</button>
						</Row>
					))}
				</div>
			</Col>
			<Col xs={4} md={4}>
				<Row>
					<h3>FitIn Workouts</h3>
				</Row>
				<div className="workoutsContainer">
					<Row xs={4} md={2} className="g-4">
						{workouts.map(({ id, name, image }) => (
							<Col className="colWorkout" key={id}>
								<Card className="workoutCard" bg="dark" role="button">
									<Card.Img className="workoutCardImg" variant="top" src={image} />
									<Card.Body style={{ minHeight: "70px" }}>
										<Card.Title>{name}</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</Col>
		</div>
	);
}

export default ExploreWorkouts;
