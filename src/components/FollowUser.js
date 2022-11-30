import { useState, useEffect } from "react";
import { Card, Image, Button, Col, Row } from "react-bootstrap";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function FollowUser({ id }) {
	const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
	// let navigate = useNavigate();

  useEffect(() => {
    async function checkFollowing() {
      const docRef = doc(
        db,
        `users/${currentUser.uid}/following`,
        id
        );
      const docUserSnap = await getDoc(docRef);
      setIsFollowing(docUserSnap.exists());
    }
    checkFollowing();
  }, [id])

  useEffect(() => {
    async function findUser() {
      const docRef = doc(db, `users`, id);
      const docUserSnap = await getDoc(docRef);

      if (docUserSnap.exists()) {
          setUser({ ...docUserSnap.data(), id: docUserSnap.id });
      }
    }
    findUser();
  }, [id])

	//check following status
	async function followUser() {
		await setDoc(
			doc(db, `users/${currentUser.uid}/following`, id),
			{}
		);
		await setDoc(
			doc(db, `users/${id}/followers`, currentUser.uid),
			{}
		);
		setIsFollowing(true);
		// setFollowersCount(followersCount + 1);
	}

	async function unfollowUser() {
		await deleteDoc(
			doc(db, `users/${currentUser.uid}/following`, id),
			{}
		);
		await deleteDoc(
			doc(db, `users/${id}/followers`, currentUser.uid),
			{}
		);
		setIsFollowing(false);
		// setFollowersCount(followersCount - 1);
	}

	return (
    <Card
        className="workoutItemCard hover-overlay shadow-1-strong p-2"
        key={id}
        role="button"
        // onClick={() => {
        //     navigate(`/users/${id}`);
        // }}
    >
      <Card.Body className="d-flex align-items-center justify-content-between p-0">
        {/* <Row>
          <Col> */}
        <div className="d-flex align-items-center">
          <Image
            roundedCircle
            src={user?.photoURL}
            className="me-3"
            alt={user?.name}
            width="50px"
            height="50px"
            style={{ objectFit: "cover" }}
          />
          <Card.Title className="text-light m-0">
            {user?.name}
          </Card.Title>
        </div>
          {/* </Col>
          <Col> */}
            <div className="me-5">
              {/* {isFollowing ? ( */}
                <Button
                    as={Link}
                    className="w-100"
                    to={`/users/${id}`}
                >
                    View Profile
                </Button>
              {/* ) : (
                <Button
                    className="w-100"
                    onClick={() =>
                        followUser()
                    }
                >
                    Follow
                </Button>
              )}
             */}
            </div>
          {/* </Col>
        </Row> */}
      </Card.Body>
    </Card>
	);
}

export default FollowUser;
