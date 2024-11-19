import express from 'express';
import {registerUser, logIn, updateUser, updateUserPhoto, sync, syncUpdated} from '../Controladores/UsuarioControlador.js'

const router = express.Router();

//Rutas del controlador de usuario
router.post("/register", registerUser)
router.post("/logIn", logIn)
router.post("/update", updateUser)
router.post("/updatePhoto", updateUserPhoto)
router.get("/sync/:fechaSync", sync)
router.get("/syncUp/:fechaSync", syncUpdated)

export default router;