import { Card, Modal } from "react-bootstrap";
import "./ChangeRoutine.css";

function ChangeRoutine({ show, onHide, setModalShow }) {
	/* dummy data */
	const dummyRoutines = [
		{ id: 1, name: "Push Day", exercises: "4" },
		{ id: 2, name: "Pull Day", exercises: "5" },
	];

	let routineList = dummyRoutines.map((item, index) => {
		return (
			<Card className="routineItemCard" role="button">
				<Card.Body className="d-flex align-items-center justify-content-between">
					<div>
						<Card.Title className="text-light">{item.name}</Card.Title>
						<Card.Subtitle className="text-light">{item.exercises} exercises</Card.Subtitle>
					</div>
				</Card.Body>
			</Card>
		);
	});
	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Change today's routine</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Select from existing routines:</p>
				<br></br>
				{routineList}
			</Modal.Body>
		</Modal>
	);
}

export default ChangeRoutine;
