import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SettingsPage.css";
import { useAuth } from "../contexts/AuthContext";
import { Button, Form, InputGroup, Image } from "react-bootstrap";
import ConfirmDeleteModal from "../components/Modals/ConfirmDeleteModal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import imageCompression from "browser-image-compression";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function SettingsPage({ authComponent }) {
	const [fullName, setFullName] = useState("");
	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState("");
	const [photoURL, setPhotoURL] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [biography, setBiography] = useState("");
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [user, setUser] = useState(null);

	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { currentUser, updateUserInfo, getUser, updateUserPassword, logOut } = useAuth();

	const handleFileChange = async (e) => {
		const options = {
			maxSizeMB: 1,
			alwaysKeepResolution: true,
			useWebWorker: true,
		};

		const compressedFile = await imageCompression(e.target.files[0], options);

		setFile(compressedFile);
		var filePath = e.target.value.toString().split("\\");
		var name = filePath[filePath.length - 1];
		if (name.length > 20) name = name.split(".")[0].substring(0, 20) + "...." + name.split(".")[name.split(".").length - 1];
		setFileName(`${name}`);
	};

	function uploadContent() {
		document.getElementById("imageUpload").click();
	}

	useEffect(() => {
		async function getUserDetails() {
			const docRef = doc(db, "users", currentUser?.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setUser({ ...docSnap.data(), id: docSnap.id });
			} else {
				// User does not exist
				console.log("User does not exist or is already deleted.");
			}
		}
		getUserDetails();
	}, [currentUser, getUser]);

	useEffect(() => {
		if (currentUser && user) {
			setFullName(currentUser.displayName);
			setEmailAddress(currentUser.email);
			setPhotoURL(currentUser.photoURL);
			setBiography(user?.bio || "");
			setWebsite(user?.website || "");
		}
	}, [currentUser, user]);

	async function handleProfileSection(e) {
		e.preventDefault();

		const storageRef = ref(storage, `profiles/${Math.floor(Math.random() * (9999 - 1000)) + 1000}-${fileName}`);
		const uploadTask = file && uploadBytesResumable(storageRef, file);

		file
			? uploadTask.on(
					"state_changed",
					(snapshot) => {
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log("Upload is " + progress + "% done");
						switch (snapshot.state) {
							case "paused":
								console.log("Upload is paused");
								break;
							case "running":
								console.log("Upload is running");
								break;
							default:
								break;
						}
					},
					(error) => {
						// A full list of error codes is available at
						// https://firebase.google.com/docs/storage/web/handle-errors
						switch (error.code) {
							case "storage/unauthorized":
								// User doesn't have permission to access the object
								break;
							case "storage/canceled":
								// User canceled the upload
								break;
							// ...
							case "storage/unknown":
								// Unknown error occurred, inspect error.serverResponse
								break;
							default:
								break;
						}
					},
					() => {
						// Upload completed successfully, now we can get the download URL
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							console.log("File available at", downloadURL);
							setPhotoURL(downloadURL);
							await updateUserInfo(fullName, emailAddress, downloadURL, biography, website);
						});
					}
			  )
			: await updateUserInfo(fullName, emailAddress, photoURL, biography, website);

		setFile("");
		setFileName("");
	}

	async function handleChangePassword(e) {
		e.preventDefault();
		if (password === confirmPassword) {
			await updateUserPassword(password);
		} else {
			alert("Passwords do not match");
		}
	}

	return (
		<div className="settingsPage px-5 mw- 80">
			<ConfirmDeleteModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} showModal={() => setShowDeleteModal(true)} />
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
				<Container fluid>
					<Form onSubmit={handleProfileSection}>
						<Row className="py-3">
							<Col md={6} lg={5} xl={3}>
								<Row md={12}>
									<div>
										{file ? (
											<Image
												alt={fullName}
												className="logo"
												src={window.URL.createObjectURL(file)}
												width="50px"
												height="50px"
												style={{ objectFit: "cover", height: "140px", width: "140px", marginRight: "10px" }}
											/>
										) : (
											<Image
												alt={fullName}
												className="logo"
												src={photoURL}
												width="50px"
												height="50px"
												style={{ objectFit: "cover", height: "140px", width: "140px", marginRight: "10px" }}
											/>
										)}
										<Button variant="outline-light" onClick={() => uploadContent()}>
											Change
										</Button>{" "}
									</div>
								</Row>
							</Col>
							<Col md={6} lg={7} xl={9}>
								<Row>
									<Form.Group className="mb-3" controlId="fullName">
										<Form.Label>Full Name</Form.Label>
										<Form.Control placeholder="Enter your full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
									</Form.Group>
								</Row>
								<Row>
									<Form.Group className="mb-3" controlId="email">
										<Form.Label>Email address</Form.Label>
										<Form.Control type="email" placeholder="Enter email" required value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></Form.Control>
										<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
									</Form.Group>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col md={12} lg={12} xl={12}>
								<Form.Group className="mb-3" controlId="biography">
									<Form.Label>Biography</Form.Label>
									<Form.Control maxlength="200" as="textarea" rows={3} placeholder="live laugh love" value={biography} onChange={(e) => setBiography(e.target.value)} />
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
									<Button type="submit" className="ml-3" variant="primary">
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
				<Container fluid>
					<Form onSubmit={handleChangePassword}>
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
													required
													placeholder="Enter a password"
													value={password}
													autoComplete="new-password"
													onChange={(e) => setPassword(e.target.value)}
												/>
												<InputGroup.Text style={{ background: "#141414", border: "none" }}>
													{showPassword1 ? (
														<AiFillEyeInvisible
															onClick={() => {
																setShowPassword1(false);
															}}
															role="button"
															color="white"
															size="30px"
														/>
													) : (
														<AiFillEye
															onClick={() => {
																setShowPassword1(true);
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
									<Col md={12}>
										<Form.Group className="mb-3 mt-3 mb-4" controlId="confirmPassword">
											<Form.Label>Confirm New Password</Form.Label>
											<InputGroup>
												<Form.Control
													type={showPassword2 ? "text" : "password"}
													required
													placeholder="Confirm new password"
													value={confirmPassword}
													autoComplete="new-password"
													onChange={(e) => setConfirmPassword(e.target.value)}
												/>

												<InputGroup.Text style={{ background: "#141414", border: "none" }}>
													{showPassword2 ? (
														<AiFillEyeInvisible
															onClick={() => {
																setShowPassword2(false);
															}}
															role="button"
															color="white"
															size="30px"
														/>
													) : (
														<AiFillEye
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
											<Button type="submit" variant="primary">
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
											<Button onClick={() => setShowDeleteModal(true)} variant="danger">
												Delete Account
											</Button>{" "}
										</Row>
									</Col>
									<Col md={4} lg={2}>
										<Row>
											<Button variant="secondary" onClick={logOut}>
												Log Out
											</Button>
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
