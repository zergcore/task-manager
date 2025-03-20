import { Container, Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box display="flex" justifyContent="center">
        <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <LoginForm />
            <Box textAlign="center" mt={3}>
              <Typography>
                Don't have an account?{' '}
                <Button component={Link} to="/register" color="primary">
                  Register here
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
