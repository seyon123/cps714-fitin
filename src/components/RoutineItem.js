import React from "react";
import Card from "react-bootstrap/Card";
import { MdDelete } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import "./RoutineItem.css";

function RoutineItem({ id, name, exercises }) {
	const { currentUser } = useAuth();
	function editRoutine() {
		const deleteRoutine = window.confirm("Are you sure you want to delete the routine called: " + name + "?");
		if (deleteRoutine === true) {
			deleteDoc(doc(db, `users/${currentUser.uid}/routines`, id));
		}
	}

	return (
		<Card className="routineItemCard">
			<Card.Body className="d-flex align-items-center justify-content-between">
				<div>
					<Card.Title className="text-light">{name}</Card.Title>
					<Card.Subtitle className="text-light">{exercises.length} exercises</Card.Subtitle>
				</div>
				<span role="button">
					<MdDelete color="#ae0000" size="2em" onClick={editRoutine} />
				</span>
			</Card.Body>
		</Card>
	);
}

export default RoutineItem;
