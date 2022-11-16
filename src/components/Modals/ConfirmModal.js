import { Button, Modal, Row, Col } from "react-bootstrap";
import "./ChangeRoutineModal.css";

function ConfirmDeleteModal({ show, handleClose}) {
	return (
		<Modal className="create-routine" show={show} onHide={handleClose} centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Are you sure you want to delete your account?</Modal.Title>
			</Modal.Header>
			<Modal.Body className="mx-4">
            <Row>
                <Col className="mb-4" md={5}>
                    <Row>
                        <Button onClick={() => handleClose()} className="centerButton" variant="danger">Delete Account</Button>{' '}
                    </Row>
                </Col>
                <Col md={1}></Col>
                <Col md={5}>
                    <Row>
                        <Button onClick={() => handleClose()} className="centerButton" variant="secondary">Cancel</Button>{' '}
                    </Row>
                </Col>
            </Row>
			</Modal.Body>
		</Modal>
	);
}

export default ConfirmDeleteModal;
