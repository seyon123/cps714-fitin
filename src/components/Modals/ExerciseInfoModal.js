import "./ExerciseInfoModal.css";
import { MdCancel } from "react-icons/md";
import { Modal, Carousel } from "react-bootstrap";

function ExerciseInfoModal({ show, onClose, workoutName, workoutImage, workoutDescription }) {
	return (
		<Modal className="exerciseInfo_modal" size="lg" show={show} onHide={onClose} centered>
			<Modal.Header>
				<Modal.Title>{workoutName}</Modal.Title>
				<span role="button" onClick={onClose}>
					<MdCancel size="2em" />
				</span>
			</Modal.Header>
			<Modal.Body>
				<Carousel variant="light">
					{workoutImage.map((image) => {
						return (
							<Carousel.Item>
								<div className="text-center">
									<img className="d-block" height="300px" src={image} alt="First slide" style={{ marginRight: "auto", marginLeft: "auto" }} />
								</div>
							</Carousel.Item>
						);
					})}
				</Carousel>
				{workoutDescription.map((description, i) => {
					return (
						<div className="d-flex align-items-center">
							<div className="h1 me-2" style={{ width: "20px" }}>
								{i + 1}
							</div>
							<div className="ms-2">{description}</div>
						</div>
					);
				})}
			</Modal.Body>
		</Modal>
	);
}

export default ExerciseInfoModal;
