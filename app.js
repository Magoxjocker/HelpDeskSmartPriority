const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ticketRoutes = require('./src/routes/ticketRoutes');
const usuarioService = require('./src/services/usuarioService');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

app.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const usuarioEncontrado = await usuarioService.buscarUsuario(usuario, password);

        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        res.status(200).json({
            mensaje: 'Login correcto',
            apiKey: process.env.API_KEY,
            usuario: usuarioEncontrado.usuario,
            rol: usuarioEncontrado.rol
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error en el login',
            error: error.message
        });
    }
});

app.use('/api', ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});