import { Button, Card, Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { db } from "../../firebase";
import "./ChangeRoutineModal.css";
import { doc, getDoc, updateDoc, deleteField, setDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

function ConfirmDeleteModal({ show, onHide, setShow}) {
	return (
		<Modal className="create-routine" show={show} onHide={onHide} centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title>Are you sure you want to delete your account?</Modal.Title>
			</Modal.Header>
			<Modal.Body className="mx-4">
            <Row>
                <Col className="mb-4" md={5}>
                    <Row>
                        <Button onClick={() => setShow(true)} className="centerButton" variant="danger">Delete Account</Button>{' '}
                    </Row>
                </Col>
                <Col md={1}></Col>
                <Col md={5}>
                    <Row>
                        <Button className="centerButton" variant="secondary">Cancel</Button>{' '}
                    </Row>
                </Col>
            </Row>
			</Modal.Body>
		</Modal>
	);
}

export default ConfirmDeleteModal;
