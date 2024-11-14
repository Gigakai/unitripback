import connection from "../db.js";

//Crear un chat
export const crear = (idSender, idReceiver) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Chats(1, ?, ?, NULL, NULL)';
        connection.query(sqlQuery, [idSender, idReceiver] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

//Enviar un Mensaje
export const sendMsg = (idSender, msg, idChat) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Chats(4, ?, NULL, ?, ?);';
        connection.query(sqlQuery, [idSender, msg, idChat] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

//Obtener chats de un usuario
export const ObtenerChats = (idUsuario) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Chats(3, ?, NULL, NULL, NULL)';
        connection.query(sqlQuery, [idUsuario] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

//Obtener mensajes
export const getMensajes = (idChat) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Chats(5, NULL, NULL, NULL, ?)';
        connection.query(sqlQuery, [idChat] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

//Obtener Chat seleccionado
export const getCurrentChat = (idChat) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Chats(6, NULL, NULL, NULL, ?)';
        connection.query(sqlQuery, [idChat] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

//Checar si ya existe un chat
export const getChatExistente = (idSender, idReceiver) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Chats(2, ?, ?, NULL, NULL)';
        connection.query(sqlQuery, [idSender, idReceiver] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

