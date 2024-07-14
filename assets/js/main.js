(function ($) {

	var $window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Hack: Enable IE flexbox workarounds.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Forms.

	// Hack: Activate non-input submits.
	$('form').on('click', '.submit', function (event) {

		// Stop propagation, default.
		event.stopPropagation();
		event.preventDefault();

		// Submit form.
		$(this).parents('form').submit();

	});

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function () {

				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

				// Deactivate all links.
				$sidebar_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function () {

						// Deactivate section.
						$section.addClass('inactive');

					},
					enter: function () {

						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($sidebar_a.filter('.active-locked').length == 0) {

							$sidebar_a.removeClass('active');
							$this.addClass('active');

						}

						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function () {

			// If <=large, >small, and sidebar is present, use its height as the offset.
			if (breakpoints.active('<=large') &&
				!breakpoints.active('<=small') &&
				$sidebar.length > 0)
				return $sidebar.height();

			return 0;

		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		})
		.each(function () {

			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			// Assign image.
			$image.css('background-image', 'url(' + $img.attr('src') + ')');

			// Set background position.
			if (x = $img.data('position'))
				$image.css('background-position', x);

			// Hide <img>.
			$img.hide();

		});

	// Features.
	$('.features')
		.scrollex({
			mode: 'middle',
			top: '-20vh',
			bottom: '-20vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		});

	$('[data-toggle="popover"]').popover()

})(jQuery);

function mayuscula() {
	let numeroExpediente = document.getElementById('numeroExpediente');
	let actor = document.getElementById('actor');
	numeroExpediente.value = numeroExpediente.value.toUpperCase();
	actor.value = actor.value.toUpperCase();

}

/* FORMATEAR EL NUMERO PARA PRESENTAR  A LA VISTA */
function formatearNumero(numero) {

	const options2 = {
		style: 'currency',
		currency: 'USD'
	};
	const numberFormat2 = new Intl.NumberFormat('en-US', options2);

	let formato = numberFormat2.format(numero);

	return formato;

}


function formatFecha(fecha) {
	let date = moment(fecha).format('DD-MM-YYYY');
	return date;
}


function formatoUno(dato) {

	document.getElementById('fechaIngresoText').value = formatFecha(dato);
}

function formatoDos(dato) {

	document.getElementById('fechaBajaText').value = formatFecha(dato);
}

function formatoTres(dato) {

	document.getElementById('iniciofechaDejaPercibirText').value = formatFecha(dato);
}

function formatoCuatro(dato) {

	document.getElementById('finfechaDejaPercibirText').value = formatFecha(dato);
}

function opcionSalario() {
	let tipoSalario = document.getElementById('tipoSalario');

	if (tipoSalario.value == 'INTEGRADO') {
		let respuestaTipoSalario = document.getElementById('respTipoSalario');

		let integrado = document.createElement('input');
		let label = document.createElement('label');

		/* propiedades del label */
		label.textContent = 'CANTIDAD'
		label.style.textAlign = 'center';
		label.style.fontSize = '10px';

		/* propiedades del input integrado */
		integrado.type = 'number';
		integrado.min = 1;
		integrado.id = 'cantidadTipoSalarioIntegrado';
		integrado.style.width = '100%';
		integrado.style.fontSize = '12px';
		integrado.style.marginTop = '3px';
		label.style.letterSpacing = '1px';

		integrado.setAttribute('step', 'any');
		
		/* metemos una funcion para calcular salarios */
		integrado.setAttribute('oninput', 'tiposSalariosIntegrados()');
		
		respuestaTipoSalario.innerHTML = '';
		respuestaTipoSalario.appendChild(label);
		respuestaTipoSalario.appendChild(integrado);

		/* BORRANDO LAS COMBINACIONES DE SALARIOS */
		document.getElementById('combinacion').innerHTML = '';
	}
	if (tipoSalario.value == 'BASE') {

		let respuestaTipoSalario = document.getElementById('respTipoSalario');

		let base = document.createElement('input');
		let label = document.createElement('label');

		/* propiedades del label */
		label.textContent = 'CANTIDAD'
		label.style.textAlign = 'center';
		label.style.fontSize = '10px';
		label.style.letterSpacing = '1px';

		/* propiedades del input base */
		base.type = 'number';
		base.min = 1;
		base.id = 'cantidadTipoSalarioBase';
		base.style.width = '100%';
		base.style.fontSize = '12px';
		base.style.marginTop = '3px';
		base.setAttribute('step', 'any');
		
		/* metemos una funcion para calcular salarios */
		base.setAttribute('oninput', 'tiposSalariosBase()');
		
		respuestaTipoSalario.innerHTML = '';
		respuestaTipoSalario.appendChild(label);
		respuestaTipoSalario.appendChild(base);

		/* BORRANDO LAS COMBINACIONES DE SALARIOS */
		document.getElementById('combinacion').innerHTML = '';
	}
	if (tipoSalario.value == 'AMBOS') {

		let respuestaTipoSalario = document.getElementById('respTipoSalario');

		let integrado = document.createElement('input');
		let base = document.createElement('input');
		let labelIntegrado = document.createElement('label');
		let labelBase = document.createElement('label');
		/* propiedades de los labels */
		labelIntegrado.textContent = 'CANTIDAD SALARIO INTEGRADO';
		labelIntegrado.style.textAlign = 'center';
		labelIntegrado.style.fontSize = '9px';
		labelIntegrado.style.letterSpacing = '1px';
		labelIntegrado.style.width = '100%';
		labelBase.textContent = 'CANTIDAD SALARIO BASE';
		labelBase.style.textAlign = 'center';
		labelBase.style.fontSize = '9px';
		labelBase.style.letterSpacing = '1px';

		/* propiedades del input integrado */
		integrado.type = 'number';
		integrado.min = 1;
		integrado.id = 'cantidadTipoSalarioIntegrado';
		integrado.style.width = '100%';
		integrado.style.fontSize = '12px';
		integrado.style.marginTop = '3px';

		integrado.setAttribute('step', 'any');
		
		/* metemos una funcion para calcular salarios integrados */
		integrado.setAttribute('oninput', 'salariosMixtos()');

		/* propiedades del input base */
		base.type = 'number';
		base.min = 1;
		base.id = 'cantidadTipoSalarioBase';
		base.style.width = '100%';
		base.style.fontSize = '12px';
		base.style.marginTop = '3px';

		base.setAttribute('step', 'any');
		/* metemos una funcion para calcular salarios base */
		base.setAttribute('oninput', 'salariosMixtos()');

		respuestaTipoSalario.innerHTML = '';
		respuestaTipoSalario.appendChild(labelIntegrado);
		respuestaTipoSalario.appendChild(integrado);
		respuestaTipoSalario.appendChild(labelBase);
		respuestaTipoSalario.appendChild(base);


        /*ESTE HACE QUE CUANDO ESCOJAMOS SALARIOS MIXTOS SE AGREGUE EL BOTON DE COMBINACIONES AL FINAL*/
		/* VAMOS A CREAR UN SELECT AL FINAL PARA HACER LAS COMBINACIONES DE SALARIOS */
		let padre = document.getElementById('combinacion');
		let select = document.createElement('select');
		let opcionDefault = document.createElement('option');
		let opcionUno = document.createElement('option');
		let opcionDos = document.createElement('option');

		/* agregando una funcion de cambio al select */
		select.setAttribute('onchange', 'btnGenerarCombinacion()');
		select.id = 'tipoCombinacion';

		/* propiedades a las opciones */
		opcionDefault.textContent = 'Elige un tipo de combinación';
		opcionDefault.disabled = true;
		opcionDefault.selected = true;
		opcionUno.textContent = 'INTEGRADO [INDEMNIZACIÓN] --- BASE [DEMÁS PRESTACIONES]';
		opcionUno.value = 'INTEGRADO_BASE';
		opcionDos.textContent = 'BASE [INDEMNIZACIÓN] --- INTEGRADO [DEMÁS PRESTACIONES]';
		opcionDos.value = 'BASE_INTEGRADO';

		select.appendChild(opcionDefault);
		select.appendChild(opcionUno);
		select.appendChild(opcionDos);

		padre.appendChild(select);




	}
}

/* CALCULANDO LOS SALARIOS INTEGRADOS POR PERIODO */
function tiposSalariosIntegrados() {
	/* salario diario */

	let cantidadIntegrado = document.getElementById('cantidadTipoSalarioIntegrado');
	let salarioIntegradoDiario = document.getElementById('salarioIntegradoDiario');
	salarioIntegradoDiario.value = ((cantidadIntegrado.value) / 15).toFixed(2);

	salarioIntegradoDiarioText.value = formatearNumero(salarioIntegradoDiario.value);

	/* salario quincenal */
	let salarioIntegradoQuincenal = document.getElementById('salarioIntegradoQuincenal');
	salarioIntegradoQuincenal.value = cantidadIntegrado.value;

	salarioIntegradoQuincenalText.value = formatearNumero(salarioIntegradoQuincenal.value);

	/* salario mensual */
	let salarioIntegradoMensual = document.getElementById('salarioIntegradoMensual');
	salarioIntegradoMensual.value = (cantidadIntegrado.value * 2).toFixed(2);

	salarioIntegradoMensualText.value = formatearNumero(salarioIntegradoMensual.value);

	/* salario anual */
	let salarioIntegradoAnual = document.getElementById('salarioIntegradoAnual');
	salarioIntegradoAnual.value = ((salarioIntegradoMensual.value) * 12).toFixed(2);

	salarioIntegradoAnualText.value = formatearNumero(salarioIntegradoAnual.value);



}


/* CALCULANDO LOS SALARIOS BASE POR PERIODO */
function tiposSalariosBase() {
	/* salario diario */
	let cantidadBase = document.getElementById('cantidadTipoSalarioBase');
	let salarioBaseDiario = document.getElementById('salarioBaseDiario');
	salarioBaseDiario.value = ((cantidadBase.value) / 15).toFixed(2);

	salarioBaseDiarioText.value = formatearNumero(salarioBaseDiario.value);

	/* salario quincenal */
	let salarioBaseQuincenal = document.getElementById('salarioBaseQuincenal');
	salarioBaseQuincenal.value = cantidadBase.value;
	salarioBaseQuincenalText.value = formatearNumero(salarioBaseQuincenal.value);

	/* salario mensual */
	let salarioBaseMensual = document.getElementById('salarioBaseMensual');
	salarioBaseMensual.value = (cantidadBase.value * 2).toFixed(2);
	salarioBaseMensualText.value = formatearNumero(salarioBaseMensual.value);

	/* salario anual */
	let salarioBaseAnual = document.getElementById('salarioBaseAnual');
	salarioBaseAnual.value = ((salarioBaseMensual.value) * 12).toFixed(2);
	salarioBaseAnualText.value = formatearNumero(salarioBaseAnual.value);



}

/* CALCULANDO LOS SALARIOS MIXTOS */
function salariosMixtos() {

	tiposSalariosIntegrados();
	tiposSalariosBase();
}

/* CALCULANDO LA ANTIGUEDAD */
function calculoAntiguedad() {

	//let fechaIngreso = document.getElementById('fechaIngreso');
	//let fechaBaja = document.getElementById('fechaBaja');
	
	let antiguedadIntegral = document.getElementById('antiguedadIntegral');

	let inicio = moment(fechaIngreso.value);
	let fin = moment(fechaBaja.value);
	
	//let years = fin.diff(inicio, "y");
	
	let duracionMeses = fin.diff(inicio, "month");
	let duracionAnios = fin.diff(inicio, "y");

	/* sacamos los meses restantes */
	let mesesRestantes = duracionMeses - (duracionAnios * 12);

	/* obteniendo la penultima fecha hasta donde llegan los años completos */
	let fechaPenultimaAniosCompletos = moment(inicio).add(duracionMeses, 'month');

	/* sacamos el dia y el mes de la penultima fecha */
	let diaPenultimaFecha = Number(moment(fechaPenultimaAniosCompletos).format('DD'));
	let mesPenultimaFecha = Number(moment(fechaPenultimaAniosCompletos).format('MM'));
	//console.log(mesPenultimaFecha);

	/* sacamos el dia y el mes de la fecha finfechaDejaPercibir(FECHA DE CÁLCULO) */
	let diaFinFechaDejaPercibir = Number(moment(fin).format('DD'));
	let mesFinFechaDejaPercibir = Number(moment(fin).format('MM'));
	//console.log(mesFinFechaDejaPercibir);

	/* comparamos meses de mesPenultimaFecha y mesFinFechaDejaPercibir */
	
    	if (mesPenultimaFecha == mesFinFechaDejaPercibir) {
    	    
    	    let diferenciaFechasEnDias = diaFinFechaDejaPercibir - diaPenultimaFecha;
    	    
    	    if(tipoSalario.value=='INTEGRADO'){
    	        
    	    antiguedadIntegral.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    
    	    /* tres meses de salario mensual */
        	let tresMesesSalarioIntegral = document.getElementById('tresMesesSalarioIntegral');
        	tresMesesSalarioIntegral.value = (salarioIntegradoMensual.value * 3).toFixed(2);
        	tresMesesSalarioIntegralText.value = formatearNumero(tresMesesSalarioIntegral.value);
    	
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioIntegral = document.getElementById('veinteDiasxAnioServicioIntegral');
        	veinteDiasxAnioServicioIntegral.value = ((duracionAnios * salarioIntegradoDiario.value * 20) + ((salarioIntegradoDiario.value * 20/12) * mesesRestantes) + ((salarioIntegradoDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
            veinteDiasxAnioServicioIntegralText.value = formatearNumero(veinteDiasxAnioServicioIntegral.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalIntegral = document.getElementById('indeminizacionConstitucionalIntegral');
        	indeminizacionConstitucionalIntegral.value = (Number(tresMesesSalarioIntegral.value) + Number(veinteDiasxAnioServicioIntegral.value)).toFixed(2);
        	indeminizacionConstitucionalIntegralText.value = formatearNumero(indeminizacionConstitucionalIntegral.value);
    	    
    	    //console.log('aqui llego')
    	}
    	if(tipoSalario.value=='BASE'){
    	    antiguedadBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    
    	    /* tres meses de salario mensual */
        	let tresMesesSalarioBase = document.getElementById('tresMesesSalarioBase');
        	tresMesesSalarioBase.value = (salarioBaseMensual.value * 3).toFixed(2);
        	tresMesesSalarioBaseText.value = formatearNumero(tresMesesSalarioBase.value);
    
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioBase = document.getElementById('veinteDiasxAnioServicioBase');
        	veinteDiasxAnioServicioBase.value = ((duracionAnios * salarioBaseDiario.value * 20) + ((salarioBaseDiario.value * 20/12) * mesesRestantes) + ((salarioBaseDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
        	veinteDiasxAnioServicioBaseText.value = formatearNumero(veinteDiasxAnioServicioBase.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalBase = document.getElementById('indeminizacionConstitucionalBase');
        	indeminizacionConstitucionalBase.value = (Number(tresMesesSalarioBase.value) + Number(veinteDiasxAnioServicioBase.value)).toFixed(2);
        	indeminizacionConstitucionalBaseText.value = formatearNumero(indeminizacionConstitucionalBase.value);
    
    	   
    	}
    	if(tipoSalario.value=='AMBOS'){
    	    
    	    antiguedadIntegral.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    antiguedadBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    
    	    /* tres meses de salario mensual */
        	let tresMesesSalarioIntegral = document.getElementById('tresMesesSalarioIntegral');
        	tresMesesSalarioIntegral.value = (salarioIntegradoMensual.value * 3).toFixed(2);
        	tresMesesSalarioIntegralText.value = formatearNumero(tresMesesSalarioIntegral.value);
    	
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioIntegral = document.getElementById('veinteDiasxAnioServicioIntegral');
        	veinteDiasxAnioServicioIntegral.value = ((duracionAnios * salarioIntegradoDiario.value * 20) + ((salarioIntegradoDiario.value * 20/12) * mesesRestantes) + ((salarioIntegradoDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
            veinteDiasxAnioServicioIntegralText.value = formatearNumero(veinteDiasxAnioServicioIntegral.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalIntegral = document.getElementById('indeminizacionConstitucionalIntegral');
        	indeminizacionConstitucionalIntegral.value = (Number(tresMesesSalarioIntegral.value) + Number(veinteDiasxAnioServicioIntegral.value)).toFixed(2);
        	indeminizacionConstitucionalIntegralText.value = formatearNumero(indeminizacionConstitucionalIntegral.value);
            
            
            /* tres meses de salario mensual */
        	let tresMesesSalarioBase = document.getElementById('tresMesesSalarioBase');
        	tresMesesSalarioBase.value = (salarioBaseMensual.value * 3).toFixed(2);
        	tresMesesSalarioBaseText.value = formatearNumero(tresMesesSalarioBase.value);
    
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioBase = document.getElementById('veinteDiasxAnioServicioBase');
        	veinteDiasxAnioServicioBase.value = ((duracionAnios * salarioBaseDiario.value * 20) + ((salarioBaseDiario.value * 20/12) * mesesRestantes) + ((salarioBaseDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
        	veinteDiasxAnioServicioBaseText.value = formatearNumero(veinteDiasxAnioServicioBase.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalBase = document.getElementById('indeminizacionConstitucionalBase');
        	indeminizacionConstitucionalBase.value = (Number(tresMesesSalarioBase.value) + Number(veinteDiasxAnioServicioBase.value)).toFixed(2);
        	indeminizacionConstitucionalBaseText.value = formatearNumero(indeminizacionConstitucionalBase.value);
    	    
    	}
	    
	    
	}else{
	    
	        let diferenciaFechasEnDias = (30 - diaPenultimaFecha) + diaFinFechaDejaPercibir;
	        
	        if(tipoSalario.value=='INTEGRADO'){
    	        
    	    antiguedadIntegral.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    
    	    /* tres meses de salario mensual */
        	let tresMesesSalarioIntegral = document.getElementById('tresMesesSalarioIntegral');
        	tresMesesSalarioIntegral.value = (salarioIntegradoMensual.value * 3).toFixed(2);
        	tresMesesSalarioIntegralText.value = formatearNumero(tresMesesSalarioIntegral.value);
    	
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioIntegral = document.getElementById('veinteDiasxAnioServicioIntegral');
        	veinteDiasxAnioServicioIntegral.value = ((duracionAnios * salarioIntegradoDiario.value * 20) + ((salarioIntegradoDiario.value * 20/12) * mesesRestantes) + ((salarioIntegradoDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
            veinteDiasxAnioServicioIntegralText.value = formatearNumero(veinteDiasxAnioServicioIntegral.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalIntegral = document.getElementById('indeminizacionConstitucionalIntegral');
        	indeminizacionConstitucionalIntegral.value = (Number(tresMesesSalarioIntegral.value) + Number(veinteDiasxAnioServicioIntegral.value)).toFixed(2);
        	indeminizacionConstitucionalIntegralText.value = formatearNumero(indeminizacionConstitucionalIntegral.value);
    	    
    	    //console.log('aqui llego')
    	}
    	if(tipoSalario.value=='BASE'){
    	    
    	    antiguedadBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    
    	    /* tres meses de salario mensual */
        	let tresMesesSalarioBase = document.getElementById('tresMesesSalarioBase');
        	tresMesesSalarioBase.value = (salarioBaseMensual.value * 3).toFixed(2);
        	tresMesesSalarioBaseText.value = formatearNumero(tresMesesSalarioBase.value);
    
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioBase = document.getElementById('veinteDiasxAnioServicioBase');
        	veinteDiasxAnioServicioBase.value = ((duracionAnios * salarioBaseDiario.value * 20) + ((salarioBaseDiario.value * 20/12) * mesesRestantes) + ((salarioBaseDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
        	veinteDiasxAnioServicioBaseText.value = formatearNumero(veinteDiasxAnioServicioBase.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalBase = document.getElementById('indeminizacionConstitucionalBase');
        	indeminizacionConstitucionalBase.value = (Number(tresMesesSalarioBase.value) + Number(veinteDiasxAnioServicioBase.value)).toFixed(2);
        	indeminizacionConstitucionalBaseText.value = formatearNumero(indeminizacionConstitucionalBase.value);
    
    	   
    	}
    	if(tipoSalario.value=='AMBOS'){
    	    
    	    antiguedadIntegral.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    antiguedadBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' dia(s)';
    	    
    	    /* tres meses de salario mensual */
        	let tresMesesSalarioIntegral = document.getElementById('tresMesesSalarioIntegral');
        	tresMesesSalarioIntegral.value = (salarioIntegradoMensual.value * 3).toFixed(2);
        	tresMesesSalarioIntegralText.value = formatearNumero(tresMesesSalarioIntegral.value);
    	
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioIntegral = document.getElementById('veinteDiasxAnioServicioIntegral');
        	veinteDiasxAnioServicioIntegral.value = ((duracionAnios * salarioIntegradoDiario.value * 20) + ((salarioIntegradoDiario.value * 20/12) * mesesRestantes) + ((salarioIntegradoDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
            veinteDiasxAnioServicioIntegralText.value = formatearNumero(veinteDiasxAnioServicioIntegral.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalIntegral = document.getElementById('indeminizacionConstitucionalIntegral');
        	indeminizacionConstitucionalIntegral.value = (Number(tresMesesSalarioIntegral.value) + Number(veinteDiasxAnioServicioIntegral.value)).toFixed(2);
        	indeminizacionConstitucionalIntegralText.value = formatearNumero(indeminizacionConstitucionalIntegral.value);
            
            /* tres meses de salario mensual */
        	let tresMesesSalarioBase = document.getElementById('tresMesesSalarioBase');
        	tresMesesSalarioBase.value = (salarioBaseMensual.value * 3).toFixed(2);
        	tresMesesSalarioBaseText.value = formatearNumero(tresMesesSalarioBase.value);
    
            /* veinte dias x cada año de servicio */
        	let veinteDiasxAnioServicioBase = document.getElementById('veinteDiasxAnioServicioBase');
        	veinteDiasxAnioServicioBase.value = ((duracionAnios * salarioBaseDiario.value * 20) + ((salarioBaseDiario.value * 20/12) * mesesRestantes) + ((salarioBaseDiario.value * 20/12/30) * diferenciaFechasEnDias)).toFixed(2);
        	veinteDiasxAnioServicioBaseText.value = formatearNumero(veinteDiasxAnioServicioBase.value);
    
        	/* indemnizacion constitucional */
        	let indeminizacionConstitucionalBase = document.getElementById('indeminizacionConstitucionalBase');
        	indeminizacionConstitucionalBase.value = (Number(tresMesesSalarioBase.value) + Number(veinteDiasxAnioServicioBase.value)).toFixed(2);
        	indeminizacionConstitucionalBaseText.value = formatearNumero(indeminizacionConstitucionalBase.value);
    	}
	        
	    
	}
	
}

/* CALCULANDO EL TIEMPO DEJADO DE PERCIBIR */
function tiempoDejadoPercibir() {

	let inicio = moment(iniciofechaDejaPercibir.value);
	let fin = moment(finfechaDejaPercibir.value);
	let duracionMeses = fin.diff(inicio, "month");
	let duracionAnios = fin.diff(inicio, "y");

	/* sacamos los meses restantes */
	let mesesRestantes = duracionMeses - (duracionAnios * 12);

	/* obteniendo la penultima fecha hasta donde llegan los años completos */
	let fechaPenultimaAniosCompletos = moment(inicio).add(duracionMeses, 'month');

	/* sacamos el dia y el mes de la penultima fecha */
	let diaPenultimaFecha = Number(moment(fechaPenultimaAniosCompletos).format('DD'));
	let mesPenultimaFecha = Number(moment(fechaPenultimaAniosCompletos).format('MM'));
	//console.log(mesPenultimaFecha);

	/* sacamos el dia y el mes de la fecha finfechaDejaPercibir(FECHA DE CÁLCULO) */
	let diaFinFechaDejaPercibir = Number(moment(fin).format('DD'));
	let mesFinFechaDejaPercibir = Number(moment(fin).format('MM'));
	//console.log(mesFinFechaDejaPercibir);

	/* comparamos meses de mesPenultimaFecha y mesFinFechaDejaPercibir */

	if (mesPenultimaFecha == mesFinFechaDejaPercibir) {
		let diferenciaFechasEnDias = diaFinFechaDejaPercibir - diaPenultimaFecha;

		if (tipoSalario.value == 'INTEGRADO') {
			tiempoDejadoDePercibirIntegrado.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			haberesDejadosPercibirIntegrado.value = (salarioIntegradoAnual.value * duracionAnios + salarioIntegradoMensual.value * mesesRestantes + salarioIntegradoDiario.value * diferenciaFechasEnDias).toFixed(2);
			haberesDejadosPercibirIntegradoText.value = formatearNumero(haberesDejadosPercibirIntegrado.value);
		
		}
		if (tipoSalario.value == 'BASE') {
			tiempoDejadoDePercibirBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			haberesDejadosPercibirBase.value = (salarioBaseAnual.value * duracionAnios + salarioBaseMensual.value * mesesRestantes + salarioBaseDiario.value * diferenciaFechasEnDias).toFixed(2);
			haberesDejadosPercibirBaseText.value = formatearNumero(haberesDejadosPercibirBase.value);
		
		}
		if (tipoSalario.value == 'AMBOS') {
			tiempoDejadoDePercibirIntegrado.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			tiempoDejadoDePercibirBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			haberesDejadosPercibirIntegrado.value = (salarioIntegradoAnual.value * duracionAnios + salarioIntegradoMensual.value * mesesRestantes + salarioIntegradoDiario.value * diferenciaFechasEnDias).toFixed(2);
			haberesDejadosPercibirBase.value = (salarioBaseAnual.value * duracionAnios + salarioBaseMensual.value * mesesRestantes + salarioBaseDiario.value * diferenciaFechasEnDias).toFixed(2);
			
			/* calculo para salario integral */
			haberesDejadosPercibirIntegradoText.value = formatearNumero(haberesDejadosPercibirIntegrado.value);
			
		}

	} else {

		let diferenciaFechasEnDias = (30 - diaPenultimaFecha) + diaFinFechaDejaPercibir;
		if (tipoSalario.value == 'INTEGRADO') {
			tiempoDejadoDePercibirIntegrado.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			haberesDejadosPercibirIntegrado.value = (salarioIntegradoAnual.value * duracionAnios + salarioIntegradoMensual.value * mesesRestantes + salarioIntegradoDiario.value * diferenciaFechasEnDias).toFixed(2);
			haberesDejadosPercibirIntegradoText.value = formatearNumero(haberesDejadosPercibirIntegrado.value);
			
		}
		if (tipoSalario.value == 'BASE') {
			tiempoDejadoDePercibirBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			haberesDejadosPercibirBase.value = (salarioBaseAnual.value * duracionAnios + salarioBaseMensual.value * mesesRestantes + salarioBaseDiario.value * diferenciaFechasEnDias).toFixed(2);
			haberesDejadosPercibirBaseText.value = formatearNumero(haberesDejadosPercibirBase.value);
			
		}
		if (tipoSalario.value == 'AMBOS') {
			tiempoDejadoDePercibirIntegrado.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			tiempoDejadoDePercibirBase.value = duracionAnios + ' año(s) ' + mesesRestantes + ' mes(es) ' + diferenciaFechasEnDias + ' día(s)';
			haberesDejadosPercibirIntegrado.value = (salarioIntegradoAnual.value * duracionAnios + salarioIntegradoMensual.value * mesesRestantes + salarioIntegradoDiario.value * diferenciaFechasEnDias).toFixed(2);
			haberesDejadosPercibirBase.value = (salarioBaseAnual.value * duracionAnios + salarioBaseMensual.value * mesesRestantes + salarioBaseDiario.value * diferenciaFechasEnDias).toFixed(2);
			
			/* calculo para salario integral */
			haberesDejadosPercibirIntegradoText.value = formatearNumero(haberesDejadosPercibirIntegrado.value);
			
			/* calculo para salario base */
			haberesDejadosPercibirBaseText.value = formatearNumero(haberesDejadosPercibirBase.value);
		
		}

	}

}

/* ESCOGIENDO EL TIPO DE PRIMA VACACIONAL */
function opcionPrimaVacacional() {

	if (primaVacacional.value == 'FIJA') {

		let respPrima = document.getElementById('respPrima');
		let input = document.createElement('input');
		let label = document.createElement('label');

		/* propiedades del label */
		label.textContent = 'CANTIDAD'
		label.style.textAlign = 'center';
		label.style.fontSize = '10px';

		/* propiedades del input */
		input.type = 'number';
		input.min = 0;
		input.id = 'cantidadPrimaVacacionalFija';
		input.style.width = '100%';
		input.style.fontSize = '12px';
		input.style.marginTop = '3px';
		input.setAttribute('step', 'any');
		/* metemos una funcion para calcular la prima fija */
		input.setAttribute('oninput', 'primaFija()');
		respPrima.innerHTML = '';
		respPrima.appendChild(label);
		respPrima.appendChild(input);
	}

	if (primaVacacional.value == 'CALCULADA') {

		let respPrima = document.getElementById('respPrima');

		let select = document.createElement('select');
		let porDefecto = document.createElement('option');
		let opcion1 = document.createElement('option');
		let opcion2 = document.createElement('option');
		let label = document.createElement('label');

		/* propiedades del label */
		label.textContent = 'PORCENTAJE'
		label.style.textAlign = 'center';
		label.style.fontSize = '9px';
		label.style.letterSpacing = '2px';

		/* propiedades del select */

		select.style.width = '100%';
		select.style.fontSize = '12px';
		select.style.textAlign = 'center';

		select.id = 'primaVacacionalPorcentaje';
		/* metemos una funcion para calcular la prima calculada */
		select.setAttribute('onchange', 'primaCalculada()');

		/* propiedades a las opciones */
		porDefecto.textContent = '%';
		porDefecto.selected = true;
		porDefecto.disabled = true;
		opcion1.textContent = '30%';
		opcion1.value = 30;
		opcion2.textContent = '25%';
		opcion2.value = 25;

		/* agregando las opciones al select */
		select.appendChild(porDefecto);
		select.appendChild(opcion1);
		select.appendChild(opcion2);

		respPrima.innerHTML = '';
		respPrima.appendChild(label);
		respPrima.appendChild(select);

	}

}

/* ######## EMPIEZA MODIFICACIONES DESDE AQUI PARA AGREGAR EL FALTANTE DE DIAS ########### */
/* PRIMA VACACIONAL FIJA */
function primaFija() {
	/* leyendo el tiempo dejado de percibir */
	let regex = /(\d+)/g;
	
	/* HECEMOS EL CÁLCULO PARA TOMAER EN CUENTA LOS DIAS DE LA FECHA DE BAJA/DEJA DE PERCIBIR HACIA ATRAS*/
	let diaDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('DD'));
	let mesDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('MM'));
	let diasRestantes = (mesDeFechaCalculo - 1) * 30 + diaDeFechaCalculo;
	

	if (tipoSalario.value == 'INTEGRADO') {
		let name = tiempoDejadoDePercibirIntegrado.value;
		primaVacionalIntegrada.value = cantidadPrimaVacacionalFija.value;
		primaVacionalIntegradaText.value = formatearNumero(primaVacionalIntegrada.value);
		
		let faltante =((2*primaVacionalIntegrada.value)/360)* diasRestantes;
		
		primaVacacionalTotalIntegrada.value = ((2 * primaVacionalIntegrada.value * name.match(regex)[0]) + (2 * primaVacionalIntegrada.value / 12) * name.match(regex)[1] + (2 * primaVacionalIntegrada.value / 360) * name.match(regex)[2] + faltante).toFixed(2);
		primaVacacionalTotalIntegradaText.value = formatearNumero(primaVacacionalTotalIntegrada.value);
		
		console.log(faltante);
		
	
	}
	if (tipoSalario.value == 'BASE') {
		let name = tiempoDejadoDePercibirBase.value;
		primaVacionalBase.value = cantidadPrimaVacacionalFija.value;
		primaVacionalBaseText.value = formatearNumero(primaVacionalBase.value);
		
		let faltanteDos =((2*primaVacionalBase.value)/360)* diasRestantes;
		
		primaVacacionalTotalBase.value = ((2 * primaVacionalBase.value * name.match(regex)[0]) + (2 * primaVacionalBase.value / 12) * name.match(regex)[1] + (2 * primaVacionalBase.value / 360) * name.match(regex)[2] + faltanteDos).toFixed(2);
		primaVacacionalTotalBaseText.value = formatearNumero(primaVacacionalTotalBase.value);
		
		console.log(faltanteDos);
		
	}
	if (tipoSalario.value == 'AMBOS') {
	    
		let name = tiempoDejadoDePercibirIntegrado.value;
		
		primaVacionalIntegrada.value = cantidadPrimaVacacionalFija.value;
		primaVacionalIntegradaText.value = formatearNumero(primaVacionalIntegrada.value);
		
		/* calculando prima vacacional total integrada */
		let faltante =((2*primaVacionalIntegrada.value)/360)* diasRestantes;
		primaVacacionalTotalIntegrada.value = ((2 * primaVacionalIntegrada.value * name.match(regex)[0]) + (2 * primaVacionalIntegrada.value / 12) * name.match(regex)[1] + (2 * primaVacionalIntegrada.value / 360) * name.match(regex)[2] + faltante).toFixed(2);
		primaVacacionalTotalIntegradaText.value = formatearNumero(primaVacacionalTotalIntegrada.value);
		
		console.log(faltante);
		
		primaVacionalBase.value = cantidadPrimaVacacionalFija.value;
		primaVacionalBaseText.value = formatearNumero(primaVacionalBase.value);
		
		/* calculando prima vacacional total base */
		let faltanteDos =((2*primaVacionalBase.value)/360)* diasRestantes;
		primaVacacionalTotalBase.value = ((2 * primaVacionalBase.value * name.match(regex)[0]) + (2 * primaVacionalBase.value / 12) * name.match(regex)[1] + (2 * primaVacionalBase.value / 360) * name.match(regex)[2] + faltanteDos).toFixed(2);
		primaVacacionalTotalBaseText.value = formatearNumero(primaVacacionalTotalBase.value);
		
		console.log(faltanteDos);
	}

}

/* PRIMA VACACIONAL CALCULADA */
function primaCalculada() {
    
        /* HECEMOS EL CÁLCULO PARA TOMAER EN CUENTA LOS DIAS DE LA FECHA DE BAJA/DEJA DE PERCIBIR HACIA ATRAS*/
    	let diaDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('DD'));
    	let mesDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('MM'));
    	let diasRestantes = (mesDeFechaCalculo - 1) * 30 + diaDeFechaCalculo;
    	

	if (primaVacacionalPorcentaje.value == 30) {
		/* leyendo el tiempo dejado de percibir */
		let regex = /(\d+)/g;
		
		if (tipoSalario.value == 'INTEGRADO') {
			let name = tiempoDejadoDePercibirIntegrado.value;
			primaVacionalIntegrada.value = (0.3 * salarioIntegradoQuincenal.value).toFixed(2);
			primaVacionalIntegradaText.value = formatearNumero(primaVacionalIntegrada.value);
			
			let faltante =((2*primaVacionalIntegrada.value)/360)* diasRestantes;
			
			console.log(faltante)
			
			/* sacando prima vacacional total */
			primaVacacionalTotalIntegrada.value = ((2*primaVacionalIntegrada.value * name.match(regex)[0]) + (2*primaVacionalIntegrada.value / 12) * name.match(regex)[1] + (2*primaVacionalIntegrada.value / 360) * name.match(regex)[2] + faltante).toFixed(2);
			primaVacacionalTotalIntegradaText.value = formatearNumero(primaVacacionalTotalIntegrada.value);

		}
		if (tipoSalario.value == 'BASE') {
			let name = tiempoDejadoDePercibirBase.value;
			primaVacionalBase.value = (0.3 * salarioBaseQuincenal.value).toFixed(2);
			primaVacionalBaseText.value = formatearNumero(primaVacionalBase.value);
			
			let faltanteDos =((2*primaVacionalBase.value)/360)* diasRestantes;
			
			console.log(faltanteDos)
			
			/* sacando prima vacacional total */
			primaVacacionalTotalBase.value = ((2*primaVacionalBase.value * name.match(regex)[0]) + (2*primaVacionalBase.value / 12) * name.match(regex)[1] + (2*primaVacionalBase.value / 360) * name.match(regex)[2] + faltanteDos).toFixed(2);
			primaVacacionalTotalBaseText.value = formatearNumero(primaVacacionalTotalBase.value);
			
		}
		if (tipoSalario.value == 'AMBOS') {
			let name = tiempoDejadoDePercibirIntegrado.value;
			
			/* salario integrado mensual */
			primaVacionalIntegrada.value = (0.3 * salarioIntegradoQuincenal.value).toFixed(2);
			primaVacionalIntegradaText.value = formatearNumero(primaVacionalIntegrada.value);
			
			let faltante =((2*primaVacionalIntegrada.value)/360)* diasRestantes;
			
			console.log(faltante + ' Prima Integral')
			
			/* sacando prima vacacional total */
			primaVacacionalTotalIntegrada.value = ((2*primaVacionalIntegrada.value * name.match(regex)[0]) + (2*primaVacionalIntegrada.value / 12) * name.match(regex)[1] + (2*primaVacionalIntegrada.value / 360) * name.match(regex)[2] + faltante).toFixed(2);
			primaVacacionalTotalIntegradaText.value = formatearNumero(primaVacacionalTotalIntegrada.value);
			
			/* salario base mensual */
			primaVacionalBase.value = (0.3 * salarioBaseQuincenal.value).toFixed(2);
			primaVacionalBaseText.value = formatearNumero(primaVacionalBase.value);
			
			let faltanteDos =((2*primaVacionalBase.value)/360)* diasRestantes;
			
			console.log(faltanteDos + ' Prima Base')
			
			/* sacando prima vacacional total */
			primaVacacionalTotalBase.value = ((2*primaVacionalBase.value * name.match(regex)[0]) + (2*primaVacionalBase.value / 12) * name.match(regex)[1] + (2*primaVacionalBase.value / 360) * name.match(regex)[2] + faltanteDos).toFixed(2);
			primaVacacionalTotalBaseText.value = formatearNumero(primaVacacionalTotalBase.value);
			
		}

	}
	if (primaVacacionalPorcentaje.value == 25) {
		let regex = /(\d+)/g;
		if (tipoSalario.value == 'INTEGRADO') {
			let name = tiempoDejadoDePercibirIntegrado.value;
			primaVacionalIntegrada.value = (0.25 * salarioIntegradoQuincenal.value).toFixed(2);
			primaVacionalIntegradaText.value = formatearNumero(primaVacionalIntegrada.value);
			
			let faltante =((2*primaVacionalIntegrada.value)/360)* diasRestantes;
			
			console.log(faltante)
			
			/* sacando prima vacacional total */
			primaVacacionalTotalIntegrada.value = ((2*primaVacionalIntegrada.value * name.match(regex)[0]) + (2*primaVacionalIntegrada.value / 12) * name.match(regex)[1] + (2*primaVacionalIntegrada.value / 360) * name.match(regex)[2] + faltante).toFixed(2);
			primaVacacionalTotalIntegradaText.value = formatearNumero(primaVacacionalTotalIntegrada.value);

		}
		if (tipoSalario.value == 'BASE') {
			let name = tiempoDejadoDePercibirBase.value;
			primaVacionalBase.value = (0.25 * salarioBaseQuincenal.value).toFixed(2);
			primaVacionalBaseText.value = formatearNumero(primaVacionalBase.value);
			
			let faltanteDos =((2*primaVacionalBase.value)/360)* diasRestantes;
			
			console.log(faltanteDos)
			
			/* sacando prima vacacional total */
			primaVacacionalTotalBase.value = ((2*primaVacionalBase.value * name.match(regex)[0]) + (2*primaVacionalBase.value / 12) * name.match(regex)[1] + (2*primaVacionalBase.value / 360) * name.match(regex)[2] + faltanteDos).toFixed(2);
			primaVacacionalTotalBaseText.value = formatearNumero(primaVacacionalTotalBase.value);

		}
		if (tipoSalario.value == 'AMBOS') {
			let name = tiempoDejadoDePercibirIntegrado.value;
			
			/* salario integrado mensual */
			primaVacionalIntegrada.value = (0.25 * salarioIntegradoQuincenal.value).toFixed(2);
			primaVacionalIntegradaText.value = formatearNumero(primaVacionalIntegrada.value);
			
			let faltante =((2*primaVacionalIntegrada.value)/360)* diasRestantes;
			
			console.log(faltante + ' Prima Integral')
			
			/* sacando prima vacacional total */
			primaVacacionalTotalIntegrada.value = ((2*primaVacionalIntegrada.value * name.match(regex)[0]) + (2*primaVacionalIntegrada.value / 12) * name.match(regex)[1] + (2*primaVacionalIntegrada.value / 360) * name.match(regex)[2] + faltante).toFixed(2);
			primaVacacionalTotalIntegradaText.value = formatearNumero(primaVacacionalTotalIntegrada.value);
			
			/* salario base mensual */
			primaVacionalBase.value = (0.25 * salarioBaseQuincenal.value).toFixed(2);
			primaVacionalBaseText.value = formatearNumero(primaVacionalBase.value);
			
		    let faltanteDos =((2*primaVacionalBase.value)/360)* diasRestantes;
		    
		    console.log(faltanteDos + ' Prima Base')
			
			/* sacando prima vacacional total */
			primaVacacionalTotalBase.value = ((2*primaVacionalBase.value * name.match(regex)[0]) + (2*primaVacionalBase.value / 12) * name.match(regex)[1] + (2*primaVacionalBase.value / 360) * name.match(regex)[2] + faltanteDos).toFixed(2);
			primaVacacionalTotalBaseText.value = formatearNumero(primaVacacionalTotalBase.value);

		}

	}

}

/* ESCOGIENDO EL TIPO DE AGUINALDO */
function opcionAguinaldo() {

	let tipoAguinaldo = document.getElementById('tipoAguinaldo');
	if (tipoAguinaldo.value == 'FIJO') {

		let respAguinaldo = document.getElementById('respAguinaldo');

		let input = document.createElement('input');
		let label = document.createElement('label');

		/* propiedades del label */
		label.textContent = 'CANTIDAD'
		label.style.textAlign = 'center';
		label.style.fontSize = '9px';

		/* propiedades del input */
		input.type = 'number';
		input.min = 1;
		input.id = 'cantidadAguinaldoFijo';
		input.style.width = '100%';
		input.style.fontSize = '12px';
		input.style.marginTop = '3px';
		input.setAttribute('step', 'any');
		/* metemos una funcion para calcular aguinaldo */
		input.setAttribute('oninput', 'aguinaldoFijo()');
		respAguinaldo.innerHTML = '';
		respAguinaldo.appendChild(label);
		respAguinaldo.appendChild(input);
	}

	if (tipoAguinaldo.value == 'CALCULADO') {

		let respAguinaldo = document.getElementById('respAguinaldo');

		let input = document.createElement('input');
		let label = document.createElement('label');

		/* propiedades del label */
		label.textContent = 'DÍAS DE AGUINALDO'
		label.style.textAlign = 'center';
		label.style.fontSize = '10px';

		/* propiedades del input */
		input.type = 'number';
		input.min = 1;
		input.id = 'diasAguinaldoCalculado';
		input.style.width = '100%';
		input.style.fontSize = '12px';
		input.style.marginTop = '3px';
		input.style.textAlign = 'center';
		input.setAttribute('step', 'any');
		/* metemos una funcion para calcular aguinaldo calculado */
		input.setAttribute('oninput', 'aguinaldoCalculado()');
		respAguinaldo.innerHTML = '';
		respAguinaldo.appendChild(label);
		respAguinaldo.appendChild(input);



	}

}

/* CALCULO AGUINALDO FIJO */
function aguinaldoFijo() {
    let name = tiempoDejadoDePercibirIntegrado.value;
    let name_dos = tiempoDejadoDePercibirBase.value;
    
    /* leyendo el tiempo dejado de percibir */
	let regex = /(\d+)/g;
	
	let cantidadAguinaldoFijo = document.getElementById('cantidadAguinaldoFijo');
	let aguinaldoxAnioIntegral = document.getElementById('aguinaldoxAnioIntegral');
	
	/* HACEMOS EL CÁLCULO PARA TOMAR EN CUENTA LOS DIAS DE LA FECHA DE BAJA/DEJA DE PERCIBIR HACIA ATRAS*/
	let diaDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('DD'));
	let mesDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('MM'));
	let diasRestantes = (mesDeFechaCalculo - 1) * 30 + diaDeFechaCalculo;
	
	
	if (salarioIntegradoDiario.value != '') {
		aguinaldoxAnioIntegral.value = cantidadAguinaldoFijo.value;
		aguinaldoxAnioIntegralText.value = formatearNumero(aguinaldoxAnioIntegral.value);
		
		let faltante =((aguinaldoxAnioIntegral.value)/360)* diasRestantes;
		
		console.log(faltante)
		
		aguinaldoTotalIntegral.value = ((name.match(regex)[0] * aguinaldoxAnioIntegral.value) + (name.match(regex)[1] * aguinaldoxAnioIntegral.value / 12) + (name.match(regex)[2] * aguinaldoxAnioIntegral.value / 360) + faltante).toFixed(2);
		aguinaldoTotalIntegralText.value = formatearNumero(aguinaldoTotalIntegral.value);
		
		/* calculando las demas prestaciones monto total */
		
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);
		
		/* CALCULANDO EL TOTAL DEL SALARIO INTEGRADO */
		
		totalSalarioIntegrado.value = Number(indeminizacionConstitucionalIntegral.value) + Number(demasPrestacionesIntegral.value);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
	}
	if (salarioBaseDiario.value != '') {
		aguinaldoxanioBase.value = cantidadAguinaldoFijo.value;
		aguinaldoxanioBaseText.value = formatearNumero(aguinaldoxanioBase.value);
		
		let faltante =((aguinaldoxanioBase.value)/360)* diasRestantes;
		
		console.log(faltante)
		
		aguinaldoTotalBase.value = ((name_dos.match(regex)[0] * aguinaldoxanioBase.value) + (name_dos.match(regex)[1] * aguinaldoxanioBase.value / 12) + (name_dos.match(regex)[2] * aguinaldoxanioBase.value / 360) + faltante).toFixed(2);
		aguinaldoTotalBaseText.value = formatearNumero(aguinaldoTotalBase.value);
		
		/* calculando las demas prestaciones monto total */
		
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);
		
		
		/* CALCULANDO EL TOTAL DEL SALARIO BASE */
		
		totalSalarioBase.value = Number(indeminizacionConstitucionalBase.value) + Number(demasPrestacionesBase.value);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
	}
}

/* CALCULO AGUINALDO CALCULADO */
function aguinaldoCalculado() {
    
     let name = tiempoDejadoDePercibirIntegrado.value;
    let name_dos = tiempoDejadoDePercibirBase.value;
    
    /* leyendo el tiempo dejado de percibir */
	let regex = /(\d+)/g;

	let diasAguinaldoCalculado = document.getElementById('diasAguinaldoCalculado');
	let aguinaldoxAnioIntegral = document.getElementById('aguinaldoxAnioIntegral');
	
	/* HACEMOS EL CÁLCULO PARA TOMAR EN CUENTA LOS DIAS DE LA FECHA DE BAJA/DEJA DE PERCIBIR HACIA ATRAS*/
	let diaDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('DD'));
	let mesDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('MM'));
	let diasRestantes = (mesDeFechaCalculo - 1) * 30 + diaDeFechaCalculo;

	if (salarioIntegradoDiario.value != '') {
		let aguinaldoCalculado = (diasAguinaldoCalculado.value * salarioIntegradoDiario.value).toFixed(2);
		aguinaldoxAnioIntegral.value = aguinaldoCalculado;
		aguinaldoxAnioIntegralText.value = formatearNumero(aguinaldoxAnioIntegral.value);
		
		let faltante =((aguinaldoxAnioIntegral.value)/360)* diasRestantes;
		
		console.log(faltante)
		
		aguinaldoTotalIntegral.value = ((name.match(regex)[0] * aguinaldoxAnioIntegral.value) + (name.match(regex)[1] * aguinaldoxAnioIntegral.value / 12) + (name.match(regex)[2] * aguinaldoxAnioIntegral.value / 360) + faltante).toFixed(2);
		aguinaldoTotalIntegralText.value = formatearNumero(aguinaldoTotalIntegral.value);
		
		/* calculando las demas prestaciones monto total */
		
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);
		
		
		/* CALCULANDO EL TOTAL DEL SALARIO INTEGRADO */
		
		totalSalarioIntegrado.value = Number(indeminizacionConstitucionalIntegral.value) + Number(demasPrestacionesIntegral.value);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);

	}
	if (salarioBaseDiario.value != '') {
		let aguinaldoCalculado = (diasAguinaldoCalculado.value * salarioBaseDiario.value).toFixed(2);
		aguinaldoxanioBase.value = aguinaldoCalculado;
		aguinaldoxanioBaseText.value = formatearNumero(aguinaldoxanioBase.value);
		
		let faltante =((aguinaldoxanioBase.value)/360)* diasRestantes;
		
		console.log(faltante)
		
		aguinaldoTotalBase.value = ((name_dos.match(regex)[0] * aguinaldoxanioBase.value) + (name_dos.match(regex)[1] * aguinaldoxanioBase.value / 12) + (name_dos.match(regex)[2] * aguinaldoxanioBase.value / 360) + faltante).toFixed(2);
		aguinaldoTotalBaseText.value = formatearNumero(aguinaldoTotalBase.value);
		
		/* calculando las demas prestaciones monto total */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);
		
		/* CALCULANDO EL TOTAL DEL SALARIO BASE */
		totalSalarioBase.value = Number(indeminizacionConstitucionalBase.value) + Number(demasPrestacionesBase.value);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
	}

}
/* ############## TERMINA MODIFICACIONES HASTA AQUI PARA AGREGAR EL FALTANTE DE DIAS ############ */

/* CALCULO DEL FONDO DE AHORRO */
function fondoDeahorro() {
	/* SACANDO LA APORTACIÓN PATRONAL */
	descuentoQuincenalTex.value = formatearNumero(descuentoQuincenal.value);
	let aportacionPatronalAnual = descuentoQuincenal.value * 24;
	let aportacionPatronalMensual = descuentoQuincenal.value * 2;
	let aportacionPatronalDiario = descuentoQuincenal.value / 15;
	/* sacando el tiempo dejado de percibir */
	let regex = /(\d+)/g;
	if (tipoSalario.value == 'INTEGRADO') {
		let name = tiempoDejadoDePercibirIntegrado.value;
		let aportacionXaniosCompletos = (name.match(regex)[0] * aportacionPatronalAnual).toFixed(2);
		let aportacionXmesesCompletos = (name.match(regex)[1] * aportacionPatronalMensual).toFixed(2);
		let aportacionXdias = (name.match(regex)[2] * aportacionPatronalDiario).toFixed(2);
		
		/* APORTACIÓN PATRONAL */
		let aportacionPatronalTotal = Number(aportacionXaniosCompletos) + Number(aportacionXmesesCompletos) + Number(aportacionXdias);
		//aportacionPatronal.value = aportacionPatronalTotal;
		

		/* APORTACION DEL SERVIDOR EN EL ULTIMO AÑO */
		let diaDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('DD'));
		let mesDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('MM'));
		let diasQueAportaServidorPublico = (mesDeFechaCalculo - 1) * 30 + diaDeFechaCalculo;
		
		//SACAMOS EL NUMERO DE QUINCENAS COMPLETAS DEL SERVIDOR EN EL ULTIMO AÑO
		let numeroQuincenas = parseInt(diasQueAportaServidorPublico/15);
		
		aportacionServidor.value = numeroQuincenas * descuentoQuincenal.value;
		aportacionServidorText.value = formatearNumero(aportacionServidor.value);
		
		//MODIFICANDO LA APORTACION PATRONAL, SUMANDOLE TAMBIEN EL AJUSTE
		aportacionPatronal.value = aportacionPatronalTotal + Number(diasQueAportaServidorPublico * aportacionPatronalDiario);
		aportacionPatronalText.value = formatearNumero(aportacionPatronal.value);
		
		/* APORTACIÓN TOTAL*/
		aportacionTotal.value = Number(aportacionPatronal.value) + Number(aportacionServidor.value);
		aportacionTotalText.value = formatearNumero(aportacionTotal.value);
		

	}
	if (tipoSalario.value == 'BASE' || tipoSalario.value == 'AMBOS') {
		let name = tiempoDejadoDePercibirBase.value;
		let aportacionXaniosCompletos = (name.match(regex)[0] * aportacionPatronalAnual).toFixed(2);
		let aportacionXmesesCompletos = (name.match(regex)[1] * aportacionPatronalMensual).toFixed(2);
		let aportacionXdias = (name.match(regex)[2] * aportacionPatronalDiario).toFixed(2);
		
		/* APORTACIÓN PATRONAL */
		let aportacionPatronalTotal = Number(aportacionXaniosCompletos) + Number(aportacionXmesesCompletos) + Number(aportacionXdias);
		//aportacionPatronal.value = aportacionPatronalTotal;
		
		/* APORTACION DEL SERVIDOR EN EL ULTIMO AÑO */
		let diaDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('DD'));
		let mesDeFechaCalculo = Number(moment(iniciofechaDejaPercibir.value).format('MM'));
		let diasQueAportaServidorPublico = (mesDeFechaCalculo - 1) * 30 + diaDeFechaCalculo;
		
		//SACAMOS EL NUMERO DE QUINCENAS COMPLETAS DEL SERVIDOR EN EL ULTIMO AÑO
		let numeroQuincenas = parseInt(diasQueAportaServidorPublico/15);
		
		aportacionServidor.value = numeroQuincenas * descuentoQuincenal.value;
		aportacionServidorText.value = formatearNumero(aportacionServidor.value);
		
		//MODIFICANDO LA APORTACION PATRONAL, SUMANDOLE TAMBIEN EL AJUSTE
		aportacionPatronal.value = aportacionPatronalTotal + Number(diasQueAportaServidorPublico * aportacionPatronalDiario);
		aportacionPatronalText.value = formatearNumero(aportacionPatronal.value);
		
		/* APORTACIÓN TOTAL*/
		aportacionTotal.value = Number(aportacionPatronal.value) + Number(aportacionServidor.value);
		aportacionTotalText.value = formatearNumero(aportacionTotal.value);
	}

}

/* AGREGANDO FONDO DE AHORRO */
/* MODIFIQUE ESTA SECCIÓN PARA ACTUALIZAR VALORES */
function agregarFondo() {

	document.getElementById('btnAddBono').disabled = true;
	document.getElementById('btnDeleteBono').disabled = false;
	//console.log('agregar desactivado')

	if (tipoSalario.value == 'INTEGRADO') {

		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) + Number(aportacionTotal.value);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value)+ Number(aportacionTotal.value));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

	}
	if (tipoSalario.value == 'BASE') {

		totalSalarioBase.value = Number(totalSalarioBase.value) + Number(aportacionTotal.value);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value)+ Number(aportacionTotal.value));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);

	}
	if (tipoSalario.value == 'AMBOS') {

		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) + Number(aportacionTotal.value);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value) + Number(aportacionTotal.value));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

		totalSalarioBase.value = Number(totalSalarioBase.value) + Number(aportacionTotal.value);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value) + Number(aportacionTotal.value));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);

	}

}

/* QUITANDO FONDO DE AHORRO */
/* MODIFIQUE ESTA SECCIÓN PARA ACTUALIZAR VALORES */
function quitarFondo() {

	document.getElementById('btnAddBono').disabled = false;
	document.getElementById('btnDeleteBono').disabled = true;

	if (tipoSalario.value == 'INTEGRADO') {

		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) - Number(aportacionTotal.value);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value) - Number(aportacionTotal.value));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

	}
	if (tipoSalario.value == 'BASE') {

		totalSalarioBase.value = Number(totalSalarioBase.value) - Number(aportacionTotal.value);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value) - Number(aportacionTotal.value));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);

	}
	if (tipoSalario.value == 'AMBOS') {

		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) - Number(aportacionTotal.value);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value) - Number(aportacionTotal.value));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

		totalSalarioBase.value = Number(totalSalarioBase.value) - Number(aportacionTotal.value);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value) - Number(aportacionTotal.value));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);

	}

}

