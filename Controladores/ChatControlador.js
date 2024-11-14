import * as ChatModel from "../Modelos/ChatModel.js";

export const crearChat = async (req, res) => {
    try {
        const {idSender, idReceiver} = req.body

        const estaRegistrado = await ChatModel.getChatExistente(idReceiver, idSender)

        if (estaRegistrado[0].length <= 0 || estaRegistrado[0][0].existe <= 0) {
            const idChatCreado = await ChatModel.crear(idReceiver, idSender)
            const chatInfo = await ChatModel.getCurrentChat(idChatCreado[0][0].idChat)

            res.status(200).json({
                success: true,
                msg: "Se creo el chat",
                data: {chatInfo: chatInfo[0][0], mensajes: []}
            })
        } else {
            const chatInfo = await ChatModel.getCurrentChat(estaRegistrado[0][0].idChat)
            const mensajes = await ChatModel.getMensajes(estaRegistrado[0][0].idChat)

            res.status(200).json({
                success: true,
                msg: "Ya existe el chat",
                data: {chatInfo: chatInfo[0][0], mensajes: mensajes[0]}
            })
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};


export const enviarMensaje = async (req, res) => {
    try {
        const {idSender, msg, idChat} = req.body

        await ChatModel.sendMsg(idSender, msg, idChat)

        res.status(200).json({success: true, msg: "Mensaje Enviado"})

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const obtenerChats = async (req, res) => {
    try {
        const {idUsuario} = req.params

        const chats = await ChatModel.ObtenerChats(idUsuario)

        res.status(200).json({success: true, msg: "Se obtuvieron los chats", chats: chats[0]})

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const obtenerChatActual = async (req, res) => {
    try {
        const {idChat} = req.params

        const chatActual = await ChatModel.getCurrentChat(idChat)
        const mensajes = await ChatModel.getMensajes(idChat)

        res.status(200).json({
            success: true,
            msg: "Obtuviste el Chat",
            data: {chatInfo: chatActual[0][0], mensajes: mensajes[0]}
        })

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};
