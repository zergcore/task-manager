import { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/authService";
import { AxiosError } from "axios";
import { RegisterData, RegisterResponse } from "./types";
import { ErrorResponse } from "../../types/error";
import { Button } from "@mui/material";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    RegisterData
  >({
    mutationFn: register,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setError(error.response?.data?.message ?? "Registration failed");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">Create a Task Manager Account</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <Form.Text className="text-muted">
          Password must be at least 6 characters long
        </Form.Text>
      </Form.Group>

      <Button
        variant="contained"
        color="primary"
        component="button"
        type="submit"
        disabled={registerMutation.isPending}
        className="w-100"
      >
        {registerMutation.isPending ? "Creating account..." : "Register"}
      </Button>
    </Form>
  );
};

export default RegisterForm;
