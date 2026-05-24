const db = require('../data/db');

function calcularPrioridad(impacto, urgencia, categoria, tiempoEstimado) {
    const puntosImpacto = { bajo: 1, medio: 2, alto: 3 };
    const puntosUrgencia = { baja: 1, media: 2, alta: 3 };

    let puntaje = puntosImpacto[impacto] + puntosUrgencia[urgencia];

    if (categoria === 'red' || categoria === 'cuenta') puntaje += 1;
    if (tiempoEstimado > 4) puntaje += 1;

    if (puntaje <= 3) return 'Baja';
    if (puntaje <= 5) return 'Media';
    if (puntaje === 6) return 'Alta';
    return 'Crítica';
}

async function listarTickets() {
    const [rows] = await db.query('SELECT * FROM tickets ORDER BY id DESC');
    return rows;
}

async function listarTicketsPorUsuario(usuario) {
    const [rows] = await db.query(
        'SELECT * FROM tickets WHERE usuarioCreador = ? ORDER BY id DESC',
        [usuario]
    );
    return rows;
}

async function obtenerTicketPorId(id) {
    const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
    return rows[0];
}

async function crearTicket(ticket) {
    const prioridad = calcularPrioridad(
        ticket.impacto,
        ticket.urgencia,
        ticket.categoria,
        Number(ticket.tiempoEstimado)
    );

    const [result] = await db.query(
        `INSERT INTO tickets 
        (usuarioCreador, nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado, estado, prioridad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            ticket.usuarioCreador,
            ticket.nombreSolicitante,
            ticket.correo,
            ticket.categoria,
            ticket.descripcion,
            ticket.impacto,
            ticket.urgencia,
            ticket.tiempoEstimado,
            ticket.estado || 'pendiente',
            prioridad
        ]
    );

    return {
        id: result.insertId,
        ...ticket,
        prioridad
    };
}

async function actualizarEstadoTicket(id, estado) {
    const [result] = await db.query(
        'UPDATE tickets SET estado = ? WHERE id = ?',
        [estado, id]
    );

    return result;
}

async function cerrarTicket(id, motivoCierre) {
    const [result] = await db.query(
        'UPDATE tickets SET estado = ?, motivoCierre = ? WHERE id = ?',
        ['cerrado', motivoCierre, id]
    );

    return result;
}

module.exports = {
    listarTickets,
    listarTicketsPorUsuario,
    obtenerTicketPorId,
    crearTicket,
    actualizarEstadoTicket,
    cerrarTicket
};