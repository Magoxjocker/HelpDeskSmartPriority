CREATE DATABASE IF NOT EXISTS helpdesk_smart_priority;

USE helpdesk_smart_priority;

/* =========================================================
   TABLA USUARIOS
   ========================================================= */

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(30) NOT NULL
);

/* =========================================================
   TABLA TICKETS
   ========================================================= */

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioCreador VARCHAR(50) NOT NULL,
    nombreSolicitante VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    impacto VARCHAR(20) NOT NULL,
    urgencia VARCHAR(20) NOT NULL,
    tiempoEstimado INT NOT NULL,
    estado VARCHAR(30) DEFAULT 'pendiente',
    prioridad VARCHAR(30) NOT NULL,
    motivoCierre TEXT NULL,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   USUARIOS PRECARGADOS
   ========================================================= */

INSERT INTO usuarios (usuario, password, rol)
VALUES
('admin', '1234', 'administrador'),
('usuario', '1234', 'usuario');

/* =========================================================
   TICKETS PRECARGADOS
   ========================================================= */

INSERT INTO tickets 
(usuarioCreador, nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado, estado, prioridad, motivoCierre)
VALUES
('usuario', 'Carlos Pérez', 'carlos@instituto.cl', 'hardware', 'El computador no enciende', 'alto', 'alta', 5, 'pendiente', 'Alta', NULL),
('usuario', 'María López', 'maria@instituto.cl', 'software', 'Error al abrir Word', 'medio', 'media', 2, 'en proceso', 'Media', NULL),
('usuario', 'Ana Torres', 'ana@instituto.cl', 'red', 'Sin conexión a internet en sala 203', 'alto', 'alta', 6, 'pendiente', 'Crítica', NULL),
('usuario', 'Pedro Gómez', 'pedro@instituto.cl', 'cuenta', 'No puede ingresar al correo institucional', 'medio', 'alta', 3, 'pendiente', 'Alta', NULL),
('usuario', 'Luis Rojas', 'luis@instituto.cl', 'otro', 'Solicitud de revisión general', 'bajo', 'baja', 1, 'resuelto', 'Baja', NULL);

/* =========================================================
   CONSULTAS
   ========================================================= */

SHOW TABLES;

SELECT * FROM usuarios;

SELECT * FROM tickets;