import { io } from "socket.io-client";
import { BASE_URL_SOCKET } from "../config/siteConfig";

export const SOCKET = io(BASE_URL_SOCKET);
