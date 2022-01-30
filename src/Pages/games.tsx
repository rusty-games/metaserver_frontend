import List from "@material-ui/core/List";
import React, { useEffect } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, getGames, getGamesAccepted, deleteGame, patchGameAccept, downloadGame } from "../Api/gameApi";
import { Link } from "react-router-dom";
import { adminLoggedIn } from "../Layout/topbar";
import { getLogoUrl } from "../Api/utilsApi";
import placeholderLogo from "../Resources/placeholderLogo.png";
import { useStyles } from "../Styles/style"

export function Games() {
  const classes = useStyles();
  const [gameList, setGameList] = React.useState<Game[]>([]);
  const [, setSelectedIndex] = React.useState(0);
  const [getGamesTrigger] = React.useState(true);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    if (!adminLoggedIn() === true) {
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
  const handleDownloadGame = (game: Game) => {
    downloadGame(game);
  };
  const handleDeleteGame = (id: string) => {
    deleteGame(id);
  };
  const acceptGame = (game: Game) => {
    patchGameAccept(game);
  };
  return (
    <List className={classes.listStyle}>
      {gameList.map((game, index) => {
        return (
          <div key={game.id}>
            <ListItem onClick={() => handleListItemClick(index)} className={classes.gameListItemStyle}>
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
                  {game.name}
                </Typography>
                <ListItemText primary={game.description} style={{ overflowY: 'auto', height: '100px', width: '80%' }} />
              </div>
              {adminLoggedIn() ? (
                <div>
                  {!game.accepted ? (
                    <Button
                      className={classes.greenButtonStyle}
                      variant="contained"
                      onClick={() => acceptGame(game)}
                    >
                      ACCEPT
                    </Button>
                  ) : (
                    <Button
                      className={classes.defaultButtonStyle}
                      variant="contained"
                      component={Link}
                      to={`/games/${game.id}/rooms`}
                    >
                      PLAY
                    </Button>
                  )}
                  <Button
                    className={classes.redButtonStyle}
                    variant="contained"
                    onClick={() => handleDeleteGame(game.id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    className={classes.defaultButtonStyle}
                    variant="contained"
                    onClick={() => handleDownloadGame(game)}
                  >
                    DOWNLOAD
                  </Button>
                </div>
              ) : (
                <Button
                  className={classes.defaultButtonStyle}
                  variant="contained"
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
    </List>
  );
}
