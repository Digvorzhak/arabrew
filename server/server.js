import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import routes from "./routes.js";
import connectDB from "./config/db.js";
import { CheckAndTranslateMsg } from "./utils/chat_socketIo.js";
import {
  access_chatCollection,
  addMessageToChat,
} from "./utils/chat_socketIo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5050;

const server = app.listen(
  PORT,
  console.log(
    `📶 server is running in ${process.env.NODE_ENV} Mode, & made on port ${PORT} 📶`
  )
);

const socket_io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

socket_io.on("connection", (socket) => {
  console.log("🟢🟢 Socket.io is active 🟢🟢");
  socket.on("room_setup", (chatData) => {
    const { chatId, sender, reciever } = chatData;
    access_chatCollection([sender, reciever])
      .then((isSuccess) => {
        if (!isSuccess)
          throw new Error("error by finding chat , in room_setup");
        socket.join(chatId);
      })
      .catch((err) => console.error(err));
  });
  socket.on("new_message", (newMsg) => {
    const { chatId, content, sender, reciever, originLang, targetLang } =
      newMsg;
    CheckAndTranslateMsg(content, originLang, targetLang)
      .then((result) => {
        if (result.isProfanity)
          return socket.emit("message_to_sender", result.profanity);
        const { translatedMsg } = result;
        const content_HE = originLang === "HE" ? content : translatedMsg;
        const content_AR = originLang === "AR" ? content : translatedMsg;
        addMessageToChat(sender, reciever, content_AR, content_HE)
          .then((savedMsg) => {
            if (!savedMsg) throw new Error("failed adding new MSg (server.js)");
            //*send the message back to the sender
            let savedMsg_sender = savedMsg;
            savedMsg_sender.content = savedMsg_sender["content_" + originLang];
            delete savedMsg_sender["content_" + originLang];
            delete savedMsg_sender["content_" + targetLang];
            socket.emit("message_to_sender", savedMsg_sender);
            //*send the message to the reciever
            let savedMsg_reciever = savedMsg;
            savedMsg_reciever.content =
              savedMsg_reciever["content_" + targetLang];
            delete savedMsg_reciever["content_" + originLang];
            delete savedMsg_reciever["content_" + targetLang];
            console.log(targetLang);
            socket.in(chatId).emit("message_to_reciever", savedMsg_reciever);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  });
  socket.on("disconnect", (data) => console.log(data));
});
process.on("unhandledRejection", async (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
