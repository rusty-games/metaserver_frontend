import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import React, { useEffect } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, getGame } from "../Api/gameApi";
import { getRoomsInGame, Room } from "../Api/roomApi";
import { Link } from "react-router-dom";
import { RoomButton } from "../Layout/createRoomButton";
import { getLogoUrl } from "../Api/utilsApi";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoStyle: {
      marginRight: "20px",
    },
    listStyle: {
      overflowY: "auto",
      opacity: "0.92",
      marginLeft: "35%",
      marginRight: "25%",
      marginTop: "100px",
      marginBottom: "100px",
      minWidth: "500px",
    },
    listItemStyle: {
      width: "100%",
      display: "flex",
    },
    returnButtonStyle: {
      backgroundColor: "#b5838d",
      width: "150px",
      marginTop: "10px",
      marginBottom: "10px",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    buttonStyleJoin: {
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
  const [getDataTrigger] = React.useState(true);
  const [, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const url = window.location.href;
    const gameId =
      url.match(/.*?\/games\/(?<gameId>[^/]*)\/rooms/)
        ?.groups?.gameId || "";
    getRoomsInGame(gameId).then((r) => {
      if (r.isError) {
        console.log(r.data)
        return;
      }
      setRoomList(r.data || []);
    });
  }, [getDataTrigger]);

  useEffect(() => {
    const url = window.location.href;
    const gameId =
      url.match(/.*?\/games\/(?<gameId>[^/]*)\/rooms/)
        ?.groups?.gameId || "";
    getGame(gameId).then((r) => {
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
          src={getLogoUrl(game)}
          alt="game logo"
          width="150"
          height="150"
          className={classes.logoStyle}
        />
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h3">
            {game?.name}
          </Typography>
          <ListItemText primary={game?.description} />
        </div>
      </div>
      <div className={classes.listItemStyle}>
        <Button component={Link} to={`/games/`} variant="contained" className={classes.returnButtonStyle}>
            Return
        </Button>
        <RoomButton />
      </div>
      <h2>
        Rooms:
      </h2>
      <List style={{height: '50vh', overflow: 'auto'}}>
        <li>
          <ul>
            {roomList.map((room, index) => {
              return (
                <div key={room.id}>
                  <ListItem onClick={() => handleListItemClick(index)} className={classes.listItemStyle}>
                    <ListItemText primary={`${room.name} (Players: ${room.current_players}/${room.max_players})`} />
                    <Button
                      disabled={room.current_players === room.max_players}
                      variant="contained"
                      className={classes.buttonStyleJoin}
                      component={Link}
                      to={`/rooms/${room.id}`}
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