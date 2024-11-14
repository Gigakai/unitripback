import express from 'express';
import { obtenerChats, obtenerChatActual, crearChat, enviarMensaje } from '../Controladores/ChatControlador.js'

const router = express.Router();


//Rutas del controlador de chats
router.post("/crear", crearChat)
router.post("/enviar", enviarMensaje)
router.get("/getChats/:idUsuario", obtenerChats)
router.get("/getChatActual/:idChat", obtenerChatActual)


export default router;