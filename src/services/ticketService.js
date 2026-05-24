const db = require('../data/db');

function calcularPrioridad(impacto, urgencia, categoria, tiempoEstimado) {
    const puntosImpacto = { bajo: 1, medio: 2, alto: 3 };
    const puntosUrgencia = { baja: 1, media: 2, alta: 3 };

    let puntaje = puntosImpacto[impacto] + puntosUrgencia[urgencia];

    if (categoria === 'red' || categoria === 'cuenta') {
        puntaje += 1;
    }

    if (tiempoEstimado > 4) {
        puntaje += 1;
    }

    if (puntaje <= 3) return 'Baja';
    if (puntaje <= 5) return 'Media';
    if (puntaje === 6) return 'Alta';
    return 'Crítica';
}

async function listarTickets() {
    const [rows] = await db.query('SELECT * FROM tickets');
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
        (nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado, estado, prioridad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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

async function actualizarTicket(id, ticket) {
    const prioridad = calcularPrioridad(
        ticket.impacto,
        ticket.urgencia,
        ticket.categoria,
        Number(ticket.tiempoEstimado)
    );

    const [result] = await db.query(
        `UPDATE tickets SET 
        nombreSolicitante = ?, 
        correo = ?, 
        categoria = ?, 
        descripcion = ?, 
        impacto = ?, 
        urgencia = ?, 
        tiempoEstimado = ?, 
        estado = ?, 
        prioridad = ?
        WHERE id = ?`,
        [
            ticket.nombreSolicitante,
            ticket.correo,
            ticket.categoria,
            ticket.descripcion,
            ticket.impacto,
            ticket.urgencia,
            ticket.tiempoEstimado,
            ticket.estado,
            prioridad,
            id
        ]
    );

    return result;
}

async function eliminarTicket(id) {
    const [result] = await db.query('DELETE FROM tickets WHERE id = ?', [id]);
    return result;
}

module.exports = {
    listarTickets,
    obtenerTicketPorId,
    crearTicket,
    actualizarTicket,
    eliminarTicket
};