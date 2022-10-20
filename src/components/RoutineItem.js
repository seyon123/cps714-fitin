import React from "react";
import Card from "react-bootstrap/Card";
import { MdEdit } from "react-icons/md";
import "./RoutineItem.css";

function RoutineItem({ id, name, exercises }) {
	function editRoutine() {
		alert("Edit Routine");
	}

	return (
		<Card className="routineItemCard">
			<Card.Body className="d-flex align-items-center justify-content-between">
				<div>
					<Card.Title className="text-light">{name}</Card.Title>
					<Card.Subtitle className="text-light">{exercises} exercises</Card.Subtitle>
				</div>
				<span role="button" onClick={editRoutine}>
					<MdEdit size="2em" />
				</span>
			</Card.Body>
		</Card>
	);
}

export default RoutineItem;
