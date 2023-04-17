import { Button, Form } from "react-bootstrap";

import { useContext, useState } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { email, password };
    
    // axios.post(`${process.env.REACT_APP_AUTH_URL}/login`, { email, password })
    authService.login(requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
      });
  };
  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    { errorMessage && <p className="error-message">{errorMessage}</p> }
    </>
  );
}
export default Login;
