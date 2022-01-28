import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import React, { useEffect } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, getGames, getGamesAccepted, getGamesNotAccepted, deleteGame, patchGameAccept } from "../Api/gameApi";
import logo from "./exampleLogo.png";
import { Link } from "react-router-dom";
import { games_url } from "../Api/urls";
import { adminLoggedIn } from "../Layout/topbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoStyle: {
      border: "solid 2px #6d6875",
      marginRight: "20px",
    },
    listStyle: {
      height: '85vh',
      overflowY: "auto",
      opacity: "0.92",
      marginLeft: "35%",
      marginRight: "5%",
      marginTop: "100px",
      marginBottom: "100px",
      minWidth: "500px",
    },
    listItemStyle: {
      height: "160px",
      width: "100%",
      display: "flex",
    },
    buttonStyle: {
      backgroundColor: "#ffcdb2",
      marginLeft: "10px",
      color: "#000000",
      fontWeight: "bold",
    },
  })
);

export function Games() {
  const classes = useStyles();
  const [gameList, setGameList] = React.useState<Game[]>([]);
  const [, setSelectedIndex] = React.useState(0);
  const [getGamesTrigger] = React.useState(true);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    if(!adminLoggedIn() === true) {
      getGamesAccepted().then((r) => {
        if (r.isError) {
          window.location.href = "/login";
          return;
        }
        setGameList(r.data || []);
      });
    }
    else {
      getGames().then((r) => {
        if (r.isError) {
          console.log(r.data);
          return;
        }
        setGameList(r.data || []);
      });
    }
  }, [getGamesTrigger]); 
  const deleteGameHandle = (id: string) => {
    deleteGame(id);
    window.location.reload();
  };
  const acceptGame = (game: Game) => {
    patchGameAccept(game);
    window.location.reload();
  };
  return (
    <List className={classes.listStyle}>
      <li>
        <ul>
          {gameList.map((game, index) => {
            return (
              <div key={game.id}>
                <ListItem onClick={() => handleListItemClick(index)} className={classes.listItemStyle}>
                  <img
                    src={logo}
                    alt="logo"
                    width="150"
                    height="150"
                    className={classes.logoStyle}
                  />
                  <div style={{flexGrow: 1}}>
                    <Typography variant="h3">
                        {game.name}
                    </Typography>
                    <ListItemText primary={game.description} style={{overflowY: 'auto', height: '100px', width: '80%'}}/>
                  </div>
                  {adminLoggedIn() && !game.accepted ? (
                    <div>
                      <Button
                      className={classes.buttonStyle}
                      onClick={() => deleteGameHandle(game.id)}
                      >
                        DELETE
                      </Button>
                      <Button
                        className={classes.buttonStyle}
                        onClick={() => acceptGame(game)}
                        >
                        ACCEPT
                      </Button>
                    </div>
                    )
                  : (
                    <Button
                      className={classes.buttonStyle}
                      component={Link}
                      to={`/games/${game.id}/rooms`}
                    >
                      PLAY
                    </Button>
                    )}         
                </ListItem>
              </div>
            );
          })}
        </ul>
      </li>
    </List>
  );
}
