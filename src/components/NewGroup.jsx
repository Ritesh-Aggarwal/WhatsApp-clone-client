import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  Fab,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Zoom,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import CheckedAvatar from "./CheckedAvatar";

const drawerWidth = 448;

const useStyles = makeStyles({
  list: {
    width: drawerWidth,
  },
  menuButton: {
    position: "absolute",
    padding: "0px",
    marginTop: "50px",
    marginLeft: "0px",
  },
  appBar: {
    background: "#00BEA4",
    height: "108px",
  },
});

export default function NewGroup({ isOpen, close }) {
  const classes = useStyles();
  const { contacts } = useContacts();
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("created");
    // console.log(selectedContactIds);
    createConversation(selectedContactIds);
    setSelectedContactIds([]);
    close(false);
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prev) => {
      if (prev.includes(contactId)) {
        return prev.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prev, contactId];
      }
    });
  }

  const list = (
    <div
      className={classes.list}
      style={{ overflow: "hidden scroll", height: "100%" }}
    >
      <List>
        {contacts && (
          <form onSubmit={handleSubmit}>
            {contacts.map((contact) => (
              <FormGroup key={contact.id}>
                <ListItem
                  button
                  onClick={() => handleCheckboxChange(contact.id)}
                >
                  <ListItemIcon>
                    {selectedContactIds.includes(contact.id) ? (
                      <CheckedAvatar />
                    ) : (
                      <Avatar />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={contact.name} />
                </ListItem>
                <Divider light={true} />
              </FormGroup>
            ))}
          </form>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor="left"
        open={isOpen}
        variant="persistent"
        elevation="0"
        onClose={() => {
          close(false);
        }}
      >
        <AppBar
          position="sticky"
          style={{ boxShadow: "none", width: `${drawerWidth}px` }}
        >
          <Toolbar variant="dense" className={classes.appBar}>
            <IconButton
              edge="end"
              onClick={() => {
                setSelectedContactIds([]);
                close(false);
              }}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <span
              style={{
                marginLeft: "53px",
                marginTop: "48px",
                fontSize: "19px",
                fontWeight: "500",
                color: "#fff",
              }}
            >
              Add group participants
            </span>
          </Toolbar>
        </AppBar>

        {list}
        <AppBar
          position="fixed"
          color="inherit"
          style={{
            top: "auto",
            bottom: 0,
            left: 0,
            width: `${drawerWidth}px`,
            padding: "10px",
            backgroundColor: "#EDEDED",
            boxShadow: "none",
            minHeight: "62px",
            maxHeight: "106px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedContactIds.length > 0 && (
            <Zoom in={selectedContactIds.length > 0}>
              <Fab
                size="medium"
                style={{
                  background: "#09E95F",
                  color: "#ffffff",
                  marginBottom: "22px",
                  marginTop: "16px",
                  boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px",
                }}
                onClick={handleSubmit}
              >
                <ArrowForwardIcon />
              </Fab>
            </Zoom>
          )}
        </AppBar>
      </Drawer>
    </div>
  );
}
