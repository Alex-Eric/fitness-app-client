import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function NavbarF() {
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
            <NavDropdown title="Exercises" id="basic-nav-dropdown">
              <LinkContainer to="/exercises">
                <NavDropdown.Item>List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/exercises/create"><NavDropdown.Item>Create</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/exercises/my"><NavDropdown.Item>My Exercises</NavDropdown.Item></LinkContainer>
            </NavDropdown>
            <NavDropdown title="Workouts">
            <LinkContainer to="/workouts"><NavDropdown.Item>List</NavDropdown.Item></LinkContainer>
            <LinkContainer to="/workouts/create"><NavDropdown.Item>Create</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/workouts/my"><NavDropdown.Item>My Workouts</NavDropdown.Item></LinkContainer>
            </NavDropdown>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavbarF;
