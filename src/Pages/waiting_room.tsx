import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import {
  Button,
  List,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, getGame } from "../Api/gameApi";
import { getRoom, Room } from "../Api/roomApi";
import logo from "./exampleLogo.png";
import { Link } from "react-router-dom";
import SelectInput from "@material-ui/core/Select/SelectInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoStyle: {
      border: "solid 2px #6d6875",
      marginRight: "20px",
    },
    listStyle: {
      overflowY: "auto",
      opacity: "0.92",
      marginLeft: "25%",
      marginRight: "25%",
      marginTop: "100px",
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
    const [getDataTrigger, setDataTrigger] = React.useState(true);
    const [, setSelectedIndex] = React.useState(0);
    const [users, setUsers] = React.useState<string[]>([]);
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
      };
    useEffect(() => {
        const url = window.location.href;
        const room_id =
          url.match(/.*?\/rooms\/(?<game_id>[^/]*)/)
            ?.groups?.game_id || "";

        let chatSocket = new WebSocket('ws://127.0.0.1:8080/ws/room/'+ room_id + '/');
      
        chatSocket.onmessage = function (event) {
          const json = JSON.parse(event.data);
          console.log(`[message] Data received from server: ${json}`);
          try {
            if((json.event = "NEW_PLAYER")) {
              let new_users = users;
              new_users.push(json.data)
              setUsers(new_users);
            }
            else {
              console.log(users);
              let new_users = users;
              new_users.push(json.data)
              setUsers(new_users);
            }
          }
          catch (err) {
            console.log(`Error occured: ${err}`);
          }
        };

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
        
      }, []);

      return (
        <div className={classes.listStyle}>
            <div className={classes.listItemStyle}>
                <img
                    src={logo}
                    alt="logo"
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

            <div className={classes.listStyle}>
                <Typography>
                    {room?.name}
                </Typography>
                <Typography>
                    Max Players: {room?.max_players}
                </Typography>
                <Typography>
                    Players: {room?.current_players}
                </Typography>
                <Typography>
                    Players Websocket: {users.length}
                </Typography>
                <List>
                  <li>
                  <ul>
                      {users.map((user, index) => {
                      return (
                          <div key={index}>
                            Hello there {user}
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