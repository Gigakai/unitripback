import connection from "../db.js";

export const crear = (idUsuario, titulo, descripcion, precio, status, location) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Posts(1, NULL, ?, ?, ?, ?, ?, ?)';
        connection.query(sqlQuery, [idUsuario, titulo, descripcion, precio, status, location] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

export const actualizar = (idPost, titulo, descripcion, precio, status, location) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Posts(2, ?, NULL, ?, ?, ?, ?, ?)';
        connection.query(sqlQuery, [idPost, titulo, descripcion, precio, status, location] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

export const eliminar = (idPost) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Posts(3, ?, NULL, NULL, NULL, NULL, NULL, NULL);';
        connection.query(sqlQuery, [idPost] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

export const getPost = (idPost) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Posts(4, ?, NULL, NULL, NULL, NULL, NULL, NULL)';
        connection.query(sqlQuery, [idPost] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}


export const getMyPosts = (idUsuario) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Posts(6, NULL, ?, NULL, NULL, NULL, NULL, NULL)';
        connection.query(sqlQuery, [idUsuario] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

export const getAllPosts = (idUsuario) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Posts(5, NULL, ?, NULL, NULL, NULL, NULL, NULL)';
        connection.query(sqlQuery, [idUsuario] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}


