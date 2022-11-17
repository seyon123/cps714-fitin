import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import "./HelpPage.css";
import { Image } from "react-bootstrap";

function HelpPage() {
	// Set the page title
	useEffect(() => {
		document.title = `Help | FitIn`;
	}, []);
	return (
		<Container fluid className="mainPage px-4">
			<div className="helpbox">
				<div>
					<h1 className="pt-4">Help!</h1>
					<hr></hr>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
						ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
						occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</div>
			<div>
				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<Accordion.Header className="h1">Why am I not seeing any gains?</Accordion.Header>
						<Accordion.Body>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header>Why is it prononced "mus-sels" instead of "mus-kles"?</Accordion.Header>
						<Accordion.Body>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>How do I become an NFT?</Accordion.Header>
						<Accordion.Body>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
				<Image
					src="https://static.vecteezy.com/system/resources/previews/005/951/415/large_2x/woman-doing-surfer-burpees-exercise-flat-illustration-isolated-on-white-background-free-vector.jpg"
					style={{ height: "400px", margin: "12px" }}
					alt="placeholder"
				></Image>
				<Image
					src="https://static.vecteezy.com/system/resources/previews/008/577/951/large_2x/a-young-man-is-cycling-a-bicycle-sports-activity-athlete-is-riding-a-bike-flat-style-illustration-free-vector.jpg"
					style={{ height: "400px", margin: "12px" }}
					alt="placeholder"
				></Image>
				<Image
					src="https://static.vecteezy.com/system/resources/previews/008/321/562/large_2x/man-doing-parallel-dip-bar-exercise-flat-illustration-isolated-on-white-background-free-vector.jpg"
					style={{ height: "400px", margin: "12px" }}
					alt="placeholder"
				></Image>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<Image
					src="https://static.vecteezy.com/system/resources/previews/008/056/908/large_2x/man-doing-barbell-bench-press-chest-press-flat-illustration-isolated-on-white-background-free-vector.jpg"
					style={{ height: "400px", margin: "12px" }}
					alt="placeholder"
				></Image>
				<Image
					src="https://static.vecteezy.com/system/resources/previews/006/417/685/large_2x/woman-doing-pull-up-exercise-flat-illustration-isolated-on-white-background-free-vector.jpg"
					style={{ height: "400px", margin: "12px" }}
					alt="placeholder"
				></Image>
				<Image
					src="https://static.vecteezy.com/system/resources/previews/006/417/622/large_2x/woman-doing-squat-with-barbell-exercise-flat-illustration-isolated-on-white-background-free-vector.jpg"
					style={{ height: "400px", margin: "12px" }}
					alt="placeholder"
				></Image>
				<p className="m-0">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>
		</Container>
	);
}
export default HelpPage;
