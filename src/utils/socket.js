import { io } from "socket.io-client";
const createSocketConnection = () => {
    return io({ withCredentials: true });
};

export default createSocketConnection;
