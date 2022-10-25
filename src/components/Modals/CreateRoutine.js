import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
//import { useAuth } from "../contexts/AuthContext";
import { Modal } from "react-bootstrap";
import "./CreateRoutine.css";

function CreateRoutine(props){

    //const { getUser, logOut } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [routineName, setRoutineName] = useState("New Routine");
    const [showWorkoutList, viewWorkoutList] = useState(false);

    /*Dummy Data*/
    const workouts = [
		{id: 1, type: 1, image: "workoutTempImage1.png", name: "Aerobics", description: "description 1"},
		{id: 2, type: 2, image: "workoutTempImage1.png", name: "Circuit Training", description: "description 2"},
		{id: 3, type: 3, image: "workoutTempImage1.png", name: "Cycling", description: "description 3"},
		{id: 4, type: 4, image: "workoutTempImage1.png", name: "Hiking", description: "description 4"},
		{id: 5, type: 5, image: "workoutTempImage1.png", name: "Running", description: "description 5"},
		{id: 6, type: 6, image: "workoutTempImage1.png", name: "Skipping Rope", description: "description 6"},
		{id: 7, type: 7, image: "workoutTempImage1.png", name: "Swimming", description: "description 7"},
		{id: 8, type: 8, image: "workoutTempImage1.png", name: "Walking", description: "description 8"},
	]


    let itemList = exercises.map((item, index) => {
        return (
        <Row className="exercise-row">
            <Col md="auto">
                <img 
                    key={index}
                    src={item.image}
                    alt="Exercise Thumbnail"
                    className="img-thumbnail"
                />
            </Col>
            <Col><h4 key={index}>{item.name}</h4></Col>
            <Col md="auto">
                <span className="up-button" onClick={() => updateSet(index, 1)}></span>
                <h5 key={index}>{item.sets} sets</h5>
                <span className="down-button" onClick={() => updateSet(index, -1)}></span>
            </Col>
            <Col md="auto">
                <span className="up-button" onClick={() => updateReps(index, 1)}></span>
                <h5 key={index}>{item.reps} reps</h5>
                <span className="down-button" onClick={() => updateReps(index, -1)}></span>
            </Col>
            <Col md={1} className="align-right" onClick={()=>removeFromRoutine(item)}> X </Col>
        </Row>
        );
    });

    let workoutList = workouts.map((item, index) => {
        return(
            <Row className= "exercise-row">
                <Col md= "auto">
                    <input
                        key = {index}
                        type = "checkbox" 
                        value = {item.name} 
                        name = "workout"
                        onChange = {(event)=>{event.target.checked ? addToRoutine(item) : removeFromRoutine(item)}}
                    />
                </Col>
                <Col md="auto">
                    <label htmlFor="{item.name}">{item.name}</label>
                </Col>
            </Row>
        );
    });


    let resetState = ()=>{
        setExercises([]);
        setRoutineName("New Routine");
        viewWorkoutList(false);
    };

    let addToRoutine = (exercise) => {
        setExercises([...exercises, {...exercise, sets: 1, reps: 4}]);
        console.log(exercises);
    };

    let removeFromRoutine = (exercise) => {
        setExercises(exercises.filter(item => JSON.stringify(item.id) !== JSON.stringify(exercise.id)));
        console.log(exercises);
    };


    let updateSet = (index, amount) => {
        const newExercises = exercises.map((item, i) => {
            if(i === index){
                return {...item, sets: Math.max(0, item.sets + amount)};
            }
            else {
                return item;
            }
        });

        setExercises(newExercises);
        console.log(exercises);
    };

    let updateReps = (index, amount) => {
        const newExercises = exercises.map((item, i) => {
            if(i === index){
                return {...item, reps: Math.max(0, item.reps + amount)};
            }
            else {
                return item;
            }
        });

        setExercises(newExercises);
        console.log(exercises);
    };
    

    let onSubmit = () => {
        let routine = {
            name: routineName,
            exercises: exercises
        }
        resetState();
        props.handler(false);
        alert(JSON.stringify(routine));
        
    };


    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        //centered
        onExit={()=> resetState()}
        className="create-routine"
        
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <input 
                className="routine-title"
                type="text"
                placeholder={routineName} 
                onChange={(event)=>setRoutineName(event.target.value)}
                style={{display: !showWorkoutList ? 'block' : 'none'}}
            />
                <h3 style={{display: showWorkoutList ? 'block' : 'none'}}>Select Workouts</h3>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            
            <Container className="routine-modalContainer" style={{display: !showWorkoutList ? 'block' : 'none'}}>
               {itemList} 
                <Row 
                    className="exercise-row add-exercise"
                    onClick={() => viewWorkoutList(true)}
                >
                   <Col md="auto"><img src="addIcon.png" className="img-thumbnail" alt="Add button"/></Col>
                   <Col><h4>Add workout</h4></Col>
                </Row>
            </Container>

            <Container className="workouts-selection-container" style={{display: showWorkoutList ? 'block' : 'none'}}>
                {workoutList}
            </Container>

        </Modal.Body>

        <Modal.Footer className="border-0">
            <Button closeButton className="btn-secondary" style={{display: showWorkoutList ? 'block' : 'none'}} onClick={()=>viewWorkoutList(false)}>Select</Button>
            <Button 
                className="submit-button" 
                style={{display: !showWorkoutList ? 'block' : 'none'}} 
                onClick={()=>onSubmit()}>
                    Save
                </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CreateRoutine;