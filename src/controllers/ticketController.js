const ticketService = require('../services/ticketService');

function validarTicket(ticket) {

    const campos = [
        'nombreSolicitante',
        'correo',
        'categoria',
        'descripcion',
        'impacto',
        'urgencia',
        'tiempoEstimado'
    ];

    for (const campo of campos) {

        if (!ticket[campo]) {
            return `El campo ${campo} es obligatorio`;
        }

    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(ticket.correo)) {
        return 'El formato del correo no es válido';
    }

    const impactosValidos = ['bajo', 'medio', 'alto'];
    const urgenciasValidas = ['baja', 'media', 'alta'];

    if (!impactosValidos.includes(ticket.impacto)) {
        return 'El impacto debe ser bajo, medio o alto';
    }

    if (!urgenciasValidas.includes(ticket.urgencia)) {
        return 'La urgencia debe ser baja, media o alta';
    }

    return null;

}

async function listarTickets(req, res) {

    try {

        const tickets = await ticketService.listarTickets();

        res.status(200).json(tickets);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al listar tickets',
            error: error.message
        });

    }

}

async function obtenerTicketPorId(req, res) {

    try {

        const ticket = await ticketService.obtenerTicketPorId(req.params.id);

        if (!ticket) {

            return res.status(404).json({
                mensaje: 'Ticket no encontrado'
            });

        }

        res.status(200).json(ticket);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al obtener ticket',
            error: error.message
        });

    }

}

async function crearTicket(req, res) {

    try {

        const errorValidacion = validarTicket(req.body);

        if (errorValidacion) {

            return res.status(400).json({
                mensaje: errorValidacion
            });

        }

        const ticket = await ticketService.crearTicket(req.body);

        res.status(201).json({
            mensaje: 'Ticket creado correctamente',
            ticket
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al crear ticket',
            error: error.message
        });

    }

}

async function actualizarTicket(req, res) {

    try {

        const existe = await ticketService.obtenerTicketPorId(req.params.id);

        if (!existe) {

            return res.status(404).json({
                mensaje: 'Ticket no encontrado'
            });

        }

        const errorValidacion = validarTicket(req.body);

        if (errorValidacion) {

            return res.status(400).json({
                mensaje: errorValidacion
            });

        }

        await ticketService.actualizarTicket(req.params.id, req.body);

        res.status(200).json({
            mensaje: 'Ticket actualizado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al actualizar ticket',
            error: error.message
        });

    }

}

async function eliminarTicket(req, res) {

    try {

        const existe = await ticketService.obtenerTicketPorId(req.params.id);

        if (!existe) {

            return res.status(404).json({
                mensaje: 'Ticket no encontrado'
            });

        }

        await ticketService.eliminarTicket(req.params.id);

        res.status(200).json({
            mensaje: 'Ticket eliminado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al eliminar ticket',
            error: error.message
        });

    }

}

module.exports = {
    listarTickets,
    obtenerTicketPorId,
    crearTicket,
    actualizarTicket,
    eliminarTicket
};