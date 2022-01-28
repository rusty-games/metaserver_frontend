import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import { postLogin } from "../Api/adminApi";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    windowContainer: {
      display: "flex",
      flexDirection: "column",
    },
    formContainer: {
      backgroundColor: "#b5838d",
      opacity: "0.95",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      height: "400px",
      marginTop: "150px",
      width: "300px",
    },
    welcomeLabel: {
      color: "white",
      marginTop: "10%",
      fontSize: "35px",
      marginBottom: "20px",
    },
    textFieldStyle: {
      margin: "10px",
      backgroundColor: "white",
      color: "white",
    },
    gameInfoStyle: {
      overflowY: "auto",
      opacity: "0.92",
      marginLeft: "32%",
      marginRight: "25%",
      marginTop: "100px",
      marginBottom: "100px",
      minWidth: "500px",
    },
  })
);

export const AdminLoginPage = () => {
  const classes = useStyles();
  const [login, setLogin] = useState<string>("Login");
  const [password, setPassword] = useState<string>("Password");

  const handleChangeLogin = (login: string) => {
    setLogin(login);
  };
  const handleChangePassword = (password: string) => {
    setPassword(password);
  };
  const handleLogging = () => {
    postLogin(login, password);
  };
  const onEnterDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogging();
    }
  };
  return (
    <div className={classes.gameInfoStyle}>
      <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center">
        <Container fixed className={classes.formContainer}>
          <div className={classes.welcomeLabel}>Log in as Administrator</div>
          <TextField
            label="Login"
            variant="filled"
            className={classes.textFieldStyle}
            onChange={(event: any) => handleChangeLogin(event.target.value)}
            onKeyDown={onEnterDown}
          />
          <TextField
            type="password"
            label="Password"
            variant="filled"
            className={classes.textFieldStyle}
            onChange={(event: any) => handleChangePassword(event.target.value)}
            onKeyDown={onEnterDown}
          />
          <Button
            variant="contained"
            style={{ borderRadius: "15px" }}
            onClick={handleLogging}
          >
            Log in
          </Button>
        </Container>
      </Box>
    </div>
  );
};
