import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "./SocialPage.css";
import PostFeedItem from "../components/PostFeedItem";
import CreatePost from "../components/CreatePost";

import FriendsList from "../components/FriendsList";

function SocialPage() {
	useEffect(() => {
		document.title = `Social Page | FitIn`;
	}, []);

	const posts = [
		{
			author: "Noah Colaco",
			authorImage: "usericon1.png",
			tags: [
				{ tag: "Yoga", url: "#" },
				{ tag: "Cardio", url: "#" },
			],
			image: "usericon1.png",
			content: "this is the post content an example of typing this thing is making me type this idk bruh, but ya boi out here doing all this typing stuff and we built diff out here gang gang",
		},
		{
			author: "Fabrizio Romano",
			authorImage: "usericon1.png",
			tags: [
				{ tag: "Sports", url: "#" },
				{ tag: "France", url: "#" },
			],
			image: "usericon1.png",
			content: "Paul Pogba will miss the Qatar 2022 World Cup due to new injury, confirmed by his agent Rafaela Pimenta",
		},
		{
			author: "Simon Collings",
			authorImage: "usericon1.png",
			tags: [
				{ tag: "Sports", url: "#" },
				{ tag: "Arsenal", url: "#" },
			],
			image: "",
			content: "No training for squad today, but Arsenal due to assess Bukayo Saka. Hope is nothing serious, but club should know more by Wednesday.",
		},
	];

	return (
		<Container fluid className="mainPage">
			<div className="row">
				<div className="p-0 m-0 col-md-3">
					<FriendsList />
				</div>
				<div className="p-0 m-0 col-md-2"></div>

				<div className="m-0 col-md-5">
					<Col>
						<CreatePost></CreatePost>

						{posts?.length > 0 &&
							posts.map(({ author, authorImage, tags, image, content }, id) => (
								<PostFeedItem author={author} authorImage={authorImage} tags={tags} image={image} content={content} key={id} />
							))}
					</Col>
				</div>
				<div className="p-0 m-0 col-md-2"></div>
			</div>
		</Container>
	);
}

export default SocialPage;
