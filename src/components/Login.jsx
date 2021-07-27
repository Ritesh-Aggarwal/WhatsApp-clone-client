import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { v4 as uuidV4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
    width: "90%",
  },
  shadow: {
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
    width: "50%",
    paddingTop: "15px",
    marginTop: "10px",
    overflow: "hidden scroll",
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#000"),
    backgroundColor: green[500],
    borderRadius: "0px",
    width: "30%",
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

const WhiteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#fff"),
    backgroundColor: "#fff",
    border: "1px solid #cccdcd",
    borderRadius: "0px",
    width: "30%",
    "&:hover": {
      backgroundColor: "ligthgrey",
    },
  },
}))(Button);

export default function Login({ onIdSubmit, getUser }) {
  const classes = useStyles();
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    getUser(e.target.user.value);
    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
    getUser("WhatsApp");
    onIdSubmit(uuidV4());
  }

  return (
    <Container className={classes.shadow}>
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.margin}
            label="Id"
            variant="standard"
            id="mui-theme-provider-standard-input1"
            inputRef={idRef}
            required
          />
          <TextField
            className={classes.margin}
            label="User Name"
            name="user"
            defaultValue="WhatsApp"
            variant="standard"
            id="mui-theme-provider-standard-input2"
          />
        </ThemeProvider>
        <WhiteButton onClick={createNewId} className={classes.margin}>
          Create Id
        </WhiteButton>
        <ColorButton type="submit" className={classes.margin}>
          Login
        </ColorButton>
      </form>
    </Container>
  );
}
