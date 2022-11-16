import { Button, Modal, Row, Col } from "react-bootstrap";
import "./ChangeRoutineModal.css";

function ConfirmDeleteModal({ show, handleClose }) {
	function handleDelete() {
		handleClose();
	}

	return (
		<Modal className="create-routine" show={show} onHide={handleClose} centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Delete Account</Modal.Title>
			</Modal.Header>
			<Modal.Body className="mx-4">
				<Row>
					<p className="p-0 m-0">Are you sure you want to delete your account?</p>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="danger" onClick={handleDelete}>
					Delete Account
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmDeleteModal;
