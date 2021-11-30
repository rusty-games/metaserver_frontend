import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import React, { useEffect } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Game, get_games } from "../Api/gameApi";
import logo from "./exampleLogo.png";
import { Link } from "react-router-dom";
import { games_url } from "../Api/urls";

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
      marginLeft: "10px",
      color: "#000000",
      fontWeight: "bold",
    },
  })
);

// const exampleList: Game[] = [
//   { id: "First game", name: "first name", description: "I am the best game", accepted: true, created_at: "10-11-2021", updated_at: "10-11-2021" },
//   { id: "First game cool id" ,name: "first name", description: "I am the best game", accepted: true, created_at: "10-11-2021", updated_at: "10-11-2021" },
//   { id: "Hmmm nice" ,name: "first name", description: "I am the best game", accepted: true, created_at: "10-11-2021", updated_at: "10-11-2021" },
//   { id: "Hmmm nice" ,name: "first name", description: "I am the best game", accepted: true, created_at: "10-11-2021", updated_at: "10-11-2021" },
//   { id: "Hmmm nice" ,name: "first name", description: "I am the best game", accepted: true, created_at: "10-11-2021", updated_at: "10-11-2021" },
//   { id: "Hmmm nice" ,name: "first name", description: "I am the best game", accepted: true, created_at: "10-11-2021", updated_at: "10-11-2021" },
//   { id: "Hmmm nice" ,name: "first name", description: "I am the best game", accepted: true, created_at: "10-11-2021", updated_at: "10-11-2021" },
// ];
export function Games() {
  const classes = useStyles();
  const [gameList, setGameList] = React.useState<Game[]>([]);
  const [, setSelectedIndex] = React.useState(0);
  const [getGamesTrigger] = React.useState(true);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    get_games().then((r) => {
      if (r.isError) {
        window.location.href = "/login";
        return;
      }
      setGameList(r.data || []);
      console.log(gameList);
    });
  }, [getGamesTrigger]);
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
                    <ListItemText primary={game.description} />
                  </div>
                  <Button
                    className={classes.buttonStyle}
                    component={Link}
                    to={`/games/${game.id}/rooms`}
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
  );
}
