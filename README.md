# 🎫 HelpDesk Smart Priority

Sistema HelpDesk desarrollado con Node.js, Express y MySQL para la gestión inteligente de tickets de soporte técnico.

El sistema permite:

- Crear tickets de soporte
- Gestionar prioridades automáticamente
- Control de usuarios por roles
- Actualizar estados de tickets
- Cerrar tickets con motivo
- Visualización diferenciada entre administrador y usuario
- Interfaz visual estilo Comic Book Vintage

---

# 📌 Tecnologías utilizadas

- Node.js
- Express
- MySQL
- HTML5
- CSS3
- JavaScript
- Thunder Client
- Visual Studio Code

---

# 📂 Estructura del proyecto

```txt
HelpDeskSmartPriority
│
├── src
│   ├── controllers
│   ├── data
│   ├── middlewares
│   ├── public
│   │   ├── css
│   │   └── index.html
│   ├── routes
│   └── services
│
├── evidencias
├── app.js
├── package.json
└── README.md

# 🔐 Seguridad HTTPS

Qué es HTTPS.

HTTPS es una versión segura de HTTP que protege la información enviada entre el navegador y el servidor.

Qué riesgos ayuda a mitigar.

Ayuda a evitar:

- Robo de contraseñas
- Intercepción de información
- Modificación de datos
- Ataques de terceros

Por qué es importante en aplicaciones web.

HTTPS es importante porque protege la información de los usuarios y mejora la seguridad de las aplicaciones web.

# ⚙️ Instalación

## 1. Clonar o descargar el proyecto

Guardar el proyecto en una carpeta llamada:

```txt
HelpDeskSmartPriority
```

---

## 2. Instalar dependencias
Abrir una terminal en Visual Studio Code y ejecutar:
```bash
npm install
```
## 3. Instalar nodemon
```bash
npm install nodemon --save-dev
```
## 4. Configurar MySQL
Abrir MySQL Workbench y ejecutar el script de creación de base de datos.
Base de datos utilizada:
```txt
helpdesk_smart_priority
```
# ▶️ Ejecución
## Iniciar servidor
En la terminal ejecutar:
```bash
npx nodemon app.js
```
## Resultado esperado
```txt
Servidor ejecutándose en http://localhost:3000
```
## Abrir aplicación
En el navegador ingresar:
```txt
http://localhost:3000
```
# 🌐 Endpoints 

## 🔐 Login
```txt
POST http://localhost:3000/login
```
## 📥 Obtener todos los tickets
```txt
GET http://localhost:3000/api/tickets?rol=administrador&usuario=admin
```
## 👤 Obtener tickets de usuario
```txt
GET http://localhost:3000/api/tickets?rol=usuario&usuario=usuario
```
## 📄 Obtener ticket por ID
```txt
GET http://localhost:3000/api/tickets/1
```
## ➕ Crear ticket
```txt
POST http://localhost:3000/api/tickets
```
## 🔄 Actualizar estado del ticket
```txt
PATCH http://localhost:3000/api/tickets/1/estado
```
## ❌ Cerrar ticket
```txt
DELETE http://localhost:3000/api/tickets/1
```