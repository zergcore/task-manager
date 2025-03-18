import { useState, useContext } from "react"; // Agregar useContext
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginData, LoginResponse } from "./types";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext"; // Importar AuthContext
import { ErrorResponse } from "../../types/error";
import { Button } from "@mui/material";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // Obtener el contexto de autenticación

  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginData
  >({
    mutationFn: login,
    onSuccess: (data) => {
      // Guardar el token y el usuario en el contexto
      if (authContext) {
        authContext.login({ email: formData.email }, data.token);
      }
      navigate("/");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Login failed");
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
    loginMutation.mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">Login to Task Manager</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
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
        />
      </Form.Group>

      <Button
        component="button"
        variant="contained"
        color="primary"
        type="submit"
        disabled={loginMutation.isPending}
        className="w-100"
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;