<?php
session_start();
if (!isset($_SESSION['usuario'])) {
	header('location:login/index.html');
}


?>

<!DOCTYPE HTML>

<html>

<head>
	<title>PLANILLA DE LIQUIDACIÓN</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<link rel="shortcut icon" href="images/logo.png" type="image/x-icon">
	<link rel="stylesheet" href="fontawesome/css/all.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" href="assets/css/main.css" />
	<noscript>
		<link rel="stylesheet" href="assets/css/noscript.css" />
	</noscript>
</head>

<body class="is-preload">

	<!-- Sidebar -->
	<section id="sidebar">
		<div class="inner">
			<nav>
				<ul>
					<li><img src="images/logo.png" alt="" id="logo"></li>
					<li><a href="#intro">DATOS GENERALES</a></li>
					<li><a href="#one">SALARIO INTEGRADO</a></li>
					<li><a href="#two">SALARIO BASE</a></li>
					<li><a href="#three">FONDO DE AHORRO</a></li>
					<li><a href="#four">BONOS</a></li>
					<li><a href="#footer">GENERAR</a></li>
				</ul>
			</nav>
		</div>
	</section>

	<!-- Wrapper -->
	<div id="wrapper">
		<form action="datos.php" method="POST" id="formReporte" onkeydown="return event.key != 'Enter';">
		    
			<!-- DATOS GENERALES -->
			<section id="intro" class="wrapper style3 fade-up fullscreen">
				<p id="btnSalir"><a href="#"><?php echo 'Bienvenido(a): ' . utf8_encode($_SESSION['usuario'])   ?></a><a href="login/salir.php">SALIR</a></p>
				<h2>PLANILLA DE LIQUIDACIÓN</h2>
				<div class="inner">
					<div class="features">
						<section>
							<span class="icon solid major">1</span>
							<div>
								<label for="numeroExpediente">NÚMERO DE EXPEDIENTE</label>
								<input type="text" id="numeroExpediente" name="numeroExpediente" oninput="mayuscula()">
							</div>
							<div>
								<label for="actor">ACTOR</label>
								<input type="text" id="actor" name="actor" oninput="mayuscula()">
							</div>
						</section>
						<section>
							<span class="icon solid major">2</span>
							<div>
								<label for="tipoSalario ">TIPO DE SALARIO QUINCENAL</label>
								<select id="tipoSalario" onchange="opcionSalario()" name="tipoSalario">
									<option value="" selected disabled>SELECCIONA EL TIPO DE SALARIO</option>
									<option value="INTEGRADO">INTEGRADO</option>
									<option value="BASE">BASE</option>
									<option value="AMBOS">AMBOS</option>
								</select>
								<div id="respTipoSalario" name="respTipoSalario"></div>
							</div>
						</section>
						<section>
							<span class="icon solid major">3</span>
							<div>
								<label for="fechaIngreso">FECHA DE INGRESO</label>
								<input type="date" id="fechaIngreso" name="fechaIngreso" onchange="formatoUno(this.value)">
								<input type="text" id="fechaIngresoText" name="fechaIngresoText" hidden>
							</div>
							<div>
								<label for="fechaBaja">FECHA DE BAJA</label>
								<input type="date" id="fechaBaja" name="fechaBaja" onchange="formatoDos(this.value); calculoAntiguedad();">
								<input type="text" id="fechaBajaText" name="fechaBajaText" hidden>
							</div>
						</section>
						<section>
							<span class="icon solid major">4</span>
							<div>
								<label for="iniciofechaDejaPercibir">FECHA BAJA/DEJA DE PERCIBIR</label>
								<input type="date" id="iniciofechaDejaPercibir" name="iniciofechaDejaPercibir" onchange="formatoTres(this.value)">
								<input type="text" id="iniciofechaDejaPercibirText" name="iniciofechaDejaPercibirText" hidden>
							</div>
							<div>
								<label for="finfechaDejaPercibir">FECHA DE CÁLCULO</label>
								<input type="date" id="finfechaDejaPercibir" name="finfechaDejaPercibir" onchange="tiempoDejadoPercibir(); formatoCuatro(this.value);">
								<input type="text" id="finfechaDejaPercibirText" name="finfechaDejaPercibirText" hidden>
							</div>
						</section>
						<section>
							<span class="icon solid major">5</span>
							<div>
								<label for="primaVacacional ">PRIMA VACACIONAL</label>
								<select id="primaVacacional" onchange="opcionPrimaVacacional()" name="primaVacacional">
									<option value="" selected disabled>SELECCIONA EL TIPO DE PRIMA</option>
									<option value="FIJA">FIJA</option>
									<option value="CALCULADA">CALCULADA</option>
								</select>
								<div id="respPrima" name="respPrima"></div>
							</div>
							<div>
								<label for="tipoAguinaldo">AGUINALDO</label>
								<select id="tipoAguinaldo" onchange="opcionAguinaldo()" name="tipoAguinaldo">
									<option value="" selected disabled>SELECCIONA EL TIPO DE AGUINALDO</option>
									<option value="FIJO">FIJO</option>
									<option value="CALCULADO">CALCULADO</option>
								</select>
								<div id="respAguinaldo"></div>
							</div>
						</section>
						<section>
						    <div style="text-align:center">
								
								<button type="button" id="corregir" >Corregir</button>
								
							</div>
						</section>
					</div>
				</div>
			</section>
			
			<!-- INTEGRADO -->
			<section id="one" class="wrapper style3 fade-up fullscreen">
				<div class="inner">
					<h2>SALARIO INTEGRADO</h2>
					<div class="features">
						<section>
							<div>
								<label for="salarioIntegradoDiario">SALARIO DIARIO</label>
								<input type="number" id="salarioIntegradoDiario" readonly name="salarioIntegradoDiario" hidden>
								<input type="text" id="salarioIntegradoDiarioText" readonly name="salarioIntegradoDiarioText">
							</div>
							<div>
								<label for="salarioIntegradoQuincenal">SALARIO QUINCENAL</label>
								<input type="number" id="salarioIntegradoQuincenal" readonly name="salarioIntegradoQuincenal" hidden>
								<input type="text" id="salarioIntegradoQuincenalText" readonly name="salarioIntegradoQuincenalText">
							</div>
								<div>
								<label for="salarioIntegradoMensual">SALARIO MENSUAL</label>
								<input type="number" id="salarioIntegradoMensual" readonly name="salarioIntegradoMensual" hidden>
								<input type="text" id="salarioIntegradoMensualText" readonly name="salarioIntegradoMensualText">
							</div>
							<div>
								<label for="salarioIntegradoAnual">SALARIO ANUAL</label>
								<input type="number" id="salarioIntegradoAnual" readonly name="salarioIntegradoAnual" hidden>
								<input type="text" id="salarioIntegradoAnualText" readonly name="salarioIntegradoAnualText">
							</div>
						</section>
						<section>
							<div>
								<label for="antiguedadIntegral">AÑOS DE SERVICIO</label>
								<input type="text" id="antiguedadIntegral" readonly name="antiguedadIntegral">
							</div>
							<div>
								<label for="tiempoDejadoDePercibirIntegrado">TIEMPO DEJADO DE PERCIBIR</label>
								<input type="text" id="tiempoDejadoDePercibirIntegrado" readonly name="tiempoDejadoDePercibirIntegrado">
							</div>
						</section>
						<section>
						    <div>
								<label for="tresMesesSalarioIntegral">TRES MESES DE SALARIO</label>
								<input type="number" id="tresMesesSalarioIntegral" readonly name="tresMesesSalarioIntegral" hidden>
								<input type="text" id="tresMesesSalarioIntegralText" readonly name="tresMesesSalarioIntegralText">
							</div>
							<div>
								<label for="veinteDiasxAnioServicioIntegral">20 DÍAS POR CADA AÑO DE SERVICIO</label>
								<input type="number" id="veinteDiasxAnioServicioIntegral" readonly name="veinteDiasxAnioServicioIntegral" hidden>
								<input type="text" id="veinteDiasxAnioServicioIntegralText" readonly name="veinteDiasxAnioServicioIntegralText">
							</div>
						</section>
						<section>
							<span class="icon solid major fa-angle-right"></span>
							<div>
								<label for="indeminizacionConstitucionalIntegral" id="indemnizacion">INDEMNIZACIÓN
									CONSTITUCIONAL</label>
								<input type="number" id="indeminizacionConstitucionalIntegral" readonly name="indeminizacionConstitucionalIntegral" hidden>
								<input type="text" id="indeminizacionConstitucionalIntegralText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="Equivale a tres meses de salario, más veinte días por cada año de servicio prestado. (Artículo 123, apartado B, fracción XIII, de la Constitución Política de los Estados Unidos Mexicanos)" name="indeminizacionConstitucionalIntegralText">
							</div>
						</section>
						<section>
						    <div>
								<label for="haberesDejadosPercibirIntegrado">HABERES DEJADOS DE PERCIBIR</label>
								<input type="number" id="haberesDejadosPercibirIntegrado" readonly name="haberesDejadosPercibirIntegrado" hidden>
								<input type="text" id="haberesDejadosPercibirIntegradoText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="El Estado tiene la obligación de resarcir al servidor público que fue separado o removido de su cargo injustificadamente, con el pago de entre otras prestaciones de los haberes dejados de percibir, los cuales constituyen la remuneración diaria que percibía y su cuantificación abarca a partir de que fue separado y hasta la fecha que se obtenga el pago total." name="haberesDejadosPercibirIntegradoText">
							</div>
						    <div>
								<label for="primaVacionalIntegrada">PRIMA VACACIONAL</label>
								<input type="number" id="primaVacionalIntegrada" readonly name="primaVacionalIntegrada" hidden>
								<input type="text" id="primaVacionalIntegradaText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="El monto equivalente a la prima vacacional es del 25% sobre el salario que le corresponda durante los periodos vacacionales. (Artículo 80 de la Ley Federal del Trabajo)." name="primaVacionalIntegradaText">
							</div>
							<div>
								<label for="primaVacacionalTotalIntegrada">PRIMA VACACIONAL TOTAL</label>
								<input type="number" id="primaVacacionalTotalIntegrada" readonly name="primaVacacionalTotalIntegrada" hidden>
								<input type="text" id="primaVacacionalTotalIntegradaText" readonly name="primaVacacionalTotalIntegradaText">
							</div>
							<div>
								<label for="aguinaldoxAnioIntegral">AGUINALDO POR AÑO</label>
								<input type="number" id="aguinaldoxAnioIntegral" readonly name="aguinaldoxAnioIntegral" hidden>
								<input type="text" id="aguinaldoxAnioIntegralText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="El concepto de aguinaldo se contempla por el monto equivalente a 40 días de salario al año. (Artículo 14 de la Ley Reglamentaria del Artículo 123, apartado B, de la Constitución Política de los Estados Unidos Mexicanos)" name="aguinaldoxAnioIntegralText">
							</div>
							<div>
								<label for="aguinaldoTotalIntegral">AGUINALDO TOTAL</label>
								<input type="number" id="aguinaldoTotalIntegral" readonly name="aguinaldoTotalIntegral" hidden>
								<input type="text" id="aguinaldoTotalIntegralText" readonly name="aguinaldoTotalIntegralText">
							</div>
						</section>
						<section>
						    <span class="icon solid major fa-angle-right"></span>
							<div>
								<label for="demasPrestacionesIntegral" id="demasprestaciones">DEMAS PRESTACIONES</label>
								<input type="number" id="demasPrestacionesIntegral" readonly name="demasPrestacionesIntegral" hidden>
								<input type="text" id="demasPrestacionesIntegralText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="Lo constituyen la remuneración diaria ordinaria, beneficios, recompensas, estipendios, asignaciones, gratificaciones, premios, retribuciones, subvenciones, haberes, dietas, compensaciones o cualquier otro concepto que percibía el servidor público por la prestación de sus servicios, desde que se concretó su separación, remoción, baja, cese o cualquier otra forma de terminación del servicio y hasta que se realice el pago correspondiente." name="demasPrestacionesIntegralText">
							</div>
						</section>
					</div>
				</div>
			</section>
			
			<!-- BASE -->
			<section id="two" class="wrapper style3 fade-up fullscreen">
				<div class="inner">
					<h2>SALARIO BASE</h2>
					<div class="features">
						<section>
							<div>
								<label for="salarioBaseDiario">SALARIO DIARIO</label>
								<input type="number" id="salarioBaseDiario" readonly name="salarioBaseDiario" hidden>
								<input type="text" id="salarioBaseDiarioText" readonly name="salarioBaseDiarioText">
							</div>
							<div>
								<label for="salarioBaseQuincenal">SALARIO QUINCENAL</label>
								<input type="number" id="salarioBaseQuincenal" readonly name="salarioBaseQuincenal" hidden>
								<input type="text" id="salarioBaseQuincenalText" readonly name="salarioBaseQuincenalText">
							</div>
							<div>
								<label for="salarioBaseMensual">SALARIO MENSUAL</label>
								<input type="number" id="salarioBaseMensual" readonly name="salarioBaseMensual" hidden>
								<input type="text" id="salarioBaseMensualText" readonly name="salarioBaseMensualText">
							</div>
							<div>
								<label for="salarioBaseAnual">SALARIO ANUAL</label>
								<input type="number" id="salarioBaseAnual" readonly name="salarioBaseAnual" hidden>
								<input type="text" id="salarioBaseAnualText" readonly name="salarioBaseAnualText">
							</div>
						</section>
						<section>
							<div>
								<label for="antiguedadBase">AÑOS DE SERVICIO</label>
								<input type="text" id="antiguedadBase" readonly name="antiguedadBase">
							</div>
							<div>
								<label for="tiempoDejadoDePercibirBase">TIEMPO DEJADO DE PERCIBIR</label>
								<input type="text" id="tiempoDejadoDePercibirBase" readonly name="tiempoDejadoDePercibirBase">
							</div>
						</section>
						<section>
						     <div>
								<label for="tresMesesSalarioBase">TRES MESES DE SALARIO</label>
								<input type="number" id="tresMesesSalarioBase" readonly name="tresMesesSalarioBase" hidden>
								<input type="text" id="tresMesesSalarioBaseText" readonly name="tresMesesSalarioBaseText">
							</div>
							<div>
								<label for="veinteDiasxAnioServicioBase">20 DÍAS POR CADA AÑO DE SERVICIO</label>
								<input type="number" id="veinteDiasxAnioServicioBase" readonly name="veinteDiasxAnioServicioBase" hidden>
								<input type="text" id="veinteDiasxAnioServicioBaseText" readonly name="veinteDiasxAnioServicioBaseText">
							</div>
							<div>
								<label for="haberesDejadosPercibirBase">HABERES DEJADOS DE PERCIBIR</label>
								<input type="number" id="haberesDejadosPercibirBase" readonly name="haberesDejadosPercibirBase" hidden>
								<input type="text" id="haberesDejadosPercibirBaseText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="El Estado tiene la obligación de resarcir al servidor público que fue separado o removido de su cargo injustificadamente, con el pago de entre otras prestaciones de los haberes dejados de percibir, los cuales constituyen la remuneración diaria que percibía y su cuantificación abarca a partir de que fue separado y hasta la fecha que se obtenga el pago total." name="haberesDejadosPercibirBaseText">
							</div>
						</section>
						<section>
							<span class="icon solid major fa-angle-right"></span>
							<div>
								<label for="indeminizacionConstitucionalBase" id="indemnizacionBase">INDEMNIZACIÓN
									CONSTITUCIONAL</label>
								<input type="number" id="indeminizacionConstitucionalBase" readonly name="indeminizacionConstitucionalBase" hidden>
								<input type="text" id="indeminizacionConstitucionalBaseText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="Equivale a tres meses de salario, más veinte días por cada año de servicio prestado. (Artículo 123, apartado B, fracción XIII, de la Constitución Política de los Estados Unidos Mexicanos)" name="indeminizacionConstitucionalBaseText">
							</div>
						</section>
						<section>
						    	<div>
								<label for="primaVacionalBase">PRIMA VACACIONAL</label>
								<input type="number" id="primaVacionalBase" readonly name="primaVacionalBase" hidden>
								<input type="text" id="primaVacionalBaseText" readonly name="primaVacionalBaseText" data-toggle="popover" data-placement="right" data-trigger="focus" data-content="El monto equivalente a la prima vacacional es del 25% sobre el salario que le corresponda durante los periodos vacacionales. (Artículo 80 de la Ley Federal del Trabajo).">
							</div>
							<div>
								<label for="primaVacacionalTotalBase">PRIMA VACACIONAL TOTAL</label>
								<input type="number" id="primaVacacionalTotalBase" readonly name="primaVacacionalTotalBase" hidden>
								<input type="text" id="primaVacacionalTotalBaseText" readonly name="primaVacacionalTotalBaseText">
							</div>
							<div>
								<label for="aguinaldoxanioBase">AGUINALDO POR AÑO</label>
								<input type="number" id="aguinaldoxanioBase" readonly name="aguinaldoxanioBase" hidden>
								<input type="text" id="aguinaldoxanioBaseText" readonly name="aguinaldoxanioBaseText" data-toggle="popover" data-placement="right" data-trigger="focus" data-content="El concepto de aguinaldo se contempla por el monto equivalente a 40 días de salario al año. (Artículo 14 de la Ley Reglamentaria del Artículo 123, apartado B, de la Constitución Política de los Estados Unidos Mexicanos)">
							</div>
							<div>
								<label for="aguinaldoTotalBase">AGUINALDO TOTAL</label>
								<input type="number" id="aguinaldoTotalBase" readonly name="aguinaldoTotalBase" hidden>
								<input type="text" id="aguinaldoTotalBaseText" readonly name="aguinaldoTotalBaseText">
							</div>
						</section>
						<section>
						    <span class="icon solid major fa-angle-right"></span>
							<div>
								<label for="demasPrestacionesBase" id="demasprestacionesBase">DEMAS PRESTACIONES</label>
								<input type="number" id="demasPrestacionesBase" readonly name="demasPrestacionesBase" hidden>
								<input type="text" id="demasPrestacionesBaseText" readonly data-toggle="popover" data-placement="right" data-trigger="focus" data-content="Lo constituyen la remuneración diaria ordinaria, beneficios, recompensas, estipendios, asignaciones, gratificaciones, premios, retribuciones, subvenciones, haberes, dietas, compensaciones o cualquier otro concepto que percibía el servidor público por la prestación de sus servicios, desde que se concretó su separación, remoción, baja, cese o cualquier otra forma de terminación del servicio y hasta que se realice el pago correspondiente." name="demasPrestacionesBaseText">
							</div>
						</section>
					</div>
				</div>
			</section>
			
			<!-- AHORRO -->
			<section id="three" class="wrapper style3 fade-up fullscreen">
				<div class="inner">
					<h2>FONDO DE AHORRO ACREDITADO</h2>
					<p>Esta sección pertenece al fondo de ahorro, nos ofrece la aportación patronal así como la
						aportación del servidor público en el último año, y con ello la aportación total, misma que
						puedes sumar al total del salario con el que estes trabajando, o en su defecto puedes anular la
						suma, dando click en el boton restar fondo de ahorro, en caso de querer hacer alguna correción.
					</p>
					<div class="features">
						<section>
							<span class="icon solid major fa-hand-point-right"></span>
							<div>
								<label for="descuentoQuincenal">DESCUENTO QUINCENAL</label>
								<input type="number" id="descuentoQuincenal" name="descuentoQuincenal" oninput="fondoDeahorro()" step="any">
								<input type="text" id="descuentoQuincenalTex" name="descuentoQuincenalText" readonly>
							</div>
						</section>
						<section>
						    <div>
								<label for="aportacionPatronal">APORTACIÓN PATRONAL</label>
								<input type="number" id="aportacionPatronal" name="aportacionPatronal" step="any" readonly hidden>
								<input type="text" id="aportacionPatronalText" name="aportacionPatronalText" readonly>
							</div>
							<div>
								<label for="aportacionServidor">APORTACIÓN SERVIDOR</label>
								<input type="number" id="aportacionServidor" name="aportacionServidor" step="any" readonly hidden>
								<input type="text" id="aportacionServidorText" name="aportacionServidorText" readonly>
							</div>
							<div>
								<label for="aportacionTotal" id="aportacionTotalLabel">APORTACIÓN TOTAL</label>
								<input type="number" id="aportacionTotal" name="aportacionTotal" step="any" value=0 hidden>
								<input type="text" id="aportacionTotalText" name="aportacionTotalText" readonly>
							</div>
						</section>
					</div>
					<div id="botonesFondo">
						<button type="button" id="btnAddBono" onclick="agregarFondo()">SUMAR FONDO DE AHORRO</button>
						<button type="button" id="btnDeleteBono" onclick="quitarFondo()">RESTAR FONDO DE AHORRO</button>
					</div>
				</div>
			</section>
			<!-- BONOS -->
			<section id="four" class="wrapper style3 fade-up fullscreen">
				<div class="inner">
					<h2>BONOS</h2>
					<p>Esta sección pertenece a bonos, aquí podemos agregar diversos bonos que haya acreditado el actor,
						así como tambien podemos eliminar, editar y borrarlos respectivamente, si ya se han sumado los
						bonos al tipo de salario con el que se este trabajando y hay necesidad de querer restarlos, para
						poder corregirlos, es necesario entonces, dar click en el boton restar bonos, para volver a la
						cantidad original que se tenia del salario antes de que los bonos fueran sumados.</p>
					<div id="botonesBonos">
						<button type="button" id="btnAdd" onclick="agregarMontoBonos()">SUMAR BONO(S)</button>
						<button type="button" id="btnDelete" onclick="quitarMontoBonos()">RESTAR BONO(S)</button>
					</div>
					<span class="icon solid major fa-plus-circle m-auto" onclick="agregarBono()" id="botonBono"></span>
					<div class="features" id="crearBono">

					</div>
				</div>
			</section>
			<!-- Footer -->
			<footer id="footer" class="wrapper style3 fade-up fullscreen">
				<ul>
					<div data-toggle="popover" data-placement="top" data-trigger="focus" data-content="REPRESENTA LA SUMA DE LA INDEMNIZACIÓN CONSTITUCIONAL, DEMÁS PRESTACIONES, OTRAS PRESTACIONES Y BONOS ACREDITADOS, SALARIO PURAMENTE INTEGRADO.">
						<li>SALARIO INTEGRADO</li>
						<li><input type="number" readonly name="totalSalarioIntegrado" id="totalSalarioIntegrado" hidden>
							<input type="text" readonly name="totalSalarioIntegradoText" id="totalSalarioIntegradoText">
						</li>
					</div>
					<div data-toggle="popover" data-placement="top" data-trigger="focus" data-content="REPRESENTA LA SUMA DE LA INDEMNIZACIÓN CONSTITUCIONAL, DEMÁS PRESTACIONES, OTRAS PRESTACIONES Y BONOS ACREDITADOS, SALARIO PURAMENTE BASE.">
						<li>SALARIO BASE</li>
						<li><input type="number" readonly name="totalSalarioBase" id="totalSalarioBase" hidden>
							<input type="text" readonly name="totalSalarioBaseText" id="totalSalarioBaseText">
						</li>
					</div>
				</ul>
				<div class="botones">
					<button type="submit" id="btnGenerarPlanilla">GENERAR PLANILLA</button>
					
					<!-- HABILITAR BOTON PARA QUE MANDE A DATOS GENERALES Y INICIE UNA NUEVA PLANILLA -->
					<button type="reset" id="reset" onclick="location.href='#intro'">INICIAR NUEVA PLANILLA</button>
				</div>
				<div id="combinacion"> </div>
				<div id="respuestaCombinacion"></div>

				<div class="inner">
					<ul class="menu">
						<li>&copy; Tribunal de Justicia Administrativa del Estado de Guerrero.</li>
						<li><a href="https://www.tjaguerrero.org.mx/">TRIJAGRO</a></li>
					</ul>
				</div>
		</form>
		</footer>
	</div>

	<!-- Scripts -->
	<script src="fontawesome/js/all.js"></script>
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/jquery.scrollex.min.js"></script>
	<script src="assets/js/jquery.scrolly.min.js"></script>
	<script src="assets/js/browser.min.js"></script>
	<script src="assets/js/breakpoints.min.js"></script>
	<script src="assets/js/util.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
	</script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
	</script>
	<script src="assets/js/moments.js"></script>
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.2/locale/es.js"></script> -->
	<script src="assets/js/main.js"></script>

</body>

</html>