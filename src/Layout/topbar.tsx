import Button from "@material-ui/core/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SendGameButton } from "./sendGameButton";
import { postLogout } from "../Api/adminApi";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "../Styles/style"

export const adminLoggedIn = () => {
  return sessionStorage.length !== 0;
};

export function TopBar() {
  const classes = useStyles();
  const handleLogout = () => {
    postLogout();
  };
  return (
    <Box sx={{ flexGrow: 1, width: 'inherit'}}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" component={Link} to="/games">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style = {{ color: 'white '}}>
            Rusty Games
          </Typography>
          <SendGameButton/>
          {adminLoggedIn() ? (
            <Button
              variant="contained"
              className={classes.redButtonStyle}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.defaultButtonStyle}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Toolbar>
    </Box>
  );
}