function agregarMontoBonos() {

	document.getElementById('btnAdd').disabled = true;
	document.getElementById('btnDelete').disabled = false;

	let sumaDeBonos = 0;

	if (document.getElementById('totalxBonos1')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos1.value);

	}
	if (document.getElementById('totalxBonos2')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos2.value);

	}
	if (document.getElementById('totalxBonos3')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos3.value);

	}
	if (document.getElementById('totalxBonos4')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos4.value);

	}
	if (document.getElementById('totalxBonos5')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos5.value);

	}

	if (tipoSalario.value == 'INTEGRADO') {

		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) + sumaDeBonos;
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value) + Number(aportacionTotal.value) + Number(sumaDeBonos));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

	}
	if (tipoSalario.value == 'BASE') {

		totalSalarioBase.value = Number(totalSalarioBase.value) + sumaDeBonos;
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value) + Number(aportacionTotal.value) + Number(sumaDeBonos));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);
		

	}
	if (tipoSalario.value == 'AMBOS') {

		/* SUMANDO BONOS A SALARIO TOTAL INTEGRADO */
		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) + sumaDeBonos;
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value) + Number(aportacionTotal.value) + Number(sumaDeBonos));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

		/* SUMANDO BONOS A SALARIO TOTAL BASE */
		totalSalarioBase.value = Number(totalSalarioBase.value) + sumaDeBonos;
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value) + Number(aportacionTotal.value) + Number(sumaDeBonos));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);

	}

}

