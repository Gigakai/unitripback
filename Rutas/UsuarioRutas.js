import express from 'express';
import multer from "multer";
import {registerUser, logIn, updateUser, updateUserPhoto} from '../Controladores/UsuarioControlador.js'

const router = express.Router();
const storage = multer.memoryStorage()

const upload = multer({ storage: storage });


//Rutas del controlador de usuario
router.post("/register", upload.single('profilePic'), registerUser)
router.post("/logIn", upload.none(), logIn)
router.post("/update", upload.none(), updateUser)
router.post("/updatePhoto", upload.single('profilePic'), updateUserPhoto)


export default router;