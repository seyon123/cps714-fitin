import "./PostFeedItem.css";
import { Card } from "react-bootstrap";
import { FaTag } from 'react-icons/fa'


function PostFeedItem({author, authorImage, tags, image, content}) {
	
	return (
		<Card bg='dark' text='white' className="postFeedItem">
			<Card.Body>
				<div className="postItemInline">
					<img src={authorImage} className="postItemProfileImg rounded-circle postItemMarginRightSmall" alt="profile pic"/>
					<div>
						<Card.Title>{author}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							{tags?.length > 0 &&
								tags.map(({ tag, url }, id) => (
									<div className="postItemInline postItemMarginRightSmall" key={id}>
										<FaTag />
										<Card.Link className="postTagLink" href={url}>{tag}</Card.Link>
									</div>
								))
							}
						</Card.Subtitle>
					</div>
				</div>
				<div>
					{ (image) && <img src={image} className="postImage postItemMarginTopSmall" alt="profile pic" /> }
					<div className="postItemMarginRightSmall postItemMarginTopSmall">
						<Card.Text>
							{content}
						</Card.Text>
					</div>	
				</div>
			</Card.Body>
		</Card>
	);
}

export default PostFeedItem;
