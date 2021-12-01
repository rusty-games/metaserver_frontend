import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import {
  Button,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, get_game } from "../Api/gameApi";
import { get_room, Room } from "../Api/roomApi";
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
      backgroundColor: "#ffcdb2",
      marginTop: "10px",
      color: "#000000",
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
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
      };
    useEffect(() => {
        const url = window.location.href;
        const room_id =
          url.match(/.*?api\/rooms\/(?<game_id>[^/]*)/)
            ?.groups?.game_id || "";
        console.log(room_id);
        get_room(room_id).then((r) => {
            if (r.isError) {
                console.log(r.data)
              return;
            }
            console.log(r.data)
            setRoom(r.data);
        });
        console.log(`cool but ${room}`)
          get_game(room?.game || "").then((r) => {
            if (r.isError) {
                console.log(r.data)
              return;
            }
            setGame(r.data);
        });
      }, [getDataTrigger]);

      const getGame = async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          
      }

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
            <Button component={Link} to={`/games/${game?.id}/rooms`}>
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
            </div>
            
        </div>
      )
}