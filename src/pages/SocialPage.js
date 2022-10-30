import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";
import "./SocialPage.css";
import CreatePost from "../components/CreatePost";

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
		<div>
		<Container fluid className="mainPage p-0">
			<h1>Social Page</h1>
			<Col>
			<div style={{marginLeft:"5px",marginRight: "5px"}}>
			<CreatePost></CreatePost>
			</div>
				<Row className="noMargin">Name: {user.displayName}</Row>
				<Row className="noMargin">Email: {user.email}</Row>
				<Row className="noMargin">ID: {user.uid}</Row>
				<Image roundedCircle src={user.photoURL} />
				<button onClick={handleSignOut}>Sign Out</button>
			</Col>
			
		</Container>
		
		</div>
	);
}

export default SocialPage;
