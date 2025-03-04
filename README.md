# Proyecto Final - "Adoptame"

## Descripción

Este proyecto es la entrega final del curso de backend de Coderhouse. 
En este proyecto, se implementan diversas mejoras a la aplicación **"Adoptame"**, una plataforma para gestionar adopciones de mascotas. 
El objetivo principal es **dockerizar** el proyecto, crear una imagen Docker y subirla a Docker Hub. 
Además, se desarrollan **tests funcionales** para los endpoints del router `adoption.router.js`, se **documentan las rutas** del módulo `Users`, `Pets`,`Adoptions` usando Swagger, y se implementan mejoras adicionales en la aplicación.


## Objetivos Específicos

- **Generación de datos mockeados**: Utilización de la librería **Faker** para crear usuarios y mascotas ficticias.
- **Persistencia de datos**: Implementación de **MongoDB** para almacenar los datos de usuarios, mascotas y adopciones en la nube.
- **Pruebas de API**: Uso de **POSTMAN** para probar los diferentes endpoints de la API.
- **Pruebas en consola**: Implementación de **Supertest** para realizar pruebas automáticas sobre los endpoints de la API desde la consola.
- **Documentación de la API**: Uso de **Swagger** para generar una documentación detallada y accesible de los endpoints del proyecto.
- **Dockerización de la aplicación**: Creación de una imagen Docker de la aplicación y su publicación en **Docker Hub**.

## Instrucciones de Uso

### Para ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**:

   Clona el repositorio en tu máquina local con el siguiente comando:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <nombre_del_repositorio>

2. Instalar las dependencias de Node:
  ```bash
    npm install 
    npm run dev - Para modo desarrollo 
    npm test - Para test funcionales
    npm start - Para modo produccion


