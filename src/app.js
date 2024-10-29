import express from "express";
import { engine } from "express-handlebars";
//import multer from "multer";
import cartRouter from "./routes/cart.router.js"
import productRouter from "./routes/product.router.js"
import viewsRouter from "./routes/views.router.js"
import mongoose from "mongoose";
import { Server } from "socket.io";
import ProductManager from "./managers/productManager.js";
import dotenv from 'dotenv'; 

//Cargamos las variables de entorno
dotenv.config();

//Me conecto a la base de datos de Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Conectado a MongoDB")
    })
    .catch((error)=>{
        console.log("Hay un error: ",error)
    })


const app = express();
const puerto = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas para ver desde la URL
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/", viewsRouter);


//Inicia el servidor Express y hace que escuche en el puerto especificado, mostrando un mensaje en la consola cuando el servidor está funcionando.
const httpServer = app.listen(puerto, ()=>{
    console.log(`Servidor funcionando en ${puerto}`);
})

//Iniciamos el servidor Socket.io
const io = new Server(httpServer);

// Crea una instancia de ProductManager
const manager = new ProductManager();

// Manejo de eventos de Socket.io
io.on("connection", async (socket) => {
    console.log(`El cliente de socket id : ${socket.id} se conectó`);

    //Pasamos el array de productos por socket
    // socket.emit("products", await manager.getProducts());
    try {
        // Pasamos el array de productos por socket
        const productos = await manager.getProducts();
        socket.emit("products", productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        socket.emit("products", []); // Envia un array vacío si hay error
    }

    socket.on("deleteProduct", async (id) => {
        console.log("Intentando eliminar producto con ID:", id);
        try {
            await manager.deleteProduct(id);
            const updatedProducts = await manager.getProducts();
            io.emit("products", updatedProducts);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    });
    

    // Manejamos la creación de productos
    socket.on("addProduct", async (product) => {
        try {
            await manager.addProduct(product);
            const updatedProducts = await manager.getProducts();
            io.emit("products", updatedProducts);
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    });


    // Manejo de desconexión
    socket.on("disconnect", () => {
        console.log(`Un cliente ${socket.id} se desconectó`);
    });
});