-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 25/03/2020 às 00:07
-- Versão do servidor: 10.3.22-MariaDB
-- Versão do PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `aplicand_dexcon`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresas`
--

CREATE TABLE `empresas` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(30) COLLATE utf32_spanish_ci NOT NULL,
  `Direccion` varchar(200) COLLATE utf32_spanish_ci NOT NULL,
  `Nit` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `DV` int(11) NOT NULL,
  `Telefono` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `IdDexcon` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `EmpleadosDirectos` int(11) NOT NULL,
  `EmpleadosIndirectos` int(11) NOT NULL,
  `Tipo` varchar(15) COLLATE utf32_spanish_ci NOT NULL,
  `MacroprocesoEvaluacion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `empresas`
--

INSERT INTO `empresas` (`Id`, `Nombre`, `Direccion`, `Nit`, `DV`, `Telefono`, `IdDexcon`, `EmpleadosDirectos`, `EmpleadosIndirectos`, `Tipo`, `MacroprocesoEvaluacion`) VALUES
(1, 'OPC consulting sas', 'carrera 101 N 82 49', '900630067', 1, '6008435', '78902', 2, 15, 'privada', 0),
(2, 'Ersnt & Young', 'Calle 95 edificio pijao', '900630067', 0, '6008435', '74323', 300, 420, 'privada', 0),
(3, 'Prueba Daniel', 'prueba', '123123123', 0, '1231231', '11233', 2, 1, 'privada', 0),
(4, 'NETCO LTDA.', 'CRA 7 27-25', '900054789', 3, '2843900', '95742', 3, 10, 'privada', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa_cantidadprocesos`
--

CREATE TABLE `empresa_cantidadprocesos` (
  `IdEmpresa` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `empresa_cantidadprocesos`
--

INSERT INTO `empresa_cantidadprocesos` (`IdEmpresa`, `IdTipo`, `Cantidad`) VALUES
(1, 1, 0),
(1, 2, 0),
(1, 3, 0),
(1, 4, 0),
(1, 5, 0),
(1, 6, 0),
(1, 7, 0),
(1, 8, 0),
(1, 9, 0),
(1, 10, 0),
(1, 11, 0),
(1, 12, 0),
(2, 1, 0),
(2, 2, 0),
(2, 3, 0),
(2, 4, 0),
(2, 5, 0),
(2, 6, 0),
(2, 7, 0),
(2, 8, 0),
(2, 9, 0),
(2, 10, 0),
(2, 11, 0),
(2, 12, 0),
(3, 1, 0),
(3, 2, 0),
(3, 3, 0),
(3, 4, 0),
(3, 5, 0),
(3, 6, 0),
(3, 7, 0),
(3, 8, 0),
(3, 9, 0),
(3, 10, 0),
(3, 11, 0),
(3, 12, 0),
(4, 1, 1),
(4, 2, 2),
(4, 3, 0),
(4, 4, 2),
(4, 5, 2),
(4, 6, 0),
(4, 7, 1),
(4, 8, 1),
(4, 9, 0),
(4, 10, 0),
(4, 11, 0),
(4, 12, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa_contactos`
--

CREATE TABLE `empresa_contactos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `Telefono` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `Movil` bigint(20) NOT NULL,
  `Correo` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Cargo` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `IdEmpresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `empresa_contactos`
--

INSERT INTO `empresa_contactos` (`Id`, `Nombre`, `Telefono`, `Movil`, `Correo`, `Cargo`, `IdEmpresa`) VALUES
(1, 'Manuel Sanchez Amador', '6008435', 3203341956, 'info@dexcon.co', 'Coordinador Administrativo', 1),
(2, 'jeny palacios', '6008435', 3143754998, 'jenny.palacios@ey.com.co', 'Gerente ACR', 2),
(3, 'prueba', '123123123', 1231231231, 'p@d.d', 'prueba', 3),
(4, 'MARIA ALEJANDRA ROJAS', '2843900', 3183610619, 'mrojas@netco.la', 'DIRECTORA ADMINISTRATIVA Y FINANCIERA', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa_contratos`
--

CREATE TABLE `empresa_contratos` (
  `Id` int(11) NOT NULL,
  `NoContrato` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `Detalle` varchar(300) COLLATE utf32_spanish_ci NOT NULL,
  `NombreResponsable` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `CargoResponsable` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `CedulaResponsable` bigint(20) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFinal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `empresa_contratos`
--

INSERT INTO `empresa_contratos` (`Id`, `NoContrato`, `Detalle`, `NombreResponsable`, `CargoResponsable`, `CedulaResponsable`, `FechaInicio`, `FechaFinal`) VALUES
(1, '1314072', 'Planeación estratégica', 'Marla Margarita', 'Gerente', 218723871, '2017-01-26', '2018-01-26'),
(2, 'DQ2341', 'Implementación modelo estratégico', 'Jenny Palacios', 'Gerente ARC', 91475791, '2017-03-03', '2017-04-18'),
(3, '12', 'rueba', 'prueba', 'prueba1', 123123, '2017-03-05', '2018-03-05'),
(4, '09834', 'contratacion estatal\nasesorias juridicas\nconsultorias', 'Camilo Castillo', 'Director Comercial', 80095174, '2017-07-01', '2018-07-31'),
(5, '897230', 'PLANEACION ESTRATEGICA', 'MARIA ALEJANDRA ROJAS', 'DIRECTORA ADMINISTRATIVA Y FINANCIERA', 52908234, '2017-07-07', '2018-07-07'),
(6, '907654', 'SEGURIDAD Y SALUD EN EL TRABAJO', 'MARIA ALEJANDRA ROJAS', 'DIRECTORA ADMINISTRATIVA Y FINANCIERA', 52908234, '2017-07-07', '2018-07-07'),
(7, '100346', 'SEGURIDAD Y SALUD EN EL TRABAJO', 'MARIA ALEJANDRA ROJAS', 'DIRECTORA ADMINISTRATIVA', 52987345, '2017-07-07', '2018-07-07');

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa_procesos`
--

CREATE TABLE `empresa_procesos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `IdEmpresa` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `IdPadre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `empresa_procesos`
--

INSERT INTO `empresa_procesos` (`Id`, `Nombre`, `IdEmpresa`, `IdTipo`, `IdPadre`) VALUES
(1, 'GERENCIA', 4, 1, 0),
(2, 'PLANEACION Y MEJORA', 4, 2, 1),
(3, 'AUDITORIA', 4, 2, 1),
(4, 'COMERCIAL', 4, 4, 0),
(5, 'VENTAS', 4, 5, 4),
(6, 'OPERACIONES', 4, 4, 0),
(7, 'PLANEACION DEL SERVICIO', 4, 5, 6),
(8, 'COMPRAS', 4, 7, 0),
(9, 'REGISTRO DE PROVEEDORES', 4, 8, 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa_procesostipo`
--

CREATE TABLE `empresa_procesostipo` (
  `Id` int(11) NOT NULL,
  `Tipo` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Alias` varchar(40) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `empresa_procesostipo`
--

INSERT INTO `empresa_procesostipo` (`Id`, `Tipo`, `Alias`) VALUES
(1, 'Macroproceso Estrategico', 'MEs'),
(2, 'Proceso Estrategico', 'PEs'),
(3, 'Subproceso Estrategico', 'SEs'),
(4, 'Macroproceso Misional', 'MM'),
(5, 'Proceso Misional', 'PM'),
(6, 'Subproceso Misional', 'SM'),
(7, 'Macroproceso Apoyo', 'MA'),
(8, 'Proceso Apoyo', 'PA'),
(9, 'Subproceso Apoyo', 'SA'),
(10, 'Macroproceso Evaluacion', 'MEv'),
(11, 'Proceso Evaluacion', 'PEv'),
(12, 'Subproceso Evaluacion', 'SEv');

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa_zonas`
--

CREATE TABLE `empresa_zonas` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(30) COLLATE utf32_spanish_ci NOT NULL,
  `IdEmpresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `empresa_zonas`
--

INSERT INTO `empresa_zonas` (`Id`, `Nombre`, `IdEmpresa`) VALUES
(1, 'RECEPCION', 4),
(2, 'AREA ADMINISTRATIVA', 4),
(3, 'LIDERES DE PROCESO', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_actividades`
--

CREATE TABLE `estrategia_actividades` (
  `Id` int(11) NOT NULL,
  `IdIniciativa` int(11) NOT NULL,
  `Actividad` varchar(100) NOT NULL,
  `Responsable` varchar(50) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFinal` date NOT NULL,
  `Recursos` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_actividades`
--

INSERT INTO `estrategia_actividades` (`Id`, `IdIniciativa`, `Actividad`, `Responsable`, `FechaInicio`, `FechaFinal`, `Recursos`) VALUES
(1, 1, 'comprar boleto', 'auxiliar administrativo', '2017-08-30', '2017-08-30', 'dinero'),
(2, 2, 'Solicitar cotizaciones', 'director de mantenimiento', '2017-03-12', '2017-09-18', 'Listado proveedores'),
(3, 3, 'Identificar activos fijos', 'director administrativo', '2017-08-31', '2017-08-31', 'listado y fichas tecnicas de equipos');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_analisisvulnerabilidad`
--

CREATE TABLE `estrategia_analisisvulnerabilidad` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Puntal` text NOT NULL,
  `Amenaza` text NOT NULL,
  `Consecuencia` text NOT NULL,
  `Impacto` int(11) NOT NULL,
  `Probabilidad` float NOT NULL,
  `Reaccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_conductoresvalor`
--

CREATE TABLE `estrategia_conductoresvalor` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `ConductorValor` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_conductoresvalor`
--

INSERT INTO `estrategia_conductoresvalor` (`Id`, `IdProyecto`, `ConductorValor`) VALUES
(1, 6, 'INGRESOS'),
(2, 1, 'Conductor 1'),
(3, 1, 'Conductor 2'),
(4, 6, 'INCREMENTO'),
(5, 6, 'EXPECTATIVAS'),
(6, 6, 'OPTIMIZACIÓN DE ACTIVOS');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_diagnostico`
--

CREATE TABLE `estrategia_diagnostico` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Descripcion` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `FortalezaNivel` int(11) NOT NULL,
  `FortalezaImpacto` int(11) NOT NULL,
  `DebilidadNivel` int(11) NOT NULL,
  `DebilidadImpacto` int(11) NOT NULL,
  `ItemPadre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `estrategia_diagnostico`
--

INSERT INTO `estrategia_diagnostico` (`Id`, `IdProyecto`, `Descripcion`, `FortalezaNivel`, `FortalezaImpacto`, `DebilidadNivel`, `DebilidadImpacto`, `ItemPadre`) VALUES
(75, 6, 'AMPLIO CONOCIMIENTO DEL NEGOCIO POR PARTE DE LA ALTA GERENCIA', 3, 3, 0, 0, 1),
(76, 6, 'PERSONAL POCO CALIFICADO', 0, 0, 1, 3, 1),
(77, 6, 'POLITICA DE PRECIOS APROPIADA', 3, 3, 0, 0, 2),
(78, 6, 'UBICACION GEOGRAFICA', 0, 0, 1, 1, 2),
(79, 6, 'INDICADORES FINANCIEROS POSITIVOS', 3, 3, 0, 0, 3),
(80, 6, 'FLUJO DE LIQUIDEZ', 0, 0, 2, 3, 3),
(81, 6, 'EQUIPO APROPIADOS', 3, 3, 0, 0, 4),
(82, 6, 'SEGURIDAD INFORMATICA DEBIL', 0, 0, 1, 3, 4),
(83, 6, 'PROGRAMA DE CAPACITACION', 3, 3, 0, 0, 5),
(84, 6, 'FALTA DE COMPROMISO', 0, 0, 1, 3, 5),
(85, 6, 'REFORMA TRIBUTARIA', 0, 0, 3, 3, 6),
(86, 6, 'FACILIDADES DE ACCESO CREDITICIO', 3, 3, 0, 0, 6),
(87, 6, 'FLUCTUACION DEL DOLAR', 0, 0, 3, 3, 6),
(88, 6, 'POLITICA DE DATOS DE SEGURIDAD DE LA INFORMACION', 0, 0, 3, 3, 7),
(89, 6, 'TICS', 3, 3, 0, 0, 7),
(90, 6, 'NIVEL EDUCATIVO DEL PERSONAL', 3, 3, 0, 0, 8),
(91, 6, 'ACUERDOS DE PAZ', 0, 0, 2, 3, 8),
(92, 6, 'NUEVAS TECNOLOGIAS', 3, 3, 0, 0, 9),
(93, 6, 'PRECIO DE TECNOLOGIA EN EL MERCADO', 0, 0, 3, 3, 9),
(94, 6, 'CAPACIDAD DE ATENCION FUERA DE LA CIUDAD', 3, 3, 0, 0, 10);

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_dofaitems`
--

CREATE TABLE `estrategia_dofaitems` (
  `Id` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `IdItem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_dofaresumido`
--

CREATE TABLE `estrategia_dofaresumido` (
  `IdProyecto` int(11) NOT NULL,
  `Resumen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_dofaresumido`
--

INSERT INTO `estrategia_dofaresumido` (`IdProyecto`, `Resumen`) VALUES
(3, 'Los datos arrojados, no permiten concluir. Se debe volver a realizar el análisis.'),
(6, 'SE GENERA ANALISIS Y SE LE PROPORCIONA AL CLIENTE');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_empresa`
--

CREATE TABLE `estrategia_empresa` (
  `IdProyecto` int(11) NOT NULL,
  `AnoInicial` int(11) NOT NULL,
  `AnoFinal` int(11) NOT NULL,
  `Estrategas` varchar(300) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `estrategia_empresa`
--

INSERT INTO `estrategia_empresa` (`IdProyecto`, `AnoInicial`, `AnoFinal`, `Estrategas`) VALUES
(1, 2017, 2020, 'Sandra Martinez\nMarla Margarita'),
(3, 2017, 2020, 'Manuel sánchez, Jenny Palacios'),
(6, 2017, 2020, 'EDGAR MARIN GERENTE\nMARIA ALEJANDRA ROJAS DIRECTORA ADTIVA');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_estrategia`
--

CREATE TABLE `estrategia_estrategia` (
  `Id` int(11) NOT NULL,
  `IdPalanca` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `Estrategia` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_estrategia`
--

INSERT INTO `estrategia_estrategia` (`Id`, `IdPalanca`, `IdTipo`, `Estrategia`) VALUES
(1, 1, 1, 'Estrategia 1'),
(2, 3, 2, 'Estrategia 1'),
(3, 2, 5, 'Vender en mercados emergentes'),
(4, 4, 8, 'DE CLIENTE'),
(5, 6, 1, 'Afiliación CCB  - de negocio'),
(6, 7, 4, 'Implementar sistema de gestión de activos'),
(7, 7, 4, 'Dar de baja activos obsoletos'),
(8, 7, 4, 'Realizar plan de mantenimiento');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_fuerzasporter`
--

CREATE TABLE `estrategia_fuerzasporter` (
  `IdProyecto` int(11) NOT NULL,
  `F1` text NOT NULL,
  `F2` text NOT NULL,
  `F3` text NOT NULL,
  `F4` text NOT NULL,
  `F5` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_fuerzasporter`
--

INSERT INTO `estrategia_fuerzasporter` (`IdProyecto`, `F1`, `F2`, `F3`, `F4`, `F5`) VALUES
(3, 'La empresa es única en su segmento, no tiene competidores actuales.', 'No cuenta con competidores, posee el 100% de la cuota de mercados', 'Los proveedores se adaptan a las exigencias de la organización, permitiendo minimizar los márgenes financieros.', 'Los clientes se acogen a la política financiera de la firma.', 'No posee amanezas actuales en cuanto a productos sustitutos.'),
(6, 'ALTAS BARRERAS DE ENTRADA AL NEGOCIO', 'PRECIOS DENTRO DEL SECTOR', 'POSIBILIDADES DE NEGOCIACION CON PROVEEDORES', 'CONDICIONAMIENTO DE PRECIOS POR PARTE DEL SECTOR PRIVADO', 'DIFICULTAD PARA EL INGRESO DE PRODUCTOS SUSTITUTOS DEBIDO A VENTAJAS COMPETITIVAS');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_gruposreferencia`
--

CREATE TABLE `estrategia_gruposreferencia` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_gruposreferencia`
--

INSERT INTO `estrategia_gruposreferencia` (`Id`, `IdProyecto`, `Nombre`) VALUES
(15, 3, 'Empleados'),
(16, 3, 'Estado'),
(17, 3, 'Proveedores'),
(20, 4, 'empleados'),
(21, 4, 'clientes'),
(22, 4, 'familia'),
(23, 1, '123'),
(24, 1, 'qwe'),
(45, 6, 'EMPLEADOS'),
(46, 6, 'CONTRATISTAS'),
(47, 6, 'PROVEEDORES'),
(48, 6, 'CLIENTES');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_iniciativa`
--

CREATE TABLE `estrategia_iniciativa` (
  `Id` int(11) NOT NULL,
  `IdEstrategia` int(11) NOT NULL,
  `Iniciativa` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_iniciativa`
--

INSERT INTO `estrategia_iniciativa` (`Id`, `IdEstrategia`, `Iniciativa`) VALUES
(1, 3, 'planear y programar viaje a perú para conocer mercado'),
(2, 6, 'Contratar empresa consultora'),
(3, 7, 'Listar activos');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_itemsdiagnostico`
--

CREATE TABLE `estrategia_itemsdiagnostico` (
  `Id` int(11) NOT NULL,
  `Item` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Tipo` int(11) NOT NULL,
  `Alias` varchar(20) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `estrategia_itemsdiagnostico`
--

INSERT INTO `estrategia_itemsdiagnostico` (`Id`, `Item`, `Tipo`, `Alias`) VALUES
(1, 'Capacidad Directiva', 1, 'cd'),
(2, 'Capacidad Competitiva', 1, 'cc'),
(3, 'Capacidad Financiera', 1, 'cf'),
(4, 'Capacidad Tecnologica', 1, 'ct'),
(5, 'Capacidad del Talento Humano', 1, 'ch'),
(6, 'Factores Economicos', 2, 'fe'),
(7, 'Factores Politicos', 2, 'fp'),
(8, 'Factores Sociales', 2, 'fs'),
(9, 'Factores Tecnologicos', 2, 'ft'),
(10, 'Factores Geograficos', 2, 'fg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_kpis`
--

CREATE TABLE `estrategia_kpis` (
  `Id` int(11) NOT NULL,
  `IdActividad` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Frecuencia` int(11) NOT NULL,
  `Valor1` varchar(100) NOT NULL,
  `Valor2` varchar(100) NOT NULL,
  `Formula` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_kpis`
--

INSERT INTO `estrategia_kpis` (`Id`, `IdActividad`, `Nombre`, `Frecuencia`, `Valor1`, `Valor2`, `Formula`) VALUES
(1, 2, 'Facturación', 6, 'Total de costos de venta en el periodo', 'Total facturado en el periodo', '$val1/$val2'),
(2, 2, 'Facturación', 6, 'Total de costos de venta en el periodo', 'Total facturado en el periodo', '$val1/$val2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_matrizaxiologica`
--

CREATE TABLE `estrategia_matrizaxiologica` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Posicion` varchar(30) NOT NULL,
  `Value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_matrizaxiologica`
--

INSERT INTO `estrategia_matrizaxiologica` (`Id`, `IdProyecto`, `Posicion`, `Value`) VALUES
(5, 3, '10', 0),
(6, 3, '11', 0),
(7, 3, '12', 0),
(8, 3, '13', 0),
(9, 3, '20', 0),
(10, 3, '21', 0),
(11, 3, '22', 0),
(12, 3, '23', 0),
(13, 3, '00', 0),
(14, 3, '01', 0),
(15, 3, '02', 0),
(16, 3, '03', 0),
(21, 4, '10', 1),
(22, 4, '11', 0),
(23, 4, '12', 1),
(24, 4, '20', 0),
(25, 4, '21', 1),
(26, 4, '22', 1),
(27, 4, '00', 1),
(28, 4, '01', 1),
(29, 4, '02', 1),
(30, 1, '10', 0),
(31, 1, '11', 0),
(32, 1, '00', 0),
(33, 1, '01', 0),
(94, 6, '10', 1),
(95, 6, '11', 1),
(96, 6, '12', 1),
(97, 6, '13', 1),
(98, 6, '20', 1),
(99, 6, '21', 1),
(100, 6, '22', 1),
(101, 6, '23', 1),
(102, 6, '00', 1),
(103, 6, '01', 1),
(104, 6, '02', 1),
(105, 6, '03', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_matrizbcg`
--

CREATE TABLE `estrategia_matrizbcg` (
  `IdProyecto` int(11) NOT NULL,
  `Estrellas` text NOT NULL,
  `Interrogantes` text NOT NULL,
  `Vaca` text NOT NULL,
  `Perro` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_matrizbcg`
--

INSERT INTO `estrategia_matrizbcg` (`IdProyecto`, `Estrellas`, `Interrogantes`, `Vaca`, `Perro`) VALUES
(4, 'web', 'pse', 'simi', 'mcw'),
(6, 'DESARROLLO DE PORTALES WEB', 'DOMINIO Y HOSTING', 'VENTA DE LICENCIAS', 'TOKEN');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_matrizdofa`
--

CREATE TABLE `estrategia_matrizdofa` (
  `IdPos1` int(50) NOT NULL,
  `IdPos2` int(50) NOT NULL,
  `Value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_misionvision`
--

CREATE TABLE `estrategia_misionvision` (
  `IdProyecto` int(11) NOT NULL,
  `Mision` text COLLATE utf32_spanish_ci NOT NULL,
  `Vision` text COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `estrategia_misionvision`
--

INSERT INTO `estrategia_misionvision` (`IdProyecto`, `Mision`, `Vision`) VALUES
(0, 'servir con excelencia', 'ser la mejor alternativa'),
(1, 'Hacer felices a nuestros clientes.', 'Ser los primeros de los mejores.'),
(3, 'Ser la primera opción para los clientes', 'Hacer felices a los clientes'),
(4, 'servir con excelencia', 'ser la mejor alternativa'),
(6, 'HACER FELICES A NUESTROS CLIENTES', 'SER LA MEJOR EMPRESA EN ATENCION AL CLIENTE');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_palancas`
--

CREATE TABLE `estrategia_palancas` (
  `Id` int(11) NOT NULL,
  `IdConductor` int(11) NOT NULL,
  `Palanca` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_palancas`
--

INSERT INTO `estrategia_palancas` (`Id`, `IdConductor`, `Palanca`) VALUES
(1, 2, 'Palanca 1'),
(2, 1, 'REDISEÑO DE LA ESTRATEGIA DE PRECIOS'),
(3, 3, 'Palanca 2'),
(4, 4, 'VOLUMEN'),
(5, 5, 'FORTALEZAS DE LA EMPRESA'),
(6, 5, 'incorporar nuevos clientes'),
(7, 6, 'Realizar diagnóstico de mantenimiento');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_principioscorporativos`
--

CREATE TABLE `estrategia_principioscorporativos` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(40) NOT NULL,
  `Nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_principioscorporativos`
--

INSERT INTO `estrategia_principioscorporativos` (`Id`, `IdProyecto`, `Nombre`) VALUES
(5, 3, 'Transparencia'),
(6, 3, 'Integridad'),
(7, 3, 'Trabajo en equipo'),
(10, 4, 'honestidad'),
(11, 4, 'respeto'),
(12, 4, 'responsabilidad'),
(13, 1, '123'),
(14, 1, 'qwe'),
(30, 6, 'RESPONSABILIDAD'),
(31, 6, 'LEALTAD'),
(32, 6, 'BUENA FE');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_tipoanalisisdofa`
--

CREATE TABLE `estrategia_tipoanalisisdofa` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(10) NOT NULL,
  `Alias` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_tipoanalisisdofa`
--

INSERT INTO `estrategia_tipoanalisisdofa` (`Id`, `Nombre`, `Alias`) VALUES
(1, 'FO', 'Estrategias FO (Ataque)'),
(2, 'FA', 'Estrategias FA (Defensivas)'),
(3, 'DO', 'Estrategias DO (Refuerzo o Mejora)'),
(4, 'DA', 'Estrategias DA (Mejora o Retirada)');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_tipodiagnostico`
--

CREATE TABLE `estrategia_tipodiagnostico` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Alias` varchar(10) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `estrategia_tipodiagnostico`
--

INSERT INTO `estrategia_tipodiagnostico` (`Id`, `Nombre`, `Alias`) VALUES
(1, 'Diagnostico Interno (PCI)', 'pci'),
(2, 'Diagnostico Externo (PCE)', 'pce');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estrategia_tipoestrategia`
--

CREATE TABLE `estrategia_tipoestrategia` (
  `Id` int(11) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Color` varchar(20) NOT NULL,
  `Alias` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `estrategia_tipoestrategia`
--

INSERT INTO `estrategia_tipoestrategia` (`Id`, `Tipo`, `Color`, `Alias`) VALUES
(1, 'negocio', 'green darken-1', 'Estrategia de Negocio'),
(2, 'personas', 'purple darken-2', 'Estrategia de Personas'),
(3, 'financiera', 'yellow darken-1', 'Estrategia Financiera'),
(4, 'procesos', 'lime accent-3', 'Estrategia de Procesos'),
(5, 'mercadotecnia', 'grey lighten-1', 'Estrategia de Mercadotecnia'),
(6, 'ti', 'red darken-3', 'Estrategias de T.I.'),
(7, 'producto', 'indigo darken-3', 'Estrategia de Producto'),
(8, 'clientes', 'blue lighten-3', 'Estrategia de Clientes');

-- --------------------------------------------------------

--
-- Estrutura para tabela `gtc_etapas`
--

CREATE TABLE `gtc_etapas` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `gtc_etapas`
--

INSERT INTO `gtc_etapas` (`Id`, `IdProyecto`) VALUES
(1, 8),
(3, 7),
(4, 8),
(5, 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `gtc_intervencion`
--

CREATE TABLE `gtc_intervencion` (
  `Id` int(11) NOT NULL,
  `Eliminacion` varchar(5) COLLATE utf32_spanish_ci NOT NULL,
  `Sustitucion` varchar(5) COLLATE utf32_spanish_ci NOT NULL,
  `Ingenieria` varchar(5) COLLATE utf32_spanish_ci NOT NULL,
  `Administrativo` varchar(300) COLLATE utf32_spanish_ci NOT NULL,
  `Epp` varchar(5) COLLATE utf32_spanish_ci NOT NULL,
  `NombreEpp` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `IdPeligroEtapa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `gtc_intervencion`
--

INSERT INTO `gtc_intervencion` (`Id`, `Eliminacion`, `Sustitucion`, `Ingenieria`, `Administrativo`, `Epp`, `NombreEpp`, `IdPeligroEtapa`) VALUES
(1, '', '', '', '', '', '', 1),
(2, '', '', '', '', '', '', 2),
(3, 'si', 'no', 'si', 'asdasdasdasdasd', 'no', '', 3),
(4, '', '', '', '', '', '', 4),
(5, '', '', '', '', '', '', 5),
(6, '', '', '', '', '', '', 6),
(7, '', '', '', '', '', '', 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `gtc_peligrosporetapa`
--

CREATE TABLE `gtc_peligrosporetapa` (
  `Id` int(11) NOT NULL,
  `IdEtapa` int(11) NOT NULL,
  `Actividad` text COLLATE utf32_spanish_ci NOT NULL,
  `Rutinario` varchar(10) COLLATE utf32_spanish_ci NOT NULL,
  `IdPeligro` int(11) NOT NULL,
  `Deficiencia` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `Exposicion` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `Fuente` varchar(5) COLLATE utf32_spanish_ci NOT NULL,
  `Medio` varchar(5) COLLATE utf32_spanish_ci NOT NULL,
  `Individuo` varchar(5) COLLATE utf32_spanish_ci NOT NULL,
  `NombreFuente` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `NombreMedio` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `NombreIndividuo` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `NoExpuestos` int(11) NOT NULL,
  `Foto` text COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `gtc_peligrosporetapa`
--

INSERT INTO `gtc_peligrosporetapa` (`Id`, `IdEtapa`, `Actividad`, `Rutinario`, `IdPeligro`, `Deficiencia`, `Exposicion`, `Fuente`, `Medio`, `Individuo`, `NombreFuente`, `NombreMedio`, `NombreIndividuo`, `NoExpuestos`, `Foto`) VALUES
(1, 1, 'POSICION FIJA FRENTE AL ORDENADOR', 'si', 1, 'Alto', 'Continua', 'no', 'no', 'no', '', '', '', 5, 'Sistema-de-vigilancia-inteligente.jpg'),
(2, 1, 'ASEO Y LIMPIEZA DE PISOS', 'si', 2, 'Alto', 'Continua', 'no', 'no', 'no', '', '', '', 1, ''),
(3, 3, 'prueba prueba', 'si', 2, 'Alto', 'Frecuente', 'no', 'no', 'no', '', '', '', 10, ''),
(4, 3, 'prueba prueba2', 'si', 2, 'Muy Alto', 'Ocasional', 'no', 'no', 'no', '', '', '', 20, ''),
(5, 4, 'DIGITACIÓN CONSTANTE', 'si', 1, 'Medio', 'Frecuente', 'no', 'si', 'si', '', 'Almohadilla para Mouse', 'Pausas activas', 2, ''),
(6, 5, 'LIMPIEZA DE PISOS', 'si', 2, 'Medio', 'Frecuente', 'no', 'si', 'no', '', 'Avisos de prevención', '', 4, ''),
(7, 5, 'LIMPIEZA DE PISOS', 'si', 2, 'Medio', 'Continua', 'no', 'si', 'no', '', 'Avisos de prevención', '', 1, '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `gtc_procesosporetapa`
--

CREATE TABLE `gtc_procesosporetapa` (
  `Id` int(11) NOT NULL,
  `IdEtapa` int(11) NOT NULL,
  `IdProceso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `gtc_procesosporetapa`
--

INSERT INTO `gtc_procesosporetapa` (`Id`, `IdEtapa`, `IdProceso`) VALUES
(15, 3, 4),
(16, 3, 5),
(17, 3, 0),
(24, 1, 1),
(25, 1, 2),
(26, 1, 3),
(27, 4, 6),
(28, 4, 7),
(29, 4, 0),
(30, 5, 8),
(31, 5, 9),
(32, 5, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `gtc_zonasporetapa`
--

CREATE TABLE `gtc_zonasporetapa` (
  `IdEtapa` int(11) NOT NULL,
  `IdZona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `gtc_zonasporetapa`
--

INSERT INTO `gtc_zonasporetapa` (`IdEtapa`, `IdZona`) VALUES
(1, 3),
(2, 3),
(3, 1),
(4, 3),
(5, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `normas`
--

CREATE TABLE `normas` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `Alias` varchar(20) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `normas`
--

INSERT INTO `normas` (`Id`, `Nombre`, `Alias`) VALUES
(1, 'GTC', 'gtc'),
(2, 'Estrategia', 'estrategia'),
(3, 'Resumen GTC', 'gtcresumen');

-- --------------------------------------------------------

--
-- Estrutura para tabela `peligros`
--

CREATE TABLE `peligros` (
  `Id` int(11) NOT NULL,
  `Descripcion` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `Clasificacion` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `Consecuencia` int(11) NOT NULL,
  `RequisitoLegal` varchar(5) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `peligros`
--

INSERT INTO `peligros` (`Id`, `Descripcion`, `Clasificacion`, `Consecuencia`, `RequisitoLegal`) VALUES
(1, 'RIESGO BIOMECANICO', 'MECANICO', 2, 'si'),
(2, 'RIESGO LOCATIVO', 'DESLIZAMIENTOS', 1, 'si');

-- --------------------------------------------------------

--
-- Estrutura para tabela `peligros_efectos`
--

CREATE TABLE `peligros_efectos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `IdPeligro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `peligros_efectos`
--

INSERT INTO `peligros_efectos` (`Id`, `Nombre`, `IdPeligro`) VALUES
(1, 'SINDROME DEL TUNEL DEL CARPO', 1),
(2, 'DOLOR LUMBAR', 1),
(3, 'PROBLEMAS VISUALES', 1),
(4, 'FATIGA', 1),
(5, 'CAIDA A NIVEL', 2),
(6, 'LUXACION', 2),
(7, 'HERIDA LEVE', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `peligros_peorconsecuencia`
--

CREATE TABLE `peligros_peorconsecuencia` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(200) COLLATE utf32_spanish_ci NOT NULL,
  `IdPeligro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `peligros_peorconsecuencia`
--

INSERT INTO `peligros_peorconsecuencia` (`Id`, `Nombre`, `IdPeligro`) VALUES
(1, 'INCAPACIDAD LABORAL PERMANENTE', 1),
(2, 'MUERTE', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `profesionales`
--

CREATE TABLE `profesionales` (
  `Id` int(11) NOT NULL,
  `Nombres` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `Cedula` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `Direccion` varchar(200) COLLATE utf32_spanish_ci NOT NULL,
  `Telefono` varchar(50) COLLATE utf32_spanish_ci NOT NULL,
  `Movil` bigint(20) NOT NULL,
  `Correo` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Profesion` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Rut` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `Especialidades` varchar(300) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `profesionales`
--

INSERT INTO `profesionales` (`Id`, `Nombres`, `Cedula`, `Direccion`, `Telefono`, `Movil`, `Correo`, `Profesion`, `Rut`, `Especialidades`) VALUES
(1, 'Graciela Sánchez', '9147622', 'carrera 101 n 60 72', '6008435', 3203741168, 'profesional.sgsst@dexcon.co', 'Ingeniero industrial', '9147622-6', 'Seguridad y salud en el trabajo\nSistemas de Gestión\nPlaneación Estratégica'),
(2, 'MANUEL SANCHEZ', '1073505220', 'CRA 101 82-49', '7583795', 3165671793, 'gestion@dexcon.com.co', 'Diseñador Grafico', '1073505220-6', 'Planeacion Estrategica');

-- --------------------------------------------------------

--
-- Estrutura para tabela `profesionalporproyecto`
--

CREATE TABLE `profesionalporproyecto` (
  `IdProyecto` int(11) NOT NULL,
  `IdProfesional` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `profesionalporproyecto`
--

INSERT INTO `profesionalporproyecto` (`IdProyecto`, `IdProfesional`) VALUES
(2, 1),
(3, 1),
(4, 1),
(6, 2),
(7, 1),
(8, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `proyectos`
--

CREATE TABLE `proyectos` (
  `Id` int(11) NOT NULL,
  `IdEmpresa` int(11) NOT NULL,
  `IdNorma` int(11) NOT NULL,
  `IdContrato` int(11) NOT NULL,
  `IdProfesionalCreador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `proyectos`
--

INSERT INTO `proyectos` (`Id`, `IdEmpresa`, `IdNorma`, `IdContrato`, `IdProfesionalCreador`) VALUES
(1, 1, 2, 1, 1),
(3, 2, 2, 2, 1),
(4, 3, 2, 3, 1),
(5, 0, 2, 4, 1),
(6, 4, 2, 5, 1),
(7, 4, 1, 6, 1),
(8, 4, 1, 7, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `roles`
--

CREATE TABLE `roles` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `Alias` varchar(30) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `roles`
--

INSERT INTO `roles` (`Id`, `Nombre`, `Alias`) VALUES
(1, 'Administrador', 'adm'),
(2, 'Usuario', 'usr'),
(3, 'Consultor', 'cons');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Usuario` varchar(25) COLLATE utf32_spanish_ci NOT NULL,
  `Cedula` varchar(25) COLLATE utf32_spanish_ci NOT NULL,
  `Password` varchar(25) COLLATE utf32_spanish_ci NOT NULL,
  `IdRol` int(11) NOT NULL,
  `Color` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `Habilitar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Usuario`, `Cedula`, `Password`, `IdRol`, `Color`, `Habilitar`) VALUES
(1, 'Daniel Jimenez', '1018463827', '1', 1, 'red', 1),
(2, 'Nestor', '123456789', '1', 2, 'blue', 1),
(3, 'Manuel', '123456789', '1', 2, 'green', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios_proyectos`
--

CREATE TABLE `usuarios_proyectos` (
  `IdUsuario` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `usuarios_proyectos`
--

INSERT INTO `usuarios_proyectos` (`IdUsuario`, `IdProyecto`) VALUES
(1, 8);

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `empresa_cantidadprocesos`
--
ALTER TABLE `empresa_cantidadprocesos`
  ADD PRIMARY KEY (`IdEmpresa`,`IdTipo`);

--
-- Índices de tabela `empresa_contactos`
--
ALTER TABLE `empresa_contactos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `empresa_contratos`
--
ALTER TABLE `empresa_contratos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `empresa_procesos`
--
ALTER TABLE `empresa_procesos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `empresa_procesostipo`
--
ALTER TABLE `empresa_procesostipo`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `empresa_zonas`
--
ALTER TABLE `empresa_zonas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_actividades`
--
ALTER TABLE `estrategia_actividades`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_analisisvulnerabilidad`
--
ALTER TABLE `estrategia_analisisvulnerabilidad`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_conductoresvalor`
--
ALTER TABLE `estrategia_conductoresvalor`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_diagnostico`
--
ALTER TABLE `estrategia_diagnostico`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_dofaitems`
--
ALTER TABLE `estrategia_dofaitems`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_dofaresumido`
--
ALTER TABLE `estrategia_dofaresumido`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Índices de tabela `estrategia_empresa`
--
ALTER TABLE `estrategia_empresa`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Índices de tabela `estrategia_estrategia`
--
ALTER TABLE `estrategia_estrategia`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_fuerzasporter`
--
ALTER TABLE `estrategia_fuerzasporter`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Índices de tabela `estrategia_gruposreferencia`
--
ALTER TABLE `estrategia_gruposreferencia`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_iniciativa`
--
ALTER TABLE `estrategia_iniciativa`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_itemsdiagnostico`
--
ALTER TABLE `estrategia_itemsdiagnostico`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_kpis`
--
ALTER TABLE `estrategia_kpis`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_matrizaxiologica`
--
ALTER TABLE `estrategia_matrizaxiologica`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_matrizbcg`
--
ALTER TABLE `estrategia_matrizbcg`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Índices de tabela `estrategia_matrizdofa`
--
ALTER TABLE `estrategia_matrizdofa`
  ADD PRIMARY KEY (`IdPos1`,`IdPos2`);

--
-- Índices de tabela `estrategia_misionvision`
--
ALTER TABLE `estrategia_misionvision`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Índices de tabela `estrategia_palancas`
--
ALTER TABLE `estrategia_palancas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_principioscorporativos`
--
ALTER TABLE `estrategia_principioscorporativos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_tipoanalisisdofa`
--
ALTER TABLE `estrategia_tipoanalisisdofa`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_tipodiagnostico`
--
ALTER TABLE `estrategia_tipodiagnostico`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `estrategia_tipoestrategia`
--
ALTER TABLE `estrategia_tipoestrategia`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `gtc_etapas`
--
ALTER TABLE `gtc_etapas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `gtc_intervencion`
--
ALTER TABLE `gtc_intervencion`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `gtc_peligrosporetapa`
--
ALTER TABLE `gtc_peligrosporetapa`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `gtc_procesosporetapa`
--
ALTER TABLE `gtc_procesosporetapa`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `gtc_zonasporetapa`
--
ALTER TABLE `gtc_zonasporetapa`
  ADD PRIMARY KEY (`IdEtapa`,`IdZona`);

--
-- Índices de tabela `normas`
--
ALTER TABLE `normas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `peligros`
--
ALTER TABLE `peligros`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `peligros_efectos`
--
ALTER TABLE `peligros_efectos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `peligros_peorconsecuencia`
--
ALTER TABLE `peligros_peorconsecuencia`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `profesionales`
--
ALTER TABLE `profesionales`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `profesionalporproyecto`
--
ALTER TABLE `profesionalporproyecto`
  ADD PRIMARY KEY (`IdProyecto`,`IdProfesional`);

--
-- Índices de tabela `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- Índices de tabela `usuarios_proyectos`
--
ALTER TABLE `usuarios_proyectos`
  ADD PRIMARY KEY (`IdUsuario`,`IdProyecto`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `empresas`
--
ALTER TABLE `empresas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `empresa_contactos`
--
ALTER TABLE `empresa_contactos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `empresa_contratos`
--
ALTER TABLE `empresa_contratos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `empresa_procesos`
--
ALTER TABLE `empresa_procesos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `empresa_procesostipo`
--
ALTER TABLE `empresa_procesostipo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `empresa_zonas`
--
ALTER TABLE `empresa_zonas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `estrategia_actividades`
--
ALTER TABLE `estrategia_actividades`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `estrategia_analisisvulnerabilidad`
--
ALTER TABLE `estrategia_analisisvulnerabilidad`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estrategia_conductoresvalor`
--
ALTER TABLE `estrategia_conductoresvalor`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `estrategia_diagnostico`
--
ALTER TABLE `estrategia_diagnostico`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de tabela `estrategia_dofaitems`
--
ALTER TABLE `estrategia_dofaitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estrategia_estrategia`
--
ALTER TABLE `estrategia_estrategia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `estrategia_gruposreferencia`
--
ALTER TABLE `estrategia_gruposreferencia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de tabela `estrategia_iniciativa`
--
ALTER TABLE `estrategia_iniciativa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `estrategia_itemsdiagnostico`
--
ALTER TABLE `estrategia_itemsdiagnostico`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `estrategia_kpis`
--
ALTER TABLE `estrategia_kpis`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `estrategia_matrizaxiologica`
--
ALTER TABLE `estrategia_matrizaxiologica`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de tabela `estrategia_palancas`
--
ALTER TABLE `estrategia_palancas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `estrategia_principioscorporativos`
--
ALTER TABLE `estrategia_principioscorporativos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `estrategia_tipoanalisisdofa`
--
ALTER TABLE `estrategia_tipoanalisisdofa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `estrategia_tipodiagnostico`
--
ALTER TABLE `estrategia_tipodiagnostico`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `estrategia_tipoestrategia`
--
ALTER TABLE `estrategia_tipoestrategia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `gtc_etapas`
--
ALTER TABLE `gtc_etapas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `gtc_intervencion`
--
ALTER TABLE `gtc_intervencion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `gtc_peligrosporetapa`
--
ALTER TABLE `gtc_peligrosporetapa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `gtc_procesosporetapa`
--
ALTER TABLE `gtc_procesosporetapa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `normas`
--
ALTER TABLE `normas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `peligros`
--
ALTER TABLE `peligros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `peligros_efectos`
--
ALTER TABLE `peligros_efectos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `peligros_peorconsecuencia`
--
ALTER TABLE `peligros_peorconsecuencia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `profesionales`
--
ALTER TABLE `profesionales`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `roles`
--
ALTER TABLE `roles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
