import Button from "@material-ui/core/Button";
import Toolbar from "@mui/material/Toolbar";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SendGameButton } from "./sendGameButton";
import { postLogout } from "../Api/adminApi";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#6d6875",
      width: "inherit",
    },
    buttonStyle: {
      backgroundColor: "#b5838d",
      marginLeft: "10px",
      marginRight: "20px",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    logoutButtonStyle: {
      backgroundColor: "#823c4a",
      marginLeft: "10px",
      marginRight: "10px",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  })
);

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
              className={classes.logoutButtonStyle}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.buttonStyle}
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