function quitarMontoBonos() {

	document.getElementById('btnAdd').disabled = false;
	document.getElementById('btnDelete').disabled = true;

	let sumaDeBonos = 0;

	if (document.getElementById('totalxBonos1')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos1.value);

	}
	if (document.getElementById('totalxBonos2')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos2.value);

	}
	if (document.getElementById('totalxBonos3')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos3.value);

	}
	if (document.getElementById('totalxBonos4')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos4.value);

	}
	if (document.getElementById('totalxBonos5')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos5.value);

	}

	if (tipoSalario.value == 'INTEGRADO') {

		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) - Number(sumaDeBonos);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value) + Number(aportacionTotal.value) - Number(sumaDeBonos));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

	}
	if (tipoSalario.value == 'BASE') {

		totalSalarioBase.value = Number(totalSalarioBase.value) - Number(sumaDeBonos);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value) + Number(aportacionTotal.value) - Number(sumaDeBonos));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);

	}
	if (tipoSalario.value == 'AMBOS') {

		totalSalarioIntegrado.value = Number(totalSalarioIntegrado.value) - Number(sumaDeBonos);
		totalSalarioIntegradoText.value = formatearNumero(totalSalarioIntegrado.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES*/
		demasPrestacionesIntegral.value = (Number(haberesDejadosPercibirIntegrado.value) + Number(aguinaldoTotalIntegral.value) + Number(primaVacacionalTotalIntegrada.value) + Number(aportacionTotal.value) - Number(sumaDeBonos));
		demasPrestacionesIntegralText.value = formatearNumero(demasPrestacionesIntegral.value);

		totalSalarioBase.value = Number(totalSalarioBase.value) - Number(sumaDeBonos);
		totalSalarioBaseText.value = formatearNumero(totalSalarioBase.value);
		
		/* AGREGUE ESTO PARA ACTUALIZAR LAS DEMAS PRESTACIONES */
		demasPrestacionesBase.value = (Number(haberesDejadosPercibirBase.value) + Number(aguinaldoTotalBase.value) + Number(primaVacacionalTotalBase.value) + Number(aportacionTotal.value) - Number(sumaDeBonos));
		demasPrestacionesBaseText.value = formatearNumero(demasPrestacionesBase.value);

	}

}

