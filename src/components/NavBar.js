import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../contexts/AuthContext";
import { FaCog, FaSignOutAlt, FaQuestionCircle, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import { Image } from "react-bootstrap";

function NavBar() {
  const { currentUser, logOut } = useAuth();
  const user = currentUser;
  let location = useLocation();

  function handleSignOut(e) {
    e.preventDefault();
    logOut();
  }

  return (
    <Navbar collapseOnSelect variant="dark" className="fixed-top bgdarkgrey">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          className="d-flex gap-1 justify-content-center"
          to="/app"
        >
          <Image alt="logo" className="logo" src={"/fitin_logo.png"} />{" "}
          <h2 className="my-auto" id="logoText" style={{ fontWeight: "bold" }}>
            Fit<span style={{ color: "#0d6efd" }}>In</span>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav style={{ maxHeight: "100px" }} navbarScroll>
            {location.pathname === "/workout" ? (
              <Link
                className="nav-link"
                to="/workout"
                style={{ textDecoration: "underline #0d6efd" }}
              >
                Workout
              </Link>
            ) : (
              <Link className="nav-link" to="/workout">
                Workout
              </Link>
            )}

            {location.pathname === "/social" ? (
              <Link
                className="nav-link"
                to="/social"
                style={{ textDecoration: "underline #0d6efd" }}
              >
                Social
              </Link>
            ) : (
              <Link className="nav-link" to="/social">
                Social
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>

        <NavDropdown
          menuVariant="dark"
          align="end"
          title={
            <Image
              width="50px"
              height="50px"
              style={{ objectFit: "cover" }}
              alt="logo"
              className="logo"
              src={
                user?.photoURL
                  ? user.photoURL
                  : `https://avatars.dicebear.com/api/initials/${user?.displayName?.trim()}.svg`
              }
            />
          }
          id="basic-nav-dropdown"
        >
          <div className="profile-name bgdarkgrey">
            <NavDropdown.Header className="profile-name">
              {user.displayName}
            </NavDropdown.Header>
          </div>
          <div className="dropdownlinks bgdarkgrey">
            <Link to={`/users/${user?.uid}`} className="dropdown-item">
              <span className="spanIcon">
                <FaUser />
              </span>{" "}
              My Profile
            </Link>
            <Link to="/settings" className="dropdown-item">
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
