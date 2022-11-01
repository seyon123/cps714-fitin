import { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
import { FaShoePrints } from "react-icons/fa";

function StepCounter({ date, dayData }) {
	const [steps, setSteps] = useState(0);
	const [addStepsToInput, setAddStepsToInput] = useState(0);
	const { currentUser } = useAuth();

	async function handleAddSteps() {
		setSteps(parseInt(addStepsToInput));
		const dateString = moment(date).format("YYYY-MM-DD");
		const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
		if (dayData) {
			await updateDoc(docRef, { steps: addStepsToInput });
		} else {
			await setDoc(docRef, { steps: addStepsToInput });
		}
	}

	// Validation so stepcounter does not got below 0
	useEffect(() => {
		if (addStepsToInput < 0) {
			setAddStepsToInput(0);
		}
	}, [addStepsToInput]);

	useEffect(() => {
		async function getTodaysSteps() {
			if (dayData?.steps) {
				setSteps(parseInt(dayData?.steps));
				setAddStepsToInput(parseInt(dayData?.steps));
			} else {
				setSteps(0);
				setAddStepsToInput(0);
			}
		}
		getTodaysSteps();
	}, [dayData, date]);

	return (
		<Card bg="dark">
			<Card.Body>
				<h3 className="text-center d-flex align-items-center justify-content-center">
					<FaShoePrints className="me-2" />
					{steps} steps
				</h3>
				<br />
				<InputGroup>
					<Button onClick={() => setAddStepsToInput(parseInt(addStepsToInput - 10))} variant="outline-secondary">
						-10
					</Button>
					<Button onClick={() => setAddStepsToInput(parseInt(addStepsToInput + 10))} variant="outline-secondary">
						+10
					</Button>
					<Form.Control
						min="0"
						max="100000000"
						type="number"
						placeholder="Update your steps"
						value={addStepsToInput}
						onChange={(e) => setAddStepsToInput(parseInt(e.target.value))}
					></Form.Control>
					<Button variant="primary" onClick={() => handleAddSteps()}>
						Update
					</Button>
				</InputGroup>
			</Card.Body>
		</Card>
	);
}

export default StepCounter;
