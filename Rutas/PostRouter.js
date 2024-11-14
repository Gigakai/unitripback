import express from 'express';
import {crearPost, editarPost, getPostsUsuario, obtenerPosts, deletePost, getPost} from '../Controladores/PostControlador.js'

const router = express.Router();


//Rutas del controlador de usuario
router.post("/postear", crearPost)
router.post("/update", editarPost)
router.post("/delete", deletePost)
router.get("/getMisPosts/:idUsuario", getPostsUsuario)
router.get("/getPosts/:idUsuario", obtenerPosts)
router.get("/getPost/:idPost", getPost)


export default router;