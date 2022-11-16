import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import { Image } from "react-bootstrap";

function LandingPage({ authComponent }) {
	return (
		<Container fluid className="landingPage">
			<Row md={6}>
				<Col md={6} className="landingImageContainer">
					<Image className="landingImage" alt="FitIn cover" src={"./landing-page.png"} />
				</Col>
				<Col md={6} className="appForm">
					<div className="pageSwitcher">
						<NavLink to="/login" className={({ isActive }) => (isActive ? "pageSwitcherItem pageSwitcherItem-active" : "pageSwitcherItem")}>
							Sign In
						</NavLink>
						<NavLink to="/signup" className={({ isActive }) => (isActive ? "pageSwitcherItem pageSwitcherItem-active" : "pageSwitcherItem")}>
							Sign Up
						</NavLink>
					</div>
					<h1 className="landingHeader">
						Welcome to <span style={{ color: "#3483EB" }}>FitIn</span>
					</h1>
					{authComponent}
				</Col>
			</Row>
		</Container>
	);
}

export default LandingPage;
