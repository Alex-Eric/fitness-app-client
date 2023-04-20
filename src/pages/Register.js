import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/signup`, {
        name,
        email,
        password,
      })
      .then((response) => {
        navigate("/login")
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="login-register-page">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUser">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
      </Form>
    </div>
  );
}
export default Register;
