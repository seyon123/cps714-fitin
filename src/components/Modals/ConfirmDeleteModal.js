import { Button, Modal, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./ChangeRoutineModal.css";

function ConfirmDeleteModal({ show, handleClose }) {
	const { deleteCurrentUser } = useAuth();

	async function handleDelete() {
		await deleteCurrentUser();
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
				<Button variant="danger" onClick={() => handleDelete()}>
					Delete Account
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmDeleteModal;
