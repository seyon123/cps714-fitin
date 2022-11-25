import { useEffect, useState } from "react";
import { Container, Card, Image } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "react-day-picker/dist/style.css";
import "./AppCardPage.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";

function AppCardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setIsLoading(false);
    }, [currentUser.uid]);

    // Set the page title
    useEffect(() => {
        document.title = `Welcome! | FitIn`;
    }, []);

    return (
        <LoadingSpinner isLoading={isLoading}>
            <Container fluid className="appCardPage px-4">
                <div className="gap-1 justify-content-center appHeaderLogo">
                    <Image
                        alt="logo"
                        className="logo"
                        src={"/fitin_logo.png"}
                    />{" "}
                    <h1 className="my-auto" style={{ fontWeight: "bold" }}>
                        Fit<span style={{ color: "#0d6efd" }}>In</span>
                    </h1>
                </div>

                <Container fluid className="gap-5 justify-content-center appCardRow">
                    <div xs={12} md={6} className="mb-4 mx-auto appCardWidth">
                        <Card className="appCard" bg="dark" role="button" onClick={() => navigate(`/workout`)}>
                            <Card.Img className="appCardImage" variant="top" src={"/workoutAppImage.jpeg"} />
                            <Card.Body style={{ minHeight: "50px", textAlign: "center" }}>
                                <Card.Title className="m-0">Workout</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div xs={12} md={6} className="mb-4 mx-auto appCardWidth">
                        <Card className="appCard" bg="dark" role="button" onClick={() => navigate(`/social`)}>
                            <Card.Img className="appCardImage" variant="top" src={"/socialAppImage.jpg"} />
                            <Card.Body style={{ minHeight: "50px", textAlign: "center" }}>
                                <Card.Title className="m-0">Social</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>


                <hr></hr>
                <Footer />
            </Container>
        </LoadingSpinner>
    );
}

export default AppCardPage;
