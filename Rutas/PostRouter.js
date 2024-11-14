import express from 'express';
import multer from "multer";
import {crearPost, editarPost, getPostsUsuario, obtenerPosts, deletePost, getPost} from '../Controladores/PostControlador.js'

const router = express.Router();
const storage = multer.memoryStorage()

const upload = multer({ storage: storage });


//Rutas del controlador de usuario
router.post("/postear", upload.array('images', 10), crearPost)
router.post("/update", upload.array('images', 10), editarPost)
router.post("/delete", upload.none(), deletePost)
router.get("/getMisPosts/:idUsuario", getPostsUsuario)
router.get("/getPosts/:idUsuario", obtenerPosts)
router.get("/getPost/:idPost", getPost)


export default router;