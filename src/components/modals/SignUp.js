import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "./Modal.js";

export default function SignUp(props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) setErrors({
      ...errors,
      [field]: null
    });
  };

  const findFormErrors = () => {
    const { name, email, password, repeatPassword } = form;
    const newErrors = {};
    if (!name || name === "") newErrors.name = "Cannot be blank.";
    if (email.length < 4 || !email.includes("@"))
      newErrors.email = "Enter a valid email address.";
    if (password.length < 6) newErrors.password = "Password too short.";
    if (repeatPassword != password)
      newErrors.repeatPassword = "Passwords don't match.";
    return newErrors;
  };

  const submitData = async (data) => {
    const result = await fetch('http://localhost:8080/users', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.querySelector('#formBasicName').value;
    const email = document.querySelector('#formBasicEmail').value;
    const password = document.querySelector('#formBasicPassword').value;
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      submitData({ 'username': username, 'email': email, 'password': password });
    }
  };

  return (
    <Modal header="Sign Up" closeModal={props.closeModal}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setField("name", e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setField("email", e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setField("password", e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be at least 6 characters long.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRepeatPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            onChange={(e) => setField("repeatPassword", e.target.value)}
            isInvalid={!!errors.repeatPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.repeatPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="dark" type="submit" onClick={(e) => handleSubmit(e)}>
          Sign Up
        </Button>
      </Form>
    </Modal>
  );
}
