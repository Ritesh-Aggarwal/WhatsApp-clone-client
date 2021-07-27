import React from "react";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id", 0);
  const [user, setUser] = useLocalStorage("user", "whatsapp");
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} username={user} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return (
    <div>
      {id !== 0 ? (
        dashboard
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Login onIdSubmit={setId} getUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default App;
