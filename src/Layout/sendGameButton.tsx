import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@material-ui/core/TextField";
import { postGame } from "../Api/gameApi";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogStyle: {
      display: "flex",
      flexDirection: "column",
      opacity: "0.95",
      borderRadius: "15px",
      height: "320px",
      width: "550px",
    },
    textFieldStyle: {
      marginTop: "10px",
    },
    zipTextFieldStyle: {
      marginTop: "10px",
      width: "350px",
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
  const [fileNameValidator, setFileNameValidator] = useState<Boolean>(false);
  const [helperText, setHelperText] = useState<string>("Title cannot be empty");
  const [fileExtensionValidation, setFileExtensionValidation] = useState<Boolean>(false);
  const [fileValidation, setFileValidation] = useState<Boolean>(false);

  const openSendGameDialog = () => {
    setOpenDialog(true);
  };
  const closeSendGameDialog = () => {
    setOpenDialog(false);
  };
  const handleChangeTitle = (title: string) => {
    setFileValidation(false);
    if(title == "") {
      setFileNameValidator(false);
      setHelperText("Title cannot be empty");
    }
    else if(/^[a-zA-z0-9\s]+$/.test(title)) {
      setTitle(title);
      setFileNameValidator(true);
      setHelperText("Numbers and english letters are only allowed");
      if(fileExtensionValidation) {
        setFileValidation(true);
      }
    }
    else {
      setFileNameValidator(false);
      setHelperText("Numbers and english letters are only allowed");
    }
  };
  const handleChangeDescription = (description: string) => {
    setDescription(description);
  };
  const sendGame = async () => {
    postGame(title, description, file);
    setOpenDialog(false);
    window.location.reload();
  };
  const fileChange = (event: any) => {
    if(!event?.target.files[0].name.includes(".zip")){
      setFileValidation(false);
      setFileExtensionValidation(false);
    }
    else {
      setFile(event?.target.files[0]);
      setFileExtensionValidation(true);
      if(fileNameValidator) setFileValidation(true);
    }  
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
            error={!fileNameValidator}
            helperText={helperText}
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
              fullWidth
              id="input_zip_name"
              helperText= "Only .zip files are accepted"
              error={!fileExtensionValidation}
              variant="filled"
              className={classes.zipTextFieldStyle}
              InputProps={{
                readOnly: true,
              }}
              value={file?.name}
            />
            <label htmlFor="contained-button-file">
              <Input accept=".zip" id="contained-button-file" multiple type="file" onChange={fileChange}/>
              <Button variant="contained" className={classes.zipButtonStyle} component="span">
                Upload .zip
              </Button>
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={sendGame} disabled={!fileValidation}>
            Send 
          </Button>
          <Button variant="contained" onClick={closeSendGameDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
