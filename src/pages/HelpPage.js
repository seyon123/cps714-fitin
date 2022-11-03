import React,{ useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";

import "./HelpPage.css";


function HelpPage() {
	// Set the page title
	useEffect(() => {
		document.title = `Help | FitIn`;
	}, []);
    return (
        <Container fluid className="mainPage px-4">
			<h1 className="pt-4">Help!</h1>
			<hr></hr>
            
            </Container>


    );

}
export default HelpPage;