import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";
import "./SocialPage.css";

import FriendsList from "../components/FriendsList";

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
		<Container fluid className="mainPage p-0 m-0">
			
			<div className="row">

				<div className="p-0 m-0 pe-5 mt-2 col-md-3">
					<FriendsList />
				</div>

				<div className="p-0 m-0 col-md-8">
					<Col>
						<Row className="noMargin">Name: {user.displayName}</Row>
						<Row className="noMargin">Email: {user.email}</Row>
						<Row className="noMargin">ID: {user.uid}</Row>
						<Image roundedCircle src={user.photoURL} />
						<button onClick={handleSignOut}>Sign Out</button>
					</Col>
				</div>

			</div>


			
		</Container>
	);
}

export default SocialPage;
