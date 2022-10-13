import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";
import "./SocialPage.css";
import NavBar from "../components/NavBar";

function SocialPage() {
	const { getUser, logOut } = useAuth();
	const user = getUser();

	console.log(user);

	function handleSignOut(e) {
		e.preventDefault();
		logOut();
	}

	useEffect(() => {
		document.title = `Social Page | FitIn`;
	}, []);

	return (
		<Container fluid className={"mainPage p-0"}>
			<NavBar></NavBar>
            <h1>SOCIAL PAGE</h1>
			<Col>
				<Row className="noMargin">Name: {user.displayName}</Row>
				<Row className="noMargin">Email: {user.email}</Row>
				<Row className="noMargin">ID: {user.uid}</Row>
				<Image roundedCircle src={user.photoURL} />
				<button onClick={handleSignOut}>Sign Out</button>
			</Col>
		</Container>
	);
}

export default SocialPage;
