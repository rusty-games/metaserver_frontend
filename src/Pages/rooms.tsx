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
import placeholderLogo from "../Resources/placeholderLogo.png";
import { useStyles } from "../Styles/style"

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
          alt="game logo"
          width="150"
          height="150"
          className={classes.logoStyle}
          src={getLogoUrl(game)}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = placeholderLogo;
          }}
        />
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h3">
            {game?.name}
          </Typography>
          <ListItemText primary={game?.description} />
        </div>
      </div>
      <div className={classes.listItemStyle}>
        <Button component={Link} to={`/games/`} variant="contained" className={classes.defaultButtonStyle}>
          Return
        </Button>
        <RoomButton />
      </div>
      <div className={classes.smallListStyle}>
        <Typography variant="h5">
          Rooms:
        </Typography>
        <List style={{ overflow: 'auto'}}>
          {roomList.map((room, index) => {
            return (
              <div key={room.id}>
                <ListItem onClick={() => handleListItemClick(index)} className={classes.listItemStyle}>
                  <ListItemText primary={`${room.name} (Players: ${room.current_players}/${room.max_players})`} />
                  <Button
                    disabled={room.current_players === room.max_players}
                    variant="contained"
                    className={classes.defaultButtonStyle}
                    component={Link}
                    to={`/rooms/${room.id}`}
                  >
                    JOIN
                  </Button>
                </ListItem>
              </div>
            );
          })}
        </List>
      </div>
    </div>
  )
}