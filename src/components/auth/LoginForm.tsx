import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginData, LoginResponse } from "./types";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { ErrorResponse } from "../../types/error";
import { TextField, Button, Alert, Box, Typography } from "@mui/material";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginData
  >({
    mutationFn: login,
    onSuccess: (data) => {
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
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          backgroundColor: "background.default",
          boxShadow: 4,
          p: 3,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, textAlign: "center" }}
          color="text.primary"
        >
          Login to Task Manager
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
        />

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
      </Box>
    </form>
  );
};

export default LoginForm;