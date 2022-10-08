import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";

function MainPage() {
	const { getUser, logOut } = useAuth();
	const user = getUser();

	console.log(user);

	function handleSignOut(e) {
		e.preventDefault();
		logOut();
	}

	useEffect(() => {
		document.title = `Main Page | FitIn`;
	}, []);

	return (
		<Container fluid>
			<Col>
				<Row>Name: {user.displayName}</Row>
				<Row>Email: {user.email}</Row>
				<Row>ID: {user.uid}</Row>
				<Image roundedCircle src={user.photoURL} />
				<button onClick={handleSignOut}>Sign Out</button>
			</Col>
		</Container>
	);
}

export default MainPage;
