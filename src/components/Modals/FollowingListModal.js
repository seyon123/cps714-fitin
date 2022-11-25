// import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";

// import "./CreateRoutineModal.css";

function FollowingListModal({ show, onHide, setModalShow }) {
	return (
		<Modal className="create-routine" show={show} onHide={onHide} setModalShow={setModalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Following List</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>nice!</p>
			</Modal.Body>

			<Modal.Footer style={{ justifyContent: "space-between" }}>
				<p>footer</p>
			</Modal.Footer>
		</Modal>
	);
}

export default FollowingListModal;
