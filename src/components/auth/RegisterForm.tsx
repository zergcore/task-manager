import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/authService";
import { AxiosError } from "axios";
import { RegisterData, RegisterResponse } from "./types";
import { ErrorResponse } from "../../types/error";
import { TextField, Button, Typography, Container, Box, Alert, CircularProgress } from "@mui/material";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation<RegisterResponse, AxiosError<ErrorResponse>, RegisterData>({
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
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" gutterBottom color="textPrimary" align="center">
          Create a Task Manager Account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          margin="normal"
          helperText="Password must be at least 6 characters long"
          inputProps={{ minLength: 6 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={registerMutation.isPending}
          sx={{ mt: 2 }}
        >
          {registerMutation.isPending ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;