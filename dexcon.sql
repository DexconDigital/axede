-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 05-Set-2017 às 15:03
-- Versão do servidor: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dexcon`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresas`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_cantidadprocesos`
--

CREATE TABLE `empresa_cantidadprocesos` (
  `IdEmpresa` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_contactos`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_contratos`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_procesos`
--

CREATE TABLE `empresa_procesos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `IdEmpresa` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `IdPadre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_procesostipo`
--

CREATE TABLE `empresa_procesostipo` (
  `Id` int(11) NOT NULL,
  `Tipo` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Alias` varchar(40) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_zonas`
--

CREATE TABLE `empresa_zonas` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(30) COLLATE utf32_spanish_ci NOT NULL,
  `IdEmpresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_actividades`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_analisisvulnerabilidad`
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
-- Estrutura da tabela `estrategia_conductoresvalor`
--

CREATE TABLE `estrategia_conductoresvalor` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `ConductorValor` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_diagnostico`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_dofaitems`
--

CREATE TABLE `estrategia_dofaitems` (
  `Id` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `IdItem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_dofaresumido`
--

CREATE TABLE `estrategia_dofaresumido` (
  `IdProyecto` int(11) NOT NULL,
  `Resumen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_empresa`
--

CREATE TABLE `estrategia_empresa` (
  `IdProyecto` int(11) NOT NULL,
  `AnoInicial` int(11) NOT NULL,
  `AnoFinal` int(11) NOT NULL,
  `Estrategas` varchar(300) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_estrategia`
--

CREATE TABLE `estrategia_estrategia` (
  `Id` int(11) NOT NULL,
  `IdPalanca` int(11) NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `Estrategia` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_fuerzasporter`
--

CREATE TABLE `estrategia_fuerzasporter` (
  `IdProyecto` int(11) NOT NULL,
  `F1` text NOT NULL,
  `F2` text NOT NULL,
  `F3` text NOT NULL,
  `F4` text NOT NULL,
  `F5` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_gruposreferencia`
--

CREATE TABLE `estrategia_gruposreferencia` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_iniciativa`
--

CREATE TABLE `estrategia_iniciativa` (
  `Id` int(11) NOT NULL,
  `IdEstrategia` int(11) NOT NULL,
  `Iniciativa` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_itemsdiagnostico`
--

CREATE TABLE `estrategia_itemsdiagnostico` (
  `Id` int(11) NOT NULL,
  `Item` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Tipo` int(11) NOT NULL,
  `Alias` varchar(20) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_kpis`
--

CREATE TABLE `estrategia_kpis` (
  `IdActividad` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Frecuencia` int(11) NOT NULL,
  `Valor1` varchar(100) NOT NULL,
  `Valor2` varchar(100) NOT NULL,
  `Formula` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_matrizaxiologica`
--

CREATE TABLE `estrategia_matrizaxiologica` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL,
  `Posicion` varchar(30) NOT NULL,
  `Value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_matrizbcg`
--

CREATE TABLE `estrategia_matrizbcg` (
  `IdProyecto` int(11) NOT NULL,
  `Estrellas` text NOT NULL,
  `Interrogantes` text NOT NULL,
  `Vaca` text NOT NULL,
  `Perro` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_matrizdofa`
--

CREATE TABLE `estrategia_matrizdofa` (
  `IdPos1` int(50) NOT NULL,
  `IdPos2` int(50) NOT NULL,
  `Value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_misionvision`
--

CREATE TABLE `estrategia_misionvision` (
  `IdProyecto` int(11) NOT NULL,
  `Mision` text COLLATE utf32_spanish_ci NOT NULL,
  `Vision` text COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_palancas`
--

CREATE TABLE `estrategia_palancas` (
  `Id` int(11) NOT NULL,
  `IdConductor` int(11) NOT NULL,
  `Palanca` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_principioscorporativos`
--

CREATE TABLE `estrategia_principioscorporativos` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(40) NOT NULL,
  `Nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_tipoanalisisdofa`
--

CREATE TABLE `estrategia_tipoanalisisdofa` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(10) NOT NULL,
  `Alias` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_tipodiagnostico`
--

CREATE TABLE `estrategia_tipodiagnostico` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(40) COLLATE utf32_spanish_ci NOT NULL,
  `Alias` varchar(10) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estrategia_tipoestrategia`
--

CREATE TABLE `estrategia_tipoestrategia` (
  `Id` int(11) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Color` varchar(20) NOT NULL,
  `Alias` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `gtc_etapas`
--

CREATE TABLE `gtc_etapas` (
  `Id` int(11) NOT NULL,
  `IdProyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `gtc_intervencion`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `gtc_peligrosporetapa`
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
  `Foto` text COLLATE utf32_spanish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `gtc_procesosporetapa`
--

CREATE TABLE `gtc_procesosporetapa` (
  `Id` int(11) NOT NULL,
  `IdEtapa` int(11) NOT NULL,
  `IdProceso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `gtc_zonasporetapa`
--

CREATE TABLE `gtc_zonasporetapa` (
  `IdEtapa` int(11) NOT NULL,
  `IdZona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `normas`
--

CREATE TABLE `normas` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(20) COLLATE utf32_spanish_ci NOT NULL,
  `Alias` varchar(20) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `peligros`
--

CREATE TABLE `peligros` (
  `Id` int(11) NOT NULL,
  `Descripcion` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `Clasificacion` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `Consecuencia` int(11) NOT NULL,
  `RequisitoLegal` varchar(5) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `peligros_efectos`
--

CREATE TABLE `peligros_efectos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf32_spanish_ci NOT NULL,
  `IdPeligro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `peligros_peorconsecuencia`
--

CREATE TABLE `peligros_peorconsecuencia` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(200) COLLATE utf32_spanish_ci NOT NULL,
  `IdPeligro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `profesionales`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `profesionalporproyecto`
--

CREATE TABLE `profesionalporproyecto` (
  `IdProyecto` int(11) NOT NULL,
  `IdProfesional` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `proyectos`
--

CREATE TABLE `proyectos` (
  `Id` int(11) NOT NULL,
  `IdEmpresa` int(11) NOT NULL,
  `IdNorma` int(11) NOT NULL,
  `IdContrato` int(11) NOT NULL,
  `IdProfesionalCreador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `roles`
--

CREATE TABLE `roles` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(20) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Usuario` varchar(25) COLLATE utf32_spanish_ci NOT NULL,
  `Cedula` varchar(25) COLLATE utf32_spanish_ci NOT NULL,
  `Password` varchar(25) COLLATE utf32_spanish_ci NOT NULL,
  `IdRol` int(11) NOT NULL,
  `Color` varchar(20) COLLATE utf32_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `empresa_cantidadprocesos`
--
ALTER TABLE `empresa_cantidadprocesos`
  ADD PRIMARY KEY (`IdEmpresa`,`IdTipo`);

--
-- Indexes for table `empresa_contactos`
--
ALTER TABLE `empresa_contactos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `empresa_contratos`
--
ALTER TABLE `empresa_contratos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `empresa_procesos`
--
ALTER TABLE `empresa_procesos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `empresa_procesostipo`
--
ALTER TABLE `empresa_procesostipo`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `empresa_zonas`
--
ALTER TABLE `empresa_zonas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_actividades`
--
ALTER TABLE `estrategia_actividades`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_analisisvulnerabilidad`
--
ALTER TABLE `estrategia_analisisvulnerabilidad`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_conductoresvalor`
--
ALTER TABLE `estrategia_conductoresvalor`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_diagnostico`
--
ALTER TABLE `estrategia_diagnostico`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_dofaitems`
--
ALTER TABLE `estrategia_dofaitems`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_dofaresumido`
--
ALTER TABLE `estrategia_dofaresumido`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Indexes for table `estrategia_empresa`
--
ALTER TABLE `estrategia_empresa`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Indexes for table `estrategia_estrategia`
--
ALTER TABLE `estrategia_estrategia`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_fuerzasporter`
--
ALTER TABLE `estrategia_fuerzasporter`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Indexes for table `estrategia_gruposreferencia`
--
ALTER TABLE `estrategia_gruposreferencia`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_iniciativa`
--
ALTER TABLE `estrategia_iniciativa`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_itemsdiagnostico`
--
ALTER TABLE `estrategia_itemsdiagnostico`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_matrizaxiologica`
--
ALTER TABLE `estrategia_matrizaxiologica`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_matrizbcg`
--
ALTER TABLE `estrategia_matrizbcg`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Indexes for table `estrategia_matrizdofa`
--
ALTER TABLE `estrategia_matrizdofa`
  ADD PRIMARY KEY (`IdPos1`,`IdPos2`);

--
-- Indexes for table `estrategia_misionvision`
--
ALTER TABLE `estrategia_misionvision`
  ADD PRIMARY KEY (`IdProyecto`);

--
-- Indexes for table `estrategia_palancas`
--
ALTER TABLE `estrategia_palancas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_principioscorporativos`
--
ALTER TABLE `estrategia_principioscorporativos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_tipoanalisisdofa`
--
ALTER TABLE `estrategia_tipoanalisisdofa`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_tipodiagnostico`
--
ALTER TABLE `estrategia_tipodiagnostico`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `estrategia_tipoestrategia`
--
ALTER TABLE `estrategia_tipoestrategia`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `gtc_etapas`
--
ALTER TABLE `gtc_etapas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `gtc_intervencion`
--
ALTER TABLE `gtc_intervencion`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `gtc_peligrosporetapa`
--
ALTER TABLE `gtc_peligrosporetapa`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `gtc_procesosporetapa`
--
ALTER TABLE `gtc_procesosporetapa`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `gtc_zonasporetapa`
--
ALTER TABLE `gtc_zonasporetapa`
  ADD PRIMARY KEY (`IdEtapa`,`IdZona`);

--
-- Indexes for table `normas`
--
ALTER TABLE `normas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `peligros`
--
ALTER TABLE `peligros`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `peligros_efectos`
--
ALTER TABLE `peligros_efectos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `peligros_peorconsecuencia`
--
ALTER TABLE `peligros_peorconsecuencia`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `profesionales`
--
ALTER TABLE `profesionales`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `profesionalporproyecto`
--
ALTER TABLE `profesionalporproyecto`
  ADD PRIMARY KEY (`IdProyecto`,`IdProfesional`);

--
-- Indexes for table `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `empresas`
--
ALTER TABLE `empresas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `empresa_contactos`
--
ALTER TABLE `empresa_contactos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `empresa_contratos`
--
ALTER TABLE `empresa_contratos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `empresa_procesos`
--
ALTER TABLE `empresa_procesos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `empresa_procesostipo`
--
ALTER TABLE `empresa_procesostipo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `empresa_zonas`
--
ALTER TABLE `empresa_zonas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_actividades`
--
ALTER TABLE `estrategia_actividades`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_analisisvulnerabilidad`
--
ALTER TABLE `estrategia_analisisvulnerabilidad`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_conductoresvalor`
--
ALTER TABLE `estrategia_conductoresvalor`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_diagnostico`
--
ALTER TABLE `estrategia_diagnostico`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_dofaitems`
--
ALTER TABLE `estrategia_dofaitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_estrategia`
--
ALTER TABLE `estrategia_estrategia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_gruposreferencia`
--
ALTER TABLE `estrategia_gruposreferencia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_iniciativa`
--
ALTER TABLE `estrategia_iniciativa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_itemsdiagnostico`
--
ALTER TABLE `estrategia_itemsdiagnostico`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_matrizaxiologica`
--
ALTER TABLE `estrategia_matrizaxiologica`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_palancas`
--
ALTER TABLE `estrategia_palancas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_principioscorporativos`
--
ALTER TABLE `estrategia_principioscorporativos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_tipoanalisisdofa`
--
ALTER TABLE `estrategia_tipoanalisisdofa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_tipodiagnostico`
--
ALTER TABLE `estrategia_tipodiagnostico`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estrategia_tipoestrategia`
--
ALTER TABLE `estrategia_tipoestrategia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `gtc_etapas`
--
ALTER TABLE `gtc_etapas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `gtc_intervencion`
--
ALTER TABLE `gtc_intervencion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `gtc_peligrosporetapa`
--
ALTER TABLE `gtc_peligrosporetapa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `gtc_procesosporetapa`
--
ALTER TABLE `gtc_procesosporetapa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `normas`
--
ALTER TABLE `normas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `peligros`
--
ALTER TABLE `peligros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `peligros_efectos`
--
ALTER TABLE `peligros_efectos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `peligros_peorconsecuencia`
--
ALTER TABLE `peligros_peorconsecuencia`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `profesionales`
--
ALTER TABLE `profesionales`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
