import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@material-ui/core/TextField";
import { postRoom } from "../Api/roomApi";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../Styles/style"

export function RoomButton() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [max_players, set_max_players] = useState<number>(10);
  const [name, setName] = useState<string>("");
  const  navigate = useNavigate();
  const openCreateRoomDialog = () => {
    setOpenDialog(true);
  };
  const closeCreateRoomialog = () => {
    setOpenDialog(false);
  };
  const handleChangeMaxPlayers = (max_players: number) => {
    set_max_players(max_players);
  };
  const handleChangeName = (name: string) => {
    setName(name);
  };
  const createRoom = async () => {
    const url = window.location.href;
    const game_id =
      url.match(/.*?\/games\/(?<game_id>[^/]*)\/rooms/)?.groups?.game_id || "";
    let response = await postRoom(game_id, name, max_players);
    setOpenDialog(false);
    navigate('/rooms/' + response.data?.id)
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={openCreateRoomDialog}
        className={classes.greenButtonStyle}
      >
        Create room
      </Button>
      <Dialog open={openDialog}>
        <DialogTitle>Create new room</DialogTitle>
        <DialogContent className={classes.createRoomDialogStyle}>
          <TextField
            variant="filled"
            label="Room name"
            multiline
            rows={2}
            onChange={(event: any) =>
                handleChangeName(event.target.value)
            }
            className={classes.textFieldStyle}
          />
          <TextField
            id="create-room-max-players-number-input"
            variant="filled"
            label="Max number of players in room"
            type="number"
            onChange={(event: any) => handleChangeMaxPlayers(event.target.value)}
            className={classes.textFieldStyle}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={createRoom}>
            OK
          </Button>
          <Button variant="contained" onClick={closeCreateRoomialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
