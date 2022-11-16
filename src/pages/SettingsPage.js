import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SettingsPage.css";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import ConfirmDeleteModal from "../components/Modals/ConfirmModal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function SettingsPage({ authComponent }) {

    const [fullName, setFullName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [Biography, setBiography] = useState("");
    const [website, setWebsite] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPasswordChangeAlert, setPasswordChangeAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [showProfileChangeAlert, setProfileChangeAlert] = useState(false);
    const [showModal, setModal] = useState(false);
    const handleModalClose = () => setModal(false);
    const handleModalShow = () => setModal(true);
    function uploadContent() {
		document.getElementById("imageUpload").click();
	}

	return (
        <div className="settingsPage px-5">
            <ConfirmDeleteModal
            show={showModal}
            handleClose={handleModalClose}
            showModal={handleModalShow}
            >
            </ConfirmDeleteModal>
            <Container fluid >
                <Row md={12}>
                    <Col md={12}>
                    <h1 className="pt-4">Profile Settings</h1>
                    <hr style={{width: "100%"}}></hr>
                    {authComponent}
                    </Col>
                </Row>
            </Container>

            <div className="profileSection my-5 py-3 px-3">
                <Alert style={{display: "block"}} show={showProfileChangeAlert} key="primary" variant="primary">
                    <Row>
                        <Col>
                            <h5 className="centerAlert">Profile updated</h5>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setProfileChangeAlert(false)} variant="outline-primary">
                                    Close
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Alert>
                <Container fluid >
                    
                    <Row className="py-3">
                        <Col md={6} lg={5} xl={3}>
                            <Row md={12}>
                                <h3 className="changeProfilePicture">Gigachad Grindset</h3>
                            </Row>
                            <Row md={12}>
                                <div>
                                    <div className="changeProfilePicture">
                                    <img alt="logo" className="logo" src="fitin_logo.png" style={{ height:"120px",width:"120px", marginRight: "20px"}} />
                                    <Button variant="outline-light" onClick={() => uploadContent()}>Change</Button>{' '}
                                    </div>
                                </div>
                            </Row>
                        </Col>
                        <Col md={6} lg={7} xl={9}>
                            <Row>
                                <Form.Group className="mb-3" controlId="fullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></Form.Control>
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                    <Row  >
                        <Col md={12} lg={12} xl={12}>
                    <Form.Group className="mb-3" controlId="biography">
                        <Form.Label>Biography</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="live laugh love" value={Biography} onChange={(e) => setBiography(e.target.value)}/>
                    </Form.Group>
                    </Col>

                    </Row>
                    <Row  >
                        <Col md={12} lg={12} xl={12}>
                            <Form.Group className="mb-3" controlId="website">
                                <Form.Label>Website</Form.Label>
                                <Form.Control placeholder="example.com" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row  >
                        <Col md={9} ></Col>
                        <Col md={3} >
                            <Row className="p-3">
                                <Button onClick={() => setProfileChangeAlert(true)} className="ml-3 centerButton" variant="primary">Save</Button>{' '}
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </div>

            <Container fluid >
                <Row md={12}>
                    <Col md={12}>
                    <h1 className="pt-4">Account Settings</h1>
                    <hr style={{width: "100%"}}></hr>
                    {authComponent}
                    </Col>
                </Row>
            </Container>

            <div className="profileSection my-5 py-3 px-3">
                
                <Alert style={{display: "block"}} show={showPasswordChangeAlert} key="primary" variant="primary">
                    <Row>
                        <Col>
                            <h5 className="centerAlert">
                            Password changed
                            </h5>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setPasswordChangeAlert(false)} variant="outline-primary">
                                    Close
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Alert>
                
                <Container fluid >
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
                                            <Form.Control type={showPassword ? "email": "password"} placeholder="Confirm new password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                            {showPassword ? 
                                            <InputGroup.Text style={{background: "#141414", border: "none"}}>
                                                        <AiFillEye onClick={()=>{setShowPassword(false)}} role="button" color="white" size="30px"/>
                                            </InputGroup.Text>
                                            :
                                            <InputGroup.Text style={{background: "#141414", border: "none"}}>
                                                        <AiFillEyeInvisible onClick={()=>{setShowPassword(true)}} role="button" color="white" size="30px"/>
                                            </InputGroup.Text>
                                            }
                                    </InputGroup>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3 mt-3 mb-4" controlId="confirmPassword">
                                        <Form.Label>Confirm New Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control type={showPassword ? "email": "password"} placeholder="Confirm new password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                            {showPassword ? 
                                            <InputGroup.Text style={{background: "#141414", border: "none"}}>
                                                        <AiFillEye onClick={()=>{setShowPassword(false)}} role="button" color="white" size="30px"/>
                                            </InputGroup.Text>
                                            :
                                            <InputGroup.Text style={{background: "#141414", border: "none"}}>
                                                        <AiFillEyeInvisible onClick={()=>{setShowPassword(true)}} role="button" color="white" size="30px"/>
                                            </InputGroup.Text>
                                            }
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row  >
                                <Col md={9} >
                                    {
                                        password != confirmPassword ?
                                        <h6 className="px-3" style={{color: "#DC3545", fontWeight: "600px"}}>Passwords must match</h6> :
                                        null
                                    }
                                </Col>
                                <Col md={3} >
                                    <Row className="p-3">
                                        <Button onClick={() => setPasswordChangeAlert(true)} className="ml-3 centerButton" variant="primary">Change Password</Button>{' '}
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <h3 className="mt-5 mb-4">Account</h3>
                            </Row>
                            <Row>
                                <Col md={1}></Col>
                                <Col className="mb-4" md={4} lg={2}>
                                    <Row>
                                        <Button onClick={() => setModal(true)} className="centerButton" variant="danger">Delete Account</Button>{' '}
                                    </Row>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={4} lg={2}>
                                    <Row>
                                        <Button className="centerButton" variant="secondary">Log Out</Button>{' '}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <input type="file" style={{ display: "none" }} accept="image/*" className="iconFormat" id="imageUpload" ></input>
                </Container>

            </div>
        </div>
	);
}

export default SettingsPage;
