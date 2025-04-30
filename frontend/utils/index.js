import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  // put your local ip here
  Platform.OS === "android" ? "http://(localhost-ip):3000/" : "http://localhost:3000";

export const socket = io.connect("http://(localhost-ip):4000/");
