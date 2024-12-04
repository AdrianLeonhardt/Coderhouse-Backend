import { request, response, Router } from "express";
import UserModel from "../models/user.model.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/util.js"; 

const router = Router();

router.post("/register", async (request, response) => {
    const { user, email, password } = request.body;

    try {
        const validateUser = await UserModel.findOne({ user });

        if (validateUser) {
            return response.status(400).send("El usuario ya existe");
        }

        const newUser = new UserModel({
            user,
            email,
            password: createHash(password),
        });

        await newUser.save();
        
        // return response.status(201).send("Usuario registrado con éxito");

        //Creamos el token
        const token = jwt.sign({user: newUser.user, email: newUser.email, rol: newUser.role}, "coderhouse", {expiresIn: "1h"});

        //Redireccionamos con la cookie
        response.cookie("preEntregaToken", token, {
            maxAge: 3600000, //Equivale a una hora
            httpOnly: true //Solo acepta conexiones HTTP/S
        });

        //Redireccion al home
        response.redirect("/api/sessions/current");


    } catch (error) {
        console.error(error);
            response.status(500).send("Problema al registrar el usuario");
    }
});


//Ruta Login
router.post("/login", async (request,response) => {
    const {user, email ,password} = request.body;
    
    try {
        const userFinded = await UserModel.findOne({ $or: [{ user }, { email }] });

        if (!userFinded) {
            return response.status(401).send("Usuario o Correo no valido");
        }

        if (!isValidPassword(password, userFinded)) {
            return response.status(401).send("Contraseña Incorrecta");
        }

        //Generacion de Token
        const token = jwt.sign({user: userFinded.user, email: userFinded.email, role: userFinded.role}, "coderhouse", {expiresIn: "1h"});
        // console.log(userFinded); 

        //Estabecemos el token en la cookie
        response.cookie("preEntregaToken", token, {
            maxAge: 360000,
            httpOnly: true
        })

        response.redirect("/api/sessions/current");
    } catch (error) {
        response.status(500).send("Problema al registrar el usuario");
    }
})

//Estrategia Current

router.get("/current", passport.authenticate("current", { session: false }), (request, response) => {
    
    response.render("home", { 
        user: request.user.user, 
        email: request.user.email });
});


// Estrategia Logout
router.post("/logout", (request, response) =>{
    response.clearCookie("preEntregaToken");

    response.redirect("/login");
})

// Ruta Admin
router.get("/admin", passport.authenticate("current", {session: false}), (request, response)=> {
    if (request.user.role !== "admin") {
        return response.status(403).send("Acceso Denegado");
    }
    response.render("admin");
} )


export default router;