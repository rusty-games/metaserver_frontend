import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import {
  Button,
  List,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, getGame } from "../Api/gameApi";
import { deleteRoom, getRoom, Room } from "../Api/roomApi";
import { Link } from "react-router-dom";
import { websocket_channel_url } from "../Api/urls";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { getLogoUrl } from "../Api/utilsApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoStyle: {
      marginRight: "20px",
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
    listStyle: {
      overflowY: "auto",
      opacity: "0.92",
      marginLeft: "15%",
      marginRight: "25%",
      marginBottom: "100px",
      minWidth: "500px",
    },
    listItemStyle: {
      width: "100%",
      display: "flex",
    },
    buttonStyle: {
      backgroundColor: "#b5838d",
      marginTop: "10px",
      marginBottom: "10px",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    
  })
);

export function WaitingRoom() {
    const classes = useStyles();
    const [game, setGame] = React.useState<Game>();
    const [room, setRoom] = React.useState<Room>();
    const [users, setUsers] = React.useState<string[]>([]);
    const [openAlert, setOpenAlert] = React.useState(true);
    let players_coutnt = 0;
    const  navigate = useNavigate();
    useEffect(() => {
        const url = window.location.href;
        const room_id =
          url.match(/.*?\/rooms\/(?<game_id>[^/]*)/)
            ?.groups?.game_id || "";

        getRoom(room_id).then((r) => {
            if (r.isError) {
                console.log(r.data)
              return;
            }
            setRoom(r.data);
            getGame(r.data?.game || "").then((r) => {
              if (r.isError) {
                  console.log(r.data)
                return;
              }
              setGame(r.data);
            });
          });
        
        let chatSocket = new WebSocket(websocket_channel_url + room_id + '/');
      
        chatSocket.onmessage = function (event) {
          const json = JSON.parse(event.data);
          console.log(`[message] Data received from server: ${JSON.stringify(json)}`);
          try {
            if((json.payload.event === "NEW_PLAYER")) {
              setOpenAlert(true);
              console.log("New player")
              players_coutnt += 1;
              setUsers(users => [...users, json.payload.data.name]);
            }
            else if((json.payload.event === "START_GAME")) {
              getRoom(room_id).then((r) => {
                getGame(r.data?.game || "").then((r_g) => {
                  if (r.data?.max_players === players_coutnt ) {
                    window.open(`${r_g.data?.files}?session_id=${json.payload.data.session_id}&is_host=true`);
                  }
                  else {
                    window.open(`${r_g.data?.files}?session_id=${json.payload.data.session_id}&is_host=false`);
                  }
                  deleteRoom(room_id);
           
                  navigate('/games/' + (r.data?.game || "") + '/rooms')    
                  //navigate();
                                  
                });
              });            
            }
            else if((json.payload.event === "PLAYER_LEFT")) {
              console.log("PLAYER_LEFT");
              players_coutnt -= 1;
              setUsers(users => users.filter(user => user !== json.payload.data.name ));
            }
          }
          catch (err) {
            console.log(`Error occured: ${err}`);
          }
        };
        return () => chatSocket.close();
      },[]);

      return (
        <div className={classes.gameInfoStyle}>
            <div className={classes.listItemStyle}>
                <img
                    src={getLogoUrl(game)}
                    alt="game logo"
                    width="150"
                    height="150"
                    className={classes.logoStyle}
                  />
                  <div style={{flexGrow: 1}}>
                    <Typography variant="h3">
                        {game?.name}
                    </Typography>
                    <ListItemText primary={game?.description} />
                  </div>
            </div>
            <Button component={Link} to={`/games/${game?.id}/rooms`} className={classes.buttonStyle}>
                Return to room list
            </Button>
            <Box sx={{ width: '100%' }}>
              <Collapse in={openAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  New player joined the room!
                </Alert>
              </Collapse>
            </Box>
            <div className={classes.listStyle}>
                <Typography variant="h5">
                    Room name: {room?.name}
                </Typography>
                <Typography>
                    Max Players: {room?.max_players}
                </Typography>
                <Typography>
                    Players:
                </Typography>
                <List style={{height: '50wh', overflow: 'auto'}}>
                  <li>
                  <ul>
                      {users.map((user, index) => {
                      return (
                          <div key={index}>
                            {user}
                          </div>
                      );
                      })}
                  </ul>
                  </li>
                </List>
            </div>            
        </div>
      )
}