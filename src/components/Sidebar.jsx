import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GroupIcon from "@material-ui/icons/Group";
import React, { useState } from "react";
import NewGroup from "./NewGroup";
import HomeMenu from "./HomeMenu";
import "../App.css";
import NewContact from "./NewContact";
import { useConversations } from "../contexts/ConversationsProvider";

const drawerWidth = 448;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  appBar: {
    background: "#ECECED",
    height: "59px",
    paddingLeft: "16px",
    borderBottom: "1px solid #E0E0E0",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menu: {
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
    background: "#fff",
    maxWidth: "190px",
    zIndex: 10000,
  },
  menuButton: {
    position: "absolute",
    padding: "0px",
    marginTop: "17px",
    marginLeft: "calc(100% - 42px)",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  scroll: {
    overflow: "hidden scroll",
    paddingRight: 0,
    width: "100%",
  },
}));

function Sidebar({ id, username }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { conversations, selectConversationIndex } = useConversations();

  const list = (
    <List
      style={{
        padding: 0,
      }}
    >
      {conversations &&
        conversations.map((conversation, index) => (
          <div>
            <ListItem
              button
              key={index}
              onClick={() => selectConversationIndex(index)}
              selected={conversation.selected && { background: "#EBEBEB" }}
            >
              <ListItemIcon>
                <Avatar>
                  <GroupIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={"Group " + (index + 1)}
                secondary={conversation.recipients
                  .map((r) => r.name)
                  .join(",")
                  .concat(",You")}
              />
            </ListItem>
            <Divider light={true} />
          </div>
        ))}
    </List>
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <AppBar
          position="sticky"
          style={{
            boxShadow: "none",
            width: `${drawerWidth}px `,
            height: "59px",
            // borderBottom: "1px solid rgb(74, 74, 74)",
          }}
        >
          <Toolbar variant="dense" className={classes.appBar}>
            <Avatar style={{ marginLeft: 0 }} />
            <Typography
              variant="h6"
              color="dark"
              style={{ color: "#000", marginLeft: "30px" }}
            >
              {username}
            </Typography>
          </Toolbar>
          <IconButton
            edge="end"
            onClick={handleClick}
            className={classes.menuButton}
            color="dark"
            aria-label="menu"
          >
            <MoreVertIcon />
          </IconButton>
          <HomeMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            setDrawerOpen={setDrawerOpen}
            setModalOpen={setModalOpen}
          />
        </AppBar>

        <div className={classes.scroll}>{list}</div>
        <AppBar
          position="fixed"
          color="inherit"
          style={{
            top: "auto",
            bottom: 0,
            left: 0,
            width: "448px",
            padding: "10px",
            backgroundColor: "#EDEDED",
            boxShadow: "none",
            height: "62px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid #E0E0E0",
            borderRight: "1px solid #E0E0E0",
          }}
        >
          Your Id : {id}
        </AppBar>
      </Drawer>
      <NewContact modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <NewGroup isOpen={drawerOpen} close={setDrawerOpen} />
    </div>
  );
}

export default Sidebar;
