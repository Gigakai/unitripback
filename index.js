import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import UsuarioRouter from './Rutas/UsuarioRutas.js';
import ChatRouter from './Rutas/ChatRouter.js';
import PostRouter from './Rutas/PostRouter.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use("/api/users", UsuarioRouter)
app.use("/api/chats", ChatRouter)
app.use("/api/posts", PostRouter)
app.use(cors());


const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})






