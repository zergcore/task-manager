import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { AppBar, Toolbar, IconButton, Typography, Button, MenuItem, Menu, Box} from '@mui/material';

const NavbarComponent = () => {
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated;
  const { logout } = context!;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
         {/* Mobile Menu */}
         <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
            {isAuthenticated ? (
              <MenuItem onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/login">Login</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/register">Register</MenuItem>
              </>
            )}
          </Menu>
        </Box>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
          Task Manager
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {isAuthenticated ? (
            <Button variant="contained" color="secondary" onClick={handleLogout} startIcon={<FaSignOutAlt />}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
