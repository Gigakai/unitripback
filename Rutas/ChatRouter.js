import express from 'express';
import multer from "multer";
import { obtenerChats, obtenerChatActual, crearChat, enviarMensaje } from '../Controladores/ChatControlador.js'

const router = express.Router();
const storage = multer.memoryStorage()

const upload = multer({ storage: storage });


//Rutas del controlador de usuario

router.post("/crear", upload.none(), crearChat)
router.post("/enviar", upload.none(), enviarMensaje)
router.get("/getChats/:idUsuario", obtenerChats)
router.get("/getChatActual/:idChat", obtenerChatActual)


export default router;