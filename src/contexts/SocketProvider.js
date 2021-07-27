import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    // const url = "http://localhost:5000";
    const url = "https://limitless-escarpment-52108.herokuapp.com/";

    const newSocket = io(url, {
      transports: ["websocket", "polling", "flashsocket"],
      query: { id },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
