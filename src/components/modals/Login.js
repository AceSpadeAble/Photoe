import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "./Modal.js";

export default function Login(props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if ( !!error[field] ) setError({
      ...error,
      [field]: null
    });
  };
  const submitData = async (data) => {
    const result = await fetch('http://localhost:8080/users', {
      method: 'GET',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return result;
  }
  const checkErrors = async () => {
    const { email, password, failed } = form;
    const errors = {};

    if (!email || email === "") errors.email = "Email cannot be blank.";
    if (!password || password === "")
      errors.password = "Password cannot be blank.";
    if (false) errors.failed = "Invalid username or password"; //tba - waiting for backend\
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = checkErrors();
    const email = document.querySelector('#formBasicEmail').value;
    const password = document.querySelector('#formBasicPassword').value;
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      submitData({'email': email, 'password': password });
    }
  };
  return (
    <Modal header="Login" closeModal={props.closeModal}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setField("email", e.target.value)}
            isInvalid={!!error.email}
          />
          <Form.Control.Feedback type="invalid">
            {error.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setField("password", e.target.value)}
            isInvalid={!!error.password}
          />
          <Form.Control.Feedback type="invalid">
            {error.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="dark" type="submit" onClick={(e) => handleSubmit(e)}>
          Login
        </Button>
      </Form>
    </Modal>
  );
}
