import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@material-ui/core/TextField";
import { post_game } from "../Api/gameApi";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogStyle: {
      display: "flex",
      flexDirection: "column",
      opacity: "0.95",
      borderRadius: "15px",
      height: "280px",
      width: "500px",
    },
    textFieldStyle: {
      marginTop: "10px",
    },
    zipTextFieldStyle: {
      marginTop: "10px",
      width: "388px",
    },
    buttonStyle: {
      backgroundColor: "#b5838d",
      marginLeft: "10px",
      marginTop: "10px",
      marginBottom: "10px",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    zipButtonStyle: {
      marginTop: "15px",
      marginLeft: "10px",
    },
  })
);

const Input = styled('input')({
  display: 'none',
});

export function SendGameButton() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [title, setTitle] = useState<string>("Example title");
  const [description, setDescription] = useState<string>(
    "Provide info about your game."
  );
  const [file, setFile] = useState<any>();
  const openSendGameDialog = () => {
    setOpenDialog(true);
  };
  const closeSendGameDialog = () => {
    setOpenDialog(false);
  };
  const handleChangeTitle = (title: string) => {
    setTitle(title);
  };
  const handleChangeDescription = (description: string) => {
    setDescription(description);
  };
  const sendGame = async () => {
    post_game(title, description, file);
    setOpenDialog(false);
  };
  const fileChange = (event: any) => {
    setFile(event?.target.files[0]);
  }
  return (
    <div>
      <Button
        variant="contained"
        onClick={openSendGameDialog}
        className={classes.buttonStyle}
      >
        Send Game
      </Button>
      <Dialog open={openDialog}>
        <DialogTitle>Send new game</DialogTitle>
        <DialogContent className={classes.dialogStyle}>
          <TextField
            variant="filled"
            label="Game Name"
            onChange={(event: any) => handleChangeTitle(event.target.value)}
            className={classes.textFieldStyle}
          />
          <TextField
            variant="filled"
            label="Short description"
            multiline
            rows={4}
            onChange={(event: any) =>
              handleChangeDescription(event.target.value)
            }
            className={classes.textFieldStyle}
          />
          <div>
            <TextField
              disabled
              variant="filled"
              label="Zip file name"
              className={classes.zipTextFieldStyle}
            />
            <label htmlFor="contained-button-file">
              <Input accept="zip/*" id="contained-button-file" multiple type="file" onChange={fileChange}/>
              <Button variant="outlined" className={classes.zipButtonStyle} component="span">
                Upload .zip
              </Button>
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={sendGame}>
            Send
          </Button>
          <Button variant="outlined" onClick={closeSendGameDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
