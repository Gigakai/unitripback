import connection from "../db.js";

export const cargar = (idPost, Image) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Imagenes(1, ?, NULL, ?)';
        connection.query(sqlQuery, [idPost, Image] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

export const eliminarAntiguos = (idPost) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'CALL sp_Imagenes(2, ?, NULL, NULL)';
        connection.query(sqlQuery, [idPost] ,(err, result) => {
            if (err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}
