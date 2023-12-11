import { useState, useEffect } from "react";
import {
    createContext,
} from "react";
import { Socket_URL } from "../config/config";
import { io } from "socket.io-client";

export const AuthContext = createContext({
    logOut: () => { },
});


export const AuthContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {

        console.log("socket connect");

        setSocket(io(Socket_URL));
    }, [])


    const contextValue = {
        socket
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
