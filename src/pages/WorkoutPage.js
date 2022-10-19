import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";
import "./WorkoutPage.css";
import NavBar from "../components/NavBar";
import ExploreWorkouts from "../components/ExploreWorkouts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from "react-bootstrap/Card";


function WorkoutPage() {
	const { getUser, logOut } = useAuth();
	const [value, onChange] = useState(new Date());
	const user = getUser();

	const dummyRoutines = [{id: 1, name: "Push Day", exercises: "4"},
						   {id: 2, name: "Pull Day", exercises: "5"}]


	const dummyWorkouts = [{id: 1, name: "Deadlift", reps: "12", sets: "4", image:"deadlift.png", completed: "0"},
						   {id: 2, name: "Bentover Row", reps: "12", sets: "4", image:"bentoverrow.png", completed: "0"},
						   {id: 1, name: "Deadlift", reps: "12", sets: "4", image:"deadlift.png", completed: "1"},
						   {id: 2, name: "Bentover Row", reps: "12", sets: "4", image:"bentoverrow.png", completed: "1"},
						   {id: 1, name: "Deadlift", reps: "12", sets: "4", image:"deadlift.png", completed: "0"},
						   {id: 2, name: "Bentover Row", reps: "12", sets: "4", image:"bentoverrow.png", completed: "0"}]

	console.log(user);

	function handleSignOut(e) {
		e.preventDefault();
		logOut();
	}
	
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		document.title = `Workout Page | FitIn`;
	}, []);

	function changeRoutine() {
		alert("Change Routine")
	}

	function editRoutine() {
		alert("Edit Routine")
	}

	function createExercise() {
		alert("Create Exercise")
	}

	function newRoutine() {
		alert("Create New Routine")
	}


	return (
		<Container fluid className={"mainPage p-0"}>
			<NavBar></NavBar>
			<h3>
				My Workouts 
			</h3>
			<hr></hr>
			
		
			<div className = "row">
				<div className = "col-md-3">
					<div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
						<Calendar onChange={setDate} value={date} />
					</div>
				</div>
				<div className = "col-md-6" style={{height: "80vh"}}>
					<Card bg="dark" style={{height: "100%", width: "100%"}}>
						<Card.Header style={{textAlign: "center", backgroundColor: "#347aeb", fontSize: "200%"}}>{date.toDateString()}</Card.Header>
						<Card.Title>
							<p style={{textalign: "left", paddingLeft: "1%",  paddingRight: "1%", paddingTop: "2%"}}>
								<span style={{color: "Grey"}}>Routine: </span> <span>"Pull Day"</span>
								<span style={{float: "right", cursor:"pointer"}}  onClick={changeRoutine}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
									</svg>
									<span style={{color: "white"}}>
										Change Routine
									</span>
								</span>
							</p>
						</Card.Title>

						<Card.Body style = {{overflowY : "scroll"}}>
							{dummyWorkouts.map(workouts => (
								<Card style={{height: "15%", width: "100%", marginTop: "2%", backgroundColor: "#363d47"}}>
									<Card.Body>
										<img style ={{float: "left", height: "50%", width: "10%", paddingRight: "5px" }}src = {workouts.image}></img>
										<Card.Title style={{color: "White"}}>{workouts.name}</Card.Title>
										<Card.Subtitle style={{color: "White"}} className="mb-2 text-light">{workouts.sets} sets | {workouts.reps} reps</Card.Subtitle>
									</Card.Body>
								</Card>
							))}
						</Card.Body>
					</Card>
					
				</div>
				<div className = "col-md-3">
					<Card bg="dark" style={{height: "100%", width: "90%"}}>
						<Card.Header style={{textAlign: "center", backgroundColor: "#181c24", fontSize: "200%"}}>My Routines</Card.Header>
						<Card.Body style = {{overflowY : "scroll"}}>
						{dummyRoutines.map(routines => (
							<Card bg="dark" style={{height: "11%", width: "100%", marginBottom: "2%"}}>
								<Card.Body>
									<svg onClick={editRoutine} style={{float: "right", cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
										<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
									</svg>
									<Card.Title style={{color: "White"}}>{routines.name}</Card.Title>
									<Card.Subtitle style={{color: "White"}} className="mb-2 text-light">{routines.exercises} exercises</Card.Subtitle>
								</Card.Body>
							</Card>		
						))}


						<Card border="danger" bg="dark" style={{height: "11%", width: "100%", marginBottom: "2%"}}>
								<Card.Body>
									<svg onClick = {newRoutine} style={{float: "right", cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
										<path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
									</svg>
									<Card.Title style={{color: "White"}}>New Routine</Card.Title>
								</Card.Body>
						</Card>	


						</Card.Body>
					</Card>
				</div>
			</div>
			
			
			<h3>
				Explore Workouts 
			</h3>
			<hr></hr>
			
			<ExploreWorkouts></ExploreWorkouts>
			<br></br>
			<div style={{cursor:"pointer"}}  onClick={createExercise}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
					<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
				</svg>
				<span style={{color: "white"}}>
					Create Custom Exercise
				</span>
			</div>
			<br></br>
		</Container>

	);
}

export default WorkoutPage;
