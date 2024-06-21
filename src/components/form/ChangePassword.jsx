import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const ChangePassword = () => {
  const axiosInstance = axios.create({
    baseURL: "/api/v1/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container className="bg-editProfile">
      <Row>
        <Col xs={11} md={5} className="mx-auto my-5 form-editProfile">
          <h2 className="text-center my-5">Change Password</h2>

          <Form noValidate onSubmit={(ev) => handleChangePassword(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="currentPassword">
                <Form.Label> Current Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Current Password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="newPasswordConfirmation">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="New Password Confirmation"
                  name="newPasswordConfirmation"
                  value={newPasswordConfirmation}
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="style-btn">
                Change Password
              </button>
            </div>
          </Form>

          {message && <p className="mt-4">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
