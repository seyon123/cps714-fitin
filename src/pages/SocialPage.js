import { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { db } from "../firebase";
import PostFeedItem from "../components/PostFeedItem";
import CreatePost from "../components/CreatePost";
import FriendsList from "../components/FriendsList";
import SocialSearchBar from "../components/SocialSearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import "./SocialPage.css";

import {
    collection,
    onSnapshot,
    query,
    orderBy,
    limit,
} from "firebase/firestore";

function SocialPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = `Social Page | FitIn`;
    }, []);

    useEffect(() => {
        setIsLoading(true);
        onSnapshot(
            query(
                collection(db, `posts`),
                orderBy("timestamp", "desc"),
                limit(6)
            ),
            (snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            }
        );
        setIsLoading(false);
    }, []);

    return (
        <Container fluid className="mainPage">
            <div className="row">
                <FriendsList />
                <LoadingSpinner isLoading={isLoading}>
                    <div className="p-0 m-0 col-md-3"></div>
                    <div className="p-0 m-0 col-md-2"></div>
                    <div className="m-0 col-md-5">
                        <SocialSearchBar posts={posts} />
                        <Col>
                            <CreatePost></CreatePost>
                            {posts?.length > 0 ? (
                                posts.map(
                                    ({
                                        id,
                                        userRef,
                                        tags,
                                        timestamp,
                                        image,
                                        description,
                                        likes,
                                    }) => (
                                        <PostFeedItem
                                            id={id}
                                            userRef={userRef}
                                            tags={tags}
                                            image={image}
                                            timestamp={timestamp}
                                            description={description}
                                            likes={likes}
                                            key={id}
                                        />
                                    )
                                )
                            ) : (
                                <h1 className="text-center mt-3">
                                    No posts yet
                                </h1>
                            )}
                        </Col>
                    </div>
                    <div className="p-0 m-0 col-md-2"></div>
                </LoadingSpinner>
            </div>
        </Container>
    );
}

export default SocialPage;