/* SECCION DE BONOS */

let contador = 1;

function agregarBono() {
	let padre = document.getElementById('crearBono');
	let section = document.createElement('section');
	let cerrarVentana = document.createElement('span');
	let labelNombre = document.createElement('label');
	let labelCantidad = document.createElement('label');
	let inputNombre = document.createElement('input');
	let inputCantidad = document.createElement('input');
	let labelDia = document.createElement('label');
	let dia = document.createElement('input');
	let labelMes = document.createElement('label');
	let mes = document.createElement('input'); /* aqui empieza el calculo de los numeros de bonos que le toca */
	let labelNumeroDeBonos = document.createElement('label');
	let numeroDeBonos = document.createElement('input');
	let labelTotalxBonos = document.createElement('label');
	let totalxBonos = document.createElement('input');
	let caja1 = document.createElement('div');
	let caja2 = document.createElement('div');

	/* caracteristicas de los span cerrar ventana */
	cerrarVentana.className = 'icon solid major fa-times-circle';
	cerrarVentana.setAttribute('onclick', 'removerBono(this)');
	/* caracteristicas al label nombre */
	labelNombre.setAttribute('for', 'nombreDelBono' + contador);
	labelNombre.textContent = 'NOMBRE DEL BONO';
	/* caracteristicas al label cantidad */
	labelCantidad.setAttribute('for', 'cantidadDelBono' + contador);
	labelCantidad.textContent = 'CANTIDAD';
	/* caracteristicas al input nombre */
	inputNombre.type = 'text';
	inputNombre.id = 'inputNombreBono' + contador;
	inputNombre.name = 'inputNombreBono' + contador;
	//inputNombre.setAttribute('oninput', 'mayuscula()');
	//inputNombre.form = 'formReporte';
	/* caracteristicas al input cantidad */
	inputCantidad.type = 'number';
	inputCantidad.id = 'cantidadBono' + contador;
	inputCantidad.name = 'cantidadBono' + contador;
	inputCantidad.min = 1;
	inputCantidad.setAttribute('step', 'any');
	//inputCantidad.form = 'formReporte';
	/* caracteristicas del label dia */
	labelDia.textContent = 'DÍA';
	labelDia.setAttribute('for', 'dia' + contador)
	/* caracteristicas del input dia */
	dia.id = 'dia' + contador;
	dia.name = 'dia' + contador;
	dia.type = 'number';
	dia.min = 1;
	dia.placeholder = 'Ejemplo "01"';
	/* caracteristicas del label mes */
	labelMes.textContent = 'MES';
	labelMes.setAttribute('for', 'mes' + contador)
	/* caracteristicas del mes */
	mes.id = 'mes' + contador;
	mes.name = 'mes' + contador;
	mes.type = 'number';
	mes.min = 1;
	mes.placeholder = 'Ejemplo "10"';
	/* caracteristicas del label numero de bonos */
	labelNumeroDeBonos.textContent = 'NÚMERO DE BONOS';
	labelNumeroDeBonos.setAttribute('for', 'numeroDeBonos' + contador)
	/* caracteristicas al input numero de bonos */
	numeroDeBonos.type = 'number';
	numeroDeBonos.id = 'numeroDeBonosTotal' + contador;
	numeroDeBonos.name = 'numeroDeBonosTotal' + contador;
	numeroDeBonos.setAttribute('readonly', true);
	/* caracteristicas del label total por bonos */
	labelTotalxBonos.textContent = 'TOTAL POR BONOS';
	labelTotalxBonos.setAttribute('for', 'totalxBonos' + contador)
	/* caracteristicas al input total por bonos */
	totalxBonos.type = 'number';
	totalxBonos.id = 'totalxBonos' + contador;
	totalxBonos.name = 'totalxBonos' + contador;
	totalxBonos.setAttribute('readonly', true);
	totalxBonos.setAttribute('hidden', true);
	totalxBonos.setAttribute('step', 'any');

	/* CREANDO EL INPUT DE TEXTO PARA CANTIDAD */
	let inputMontoTotalBonoText = document.createElement('input');
	inputMontoTotalBonoText.id = 'inputMontoTotalBono' + contador;
	inputMontoTotalBonoText.name = 'inputMontoTotalBono' + contador;
	inputMontoTotalBonoText.type = 'text';
	inputMontoTotalBonoText.setAttribute('readonly', true);
	//inputMontoTotalBonoText.form = 'formReporte';

	caja1.appendChild(labelNombre);
	caja1.appendChild(labelCantidad);
	caja1.appendChild(labelDia);
	caja1.appendChild(labelMes);
	caja1.appendChild(labelNumeroDeBonos);
	caja1.appendChild(labelTotalxBonos);

	caja2.appendChild(inputNombre);
	caja2.appendChild(inputCantidad);
	caja2.appendChild(dia);
	caja2.appendChild(mes);
	caja2.appendChild(numeroDeBonos);
	caja2.appendChild(totalxBonos);
	caja2.appendChild(inputMontoTotalBonoText);

	section.appendChild(cerrarVentana);
	section.appendChild(caja1);
	section.appendChild(caja2);
	padre.appendChild(section);


	let nombreDelBono = document.getElementById('inputNombreBono' + contador);
	let cantidadBono = document.getElementById('cantidadBono' + contador);
	let diaBono = document.getElementById('dia' + contador);
	let mesBono = document.getElementById('mes' + contador);
	let conteoDeBonos = document.getElementById('numeroDeBonosTotal' + contador);
	let totalxBonosNumber = document.getElementById('totalxBonos' + contador);
	let montoTotalxBonos = document.getElementById('inputMontoTotalBono' + contador);


	mesBono.addEventListener('input', () => {
		/* DETERMINANDO EL NUMERO DE BONOS A QUE TIENE DERECHO EL TRABAJADOR */
		let fechaDejaPercibir = moment(iniciofechaDejaPercibir.value);
		let fechaCalculo = moment(finfechaDejaPercibir.value);
		let duracionMeses = fechaCalculo.diff(fechaDejaPercibir, "month");
		
		let duracionAnios = fechaCalculo.diff(fechaDejaPercibir, "y");

		let anioFechaDejaPercibir = moment(iniciofechaDejaPercibir.value).format('YYYY');
		
		let anioFechaCalculo = moment(finfechaDejaPercibir.value).format('YYYY');

		/* RECIBIMOS FECHA DEL BONO */
		let fechaDelBonoInicioAnio = anioFechaDejaPercibir + '-' + mesBono.value + '-' + diaBono.value;
		let fechaDelBonoUltimoAnio = anioFechaCalculo + '-' + mesBono.value + '-' + diaBono.value;
		
		let fechaBonoInicio = moment(fechaDelBonoInicioAnio);
		let fechaBonoUltima = moment(fechaDelBonoUltimoAnio);
		
		
		if(fechaDejaPercibir > fechaBonoInicio && fechaCalculo > fechaBonoUltima   ){
		    
		    let numeroBonos = Number(duracionAnios);
			conteoDeBonos.value = numeroBonos;
			totalxBonosNumber.value = (conteoDeBonos.value * cantidadBono.value).toFixed(2);
			inputMontoTotalBonoText.value = formatearNumero(totalxBonosNumber.value);
		}
		if(fechaDejaPercibir < fechaBonoInicio && fechaCalculo < fechaBonoUltima  ){
		    
		     let numeroBonos = Number(duracionAnios);
			conteoDeBonos.value = numeroBonos;
			totalxBonosNumber.value = (conteoDeBonos.value * cantidadBono.value).toFixed(2);
			inputMontoTotalBonoText.value = formatearNumero(totalxBonosNumber.value);
		}
		if(fechaDejaPercibir > fechaBonoInicio && fechaCalculo < fechaBonoUltima  ){
		    
		    let numeroBonos = Number(duracionAnios);
			conteoDeBonos.value = numeroBonos;
			totalxBonosNumber.value = (numeroBonos * cantidadBono.value).toFixed(2);
			inputMontoTotalBonoText.value = formatearNumero(totalxBonosNumber.value);
		    
		}
		if(fechaDejaPercibir < fechaBonoInicio && fechaCalculo > fechaBonoUltima  ){
		    
		    let numeroBonos = Number(duracionAnios) + 1;
			conteoDeBonos.value = numeroBonos;
			totalxBonosNumber.value = (numeroBonos * cantidadBono.value).toFixed(2);
			inputMontoTotalBonoText.value = formatearNumero(totalxBonosNumber.value);
		    
		}
		

	})

	contador++

}

