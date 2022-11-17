import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Card, Image } from "react-bootstrap";
import moment from "moment";
import "./RoutineWorkoutItem.css";
import {
    getDoc,
    doc,
    arrayUnion,
    arrayRemove,
    updateDoc,
} from "firebase/firestore";

function RoutineWorkoutItem({ id, docRef, sets, reps, date, dayData }) {
    const { currentUser } = useAuth();
    const [workout, setWorkout] = useState();
    const [workoutCompleted, setWorkoutCompleted] = useState(false);

    // Get the workout data
    useEffect(() => {
        async function getWorkout() {
            const workoutDocSnap = await getDoc(docRef);
            setWorkout({ ...workoutDocSnap.data(), id: workoutDocSnap.id });
        }
        getWorkout();
    }, [docRef]);

    // Mark the workout as completed from database
    useEffect(() => {
        async function checkChecked() {
            setWorkoutCompleted(false);
            if (dayData?.completed?.includes(id)) {
                setWorkoutCompleted(true);
            }
        }
        checkChecked();
    }, [id, currentUser.uid, dayData]);

    // Update the workout as completed
    async function handleWorkoutCompleted(checked) {
        setWorkoutCompleted(checked);
        const dateString = moment(date).format("YYYY-MM-DD");
        const docRef = doc(db, `users/${currentUser.uid}/schedule`, dateString);
        if (checked) {
            await updateDoc(docRef, { completed: arrayUnion(id) });
        } else {
            await updateDoc(docRef, { completed: arrayRemove(id) });
        }
    }

    return (
        <Card
            className="workoutItemCard hover-overlay shadow-1-strong"
            style={{ opacity: `${workoutCompleted ? "50%" : "100%"}` }}
            onClick={() =>
                handleWorkoutCompleted(
                    !document.getElementById(`checkbox-${id}`).checked
                )
            }
        >
            <Card.Body role="button">
                <Image
                    className="workoutItemImg float-start"
                    src={workout?.imageURL}
                    alt={workout?.name}
                ></Image>
                <Card.Title className="text-light">
                    {workout?.name}
                    <span className="float-end">
                        {workoutCompleted && <span className="h3">DONE</span>}
                        <input
                            className="form-check-input ms-3 checkbox"
                            type="checkbox"
                            id={`checkbox-${id}`}
                            onChange={(e) =>
                                handleWorkoutCompleted(e.target.checked)
                            }
                            checked={workoutCompleted}
                        ></input>
                    </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-light">
                    {sets} sets | {reps} reps
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default RoutineWorkoutItem;
