import express from 'express';
import {registerUser, logIn, updateUser, updateUserPhoto, sync} from '../Controladores/UsuarioControlador.js'

const router = express.Router();

//Rutas del controlador de usuario
router.post("/register", registerUser)
router.post("/logIn", logIn)
router.post("/update", updateUser)
router.post("/updatePhoto", updateUserPhoto)
router.get("/sync/:fechaSync", sync)

export default router;