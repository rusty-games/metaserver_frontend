import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import React, { useEffect } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, get_game } from "../Api/gameApi";
import { get_rooms_in_game, post_room, Room } from "../Api/roomApi";
import logo from "./exampleLogo.png";
import { Link } from "react-router-dom";
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

export function RoomPage() {
    const classes = useStyles();
    const [roomList, setRoomList] = React.useState<Room[]>([]);
    const [game, setGame] = React.useState<Game>();
    const [getDataTrigger, setDataTrigger] = React.useState(true);
    const [, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
      };
    const handleCreateRoom = async (name: string, max_players: number) => {
        post_room(name,max_players);
        setDataTrigger(!getDataTrigger);
    }
    useEffect(() => {
        const url = window.location.href;
        const game_id =
          url.match(/.*?\/games\/(?<game_id>[^/]*)\/rooms/)
            ?.groups?.game_id || "";
        get_rooms_in_game(game_id).then((r) => {
          if (r.isError) {
              console.log(r.data)
            return;
          }
          setRoomList(r.data || []);
        });
        get_game(game_id).then((r) => {
            if (r.isError) {
                console.log(r.data)
              return;
            }
            setGame(r.data);
        });
      }, [getDataTrigger]);

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
            <Button variant="contained" className={classes.buttonStyle} onClick={() => handleCreateRoom("4c4cb68f-0856-4220-8e97-af7549d2d6f3", 10)}>
                Create Room
            </Button>
            <h2>
                Rooms:
            </h2>
            <List>
            <li>
            <ul>
                {roomList.map((room, index) => {
                return (
                    <div key={room.id}>
                    <ListItem onClick={() => handleListItemClick(index)} className={classes.listItemStyle}>
                        <ListItemText primary={`${room.id} (Players: ${room.current_players}/${room.max_players})`} />
                        <Button
                        className={classes.buttonStyle}
                        >
                        JOIN
                        </Button>
                    </ListItem>
                    </div>
                );
                })}
            </ul>
        </li>
      </List>
        </div>
      )
}