/* REMOVER BONO */
function removerBono(e) {
	e.parentElement.remove();
	contador = contador - 1;
}

/*BOTON GENERAR COMBINACIÓN*/

function btnGenerarCombinacion() {
	/*LEYENDO EL VALOR DEL SELECT*/

	let tipCombinacion = document.getElementById('tipoCombinacion').value;
	let respuesta = document.createElement('input');
	respuesta.value = tipCombinacion;
	respuesta.name = 'tipoRespuesta';
	respuesta.hidden = true;
	let padre = document.getElementById('respuestaCombinacion');
	let boton = document.createElement('button');
	boton.textContent = 'Generar planilla combinada';
	boton.style.backgroundColor='rgb(101 183 177)';
	boton.style.color='white';
	boton.type = 'submit';
	boton.formAction = '././com.php'
	padre.innerHTML = '';

	/*bloque para suma total de combinacion*/

	let montoIndem = document.getElementById('indeminizacionConstitucionalIntegral').value;
	let demasPrestacionesBase = document.getElementById('demasPrestacionesBase').value;
	let fondoAhorro = document.getElementById('aportacionTotal').value;
	let sumaDeBonos = 0;

	if (document.getElementById('totalxBonos1')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos1.value);

	}
	if (document.getElementById('totalxBonos2')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos2.value);

	}
	if (document.getElementById('totalxBonos3')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos3.value);

	}
	if (document.getElementById('totalxBonos4')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos4.value);

	}
	if (document.getElementById('totalxBonos5')) {
		sumaDeBonos = sumaDeBonos + Number(totalxBonos5.value);

	}

	let sumaTotal = Number(montoIndem) + Number(demasPrestacionesBase) + Number(fondoAhorro) + sumaDeBonos;
	console.log(sumaTotal);
	let sumaTotalText = formatearNumero(sumaTotal);
	console.log(sumaTotalText)
	/*creando el input para enviar la suma total combinacion 1*/

	let inputSumaTotal = document.createElement('input');
	inputSumaTotal.type = 'text';
	inputSumaTotal.readOnly = true;
	inputSumaTotal.value = sumaTotalText;
	inputSumaTotal.name = 'combinacionUno';
	inputSumaTotal.hidden = true;

	/*creando el input para enviar la suma total combinacion 2*/

	let indemBase = document.getElementById('indeminizacionConstitucionalBase').value;
	let demasPrestacionesItegrada = document.getElementById('demasPrestacionesIntegral').value;
	let sumaTotalCombinacionDos = Number(indemBase) + Number(demasPrestacionesItegrada) + Number(fondoAhorro) + sumaDeBonos;
	let sumaTotalCombinacionDosText = formatearNumero(sumaTotalCombinacionDos);
	let inputCombinacionDos = document.createElement('input');
	inputCombinacionDos.type = 'text';
	inputCombinacionDos.readOnly = true;
	inputCombinacionDos.value = sumaTotalCombinacionDosText;
	inputCombinacionDos.name = 'combinacionDos';
	inputCombinacionDos.hidden = true;

	padre.appendChild(respuesta);
	padre.appendChild(inputSumaTotal);
	padre.appendChild(inputCombinacionDos);
	padre.appendChild(boton);


}

