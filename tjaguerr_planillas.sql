-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 23-09-2022 a las 14:50:50
-- Versión del servidor: 5.7.39-log-cll-lve
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tjaguerr_planillas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadistica`
--

CREATE TABLE `estadistica` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `exp` varchar(100) NOT NULL,
  `actor` varchar(100) NOT NULL,
  `fecha` int(11) NOT NULL,
  `salario` varchar(50) NOT NULL,
  `sala` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nick` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `sala` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nick`, `password`, `nombre`, `estado`, `sala`) VALUES
(2, 'gizelaLuna', 'gize123', 'DRA. GIZELA MARGARITA LUNA ANZALDÚA', 'ONLINE', 'SALA REGIONAL CHILPANCINGO'),
(4, 'Mgda.Arce', 'Martha0720', 'DRA. MARTHA ELENA ARCE GARCÍA', '', 'SALA SUPERIOR'),
(5, 'elvira123', '1234', 'MTRA. ELVIRA GARCÍA ESCOBAR', 'ONLINE', 'SALA REGIONAL CHILPANCINGO'),
(6, 'Mgda.Flores', 'paches123', 'MTRA. FRANCISCA FLORES BÁEZ', '', ''),
(7, 'Mgda.Lopez', 'Guille73', 'MTRA. GUILLERMINA LÓPEZ BASILIO', 'ONLINE', ''),
(8, 'Mgdo.Navarrete', 'JUSTICIA23', 'LIC. RAMÓN NAVARRETE MAGDALENO', '', ''),
(9, 'Mgdo.Arellano', 'VICKNOFalla', 'LIC. VICTOR ARELLANO APARICIO', '', ''),
(10, 'Mgda.Leon', 'Iguala-2022', 'LIC. PATRICIA LEÓN MANZO', 'ONLINE', ''),
(11, 'Mgdo.Pastor', 'PastorSRO22', 'LIC. ROBERTO TOMÁS PASTOR REYNOSO', 'ONLINE', ''),
(12, 'Mgdo.Murguia', 'Carpi@115', 'LIC. IGNACIO JAVIER MURGUÍA GUTIÉRREZ', '', ''),
(13, 'Mgdo.Aleman', 'Zihuatanejo0822', 'LIC. JORGE ALBERTO ALEMÁN APONTE', '', ''),
(14, 'Mgdo.Camacho', 'Petaquillas28', 'LIC. LUIS CAMACHO MANCILLA', '', ''),
(15, 'Mgda.Luz', 'ERB1956', 'DRA. EVA LUZ RAMÍREZ BAÑOS', '', 'SALA REGIONAL CHILPANCINGO'),
(16, 'Mgdo.Piedra', 'cruzasi1', 'DR. HECTOR FLORES PIEDRA', '', 'SALA SUPERIOR'),
(17, 'Mgda.Godinez', 'OGV22', 'MTRA. OLIMPIA MARÍA AZUCENA GODÍNEZ VIVEROS', '', ''),
(18, 'Lic.Salgado', 'salgado123', 'Lic. Dionisio Salgado Álvarez', 'OFFLINE', ''),
(19, 'Lic.Vivar', 'vivar456', 'Lic. Jesuita Vivar Sevilla', '', ''),
(20, 'Lic.Tomatzin', 'tomatzin789', 'Lic. Magdalena Tomatzin Valle', 'ONLINE', ''),
(21, 'Lic.Morales', 'morales100', 'Lic. Alfredo Morales Miranda', '', ''),
(22, 'Lic.Bernabe', 'bernabe110', 'Lic. María Natividad Bernabe Escobar', '', ''),
(23, 'Lic.Camacho', 'camacho120', 'Lic. María Elena Camacho Parra', '', ''),
(24, 'Lic.Ibarra', 'ibarra130', 'Lic. Teresita de Jesús Ibarra Chavaje', '', ''),
(25, 'Lic.Cruz', 'cruz140', 'Lic. Román Cruz Estrada', '', ''),
(26, 'Lic.Cabrera', 'cabrera150', 'Lic. Angelita Cabrera Rojas', 'ONLINE', ''),
(27, 'Lic.Lozano', 'lozano160', 'Lic. Tania Lozano Herrera', 'ONLINE', ''),
(28, 'Lic.Teran', 'teran170', 'Lic. Jeaneth Terán Oliveros', '', ''),
(29, 'Lic.Aguilar', 'aguilar180', 'Lic. Celia Aguilar García', 'ONLINE', ''),
(30, 'Lic.Perez', 'perez190', 'Lic. Leticia Pérez Mondragón', '', ''),
(31, 'Lic.Adame', 'adame200', 'Lic. Bertha Adame Cabrera', '', ''),
(32, 'Lic.Quiroz', 'quiroz210', 'Lic. Mario Alberto Quiroz Bello', 'ONLINE', ''),
(33, 'Lic.Gama', 'gama220', 'Lic. Bertha Gama Sánchez', 'ONLINE', ''),
(34, 'Lic.Nava', 'nava741', 'Lic. María Luisa Nava Barrios', '', 'SALA REGIONAL CHILPANCINGO'),
(36, 'Lic.Serrano', 'serrano0566', 'LIC. GERMAN SERRANO MEDRANO', '', 'SALA SUPERIOR'),
(37, 'Lic.Jenny', 'jenny864', 'Lic. JENNIFER SÁNCHEZ VARGAS', 'ONLINE', 'SALA REGIONAL CHILPANCINGO '),
(38, 'Mtro.Ramirez', 'ramirez013', 'MTRO. IRVING RAMIREZ FLORES', '', 'SALA REGIONAL CHILPANCINGO '),
(39, 'Mtra.Yerania', 'yerania749', 'MTRA. MAYBELLINE YERANIA JIMENEZ MONTIEL', 'OFFLINE', 'SALA REGIONAL CHILPANCINGO ');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estadistica`
--
ALTER TABLE `estadistica`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estadistica`
--
ALTER TABLE `estadistica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
