import { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
import { BsFillMoonFill } from "react-icons/bs";

function SleepTracker({ date, dayData }) {
  const [hours, setHours] = useState(0);
  const [addHoursToInput, setAddHoursToInput] = useState(0);
  const { currentUser } = useAuth();

  async function handleAddHours() {
    if (addHoursToInput) {
      setHours(parseInt(addHoursToInput));
      const dateString = moment(date).format("YYYY-MM-DD");
      const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);

      if (dayData) {
        await updateDoc(docRef, { hours: addHoursToInput });
      } else {
        await setDoc(docRef, { hours: addHoursToInput });
      }
    }
  }

  useEffect(() => {
    if (dayData?.hours) {
      setHours(parseInt(dayData?.hours));
      setAddHoursToInput(parseInt(dayData?.hours));
    } else {
      setHours(0);
      setAddHoursToInput(0);
    }
  }, [dayData, date]);

  return (
    <Card bg="dark" className="mt-3">
      <Card.Body>
        <h3 className="text-center d-flex align-items-center justify-content-center">
          <BsFillMoonFill className="me-2" />
          {hours} hours
        </h3>
        <br />
        <InputGroup>
          <Button
            onClick={() =>
              setAddHoursToInput(Math.max(0, parseInt(addHoursToInput - 1)))
            }
            variant="outline-secondary"
          >
            -1
          </Button>
          <Button
            onClick={() =>
              setAddHoursToInput(Math.min(24, parseInt(addHoursToInput + 1)))
            }
            variant="outline-secondary"
          >
            +1
          </Button>
          <Form.Control
            min="0"
            max="24"
            type="number"
            placeholder="Update hours slept"
            value={addHoursToInput}
            onChange={(e) =>
              setAddHoursToInput(
                Math.min(24, Math.max(0, parseInt(e.target.value)))
              )
            }
          ></Form.Control>
          <Button variant="primary" onClick={() => handleAddHours()}>
            Update
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}

export default SleepTracker;
