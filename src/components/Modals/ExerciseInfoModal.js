import "./ExerciseInfoModal.css";
import { MdCancel } from "react-icons/md";

import { Modal } from "react-bootstrap";;


function ExerciseInfoModal(props) {
	const { show, onClose, workoutName, workoutImage, workoutDescription } = props;

	return (
        <Modal className="exerciseInfoModal" show={show} onHide={onClose} centered>
            <Modal.Header>
            
                <Modal.Title>{workoutName}</Modal.Title>
                <span role="button" onClick={onClose}>
					<MdCancel size="2em" />
				</span>
            </Modal.Header>
            <Modal.Body>
                {workoutDescription}
                <img className="workoutExerciseInfoImg" alt='exerciseInfo' src={workoutImage}></img>
            </Modal.Body>
        </Modal>
	);
}

export default ExerciseInfoModal;