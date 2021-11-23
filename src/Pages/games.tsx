import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import React, { useEffect } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { Game, getGames } from "../Api/gameApi";
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
    buttonStyle: {
      backgroundColor: "#ffcdb2",
      marginLeft: "10px",
      color: "#000000",
      fontWeight: "bold",
    },
  })
);

const exampleList: Game[] = [
  { id: "First game" },
  { id: "First game cool id" },
  { id: "Hmmm nice" },
  { id: "Hmmm nice" },
  { id: "Hmmm nice" },
  { id: "Hmmm nice" },
  { id: "Hmmm nice" },
];
export function Games() {
  const classes = useStyles();
  const [gameList, setGameList] = React.useState<Game[]>(exampleList);
  const [, setSelectedIndex] = React.useState(0);
  const [getGamesTrigger] = React.useState(true);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    getGames().then((r) => {
      if (r.isError) {
        window.location.href = "/login";
        return;
      }
      setGameList(r.data?.games || []);
    });
  }, [getGamesTrigger]);
  return (
    <List className={classes.listStyle}>
      <li>
        <ul>
          {gameList.map((game, index) => {
            return (
              <div key={game.id}>
                <ListItem onClick={() => handleListItemClick(index)}>
                  <img
                    src={logo}
                    alt="logo"
                    width="150"
                    height="150"
                    className={classes.logoStyle}
                  />
                  <ListItemText primary={game.id} />
                  <Button
                    className={classes.buttonStyle}
                    component={Link}
                    to={`games/${game.id}`}
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