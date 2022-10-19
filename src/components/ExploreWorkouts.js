import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";
import "./ExploreWorkouts.css";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";

function ExploreWorkouts() {


  const workouts = [
		{id: 1, type: 1, image: "workoutPlaceholder.png", name: "Aerobics", description: "description 1"},
		{id: 2, type: 2, image: "workoutplaceholder2.jpg", name: "Circuit Training", description: "description 2"},
		{id: 3, type: 3, image: "workoutPlaceholder.png", name: "Cycling", description: "description 3"},
		{id: 4, type: 4, image: "workoutplaceholder2.jpg", name: "Hiking", description: "description 4"},
		{id: 5, type: 5, image: "workoutPlaceholder.png", name: "Running", description: "description 5"},
		{id: 6, type: 6, image: "workoutPlaceholder.png", name: "Skipping Rope", description: "description 6"},
		{id: 7, type: 7, image: "workoutPlaceholder.png", name: "Swimming", description: "description 7"},
		{id: 8, type: 8, image: "workoutPlaceholder.png", name: "Walking", description: "description 8"},
	]

  const workoutTypes = [
		{id: 1, type: "Back"},
    {id: 2, type: "Chest"},
    {id: 3, type: "Yoga"},
    {id: 4, type: "Legs"},
    {id: 5, type: "Stretches"},
    {id: 6, type: "Weights"},
    {id: 7, type: "Machines"},
    {id: 8, type: "Dumbell Only"},
    {id: 9, type: "Back"},
    {id: 10, type: "Chest"},
    {id: 11, type: "Yoga"},
    {id: 12, type: "Legs"},
    {id: 13, type: "Stretches"},
    {id: 14, type: "Weights"},
    {id: 15, type: "Machines"},
    {id: 16, type: "Dumbell Only"},

	]
  
  return (
    <div className="d-flex justify-content-start" style={{paddingLeft: "30px", paddingTop: "30px"}}>
      <Col xs={2} md={2}>
        
        <Row>
					<h3 className="titleFont">Categories</h3>
				</Row>
        <hr className="categoryTitleLine"></hr>
        <div className="exploreWorkoutsContainer" style={{width: "95%"}}>
        <Row style={{width: "95%", marginTop: "10px"}}>
          <button type="button" class="btn btn-dark" ><h4>All Categories</h4></button>
        </Row>
        {workoutTypes.map((workoutType)=>(
          <Row style={{width: "95%", marginTop: "10px"}}>
            <button type="button" class="btn btn-dark" ><h4>{workoutType.type}</h4></button>
          </Row>
        ))}	
        </div>
			</Col>
			<Col xs={4} md={4}>
				<Row>
					<h3 className="titleFont">Explore Workouts</h3>
				</Row>
        <hr className="titleLine"></hr>
        <div className="exploreWorkoutsContainer">
				<Row xs={4} md={2} className="g-4">
				{workouts.map(workout => (
					<Col style={{minWidth: "200px"}}>
					<Card bg="dark" style={{height: "100%", width: "100%"}}>
						<Card.Img variant="top" src={workout.image} style={{height: "70%", width: "100%", objectFit: "Cover"}} />
						<Card.Body style={{height: "0px"}}>
						<Card.Title>{workout.name}</Card.Title>
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