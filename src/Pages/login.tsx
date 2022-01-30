import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import { postLogin } from "../Api/adminApi";
import { useStyles } from "../Styles/style"

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
            className={classes.loginTextFieldStyle}
            onChange={(event: any) => handleChangeLogin(event.target.value)}
            onKeyDown={onEnterDown}
          />
          <TextField
            type="password"
            label="Password"
            variant="filled"
            className={classes.loginTextFieldStyle}
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
