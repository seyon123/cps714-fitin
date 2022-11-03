import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../contexts/AuthContext";
import { FaUserEdit, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
	const { getUser, logOut } = useAuth();
	const user = getUser();

	function handleSignOut(e) {
		e.preventDefault();
		logOut();
	}

	return (
		<Navbar collapseOnSelect bg="dark" variant="dark" className="fixed-top">
			<Container fluid>
				<Navbar.Brand href="/">
					<img alt="logo" className="logo" src={"/fitin_logo.png"} />{" "}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="text-end my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Link className="nav-link" to="/">
							Workout
						</Link>
						<Link className="nav-link" to="/social">
							Social
						</Link>
					</Nav>
				</Navbar.Collapse>

				<NavDropdown
					menuVariant="dark"
					align="end"
					title={<img alt="logo" className="logo" src={user?.photoURL ? user.photoURL : `https://avatars.dicebear.com/api/initials/${user?.displayName?.trim()}.svg`} />}
					id="basic-nav-dropdown"
				>
					<div className="profile-name">
						<NavDropdown.Header className="profile-name">{user.displayName}</NavDropdown.Header>
					</div>
					<div className="dropdownlinks">
						<Link to={`/users/${user?.uid}`} className="dropdown-item">
							<span className="spanIcon">
								<FaUserEdit />
							</span>{" "}
							Edit Profile
						</Link>
						<Link to="#" className="dropdown-item">
							<span className="spanIcon">
								<FaCog />
							</span>{" "}
							Settings
						</Link>
						<Link to="/help" className="dropdown-item">
							<span className="spanIcon">
								<FaQuestionCircle />
							</span>{" "}
							Help
						</Link>
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={handleSignOut}>
							<FaSignOutAlt size="1.5em" /> Logout
						</NavDropdown.Item>
					</div>
				</NavDropdown>
			</Container>
		</Navbar>
	);
}

export default NavBar;
