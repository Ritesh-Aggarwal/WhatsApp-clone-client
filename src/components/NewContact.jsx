import React, { useRef } from "react";
import { Modal, Fade, TextField, Button, IconButton } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import {
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles";
import { useContacts } from "../contexts/ContactsProvider";

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
    width: "100%",
  },
  box: {
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
    width: "50%",
    paddingTop: "15px",
    marginTop: "10px",
    overflow: "hidden scroll",
  },
}));

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

function NewContact({ modalOpen, setModalOpen }) {
  const idRef = useRef();
  const nameRef = useRef();
  const classes = useStyles();
  const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    setModalOpen(false);
  }

  return (
    <Modal
      aria-labelledby="New contact modal"
      aria-describedby="Modal to add new contact"
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
              height: "230px",
              width: "50%",
              paddingTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              style={{
                position: "absolute",
                right: "24.7%",
                top: "30%",
              }}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <CloseIcon style={{ fontSize: "15px" }} />
            </IconButton>
            <form
              className={classes.root}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <ThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Id"
                  variant="outlined"
                  id="mui-theme-provider-standard-input1"
                  autoFocus="true"
                  inputRef={idRef}
                  required
                />
                <TextField
                  className={classes.margin}
                  label="User Name"
                  name="user"
                  variant="outlined"
                  id="mui-theme-provider-standard-input2"
                  inputRef={nameRef}
                  required
                />
              </ThemeProvider>
              <ColorButton type="submit" className={classes.margin}>
                Add new contact
              </ColorButton>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default NewContact;
