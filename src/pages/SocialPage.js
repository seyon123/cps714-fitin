import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "./SocialPage.css";
import PostFeedItem from "../components/PostFeedItem"
import FriendsList from "../components/FriendsList";

function SocialPage() {

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
						<PostFeedItem />
					</Col>
				</div>
			</div>
		</Container>
	);
}

export default SocialPage;
