import { useEffect, useState } from "react";
import { Container, Col, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import PostFeedItem from "../components/PostFeedItem";
import CreatePost from "../components/CreatePost";
import FriendsList from "../components/FriendsList";
import SocialSearchBar from "../components/SocialSearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchFirstBatchPosts, fetchNextBatchPosts } from "../utils/FetchPosts";
import "./SocialPage.css";

function SocialPage() {
    const [posts, setPosts] = useState([]);
    const [lastDoc, setLastDoc] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = `Social Page | FitIn`;
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchFirstBatchPosts()
            .then((res) => {
                setPosts(res.posts);
                setLastDoc(res.lastDoc);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false);
    }, []);

    const fetchMorePosts = () => {
        fetchNextBatchPosts(lastDoc)
            .then((res) => {
                setLastDoc(res.lastDoc);
                setPosts(posts.concat(res.posts));
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                            <InfiniteScroll
                                className="scroller"
                                loadMore={fetchMorePosts}
                                hasMore={lastDoc !== undefined}
                                loader={
                                    <div
                                        key={0}
                                        className="d-flex align-items-center justify-content-center my-3"
                                    >
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </Spinner>
                                    </div>
                                }
                            >
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
                            </InfiniteScroll>
                            {!lastDoc && (
                                <h3 className="text-center my-3">
                                    No more posts
                                </h3>
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
