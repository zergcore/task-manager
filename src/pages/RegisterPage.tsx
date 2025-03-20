import { Container, Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box display="flex" justifyContent="center">
        <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <RegisterForm />
            <Box textAlign="center" mt={3}>
              <Typography>
                Already have an account?{' '}
                <Button component={Link} to="/login" color="primary">
                  Login here
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegisterPage;