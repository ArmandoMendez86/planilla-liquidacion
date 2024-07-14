<?php
session_start();
require 'vendor/autoload.php';

use PhpOffice\PhpWord\Style\Language;


function integrado()
{
    /* LISTA DE VARIABLES QUE ESTOY RECIBIENDO */
    $numeroExpediente = $_POST['numeroExpediente'];
    $actor = $_POST['actor'];
    $elaboraPlanilla = $_SESSION['usuario'];
    $fechaIngreso = $_POST['fechaIngresoText'];
    $fechaBaja = $_POST['fechaBajaText'];
    $tipoSalario = $_POST['tipoSalario'];
    $tipoAguinaldo = $_POST['tipoAguinaldo'];
    $iniciofechaDejaPercibir = $_POST['iniciofechaDejaPercibirText'];
    $finfechaDejaPercibir = $_POST['finfechaDejaPercibirText'];
    $primaVacacional = $_POST['primaVacacional'];

    /* APORTACION PATRONAL Y SERVIDOR PUBLICO */
    $descuentoQuincenal = $_POST['descuentoQuincenal'];
    $descuentoQuincenalText = $_POST['descuentoQuincenalText'];
    $aportacionPatronalText = $_POST['aportacionPatronalText'];
    $aportacionServidorText = $_POST['aportacionServidorText'];
    $aportacionTotalText = $_POST['aportacionTotalText'];

    // CREAMOS EL DOCUMENTO DE WORD
    $phpWord = new \PhpOffice\PhpWord\PhpWord();
    // Para quitar el mensaje de compatibilidad
    $phpWord->getCompatibility()->setOoxmlVersion(15);
    $phpWord->getSettings()->setThemeFontLang(new Language("ES-MX"));
    $styleTable = array('borderSize' => 6, 'borderColor' => '999999', 'alignment' => 'center');
    $phpWord->addTableStyle('Colspan Rowspan', $styleTable);
    $section = $phpWord->addSection();
    $table = $section->addTable('Colspan Rowspan');

    /* CORRESPONDE A SALARIOS INTEGRADOS */
    $salarioIntegradoDiarioText = $_POST['salarioIntegradoDiarioText'];
    $salarioIntegradoQuincenalText = $_POST['salarioIntegradoQuincenalText'];
    $salarioIntegradoMensualText = $_POST['salarioIntegradoMensualText'];
    $salarioIntegradoAnualText = $_POST['salarioIntegradoAnualText'];
    $tresMesesSalarioIntegralText = $_POST['tresMesesSalarioIntegralText'];
    $antiguedadIntegral = $_POST['antiguedadIntegral'];
    $veinteDiasxAnioServicioIntegralText = $_POST['veinteDiasxAnioServicioIntegralText'];
    $indeminizacionConstitucionalIntegralText = $_POST['indeminizacionConstitucionalIntegralText'];
    $tiempoDejadoDePercibirIntegrado = $_POST['tiempoDejadoDePercibirIntegrado'];
    $haberesDejadosPercibirIntegradoText = $_POST['haberesDejadosPercibirIntegradoText'];
    $aguinaldoxAnioIntegralText = $_POST['aguinaldoxAnioIntegralText'];
    $aguinaldoTotalIntegralText = $_POST['aguinaldoTotalIntegralText'];
    $primaVacionalIntegradaText = $_POST['primaVacionalIntegradaText'];
    $primaVacacionalTotalIntegradaText = $_POST['primaVacacionalTotalIntegradaText'];
    $demasPrestacionesIntegralText = $_POST['demasPrestacionesIntegralText'];
    $totalSalarioIntegradoText = $_POST['totalSalarioIntegradoText'];

    /* AGREGA UN TITULO OCUPANDO DOS CELDAS */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('DATOS GENERALES', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('NÚMERO DE EXPEDIENTE');
    $row->addCell(4000)->addText($numeroExpediente);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ACTOR');
    $row->addCell(4000)->addText($actor);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ELABORÓ PLANILLA');
    $row->addCell(4000)->addText($elaboraPlanilla);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE INGRESO');
    $row->addCell(4000)->addText($fechaIngreso);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA');
    $row->addCell(4000)->addText($fechaBaja);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA/EN QUE DEJA DE PERCIBIR');
    $row->addCell(4000)->addText($iniciofechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE CÁLCULO');
    $row->addCell(4000)->addText($finfechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO DIARIO');
    $row->addCell(4000)->addText($salarioIntegradoDiarioText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO QUINCENAL');
    $row->addCell(4000)->addText($salarioIntegradoQuincenalText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO MENSUAL');
    $row->addCell(4000)->addText($salarioIntegradoMensualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO ANUAL');
    $row->addCell(4000)->addText($salarioIntegradoAnualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO POR AÑO');
    $row->addCell(4000)->addText($aguinaldoxAnioIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL(1 PERIODO)');
    $row->addCell(4000)->addText($primaVacionalIntegradaText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AÑOS DE SERVICIO');
    $row->addCell(4000)->addText($antiguedadIntegral);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TIEMPO DEJADO DE PERCIBIR');
    $row->addCell(4000)->addText($tiempoDejadoDePercibirIntegrado);

    /* INDEMNIZACIÓN CONSTITUCIONAL */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('INDEMNIZACIÓN CONSTITUCIONAL', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TRES MESES DE SALARIO MENSUAL');
    $row->addCell(4000)->addText($tresMesesSalarioIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('20 DÍAS POR CADA AÑO DE SERVICIO');
    $row->addCell(4000)->addText($veinteDiasxAnioServicioIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL', array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($indeminizacionConstitucionalIntegralText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);
    
    /* PRESTACIONES A QUE TIENE DERECHO */
    
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('PRESTACIONES A QUE TIENE DERECHO', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('HABERES DEJADOS DE PERCIBIR');
    $row->addCell(4000)->addText($haberesDejadosPercibirIntegradoText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO');
    $row->addCell(4000)->addText($aguinaldoTotalIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL');
    $row->addCell(4000)->addText($primaVacacionalTotalIntegradaText);

    /* SECCIÓN DE FONDO DE AHORRO */
    if ($_POST['aportacionTotal'] > 0) {
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (DESCUENTO QUINCENAL)');
        $row->addCell(4000)->addText($descuentoQuincenalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN PATRONAL)');
        $row->addCell(4000)->addText($aportacionPatronalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN SERVIDOR PÚBLICO)');
        $row->addCell(4000)->addText($aportacionServidorText);
        /*
        $row = $table->addRow();
        $row->addCell(4000)->addText('APORTACIÓN TOTAL');
        $row->addCell(4000)->addText($aportacionTotalText);
        */
    }
    /* SECCIÓN DE BONOS */
    if (isset($_POST['inputNombreBono1']) and isset($_POST['inputMontoTotalBono1'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono1']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono1']);
    }
    if (isset($_POST['inputNombreBono2']) and isset($_POST['inputMontoTotalBono2'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono2']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono2']);
    }
    if (isset($_POST['inputNombreBono3']) and isset($_POST['inputMontoTotalBono3'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono3']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono3']);
    }
    if (isset($_POST['inputNombreBono4']) and isset($_POST['inputMontoTotalBono4'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono4']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono4']);
    }
    if (isset($_POST['inputNombreBono5']) and isset($_POST['inputMontoTotalBono5'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono5']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono5']);
    }
    
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL', array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($demasPrestacionesIntegralText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);

    /* AGREGANDO EL TOTAL DEL SALARIO INTEGRADO */
    $row = $table->addRow();
    $row->addCell(4000)->addText('TOTAL', array('name' => 'Arial', 'size' => 14, 'bold' => true));
    $row->addCell(4000)->addText($totalSalarioIntegradoText,array('name' => 'Arial', 'size' => 14, 'bold' => true));
    
   
    // Saving the document as OOXML file...
    $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
    //$objWriter->save('autoguardado.docx');
    $nombre = 'integrado.docx';
    header('Content-Disposition: attachment; filename="' . $nombre . '"');
    header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    $objWriter->save("php://output");
}

function base()
{
    /* LISTA DE VARIABLES QUE ESTOY RECIBIENDO */
    $numeroExpediente = $_POST['numeroExpediente'];
    $actor = $_POST['actor'];
    $elaboraPlanilla = $_SESSION['usuario'];
    $fechaIngreso = $_POST['fechaIngresoText'];
    $fechaBaja = $_POST['fechaBajaText'];
    $tipoSalario = $_POST['tipoSalario'];
    $tipoAguinaldo = $_POST['tipoAguinaldo'];
    $iniciofechaDejaPercibir = $_POST['iniciofechaDejaPercibirText'];
    $finfechaDejaPercibir = $_POST['finfechaDejaPercibirText'];
    $primaVacacional = $_POST['primaVacacional'];

    /* APORTACION PATRONAL Y SERVIDOR PUBLICO */
    $descuentoQuincenal = $_POST['descuentoQuincenal'];
    $descuentoQuincenalText = $_POST['descuentoQuincenalText'];
    $aportacionPatronalText = $_POST['aportacionPatronalText'];
    $aportacionServidorText = $_POST['aportacionServidorText'];
    $aportacionTotalText = $_POST['aportacionTotalText'];

    // CREAMOS EL DOCUMENTO DE WORD
    $phpWord = new \PhpOffice\PhpWord\PhpWord();
    // Para quitar el mensaje de compatibilidad
    $phpWord->getCompatibility()->setOoxmlVersion(15);
    $phpWord->getSettings()->setThemeFontLang(new Language("ES-MX"));
    $styleTable = array('borderSize' => 6, 'borderColor' => '999999', 'alignment' => 'center');
    $phpWord->addTableStyle('Colspan Rowspan', $styleTable);
    $section = $phpWord->addSection();
    $table = $section->addTable('Colspan Rowspan');

    /* CORRESPONDE A SALARIOS BASE */
    $salarioBaseDiarioText = $_POST['salarioBaseDiarioText'];
    $salarioBaseQuincenalText = $_POST['salarioBaseQuincenalText'];
    $salarioBaseMensualText = $_POST['salarioBaseMensualText'];
    $salarioBaseAnualText = $_POST['salarioBaseAnualText'];
    $tresMesesSalarioBaseText = $_POST['tresMesesSalarioBaseText'];
    $antiguedadBase = $_POST['antiguedadBase'];
    $veinteDiasxAnioServicioBaseText = $_POST['veinteDiasxAnioServicioBaseText'];
    $indeminizacionConstitucionalBaseText = $_POST['indeminizacionConstitucionalBaseText'];
    $tiempoDejadoDePercibirBase = $_POST['tiempoDejadoDePercibirBase'];
    $haberesDejadosPercibirBaseText = $_POST['haberesDejadosPercibirBaseText'];
    $aguinaldoxanioBaseText = $_POST['aguinaldoxanioBaseText'];
    $aguinaldoTotalBaseText = $_POST['aguinaldoTotalBaseText'];
    $primaVacionalBaseText = $_POST['primaVacionalBaseText'];
    $primaVacacionalTotalBaseText = $_POST['primaVacacionalTotalBaseText'];
    $demasPrestacionesBaseText = $_POST['demasPrestacionesBaseText'];
    $totalSalarioBaseText = $_POST['totalSalarioBaseText'];

    /* AGREGA UN TITULO OCUPANDO DOS CELDAS */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('DATOS GENERALES', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('NÚMERO DE EXPEDIENTE');
    $row->addCell(4000)->addText($numeroExpediente);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ACTOR');
    $row->addCell(4000)->addText($actor);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ELABORÓ PLANILLA');
    $row->addCell(4000)->addText($elaboraPlanilla);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE INGRESO');
    $row->addCell(4000)->addText($fechaIngreso);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA');
    $row->addCell(4000)->addText($fechaBaja);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA/EN QUE DEJA DE PERCIBIR');
    $row->addCell(4000)->addText($iniciofechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE CÁLCULO');
    $row->addCell(4000)->addText($finfechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE DIARIO');
    $row->addCell(4000)->addText($salarioBaseDiarioText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE QUINCENAL');
    $row->addCell(4000)->addText($salarioBaseQuincenalText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE MENSUAL');
    $row->addCell(4000)->addText($salarioBaseMensualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE ANUAL');
    $row->addCell(4000)->addText($salarioBaseAnualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL(1 PERIODO)');
    $row->addCell(4000)->addText($primaVacionalBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO POR AÑO');
    $row->addCell(4000)->addText($aguinaldoxanioBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AÑOS DE SERVICIO');
    $row->addCell(4000)->addText($antiguedadBase);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TIEMPO DEJADO DE PERCIBIR');
    $row->addCell(4000)->addText($tiempoDejadoDePercibirBase);

    /* INDEMNIZACIÓN CONSTITUCIONAL */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('INDEMNIZACIÓN CONSTITUCIONAL', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TRES MESES DE SALARIO MENSUAL');
    $row->addCell(4000)->addText($tresMesesSalarioBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('20 DÍAS X CADA AÑO DE SERVICIO');
    $row->addCell(4000)->addText($veinteDiasxAnioServicioBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL', array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($indeminizacionConstitucionalBaseText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);

    /* PRESTACIONES A QUE TIENE DERECHO */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('PRESTACIONES A QUE TIENE DERECHO', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('HABERES DEJADOS DE PERCIBIR');
    $row->addCell(4000)->addText($haberesDejadosPercibirBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO');
    $row->addCell(4000)->addText($aguinaldoTotalBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL');
    $row->addCell(4000)->addText($primaVacacionalTotalBaseText);

    /* SECCIÓN DE FONDO DE AHORRO */
    if ($_POST['aportacionTotal'] > 0) {
        /* OTRAS PRESTACIONES ACREDITADAS */
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (DESCUENTO QUINCENAL)');
        $row->addCell(4000)->addText($descuentoQuincenalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN PATRONAL)');
        $row->addCell(4000)->addText($aportacionPatronalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN SERVIDOR PÚBLICO)');
        $row->addCell(4000)->addText($aportacionServidorText);
        /*
        $row = $table->addRow();
        $row->addCell(4000)->addText('APORTACIÓN TOTAL');
        $row->addCell(4000)->addText($aportacionTotalText);
        */
    }
    /* SECCIÓN DE BONOS */
    if (isset($_POST['inputNombreBono1']) and isset($_POST['inputMontoTotalBono1'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono1']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono1']);
    }
    if (isset($_POST['inputNombreBono2']) and isset($_POST['inputMontoTotalBono2'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono2']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono2']);
    }
    if (isset($_POST['inputNombreBono3']) and isset($_POST['inputMontoTotalBono3'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono3']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono3']);
    }
    if (isset($_POST['inputNombreBono4']) and isset($_POST['inputMontoTotalBono4'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono4']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono4']);
    }
    if (isset($_POST['inputNombreBono5']) and isset($_POST['inputMontoTotalBono5'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono5']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono5']);
    }
    
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL',  array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($demasPrestacionesBaseText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);

    /* AGREGANDO EL TOTAL DEL SALARIO INTEGRADO */
    $row = $table->addRow();
    $row->addCell(4000)->addText('TOTAL', array('name' => 'Arial', 'size' => 14, 'bold' => true));
    $row->addCell(4000)->addText($totalSalarioBaseText,  array('name' => 'Arial', 'size' => 14, 'bold' => true));

    // Saving the document as OOXML file...
    $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
    //$objWriter->save('autoguardado.docx');
    $nombre = 'base.docx';
    header('Content-Disposition: attachment; filename="' . $nombre . '"');
    header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    $objWriter->save("php://output");
}

function ambos()
{
    /*BLOQUE DE PLANILLA INTEGRADA*/
    /* LISTA DE VARIABLES QUE ESTOY RECIBIENDO */
    $numeroExpediente = $_POST['numeroExpediente'];
    $actor = $_POST['actor'];
    $elaboraPlanilla = $_SESSION['usuario'];
    $fechaIngreso = $_POST['fechaIngresoText'];
    $fechaBaja = $_POST['fechaBajaText'];
    $tipoSalario = $_POST['tipoSalario'];
    $tipoAguinaldo = $_POST['tipoAguinaldo'];
    $iniciofechaDejaPercibir = $_POST['iniciofechaDejaPercibirText'];
    $finfechaDejaPercibir = $_POST['finfechaDejaPercibirText'];
    $primaVacacional = $_POST['primaVacacional'];

    /* APORTACION PATRONAL Y SERVIDOR PUBLICO */
    $descuentoQuincenal = $_POST['descuentoQuincenal'];
    $descuentoQuincenalText = $_POST['descuentoQuincenalText'];
    $aportacionPatronalText = $_POST['aportacionPatronalText'];
    $aportacionServidorText = $_POST['aportacionServidorText'];
    $aportacionTotalText = $_POST['aportacionTotalText'];

    // CREAMOS EL DOCUMENTO DE WORD
    $phpWord = new \PhpOffice\PhpWord\PhpWord();
    // Para quitar el mensaje de compatibilidad
    $phpWord->getCompatibility()->setOoxmlVersion(15);
    $phpWord->getSettings()->setThemeFontLang(new Language("ES-MX"));
    $styleTable = array('borderSize' => 6, 'borderColor' => '999999', 'alignment' => 'center');
    $phpWord->addTableStyle('Colspan Rowspan', $styleTable);
    $section = $phpWord->addSection();
    $table = $section->addTable('Colspan Rowspan');

    /* CORRESPONDE A SALARIOS INTEGRADOS */
    $salarioIntegradoDiarioText = $_POST['salarioIntegradoDiarioText'];
    $salarioIntegradoQuincenalText = $_POST['salarioIntegradoQuincenalText'];
    $salarioIntegradoMensualText = $_POST['salarioIntegradoMensualText'];
    $salarioIntegradoAnualText = $_POST['salarioIntegradoAnualText'];
    $tresMesesSalarioIntegralText = $_POST['tresMesesSalarioIntegralText'];
    $antiguedadIntegral = $_POST['antiguedadIntegral'];
    $veinteDiasxAnioServicioIntegralText = $_POST['veinteDiasxAnioServicioIntegralText'];
    $indeminizacionConstitucionalIntegralText = $_POST['indeminizacionConstitucionalIntegralText'];
    $tiempoDejadoDePercibirIntegrado = $_POST['tiempoDejadoDePercibirIntegrado'];
    $haberesDejadosPercibirIntegradoText = $_POST['haberesDejadosPercibirIntegradoText'];
    $aguinaldoxAnioIntegralText = $_POST['aguinaldoxAnioIntegralText'];
    $aguinaldoTotalIntegralText = $_POST['aguinaldoTotalIntegralText'];
    $primaVacionalIntegradaText = $_POST['primaVacionalIntegradaText'];
    $primaVacacionalTotalIntegradaText = $_POST['primaVacacionalTotalIntegradaText'];
    $demasPrestacionesIntegralText = $_POST['demasPrestacionesIntegralText'];
    $totalSalarioIntegradoText = $_POST['totalSalarioIntegradoText'];

    /* AGREGA UN TITULO OCUPANDO DOS CELDAS */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('DATOS GENERALES', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('NÚMERO DE EXPEDIENTE');
    $row->addCell(4000)->addText($numeroExpediente);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ACTOR');
    $row->addCell(4000)->addText($actor);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ELABORÓ PLANILLA');
    $row->addCell(4000)->addText($elaboraPlanilla);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE INGRESO');
    $row->addCell(4000)->addText($fechaIngreso);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA');
    $row->addCell(4000)->addText($fechaBaja);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA/EN QUE DEJA DE PERCIBIR');
    $row->addCell(4000)->addText($iniciofechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE CÁLCULO');
    $row->addCell(4000)->addText($finfechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO DIARIO');
    $row->addCell(4000)->addText($salarioIntegradoDiarioText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO QUINCENAL');
    $row->addCell(4000)->addText($salarioIntegradoQuincenalText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO MENSUAL');
    $row->addCell(4000)->addText($salarioIntegradoMensualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO INTEGRADO ANUAL');
    $row->addCell(4000)->addText($salarioIntegradoAnualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO POR AÑO');
    $row->addCell(4000)->addText($aguinaldoxAnioIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL(1 PERIODO)');
    $row->addCell(4000)->addText($primaVacionalIntegradaText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AÑOS DER SERVICIO');
    $row->addCell(4000)->addText($antiguedadIntegral);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TIEMPO DEJADO DE PERCIBIR');
    $row->addCell(4000)->addText($tiempoDejadoDePercibirIntegrado);

    /* INDEMNIZACIÓN CONSTITUCIONAL */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('INDEMNIZACIÓN CONSTITUCIONAL', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TRES MESES DE SALARIO MENSUAL');
    $row->addCell(4000)->addText($tresMesesSalarioIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('20 DÍAS X CADA AÑO DE SERVICIO');
    $row->addCell(4000)->addText($veinteDiasxAnioServicioIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL', array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($indeminizacionConstitucionalIntegralText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);
    
    /* PRESTACIONES A QUE TIENE DERECHO */
    
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('PRESTACIONES A QUE TIENE DERECHO', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('HABERES DEJADOS DE PERCIBIR');
    $row->addCell(4000)->addText($haberesDejadosPercibirIntegradoText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO');
    $row->addCell(4000)->addText($aguinaldoTotalIntegralText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL');
    $row->addCell(4000)->addText($primaVacacionalTotalIntegradaText);

    /* SECCIÓN DE FONDO DE AHORRO */
    if ($_POST['aportacionTotal'] > 0) {
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (DESCUENTO QUINCENAL)');
        $row->addCell(4000)->addText($descuentoQuincenalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN PATRONAL)');
        $row->addCell(4000)->addText($aportacionPatronalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN SERVIDOR PÚBLICO)');
        $row->addCell(4000)->addText($aportacionServidorText);
        /*
        $row = $table->addRow();
        $row->addCell(4000)->addText('APORTACIÓN TOTAL');
        $row->addCell(4000)->addText($aportacionTotalText);
        */
    }
    /* SECCIÓN DE BONOS */
    if (isset($_POST['inputNombreBono1']) and isset($_POST['inputMontoTotalBono1'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono1']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono1']);
    }
    if (isset($_POST['inputNombreBono2']) and isset($_POST['inputMontoTotalBono2'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono2']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono2']);
    }
    if (isset($_POST['inputNombreBono3']) and isset($_POST['inputMontoTotalBono3'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono3']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono3']);
    }
    if (isset($_POST['inputNombreBono4']) and isset($_POST['inputMontoTotalBono4'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono4']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono4']);
    }
    if (isset($_POST['inputNombreBono5']) and isset($_POST['inputMontoTotalBono5'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono5']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono5']);
    }
    
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL', array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($demasPrestacionesIntegralText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);

    /* AGREGANDO EL TOTAL DEL SALARIO INTEGRADO */
    $row = $table->addRow();
    $row->addCell(4000)->addText('TOTAL', array('name' => 'Arial', 'size' => 14, 'bold' => true));
    $row->addCell(4000)->addText($totalSalarioIntegradoText,array('name' => 'Arial', 'size' => 14, 'bold' => true));


    /*BLOQUE DE PLANILLA BASE*/

    /* CORRESPONDE A SALARIOS BASE */
    $salarioBaseDiarioText = $_POST['salarioBaseDiarioText'];
    $salarioBaseQuincenalText = $_POST['salarioBaseQuincenalText'];
    $salarioBaseMensualText = $_POST['salarioBaseMensualText'];
    $salarioBaseAnualText = $_POST['salarioBaseAnualText'];
    $tresMesesSalarioBaseText = $_POST['tresMesesSalarioBaseText'];
    $antiguedadBase = $_POST['antiguedadBase'];
    $veinteDiasxAnioServicioBaseText = $_POST['veinteDiasxAnioServicioBaseText'];
    $indeminizacionConstitucionalBaseText = $_POST['indeminizacionConstitucionalBaseText'];
    $tiempoDejadoDePercibirBase = $_POST['tiempoDejadoDePercibirBase'];
    $haberesDejadosPercibirBaseText = $_POST['haberesDejadosPercibirBaseText'];
    $aguinaldoxanioBaseText = $_POST['aguinaldoxanioBaseText'];
    $aguinaldoTotalBaseText = $_POST['aguinaldoTotalBaseText'];
    $primaVacionalBaseText = $_POST['primaVacionalBaseText'];
    $primaVacacionalTotalBaseText = $_POST['primaVacacionalTotalBaseText'];
    $demasPrestacionesBaseText = $_POST['demasPrestacionesBaseText'];
    $totalSalarioBaseText = $_POST['totalSalarioBaseText'];

    /* AGREGA UN TITULO OCUPANDO DOS CELDAS */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('DATOS GENERALES', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('NÚMERO DE EXPEDIENTE');
    $row->addCell(4000)->addText($numeroExpediente);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ACTOR');
    $row->addCell(4000)->addText($actor);
    $row = $table->addRow();
    $row->addCell(4000)->addText('ELABORÓ PLANILLA');
    $row->addCell(4000)->addText($elaboraPlanilla);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE INGRESO');
    $row->addCell(4000)->addText($fechaIngreso);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA');
    $row->addCell(4000)->addText($fechaBaja);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE BAJA/EN QUE DEJA DE PERCIBIR');
    $row->addCell(4000)->addText($iniciofechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('FECHA DE CÁLCULO');
    $row->addCell(4000)->addText($finfechaDejaPercibir);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE DIARIO');
    $row->addCell(4000)->addText($salarioBaseDiarioText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE QUINCENAL');
    $row->addCell(4000)->addText($salarioBaseQuincenalText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE MENSUAL');
    $row->addCell(4000)->addText($salarioBaseMensualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SALARIO BASE ANUAL');
    $row->addCell(4000)->addText($salarioBaseAnualText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL(1 PERIODO)');
    $row->addCell(4000)->addText($primaVacionalBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO POR AÑO');
    $row->addCell(4000)->addText($aguinaldoxanioBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AÑOS DE SERVICIO');
    $row->addCell(4000)->addText($antiguedadBase);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TIEMPO DEJADO DE PERCIBIR');
    $row->addCell(4000)->addText($tiempoDejadoDePercibirBase);

    /* INDEMNIZACIÓN CONSTITUCIONAL */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('INDEMNIZACIÓN CONSTITUCIONAL', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('TRES MESES DE SALARIO MENSUAL');
    $row->addCell(4000)->addText($tresMesesSalarioBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('20 DÍAS X CADA AÑO DE SERVICIO');
    $row->addCell(4000)->addText($veinteDiasxAnioServicioBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL', array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($indeminizacionConstitucionalBaseText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);

    /* PRESTACIONES A QUE TIENE DERECHO */
    $row = $table->addRow();
    $row->addCell(4000, array('gridSpan' => 2, 'vMerge' => 'restart'))->addText('PRESTACIONES A QUE TIENE DERECHO', [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
    $row = $table->addRow();
    $row->addCell(4000)->addText('HABERES DEJADOS DE PERCIBIR');
    $row->addCell(4000)->addText($haberesDejadosPercibirBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('AGUINALDO');
    $row->addCell(4000)->addText($aguinaldoTotalBaseText);
    $row = $table->addRow();
    $row->addCell(4000)->addText('PRIMA VACACIONAL');
    $row->addCell(4000)->addText($primaVacacionalTotalBaseText);

    /* SECCIÓN DE FONDO DE AHORRO */
    if ($_POST['aportacionTotal'] > 0) {
        /* OTRAS PRESTACIONES ACREDITADAS */
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (DESCUENTO QUINCENAL)');
        $row->addCell(4000)->addText($descuentoQuincenalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN PATRONAL)');
        $row->addCell(4000)->addText($aportacionPatronalText);
        $row = $table->addRow();
        $row->addCell(4000)->addText('FONDO DE AHORRO (APORTACIÓN SERVIDOR PÚBLICO)');
        $row->addCell(4000)->addText($aportacionServidorText);
        /*
        $row = $table->addRow();
        $row->addCell(4000)->addText('APORTACIÓN TOTAL');
        $row->addCell(4000)->addText($aportacionTotalText);
        */
    }
    /* SECCIÓN DE BONOS */
    if (isset($_POST['inputNombreBono1']) and isset($_POST['inputMontoTotalBono1'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono1']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono1']);
    }
    if (isset($_POST['inputNombreBono2']) and isset($_POST['inputMontoTotalBono2'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono2']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono2']);
    }
    if (isset($_POST['inputNombreBono3']) and isset($_POST['inputMontoTotalBono3'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono3']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono3']);
    }
    if (isset($_POST['inputNombreBono4']) and isset($_POST['inputMontoTotalBono4'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono4']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono4']);
    }
    if (isset($_POST['inputNombreBono5']) and isset($_POST['inputMontoTotalBono5'])) {
        $row = $table->addRow();
        $row->addCell(4000)->addText($_POST['inputNombreBono5']);
        $row->addCell(4000)->addText($_POST['inputMontoTotalBono5']);
    }
    
    $row = $table->addRow();
    $row->addCell(4000)->addText('SUBTOTAL',  array('name' => 'Arial', 'bold' => true));
    $row->addCell(4000)->addText($demasPrestacionesBaseText, [], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::RIGHT]);

    /* AGREGANDO EL TOTAL DEL SALARIO INTEGRADO */
    $row = $table->addRow();
    $row->addCell(4000)->addText('TOTAL', array('name' => 'Arial', 'size' => 14, 'bold' => true));
    $row->addCell(4000)->addText($totalSalarioBaseText,  array('name' => 'Arial', 'size' => 14, 'bold' => true));

    // Saving the document as OOXML file...
    $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
    //$objWriter->save('autoguardado.docx');
    $nombre = 'Ambas_planillas.docx';
    header('Content-Disposition: attachment; filename="' . $nombre . '"');
    header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    $objWriter->save("php://output");
}


if ($_POST['tipoSalario'] == 'INTEGRADO') {
    integrado();
} elseif ($_POST['tipoSalario'] == 'BASE') {
    base();
} elseif ($_POST['tipoSalario'] == 'AMBOS') {
    ambos();
}