function recalcular(){
    if (tipoSalario.value == 'INTEGRADO') {
        tiposSalariosIntegrados();
        
        /*
	    salarioBaseDiarioText.value = "";
    	salarioBaseQuincenalText.value = "";
    	salarioBaseMensualText.value = "";
    	salarioBaseAnualText.value = "";
    	
    	antiguedadBase.value = "";
    	tiempoDejadoDePercibirBase.value="";
    	tresMesesSalarioBaseText.value="";
    	veinteDiasxAnioServicioBaseText.value="";
    	haberesDejadosPercibirBaseText.value="";
    	indeminizacionConstitucionalBaseText.value="";
    	
    	primaVacionalBaseText.value="";
    	primaVacacionalTotalBaseText.value="";
    	aguinaldoxanioBaseText.value="";
    	aguinaldoTotalBaseText.value="";
    	
    	demasPrestacionesBaseText.value="";
    	*/
        
    }
    if (tipoSalario.value == 'BASE') {
        tiposSalariosBase();
        /*
        salarioIntegradoDiarioText.value = "";
    	salarioIntegradoQuincenalText.value = "";
    	salarioIntegradoMensualText.value = "";
    	salarioIntegradoAnualText.value = "";
    	
    	antiguedadIntegral.value="";
    	tiempoDejadoDePercibirIntegrado.value="";
    	tresMesesSalarioIntegralText.value="";
    	veinteDiasxAnioServicioIntegralText.value="";
    	indeminizacionConstitucionalIntegralText.value="";
    	
    	haberesDejadosPercibirIntegradoText.value="";
    	primaVacionalIntegradaText.value="";
    	primaVacacionalTotalIntegradaText.value="";
    	aguinaldoxAnioIntegralText.value="";
    	aguinaldoTotalIntegralText.value="";
    	demasPrestacionesIntegralText.value="";
    	*/
    	
    }
    if (tipoSalario.value == 'AMBOS') {
        salariosMixtos();
        
    }
    calculoAntiguedad();
    tiempoDejadoPercibir();
    if (primaVacacional.value == 'FIJA') {
        
        primaFija();
        
    }
    if (primaVacacional.value == 'CALCULADA') {
        
        primaCalculada();
        
    }
    if (tipoAguinaldo.value == 'FIJO') {
        aguinaldoFijo();
        
    }
    if (tipoAguinaldo.value == 'CALCULADO') {
        aguinaldoCalculado();
        
    }
    
}

let botonRecalcular = document.getElementById('corregir');

botonRecalcular.addEventListener('click', ()=>{
    recalcular();
});
