import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SettingsPage.css";
import { useAuth } from "../contexts/AuthContext";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import ConfirmDeleteModal from "../components/Modals/ConfirmModal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import imageCompression from "browser-image-compression";

function SettingsPage({ authComponent }) {
	const [fullName, setFullName] = useState("");
	const [file, setFile] = useState(null);
	const [photoURL, setPhotoURL] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [Biography, setBiography] = useState("");
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showPasswordChangeAlert, setPasswordChangeAlert] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const [showProfileChangeAlert, setProfileChangeAlert] = useState(false);
	const [showModal, setModal] = useState(false);
	const handleModalClose = () => setModal(false);
	const handleModalShow = () => setModal(true);

	const { currentUser } = useAuth();

	const handleFileChange = async (e) => {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};

		const compressedFile = await imageCompression(e.target.files[0], options);

		setFile(compressedFile);
	};

	function uploadContent() {
		document.getElementById("imageUpload").click();
	}

	useEffect(() => {
		if (currentUser) {
			setFullName(currentUser.displayName);
			setEmailAddress(currentUser.email);
			setPhotoURL(currentUser.photoURL);
		}
	}, [currentUser]);

	return (
		<div className="settingsPage px-5 mw- 80">
			<ConfirmDeleteModal show={showModal} handleClose={handleModalClose} showModal={handleModalShow}></ConfirmDeleteModal>
			<Container fluid>
				<Row md={12}>
					<Col md={12}>
						<h1 className="pt-4">Profile Settings</h1>
						<hr style={{ width: "100%" }}></hr>
						{authComponent}
					</Col>
				</Row>
			</Container>

			<div className="profileSection my-5 p-3">
				<Alert dismissible style={{ display: "block" }} show={showProfileChangeAlert} onClose={() => setProfileChangeAlert(false)} key="success" variant="primary">
					<Alert.Heading>Profile updated.</Alert.Heading>
					<p>Your profile information was updated successfully.</p>
				</Alert>
				<Container fluid>
					<Form>
						<Row className="py-3">
							<Col md={6} lg={5} xl={3}>
								<Row md={12}>
									<div>
										<div className="changeProfilePicture">
											{file ? (
												<img alt={fullName} className="logo" src={window.URL.createObjectURL(file)} style={{ height: "140px", width: "140px", marginRight: "10px" }} />
											) : (
												<img alt={fullName} className="logo" src={photoURL} style={{ height: "140px", width: "140px", marginRight: "10px" }} />
											)}
											<Button variant="outline-light" onClick={() => uploadContent()}>
												Change
											</Button>{" "}
										</div>
									</div>
								</Row>
							</Col>
							<Col md={6} lg={7} xl={9}>
								<Row>
									<Form.Group className="mb-3" controlId="fullName">
										<Form.Label>Full Name</Form.Label>
										<Form.Control placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
									</Form.Group>
								</Row>
								<Row>
									<Form.Group className="mb-3" controlId="email">
										<Form.Label>Email address</Form.Label>
										<Form.Control type="email" placeholder="Enter email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></Form.Control>
										<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
									</Form.Group>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col md={12} lg={12} xl={12}>
								<Form.Group className="mb-3" controlId="biography">
									<Form.Label>Biography</Form.Label>
									<Form.Control as="textarea" rows={3} placeholder="live laugh love" value={Biography} onChange={(e) => setBiography(e.target.value)} />
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={12} lg={12} xl={12}>
								<Form.Group className="mb-3" controlId="website">
									<Form.Label>Website</Form.Label>
									<Form.Control placeholder="example.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={9}></Col>
							<Col md={3}>
								<Row className="p-3">
									<Button onClick={() => setProfileChangeAlert(true)} className="ml-3" variant="primary">
										Save
									</Button>{" "}
								</Row>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>

			<Container fluid>
				<Row md={12}>
					<Col md={12}>
						<h1 className="pt-4">Account Settings</h1>
						<hr style={{ width: "100%" }}></hr>
						{authComponent}
					</Col>
				</Row>
			</Container>

			<div className="profileSection my-5 p-3">
				<Alert dismissible style={{ display: "block" }} show={showPasswordChangeAlert} onClose={() => setPasswordChangeAlert(false)} key="success" variant="primary">
					<Alert.Heading>Password changed</Alert.Heading>
					<p>Your password was updated successfully. Remember to use your new password when you sign-in.</p>
				</Alert>

				<Container fluid>
					<Form>
						<Row className="py-3">
							<Col>
								<Row>
									<h3>Change Password</h3>
								</Row>
								<Row>
									<Col md={12}>
										<Form.Group className="mb-3 mt-3" controlId="password">
											<Form.Label>New Password</Form.Label>
											<InputGroup>
												<Form.Control
													type={showPassword1 ? "text" : "password"}
													placeholder="Enter a password"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
												{showPassword1 ? (
													<InputGroup.Text>
														<AiFillEye
															onClick={() => {
																setShowPassword1(false);
															}}
															role="button"
															color="white"
															size="30px"
														/>
													</InputGroup.Text>
												) : (
													<InputGroup.Text style={{ background: "#141414", border: "none" }}>
														<AiFillEyeInvisible
															onClick={() => {
																setShowPassword1(true);
															}}
															role="button"
															color="white"
															size="30px"
														/>
													</InputGroup.Text>
												)}
											</InputGroup>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<Form.Group className="mb-3 mt-3 mb-4" controlId="confirmPassword">
											<Form.Label>Confirm New Password</Form.Label>
											<InputGroup>
												<Form.Control
													type={showPassword2 ? "text" : "password"}
													placeholder="Confirm new password"
													value={confirmPassword}
													onChange={(e) => setConfirmPassword(e.target.value)}
												/>

												<InputGroup.Text style={{ background: "#141414", border: "none" }}>
													{showPassword2 ? (
														<AiFillEye
															onClick={() => {
																setShowPassword2(false);
															}}
															role="button"
															color="white"
															size="30px"
														/>
													) : (
														<AiFillEyeInvisible
															onClick={() => {
																setShowPassword2(true);
															}}
															role="button"
															color="white"
															size="30px"
														/>
													)}
												</InputGroup.Text>
											</InputGroup>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col md={9}>
										{password !== confirmPassword ? (
											<h6 className="px-3" style={{ color: "#DC3545", fontWeight: "600px" }}>
												Passwords must match
											</h6>
										) : null}
									</Col>
									<Col md={3}>
										<Row className="p-3">
											<Button onClick={() => setPasswordChangeAlert(true)} variant="primary">
												Change Password
											</Button>{" "}
										</Row>
									</Col>
								</Row>
								<Row>
									<h3 className="mt-5 mb-4">Account Actions</h3>
								</Row>
								<Row className=" ps-3">
									<Col className="mb-4 me-3" md={4} lg={2}>
										<Row>
											<Button onClick={() => setModal(true)} variant="danger">
												Delete Account
											</Button>{" "}
										</Row>
									</Col>
									<Col md={4} lg={2}>
										<Row>
											<Button variant="secondary">Log Out</Button>{" "}
										</Row>
									</Col>
								</Row>
							</Col>
						</Row>
						<input type="file" style={{ display: "none" }} accept="image/*" className="iconFormat" id="imageUpload" onChange={handleFileChange} />
					</Form>
				</Container>
			</div>
		</div>
	);
}

export default SettingsPage;
