import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import GroupIcon from "@material-ui/icons/Group";
import SendIcon from "@material-ui/icons/Send";
import React, { useCallback, useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import MessageOut from "./MessageOut";

function OpenConversation() {
  const { selectedConversation, sendMessage } = useConversations();
  const lastMessageRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim().length !== 0)
      sendMessage(
        selectedConversation.recipients.map((r) => r.id),
        text
      );
    // console.log(selectedConversation.messages);
    setText("");
  }

  return (
    <div
      style={{
        marginLeft: "448px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
      }}
    >
      <AppBar
        position="sticky"
        color="inherit"
        style={{
          top: "auto",
          bottom: 0,
          left: 0,
          padding: "10px",
          backgroundColor: "#EDEDED",
          boxShadow: "none",
          maxHeight: "59px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <ListItem>
          <ListItemIcon>
            <Avatar>
              <GroupIcon />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={"Group " + (selectedConversation.index + 1)}
            secondary={selectedConversation.recipients
              .map((r) => r.name)
              .join(",")
              .concat(",You")}
          />
        </ListItem>
      </AppBar>
      {/* 1 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          height: "100%",
          overflow: "auto",
          backgroundColor: "#E4DCD5",
          backgroundImage: "url('bg-chat-tile-light.svg')",
          backgroundSize: "540px",
          backgroundPosition: "0% 12%",
        }}
      >
        {/* 2 */}
        <div
          style={{
            flexGrow: "1",
          }}
        >
          {/* 3 */}
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              flexGrow: "1",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              padding: "2px 80px",
            }}
          >
            {selectedConversation.messages.map((message, index) => {
              return (
                <div
                  ref={
                    index === selectedConversation.messages.length - 1
                      ? lastMessageRef
                      : null
                  }
                  key={index}
                  style={{
                    marginTop: "2px",
                    marginBottom: "2px",
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: message.fromMe ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: "500px",
                      overflowWrap: "anywhere",
                      borderRadius: message.fromMe
                        ? "8px 0 8px 8px"
                        : "0 8px 8px 8px",
                      boxShadow: "0 1px 0.5px rgba(0,0,0,.13)",
                      marginBottom: "10px",
                      padding: "6px 7px 8px 9px",
                      backgroundColor: message.fromMe ? "#DCF8C6" : "#FFFEFE",
                    }}
                  >
                    <MessageOut fromMe={message.fromMe} />
                    {message.text}
                    <div
                      style={{
                        // alignSelf: "flex-end",
                        fontSize: "11px",
                        opacity: "0.6",
                        display: "flex",
                        alignSelf: message.fromMe ? "flex-end" : "flex-start",
                      }}
                    >
                      {message.fromMe ? "You" : message.senderName}
                      {message.fromMe && (
                        <DoneAllIcon
                          style={{ fontSize: 15, marginLeft: "3px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        square
        style={{
          background: "#EDEDED",
          minHeight: "62px",
          // height: "max-content",
          // maxHeight: "62px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          flexGrow: "1",
          padding: "7px 10px",
          witdh: "100%",
        }}
      >
        <InputBase
          multiline
          rowsMax={5}
          value={text}
          onKeyUp={(e) => {
            if (!e.shiftKey && e.code === "Enter") {
              handleSubmit(e);
            }
          }}
          onChange={(e) => setText(e.target.value)}
          style={{
            borderRadius: "25px",
            background: "#fff",
            // witdh: "90%",
            flexGrow: "1",
            margin: "2px 10px",
            padding: "12px 12px 12px",
          }}
          placeholder="Type a message"
          inputProps={{
            "aria-label": "Type a message",
          }}
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default OpenConversation;
