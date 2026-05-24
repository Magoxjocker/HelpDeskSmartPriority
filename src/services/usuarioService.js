const db = require('../data/db');

async function buscarUsuario(usuario, password) {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
        [usuario, password]
    );

    return rows[0];
}

module.exports = {
    buscarUsuario
};