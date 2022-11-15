import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SettingsPage.css";
import { Button, Form } from "react-bootstrap";

function SettingsPage({ authComponent }) {
	return (
        <div className="settingsPage px-5">
        <Container fluid >
            <Row md={12}>
				<Col md={12}>
                <h1 className="pt-4">Profile Settings</h1>
                <hr style={{width: "100%"}}></hr>
                {authComponent}
				</Col>
            </Row>
		</Container>

        <div className="profileSection mt-5 py-3 px-3">
        <Container fluid >
            <Row className="py-3">
				<Col md={6} lg={5} xl={3}>
                    <Row md={12}>
                        <h3 className="changeProfilePicture">Tiffany Galea</h3>
                    </Row>
                    <Row md={12}>
                        <div>
                            <div className="changeProfilePicture">
                            <img alt="logo" className="logo" src="fitin_logo.png" style={{ height:"120px",width:"120px", marginRight: "20px"}} />
                            <Button variant="outline-light">Change</Button>{' '}
                            </div>
                        </div>
                    </Row>
				</Col>
                <Col md={6} lg={7} xl={9}>
                    <Row>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control placeholder="Enter your full name" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
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
                <Form.Control as="textarea" rows={3} placeholder="live laugh love"/>
            </Form.Group>
            </Col>

            </Row>
            <Row  >
                <Col md={12} lg={12} xl={12}>
            <Form.Group className="mb-3" controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control placeholder="example.com" />
            </Form.Group>
            </Col>
            </Row>
		</Container>


        </div>
        </div>
	);
}

export default SettingsPage;
