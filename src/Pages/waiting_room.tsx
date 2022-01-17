import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, Component  } from "react";
import {
  Button,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, get_game } from "../Api/gameApi";
import { get_room, Room } from "../Api/roomApi";
import logo from "./exampleLogo.png";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import io from "socket.io-client"
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
    //let start_socket = socketClient("http://localhost:3001");
    //start_socket.onAny((event, ...args) => {  console.log(event, args);});
    const classes = useStyles();
    const [game, setGame] = React.useState<Game>();
    const [room, setRoom] = React.useState<Room>();
    const [getDataTrigger, setDataTrigger] = React.useState(true);
    const [, setSelectedIndex] = React.useState(0);
    const [users, setUsers] = React.useState<any>([]);
    const [username, setUsername] = React.useState<string>("DEBIL");
    const [socketPath, setSocketPath] = React.useState<string>('wss://' + '127.0.0.1:8080' + '/ws/room/');
    //const [socket, setSocket] = React.useState(start_socket);
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
      };   
    useEffect(() => {
      const url = window.location.href;
      const room_code =
        url.match(/.*?api\/rooms\/(?<game_id>[^/]*)/)
                  ?.groups?.game_id || "";
      setSocketPath('ws://' + '127.0.0.1:8080' + '/ws/room/' + room_code);
      let chatSocket = new WebSocket('ws://0.0.0.0:6379/ws/room/'+ room_code + '/');

      chatSocket.onmessage = function(evt) {console.log(evt)};
      chatSocket.onmessage = function(evt) {console.log("connected" + evt)};
        get_room(room_code).then((r) => {
          if (r.isError) {
              console.log(r.data)
            return;
          }
          setRoom(r.data);
          get_game(r.data?.game || "").then((r) => {
            if (r.isError) {
                console.log(r.data)
              return;
            }
            setGame(r.data);
          });
        });
        setUsername(prompt("What is your username?") || "");
      }, []);
    // useEffect(() => {
    //   console.log(socket);
    //     socket.on("connect", () => {
    //       socket.emit("username", username);
    //     });
    
    //     socket.on("users", users => {
    //       setUsers(users);
    //     });
    
    //     socket.on("connected", user => {
    //       setUsers((users: any) => [...users, user]);
    //     });
    
    //     socket.on("disconnected", id => {
    //       setUsers((users: any) => {
    //         return users.filter((user: any) => user.id !== id);
    //       });
    //     });
    //     console.log(users);
    //     console.log(socket);
    //   }, []);
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
                    Hello {username}
                </Typography>
                <Typography>
                    Max Players: {room?.max_players}
                </Typography>
                <Typography>
                    Players: {users.length}
                </Typography>
                <List>
                  <li>
                  <ul>
                      {users.map((user:any ) => {
                      return (
                          <div key={user.id}>
                            Hello there {user.name}
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