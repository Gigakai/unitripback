import * as UsuarioModel from "../Modelos/UsuarioModel.js";


export const registerUser = async (req, res) => {
    try {
        if (!req.body.profilePic || !req.body.profilePic.startsWith("data:image")) {
            return res.status(400).json({
                success: false,
                msg: 'No se ha enviado ningún archivo.',
                errors: ["profilePic"]
            });
        }

        const {email, password, nombre, apellido, username, direccion, telefono, profilePic} = req.body
        const duplicate = await UsuarioModel.duplicado(email)

        if (duplicate[0][0].existe > 0) {
            res.status(400).json({success: false, msg: "Ya existe", errors: []})
        } else {
            const errores = []

            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[(!”#$%&\/=?¡¿:;,._+*{})]).{8,50}$/
            if (!passwordRegex.test(password)) {
                errores.push("password")
            }

            const emailRegex = /^([a-z]+)([a-z0-9\.]*)@([a-z0-9]+)((\.[a-z]{2,3})+)$/
            if (!emailRegex.test(email)) {
                errores.push("email")
            }

            const nombreRegex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+[\'\-]?[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+[\'\-]?[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
            if (!nombreRegex.test(nombre) || nombre.length > 50) {
                errores.push("nombre")
            }

            if (!nombreRegex.test(apellido) || apellido.length > 50) {
                errores.push("apellido")
            }

            const usernameRegex = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚú\s]{2,20}$/
            if (!usernameRegex.test(username) || username.length > 20) {
                errores.push("username")
            }

            if (errores.length > 0) {
                res.status(400).json({success: false, msg: "Error en los parametros", errors: errores})
            } else {
                const response = await UsuarioModel.agregar(email, password, nombre, apellido, username, direccion, telefono, profilePic)
                const usuarioActual = await UsuarioModel.logIn(email)
                res.status(200).json({success: true, msg: "Usuario registrado con exito", data: usuarioActual[0][0]})
            }
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};


export const logIn = async (req, res) => {
    try {
        const {email, password} = req.body

        const response = await UsuarioModel.logIn(email)
        if (response[0].length > 0) {
            if (password === response[0][0].password) {
                res.status(200).json({success: true, msg: "Usuario loggeado", data: response[0][0]})
            } else {
                res.status(400).json({success: false, msg: "Error de credenciales"})
            }

        } else {
            res.status(400).json({success: false, msg: "No existe dicho usuario"})
        }
    } catch (error) {
        res.status(500).json({success: false, msg: error})
    }
};


export const updateUser = async (req, res) => {
    try {
        const {idUsuario, email, username, password, phone} = req.body

        const response = await UsuarioModel.logIn(email)

        if (response[0].length > 0) {
            const errores = []

            const regexTelefono = /^(?:\+52)? ?\d{10}$|^(?:\+52)? ?\(?\d{2,3}\)? ?\d{3} ?\d{4}$/
            if (!regexTelefono.test(phone)) {
                errores.push("telefono")
            }

            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[(!”#$%&\/=?¡¿:;,._+*{})]).{8,50}$/
            if (!passwordRegex.test(password)) {
                errores.push("password")
            }

            const usernameRegex = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚú\s]{2,20}$/
            if (!usernameRegex.test(username) || username.length > 20) {
                errores.push("username")
            }

            if (errores.length > 0) {
                res.status(400).json({success: false, msg: "Error en los parametros", errors: errores})
            } else {
                await UsuarioModel.actualizar(idUsuario, password, username, phone)
                const updatedUser = await UsuarioModel.logIn(email)
                res.status(200).json({success: true, msg: "Usuario Actualizado", data: updatedUser[0][0]})
            }


        } else {
            res.status(400).json({success: false, msg: "El Usuario no existe", errors: []})
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
}


export const updateUserPhoto = async (req, res) => {
    try {

        if (!req.body.profilePic || !req.body.profilePic.startsWith("data:image")) {
            return res.status(400).json({success: false, msg: 'No se ha enviado ningún archivo.', errors: []});
        }

        const {idUsuario, email, username, password, phone, profilePic} = req.body

        const response = await UsuarioModel.logIn(email)
        if (response[0].length > 0) {

            const errores = []

            const regexTelefono = /^(?:\+52)? ?\d{10}$|^(?:\+52)? ?\(?\d{2,3}\)? ?\d{3} ?\d{4}$/
            if (!regexTelefono.test(phone)) {
                errores.push("telefono")
            }

            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[(!”#$%&\/=?¡¿:;,._+*{})]).{8,50}$/
            if (!passwordRegex.test(password)) {
                errores.push("password")
            }

            const usernameRegex = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚú\s]{2,20}$/
            if (!usernameRegex.test(username) || username.length > 20) {
                errores.push("username")
            }

            if (errores.length > 0) {
                res.status(400).json({success: false, msg: "Error en los parametros", errors: errores})
            } else {
                await UsuarioModel.actualizarPhoto(idUsuario, password, username, phone, profilePic)
                const updatedUser = await UsuarioModel.logIn(email)
                res.status(200).json({success: true, msg: "Usuario Actualizado", data: updatedUser[0][0]})
            }

        } else {
            res.status(400).json({success: false, msg: "El Usuario no existe"})
        }

    } catch (error) {
        res.status(500).json({success: false, msg: error})
    }
}

export const sync = async (req, res) => {
    try {
        const {fechaSync} = req.params

        const posts = await UsuarioModel.syncPosts(fechaSync)
        const chats = await UsuarioModel.syncChats(fechaSync)
        const mensajes = await UsuarioModel.syncMensajes(fechaSync)
        const usuarios = await UsuarioModel.syncUsuarios(fechaSync)

        res.status(200).json({success: true,
            msg: "Se obtuvo con exito",
            posts: posts[0],
            chats: chats[0],
            mensajes: mensajes[0],
            usuarios: usuarios[0],
        })

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};
