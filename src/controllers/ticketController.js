const ticketService = require('../services/ticketService');

function validarTicket(ticket) {
    const campos = [
        'usuarioCreador',
        'nombreSolicitante',
        'correo',
        'categoria',
        'descripcion',
        'impacto',
        'urgencia',
        'tiempoEstimado'
    ];

    for (const campo of campos) {
        if (!ticket[campo]) return `El campo ${campo} es obligatorio`;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(ticket.correo)) {
        return 'El formato del correo no es válido';
    }

    if (!['bajo', 'medio', 'alto'].includes(ticket.impacto)) {
        return 'El impacto debe ser bajo, medio o alto';
    }

    if (!['baja', 'media', 'alta'].includes(ticket.urgencia)) {
        return 'La urgencia debe ser baja, media o alta';
    }

    return null;
}

async function listarTickets(req, res) {
    try {
        const { rol, usuario } = req.query;

        let tickets;

        if (rol === 'administrador') {
            tickets = await ticketService.listarTickets();
        } else {
            tickets = await ticketService.listarTicketsPorUsuario(usuario);
        }

        res.status(200).json(tickets);

    } catch (error) {
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
            return res.status(404).json({ mensaje: 'Ticket no encontrado' });
        }

        res.status(200).json(ticket);

    } catch (error) {
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
            return res.status(400).json({ mensaje: errorValidacion });
        }

        const ticket = await ticketService.crearTicket(req.body);

        res.status(201).json({
            mensaje: 'Ticket creado correctamente',
            ticket
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear ticket',
            error: error.message
        });
    }
}

async function actualizarEstadoTicket(req, res) {
    try {
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({
                mensaje: 'Debe seleccionar un estado'
            });
        }

        const existe = await ticketService.obtenerTicketPorId(req.params.id);

        if (!existe) {
            return res.status(404).json({
                mensaje: 'Ticket no encontrado'
            });
        }

        await ticketService.actualizarEstadoTicket(req.params.id, estado);

        res.status(200).json({
            mensaje: 'Estado del ticket actualizado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar estado',
            error: error.message
        });
    }
}

async function cerrarTicket(req, res) {
    try {
        const { motivoCierre } = req.body;

        if (!motivoCierre) {
            return res.status(400).json({
                mensaje: 'Debe ingresar el motivo de cierre o eliminación'
            });
        }

        const existe = await ticketService.obtenerTicketPorId(req.params.id);

        if (!existe) {
            return res.status(404).json({
                mensaje: 'Ticket no encontrado'
            });
        }

        await ticketService.cerrarTicket(req.params.id, motivoCierre);

        res.status(200).json({
            mensaje: 'Ticket cerrado correctamente con motivo registrado'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al cerrar ticket',
            error: error.message
        });
    }
}

module.exports = {
    listarTickets,
    obtenerTicketPorId,
    crearTicket,
    actualizarEstadoTicket,
    cerrarTicket
};