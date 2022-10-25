import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../contexts/AuthContext";
import "./NavBar.css";

function NavBar() {
	const { getUser, logOut } = useAuth();
	const user = getUser();

	function handleSignOut(e) {
		e.preventDefault();
		logOut();
	}

	return (
		<Navbar collapseOnSelect bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand href="/">
					<img alt="logo" className="logo" src={"./fitin_logo.png"} />{" "}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="text-end my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Nav.Link href="/">Workout</Nav.Link>
						<Nav.Link href="social">Social</Nav.Link>
					</Nav>
				</Navbar.Collapse>

				<NavDropdown
					menuVariant="dark"
					align="end"
					title={<img alt="logo" className="logo" src={user?.photoURL ? user.photoURL : `https://avatars.dicebear.com/api/initials/${user?.displayName?.trim()}.svg`} />}
					id="basic-nav-dropdown"
				>
					<div className="profile-name">
						<strong>{user.displayName}</strong>
					</div>
					<NavDropdown.Item href="#">Edit Profile</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item onClick={handleSignOut}>Logout</NavDropdown.Item>
				</NavDropdown>
			</Container>
		</Navbar>
	);
}

export default NavBar;
