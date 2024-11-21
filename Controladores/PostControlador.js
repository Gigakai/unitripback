import * as PostModel from "../Modelos/PostModel.js";
import * as ImagenesModel from "../Modelos/ImagenesModel.js";


export const crearPost = async (req, res) => {
    try {
        const { titulo, descripcion, precio, status, location, idUsuario, imagenes } = req.body;

        const errores = []

        if(titulo.length <= 0 || titulo.length > 100){
            errores.push("titulo");
        }

        if(descripcion.length <= 0 || descripcion.length > 150){
            errores.push("descripcion");
        }

        if(precio === "" || isNaN(precio)){
            errores.push("precio");
        }

        if(location === "" || location.length <= 0 || location.length > 100){
            errores.push("location");
        }

        if (!req.body.imagenes || imagenes.length <= 0) {
            errores.push("Imagenes")
        }



        if(errores.length > 0){
            return res.status(400).json({ success: false, msg: "Error en los parametros", errors: errores })
        }else{

            const response = await PostModel.crear(idUsuario, titulo, descripcion, precio, status, location)
            for (const file of imagenes) {
                await ImagenesModel.cargar(response[0][0].idPost, file);
            }

            res.status(200).json({success: true, msg: "Se guardo con exito"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: "Error en el servidor", errors: []})
    }
};

export const editarPost = async (req, res) => {
    try {
        const {titulo, descripcion, precio, status, location, idPost, imagenes } = req.body;

        const errores = []

        if(titulo.length <= 0 || titulo.length > 100){
            errores.push("titulo");
        }

        if(descripcion.length <= 0 || descripcion.length > 150){
            errores.push("descripcion");
        }

        if(precio === "" || isNaN(precio)){
            errores.push("precio");
        }

        if(location === "" || location.length <= 0 || location.length > 100){
            errores.push("location");
        }


        if(errores.length > 0){
            return res.status(400).json({ success: false, msg: "Error en los parametros", errors: errores })
        }else{

            const response = await PostModel.actualizar(idPost, titulo, descripcion, precio, status, location)

            if (!req.body.imagenes || imagenes.length <= 0) {
                res.status(200).json({success: true, msg: "Se actualizo el post"})
            }else{
                await ImagenesModel.eliminarAntiguos(idPost)

                for (const file of imagenes) {
                    await ImagenesModel.cargar(idPost, file);
                }

                res.status(200).json({success: true, msg: "Se actualizo el post"})
            }

        }


    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const deletePost = async (req, res) => {
    try {
        const {idPost} = req.body;

        if(!idPost){
            return res.status(400).json({ success: false, msg: "Error en los parametros", errors: [] })
        }

        await PostModel.eliminar(idPost)


        res.status(200).json({success: true, msg: "Se elimino con exito"})
    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const getPostsUsuario = async (req, res) => {
    try {
        const {idUsuario} = req.params

        const response = await PostModel.getMyPosts(idUsuario)

        res.status(200).json({success: true, msg: "Se obtuvieron tus posts", posts: response[0]})
    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const obtenerPosts = async (req, res) => {
    try {
        const {idUsuario} = req.params

        const response = await PostModel.getAllPosts(idUsuario)

        res.status(200).json({success: true, msg: "Se obtuvieron tus posts", posts: response[0]})

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};


export const getPost = async (req, res) => {
    try {
        const {idPost} = req.params

        const post = await PostModel.getPost(idPost)

        res.status(200).json({success: true, msg: "Se obtuvo con exito", post: post[0][0]})

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};
