import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";
import "./SocialPage.css";
import CreatePost from "../components/CreatePost";

import FriendsList from "../components/FriendsList";

function SocialPage() {
	const { currentUser } = useAuth();

	useEffect(() => {
		document.title = `Social Page | FitIn`;
	}, []);

	return (
		<Container fluid className="mainPage m-0">
			<div className="row">
				<div className="p-0 m-0 col-md-3">
					<FriendsList />
				</div>

				<div className="p-0 m-0 col-md-8">
					<Col>
						<div style={{ margin: "5px" }}>
							<CreatePost></CreatePost>
						</div>
						<Row className="noMargin">Name: {currentUser.displayName}</Row>
						<Row className="noMargin">Email: {currentUser.email}</Row>
						<Row className="noMargin">ID: {currentUser.uid}</Row>
						<Image roundedCircle src={currentUser.photoURL} />
					</Col>
				</div>
			</div>
		</Container>
	);
}

export default SocialPage;
