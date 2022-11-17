import { useEffect, useState } from "react";
import { Image, Container, Row, Button, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import PostFeedItem from "../components/PostFeedItem";
import LoadingSpinner from "../components/LoadingSpinner";
import "./UserProfilePage.css";

import {
    doc,
    collection,
    getDoc,
    setDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    limit,
} from "firebase/firestore";

function UserProfilePage() {
    const { currentUser } = useAuth();
    const { userid } = useParams();

    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = `${user ? user.name : "User Not Found"} | FitIn`;
    }, [user]);

    useEffect(() => {
        setIsLoading(true);
        //Get User from database
        async function findUser() {
            const docRef = doc(db, `users`, userid);
            const docUserSnap = await getDoc(docRef);

            if (docUserSnap.exists()) {
                setUser({ ...docUserSnap.data(), id: docUserSnap.id });
            }
        }
        findUser();
        //Get User from database
        async function getFollowersFollowing() {
            if (userid) {
                const followersRef = collection(
                    db,
                    `users/${userid}`,
                    "followers"
                );
                const docFollowersSnap = await getDocs(followersRef);
                const followingRef = collection(
                    db,
                    `users/${userid}`,
                    "following"
                );
                const docFollowingSnap = await getDocs(followingRef);
                setFollowersCount(docFollowersSnap.size);
                setFollowingCount(docFollowingSnap.size);
            }
        }
        getFollowersFollowing();
        setIsLoading(false);
    }, [userid]);

    useEffect(() => {
        //check following
        async function checkFollowing() {
            const docRef = doc(
                db,
                `users/${currentUser.uid}/following`,
                userid
            );
            const docUserSnap = await getDoc(docRef);
            setIsFollowing(docUserSnap.exists());
        }

        checkFollowing();
    }, [currentUser.uid, userid]);

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, `posts`),
                where("userRef", "==", doc(db, "users", userid))
            ),
            (snapshot) => {
                setPosts(
                    snapshot.docs
                        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
                        .map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            }
        );
    }, [userid]);

    async function followUser() {
        await setDoc(
            doc(db, `users/${currentUser.uid}/following`, user.id),
            {}
        );
        await setDoc(
            doc(db, `users/${user.id}/followers`, currentUser.uid),
            {}
        );
        setIsFollowing(true);
        setFollowersCount(followersCount + 1);
    }

    async function unfollowUser() {
        await deleteDoc(
            doc(db, `users/${currentUser.uid}/following`, user.uid),
            {}
        );
        await deleteDoc(
            doc(db, `users/${user.id}/followers`, currentUser.uid),
            {}
        );
        setIsFollowing(false);
        setFollowersCount(followersCount - 1);
    }

    return (
        <LoadingSpinner isLoading={isLoading}>
            <Container className="mainPage" style={{ color: "white" }}>
                {user ? (
                    <>
                        <br />
                        <div className="card bg-dark text-white">
                            <Container>
                                <Row>
                                    {/* This column holds the profile image */}
                                    <Col className="d-flex align-items-center justify-content-center m-4 col-md-2">
                                        <Image
                                            roundedCircle
                                            width="150px"
                                            height="150px"
                                            style={{ objectFit: "cover" }}
                                            src={user?.photoURL}
                                        />
                                    </Col>
                                    <Col className="my-4 col-md-5 col-sm-12">
                                        <br />
                                        <br />
                                        <h2>
                                            <Row className="noMargin fs-2 fw-bold">
                                                {user?.name}
                                            </Row>
                                        </h2>
                                        <p className="text-white-50">
                                            <Row className="noMargin">
                                                {user?.bio}
                                            </Row>
                                        </p>
                                        <p>
                                            <Row className="noMargin">
                                                <a
                                                    className="p-0"
                                                    href={user?.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <b>{user?.website}</b>
                                                </a>
                                            </Row>
                                        </p>
                                    </Col>
                                    <Col className="my-4 text-center">
                                        <br />
                                        <br />
                                        <Row className="d-flex align-items-center justify-content-center">
                                            {currentUser?.uid !== userid ? (
                                                isFollowing ? (
                                                    <Button
                                                        className="w-50"
                                                        onClick={() =>
                                                            unfollowUser()
                                                        }
                                                    >
                                                        Unfollow
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="w-50"
                                                        onClick={() =>
                                                            followUser()
                                                        }
                                                    >
                                                        Follow
                                                    </Button>
                                                )
                                            ) : (
                                                <Button
                                                    as={Link}
                                                    className="w-50"
                                                    to="/settings"
                                                >
                                                    Settings
                                                </Button>
                                            )}
                                        </Row>
                                        <br />
                                        <Row className="d-flex align-items-center justify-content-between">
                                            <Col className="">
                                                <Button
                                                    variant="link"
                                                    to="/"
                                                    style={{
                                                        color: "inherit",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <h4>Followers</h4>
                                                </Button>
                                                <h4>{followersCount}</h4>
                                            </Col>
                                            <Col className="">
                                                <div>
                                                    <Button
                                                        variant="link"
                                                        to="/"
                                                        style={{
                                                            color: "inherit",
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        <h4>Following</h4>
                                                    </Button>
                                                    <h4>{followingCount}</h4>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <br />
                        <Container
                            className="d-flex align-items-center justify-content-between"
                            style={{ width: "69%" }}
                        >
                            <Col>
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
                        </Container>
                    </>
                ) : (
                    <>
                        <br />
                        <h1 className="text-center mt-3">User Not Found</h1>
                    </>
                )}
            </Container>
        </LoadingSpinner>
    );
}

export default UserProfilePage;
