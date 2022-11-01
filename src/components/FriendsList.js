import { Container, Card } from "react-bootstrap";

import "./FriendsList.css";

function FriendsList() {
	const dummyFriends = [
		{ id: 0, name: "Jacky", image: "usericon1.png" },
		{ id: 1, name: "Seyon", image: "usericon1.png" },
		{ id: 2, name: "William", image: "usericon1.png" },
		{ id: 3, name: "Tiago", image: "usericon1.png" },
		{ id: 4, name: "Raj", image: "usericon1.png" },
		{ id: 5, name: "Hamdan", image: "usericon1.png" },
		{ id: 6, name: "Noah", image: "usericon1.png" },
		{ id: 7, name: "Jawwad", image: "usericon1.png" },
		{ id: 8, name: "Leslie", image: "usericon1.png" },
		{ id: 9, name: "Haaland", image: "usericon1.png" },
		{ id: 10, name: "Ronaldo", image: "usericon1.png" },
		{ id: 11, name: "Messi", image: "usericon1.png" },
		{ id: 12, name: "Tobi", image: "usericon1.png" },
		{ id: 13, name: "Rowlet", image: "usericon1.png" },
	];

	//const [friends] = useState(dummyFriends);

	return (
		<Container fluid className="friends-list-wrap">
			<div className="friends-list-header m-0">
				<h3 className=" text-center p-3 m-0">Following</h3>
			</div>

			<div className="friends-list-body p-2">
				{dummyFriends.map(({ id, image, name }) => (
					<Card
						className="workoutItemCard hover-overlay shadow-1-strong p-2"
						key={id}
						role="button"
						onClick={() => {
							alert("Clicked on " + id + " " + name);
						}}
					>
						<Card.Body className="d-flex align-items-center justify-content-start p-0">
							<img src={image} height="50px" className="rounded-circle me-3" alt="Friend Profile" />
							<Card.Title className="text-light m-0">{name}</Card.Title>
						</Card.Body>
					</Card>
				))}
			</div>
		</Container>
	);
}

export default FriendsList;
