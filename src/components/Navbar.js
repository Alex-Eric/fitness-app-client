import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";

function NavbarF() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" sticky="top" collapseOnSelect>
      <Container>
        <Navbar.Brand>Fitness App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/muscles">
              <Nav.Link>Muscles</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/exercises">
              <Nav.Link>Exercises</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/workouts">
              <Nav.Link>Workouts</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
              <div className="user">
                <Navbar.Brand>{user && user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</Navbar.Brand>
                </div>
                <div style={{"margin":"10px"}}>
                <Button onClick={logOutUser}>Log out</Button>
              </div>
              </>
            ) : (
              <div className="login-register">
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavbarF;
