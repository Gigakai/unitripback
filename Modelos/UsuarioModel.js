import connection from "../db.js";

//Registar Usuarios
export const agregar = (email, password, nombre, apellido, username, direccion, telefono, profilePic) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Usuarios(1, NULL, ?, ?, ?, ?, ?, ?, ?, NULL, ?)';
        connection.query(sqlQuery, [email, password, nombre, apellido, username, direccion, telefono, profilePic] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

//Actualizar Usuario con Foto
export const actualizarPhoto = (idUsuario, password, username, telefono, profilePic) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Usuarios(3, ?, NULL, ?, NULL, NULL, ?, NULL, ?, NULL, ?)';
        connection.query(sqlQuery, [idUsuario, password, username, telefono, profilePic] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

//Actualizar Usuario sin Foto
export const actualizar = (idUsuario, password, username, telefono) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Usuarios(2, ?, NULL, ?, NULL, NULL, ?, NULL, ?, NULL, NULL)';
        connection.query(sqlQuery, [idUsuario, password, username, telefono] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve();
            }
        })
    });
}

//Realzar Log In
export const logIn = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Usuarios(5, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);'
        connection.query(sqlQuery, [email], (err, result) => {
            if (err) {
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}

//Encontrar Duplicado
export const duplicado = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Usuarios(4, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)'
        connection.query(sqlQuery, [email], (err, result) => {
            if (err) {
                console.log("Error")
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}


















