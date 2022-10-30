import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function PostFeedItem({post}) {

	const postTitle = 'Post Title'

	return (
		<Card bg={'dark'}
		key={'dark'}
		text={'white'}
		style={{ width: '40rem' }}
		className="mb-2">
			<Card.Body>
				<div style={{ display: 'inline-flex' }}>
					<img src={"usericon1.png"} className="w-25 rounded-circle" alt="profile pic" />
					<div style={{ marginLeft: '1rem' }}>
						<Card.Title>{postTitle}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
					</div>
				</div>
				<div style={{ display: 'inline-flex' }}>
					<div style={{ marginRight: '1rem' }}>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
					</div>
					<img src={"usericon1.png"} className="w-25" alt="profile pic" />
				</div>
			</Card.Body>
		</Card>
	);
}

export default PostFeedItem;
