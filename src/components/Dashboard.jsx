import React from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../contexts/ConversationsProvider";

function Dashboard({ id, username }) {
  const { selectedConversation } = useConversations();
  return (
    <>
      <Sidebar id={id} username={username} />
      {selectedConversation && <OpenConversation />}
    </>
  );
}

export default Dashboard;
