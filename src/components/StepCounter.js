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
    if (addStepsToInput) {
      setSteps(parseInt(addStepsToInput));
      const dateString = moment(date).format("YYYY-MM-DD");
      const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
      if (dayData) {
        await updateDoc(docRef, { steps: addStepsToInput });
      } else {
        await setDoc(docRef, { steps: addStepsToInput });
      }
    }
  }

  // Validation so stepcounter does not got below 0
  useEffect(() => {
    if (addStepsToInput < 0) {
      setAddStepsToInput(0);
    }
  }, [addStepsToInput]);

  useEffect(() => {
    if (dayData?.steps) {
      setSteps(parseInt(dayData?.steps));
      setAddStepsToInput(parseInt(dayData?.steps));
    } else {
      setSteps(0);
      setAddStepsToInput(0);
    }
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
          <Button
            onClick={() =>
              setAddStepsToInput(Math.max(0, parseInt(addStepsToInput - 10)))
            }
            variant="outline-secondary"
          >
            -10
          </Button>
          <Button
            onClick={() =>
              setAddStepsToInput(
                Math.min(100000, parseInt(addStepsToInput + 10))
              )
            }
            variant="outline-secondary"
          >
            +10
          </Button>
          <Form.Control
            min="0"
            max="100000"
            type="number"
            placeholder="Update your steps"
            value={addStepsToInput}
            onChange={(e) =>
              setAddStepsToInput(
                Math.min(100000, Math.max(0, parseInt(e.target.value)))
              )
            }
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
