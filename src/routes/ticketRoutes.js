const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');
const auth = require('../middlewares/authMiddleware');

router.get('/tickets', ticketController.listarTickets);
router.get('/tickets/:id', ticketController.obtenerTicketPorId);

router.post('/tickets', auth, ticketController.crearTicket);
router.put('/tickets/:id', auth, ticketController.actualizarTicket);
router.delete('/tickets/:id', auth, ticketController.eliminarTicket);

module.exports = router;