const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');
const auth = require('../middlewares/authMiddleware');

router.get('/tickets', ticketController.listarTickets);
router.get('/tickets/:id', ticketController.obtenerTicketPorId);

router.post('/tickets', auth, ticketController.crearTicket);

router.patch('/tickets/:id/estado', auth, ticketController.actualizarEstadoTicket);

router.delete('/tickets/:id', auth, ticketController.cerrarTicket);

module.exports = router;