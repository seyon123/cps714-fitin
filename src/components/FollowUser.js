import { useState, useEffect } from "react";
import { Card, Image, Button } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function FollowUser({ id, onHide }) {
  const [user, setUser] = useState();

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

	return (
    <Card
        className="workoutItemCard hover-overlay shadow-1-strong p-2"
        key={id}
        role="button"
    >

      <Card.Body className="d-flex align-items-center justify-content-between p-0">
        <div className="d-flex align-items-center">
          {user ? <Image
            roundedCircle
            src={user?.photoURL}
            className="me-3"
            alt={user?.name}
            width="50px"
            height="50px"
            style={{ objectFit: "cover" }}
          /> : <Image
            roundedCircle
            src={"/fitin_logo.png"}
            className="me-3"
            alt="Fitin Logo"
            width="50px"
            height="50px"
            style={{ objectFit: "cover" }}
          />}
          <Card.Title className="text-light m-0">
            {user ?
              user.name
            : "Deleted User"}
          </Card.Title>
        </div>
        {console.log(user)}
        {user ? (
          <div className="me-5">
            <Button
                as={Link}
                className="w-100"
                onClick={(onHide)}
                to={`/users/${id}`}
            >
                View Profile
            </Button>
          </div>
        ) : (null)}
        
      </Card.Body>
    </Card>
	);
}

export default FollowUser;
