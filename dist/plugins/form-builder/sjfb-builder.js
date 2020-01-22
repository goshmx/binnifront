/**
 * Simple jQuery Form Builder (SJFB)
 * Copyright (c) 2015 Brandon Hoover, Hoover Web Development LLC (http://bhoover.com)
 * http://bhoover.com/simple-jquery-form-builder/
 * SJFB may be freely distributed under the included MIT license (license.txt).
 */


//Add field to builder
function addField(fieldType) {

    var hasRequired, hasChoices,isReadOnly, hasInline, hasRegexValidation, isMoneda, isEntero, hasSize, hasTableElements=false;
    var includeSizedHTML = '';
    var includeRequiredHTML = '';
    var includeChoicesHTML = '';
    var includeTableHTML = '';
    var includeMoneda = '';
    var includeEntero = '';
    var includeReadOnly = '';
    var includeRegexValidation = '';
    var includeInline = '';


    switch (fieldType) {
        case 'text':
            hasRequired = true;
            isReadOnly = true;
            hasChoices = false;
            hasSize = true;
            hasRegexValidation = true;
            break;
        case 'textarea':
            hasRequired = true;
            hasChoices = false;
            hasSize = true;
            break;
        case 'currency':
            hasRequired = true;
            hasChoices = false;
            hasSize = true;
            isMoneda = true;
            isEntero = true;
            break;
        case 'datepicker':
            hasRequired = true;
            hasChoices = false;
            hasSize = true;
            break;
        case 'modalpicker':
            hasRequired = true;
            hasChoices = false;
            hasSize = true;
            break;
        case 'calculado':
            hasRequired = true;
            hasSize = true;
            isReadOnly = true;
            hasChoices = false;
            break;
        case 'select':
            hasRequired = true;
            hasChoices = true;
            hasSize = true;
            break;
        case 'radio':
            hasRequired = true;
            hasChoices = true;
            hasSize = true;
            hasInline = true;
            break;
        case 'checkbox':
            hasRequired = false;
            hasChoices = true;
            hasSize = true;
            hasInline = true;
            break;
        case 'agree':
            //required "agree to terms" checkbox
            hasRequired = false;
            hasChoices = false;
            hasSize = true;
            break;
        case 'table':
            hasRequired = false;
            hasSize = true;
            hasChoices = false;
            hasTableElements = true;
            break;
        case 'file':
            hasRequired = true;
            hasChoices = false;
            hasSize = true;
            break;
        case 'cfdi':
            hasRequired = true;
            hasChoices = false;
            hasSize = true;
            break;
    }

    if(hasRegexValidation){
        includeRegexValidation = ''+
        '<div>' +
        '<label>Validación Regex</label>' +
        '<input type="text" class="field-regex form-control"/></div>';
    }

    if (hasSize) {
        includeSizedHTML = '' +
        '<div>' +
        '<label>Tamaño del campo</label>' +
        '<select class="toggle-size form-control">' +
            '<option value="1">Col 1</option>'+
            '<option value="2">Col 2</option>'+
            '<option value="3">Col 3</option>'+
            '<option value="4">Col 4</option>'+
            '<option value="5">Col 5</option>'+
            '<option value="6">Col 6</option>'+
            '<option value="7">Col 7</option>'+
            '<option value="8">Col 8</option>'+
            '<option value="9">Col 9</option>'+
            '<option value="10">Col 10</option>'+
            '<option value="11">Col 11</option>'+
            '<option value="12" selected>Col 12</option>'+
        '</select></div>';
    }

    if (hasInline) {
        includeInline = '' +
        '<label>Inline? ' +
        '<input class="toggle-inline" type="checkbox">' +
        '</label>'
    }

    if (hasRequired) {
        includeRequiredHTML = '' +
            '<label>Es obligatorio? ' +
            '<input class="toggle-required" type="checkbox">' +
            '</label>'
    }

    if (isMoneda) {
        includeMoneda = '' +
        '<br><label>Es moneda? ' +
        '<input class="toggle-moneda" type="checkbox">' +
        '</label>'
    }

    if (isReadOnly) {
        includeReadOnly = '' +
        '<br><label>Solo lectura? ' +
        '<input class="toggle-readonly" type="checkbox">' +
        '</label>';
    }

    if (isEntero) {
        includeEntero = '' +
        '<br><label>Es entero? ' +
        '<input class="toggle-entero" type="checkbox">' +
        '</label>'
    }

    if (hasChoices) {
        includeChoicesHTML = '' +
            '<div class="choices">' +
            '<ul></ul>' +
            '<button type="button" class="add-choice btn btn-xs btn-primary">Agregar opción</button>' +
            '</div>'
    }

    if (hasTableElements) {
        includeTableHTML = '' +
        '<div class="columns">' +
        '<ul style="margin-bottom: 25px;"></ul>' +
        '<button type="button" class="add-column btn btn-xs btn-primary">Agregar Columna</button>' +
        '</div>'
    }

    if((fieldType === 'text')||(fieldType === 'textarea')||(fieldType === 'select')||(fieldType === 'radio')||(fieldType === 'checkbox')||(fieldType === 'agree')){
        return '' +
            '<div class="field" data-type="' + fieldType + '">' +
            '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fas fa-times"></i></button>' +
            '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fas fa-angle-double-up"></i></button> ' +
            '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
            '<div class="form-group form-group-sm cont-fieldtype"><label>Label</label>' +
            '<input type="text" class="field-label form-control">' +
            '<div class="form-group form-group-sm"><label>Nombre del campo</label>' +
            '<input type="text" class="field-name form-control">' +
            '</div>' +
            includeRequiredHTML +
            includeChoicesHTML +
            includeReadOnly +
            includeRegexValidation +
            includeInline +
            includeSizedHTML +
            '</div>';
    }
    else if(fieldType === 'modalpicker'){
        return '' +
            '<div class="field" data-type="' + fieldType + '">' +
            '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fa fa-times"></i></button>' +
            '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fa fa-angle-double-up"></i></button> ' +
            '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
            '<div class="form-group form-group-sm cont-fieldtype"><label>Label</label>' +
            '<input type="text" class="field-label form-control">' +
            '<div class="form-group form-group-sm"><label>Nombre del campo</label>' +
            '<input type="text" class="field-name form-control">' +
            '<div class="form-group form-group-sm"><label>Url</label>' +
            '<input type="text" class="field-url form-control">' +
            '<div class="form-group form-group-sm"><label>Columnas</label>' +
            '<input type="text" class="field-columns form-control">' +
            '<div class="form-group form-group-sm"><label>Formato Resultado</label>' +
            '<input type="text" class="field-result-format form-control">' +
            '<div class="form-group form-group-sm"><label>Función al seleccionar</label>' +
            '<input type="text" class="field-fn-selected form-control">' +
            '</div>' +
            includeRequiredHTML +
            includeChoicesHTML +
            includeSizedHTML +
            '</div>';
    }
    else if(fieldType === 'calculado'){
        return '' +
            '<div class="field" data-type="' + fieldType + '">' +
            '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fa fa-times"></i></button>' +
            '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fa fa-angle-double-up"></i></button> ' +
            '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
            '<div class="form-group form-group-sm cont-fieldtype"><label>Label</label>' +
            '<input type="text" class="field-label form-control">' +
            '<div class="form-group form-group-sm"><label>Nombre del campo</label>' +
            '<input type="text" class="field-name form-control">' +
            '<div class="form-group form-group-sm"><label>Función del campo</label>' +
            '<input type="text" class="field-fn-activate form-control">' +
            '</div>' +
            includeRequiredHTML +
            includeChoicesHTML +
            includeReadOnly +
            includeSizedHTML +
            '</div>';
    }
    else if(fieldType === 'currency'){
        return '' +
            '<div class="field" data-type="' + fieldType + '">' +
            '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fa fa-times"></i></button>' +
            '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fa fa-angle-double-up"></i></button> ' +
            '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
            '<div class="form-group form-group-sm cont-fieldtype"><label>Label</label>' +
            '<input type="text" class="field-label form-control">' +
            '<div class="form-group form-group-sm"><label>Nombre del campo</label>' +
            '<input type="text" class="field-name form-control">' +
            '</div>' +
            includeRequiredHTML +
            includeChoicesHTML +
            includeMoneda +
            includeEntero +
            includeSizedHTML +
            '</div>';
    }
    else if(fieldType === 'datepicker'){
        return '' +
            '<div class="field" data-type="' + fieldType + '">' +
            '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fa fa-times"></i></button>' +
            '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fa fa-angle-double-up"></i></button> ' +
            '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
            '<div class="form-group form-group-sm cont-fieldtype"><label>Label</label>' +
            '<input type="text" class="field-label form-control">' +
            '<div class="form-group form-group-sm"><label>Nombre del campo</label>' +
            '<input type="text" class="field-name form-control">' +
            '</div>' +
            includeRequiredHTML +
            includeChoicesHTML +
            includeMoneda +
            includeEntero +
            includeSizedHTML +
            '</div>';
    }
    else if(fieldType === 'table'){
            return '' +
                '<div class="field" data-type="' + fieldType + '">' +
                '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fa fa-times"></i></button>' +
                '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fa fa-angle-double-up"></i></button> ' +
                '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
                '<div class="form-group form-group-sm cont-fieldtype"><label>Nombre de la tabla</label>' +
                '<input type="text" class="field-label form-control">' +
                '<div class="form-group form-group-sm"><label>Nombre del campo para la tabla</label>' +
                '<input type="text" class="field-name form-control">' +
                '</div>' +
                includeRequiredHTML +
                includeChoicesHTML +
                includeTableHTML +
                includeSizedHTML +
                '</div>';
        }
    else if(fieldType === 'cfdi'){
        return '' +
            '<div class="field" data-type="' + fieldType + '">' +
            '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fa fa-times"></i></button>' +
            '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fa fa-angle-double-up"></i></button> ' +
            '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
            '<div class="form-group form-group-sm cont-fieldtype"><label>Nombre de campo CFDI</label>' +
            '<input type="text" class="field-label form-control">' +
            '<div class="form-group form-group-sm"><label>Nombre del campo</label>' +
            '<input type="text" class="field-name form-control">' +
            '</div>' +
            includeRequiredHTML +
            includeChoicesHTML +
            includeTableHTML +
            includeSizedHTML +
            '</div>';
    }
    else if(fieldType === 'file'){
        return '' +
            '<div class="field" data-type="' + fieldType + '">' +
            '<button type="button" class="delete btn btn-xs btn-danger btn-close-document-input"><i class="fa fa-times"></i></button>' +
            '<button type="button" class="display btn btn-xs btn-primary btn-display-document-input"><i class="fa fa-angle-double-up"></i></button> ' +
            '<div class="title-fieldtype">' + fieldType.capitalize() + '<span class="subtitle-fieldtype" style="font-size: 0.7em;"></span></div>' +
            '<div class="form-group form-group-sm cont-fieldtype"><label>Label</label>' +
            '<input type="text" class="field-label form-control">' +
            '<div class="form-group form-group-sm"><label>Nombre del campo</label>' +
            '<input type="text" class="field-name form-control">' +
            '<div class="form-group form-group-sm"><label>Extensiones aceptadas</label>' +
            '<input type="text" class="field-extension form-control" placeholder=".xlsx, .xls, image/*, .doc, .docx, .ppt, .pptx, .txt, .pdf, .zip, .rar">' +
            '</div>' +
            includeRequiredHTML +
            includeChoicesHTML +
            includeTableHTML +
            includeSizedHTML +
            '</div>';
    }
}




//Make builder field required
function requiredField($this) {
    if (!$this.parents('.field').hasClass('required')) {
        //Field required
        $this.parents('.field').addClass('required');
        $this.attr('checked','checked');
    } else {
        //Field not required
        $this.parents('.field').removeClass('required');
        $this.removeAttr('checked');
    }
}

function requiredInline($this){
    if (!$this.parents('.field').hasClass('reqinline')) {
        //Field required
        $this.parents('.field').addClass('reqinline');
        $this.attr('checked','checked');
    } else {
        //Field not required
        $this.parents('.field').removeClass('reqinline');
        $this.removeAttr('checked');
    }
}


//Make builder field required
function monedaField($this) {
    if (!$this.parents('.field').hasClass('moneda')) {
        //Field required
        $this.parents('.field').addClass('moneda');
        $this.attr('checked','checked');
    } else {
        //Field not required
        $this.parents('.field').removeClass('moneda');
        $this.removeAttr('checked');
    }
}

//Make builder field required
function readonlyField($this) {
    if (!$this.parents('.field').hasClass('readonly')) {
        //Field required
        $this.parents('.field').addClass('readonly');
        $this.attr('checked','checked');
    } else {
        //Field not required
        $this.parents('.field').removeClass('readonly');
        $this.removeAttr('checked');
    }
}


//Make builder field required
function enteroField($this) {
    if (!$this.parents('.field').hasClass('entero')) {
        //Field required
        $this.parents('.field').addClass('entero');
        $this.attr('checked','checked');
    } else {
        //Field not required
        $this.parents('.field').removeClass('entero');
        $this.removeAttr('checked');
    }
}

function selectedChoice($this) {
    if (! $this.parents('li').hasClass('selected')) {

        //Only checkboxes can have more than one item selected at a time
        //If this is not a checkbox group, unselect the choices before selecting
        if ($this.parents('.field').data('type') != 'checkbox') {
            $this.parents('.choices').find('li').removeClass('selected');
            $this.parents('.choices').find('.toggle-selected').not($this).removeAttr('checked');
        }

        //Make selected
        $this.parents('li').addClass('selected');
        $this.attr('checked','checked');

    } else {

        //Unselect
        $this.parents('li').removeClass('selected');
        $this.removeAttr('checked');

    }
}

//Builder HTML for select, radio, and checkbox choices
function addChoice() {
    return '' +
        '<li>' +
        '<label>Opción: ' +
        '<input type="text" class="choice-label">' +
        '</label>' +
        '<label>Selected? ' +
        '<input class="toggle-selected" type="checkbox">' +
        '</label>' +
        '<button type="button" class="delete btn btn-xs btn-danger">Borrar opción</button>' +
        '</li>'
}

function addColumn(){
    return '' +
        '<li>' +
        '<label>Titulo de Columna: ' +
        '<input type="text" class="column-title">' +
        '</label>' +
        '<label>Nombre de campo ' +
        '<input type="text" class="column-value">' +
        '</label>' +
        '<label>Tipo de campo ' +
        '</label>' +
        '<select class="column-type form-control form-control-sm"><option value="text">Texto</option><option value="currency">Currency</option><option value="fecha">Fecha</option></select> ' +
        '<button type="button" class="delete btn btn-xs btn-danger margin">Borrar opción</button>' +
        '</li>'
}

//Loads a saved form from your database into the builder
function loadForm(data) {
    if (data) {
        $.each( data, function( k, v ) {
            //Add the field
            $(addField(v['type'])).appendTo('#form-fields').hide().slideDown('fast');
            var $currentField = $('#form-fields .field').last();
            //Add the label
            $currentField.find('.field-label').val(v['label']);
            $currentField.find('.field-name').val(v['name']);

            if(v['type']=='modalpicker'){

                if(v['columnas']){
                    $currentField.find('.field-columns').val(v['columnas']);
                }

                if(v['url']){
                    $currentField.find('.field-url').val(v['url']);
                }

                if(v['resultFormat']){
                    $currentField.find('.field-result-format').val(v['resultFormat']);
                }

                if(v['fnSelected']){
                    $currentField.find('.field-fn-selected').val(v['fnSelected']);
                }
            }

            if(v['regex']){
                $currentField.find('.field-regex').val(v['regex']);
            }

            if(v['fnActivate']){
                $currentField.find('.field-fn-activate').val(v['fnActivate']);
            }

            if(v['filetypes']){
                $currentField.find('.field-extension').val(v['filetypes']);
            }

            if(v['size']){
                $currentField.find('.toggle-size').val(v['size']);
            }
            else{
                $currentField.find('.toggle-size').val(12);
            }





            //Is it required?
            if (v['req']) {
                requiredField($currentField.find('.toggle-required'));
            }

            if (v['inline']) {
                requiredInline($currentField.find('.toggle-inline'));
            }

            if (v['readonly']) {
                readonlyField($currentField.find('.toggle-readonly'));
            }

            if (v['moneda']) {
                monedaField($currentField.find('.toggle-moneda'));
            }

            if (v['entero']) {
                enteroField($currentField.find('.toggle-entero'));
            }

            //Any choices?
            if (v['choices']) {
                $.each( v['choices'], function( k, v ) {
                    //add the choices
                    $currentField.find('.choices ul').append(addChoice());

                    //Add the label
                    $currentField.find('.choice-label').last().val(v['label']);

                    //Is it selected?
                    if (v['sel']) {
                        selectedChoice($currentField.find('.toggle-selected').last());
                    }
                });
            }

            if (v['columns']) {
                $.each( v['columns'], function( k, v ) {
                    //add the choices
                    $currentField.find('.columns ul').append(addColumn());

                    //Add the label
                    $currentField.find('.column-title').last().val(v['title']);
                    $currentField.find('.column-value').last().val(v['val'].replace("[]", ""));
                    $currentField.find('.column-type').last().val(v['type']);
                });
            }

        });

        $('#form-fields').sortable();
        $('.choices ul').sortable();
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function autoForm(divDest,inputDest){
    var fields = [];

    $('.field').each(function() {

        var $this = $(this);

        //field type
        var fieldType = $this.data('type');

        //field label
        var fieldLabel = $this.find('.field-label').val();
        $this.find('.subtitle-fieldtype').text(' | '+fieldLabel);

        var fieldRegex = $this.find('.field-regex').val();

        //field name
        var fieldName = $this.find('.field-name').val();

        //field Result Format
        var fieldResultFormat = $this.find('.field-result-format').val();

        //field Result Function JS
        var fieldFnSelected = $this.find('.field-fn-selected').val();

        //field Result Function JS
        var fieldFnActivate = $this.find('.field-fn-activate').val();

        //field Url
        var fieldUrl = $this.find('.field-url').val();

        //field Url
        var fieldColumns = $this.find('.field-columns').val();

        //Field Size
        var fieldSize = $this.find('.toggle-size').val();

        //field required
        var fieldReq = $this.hasClass('required') ? 1 : 0;

        if($this.hasClass('readonly')) {
            var fieldReadOnly = $this.hasClass('readonly') ? 1 : 0;
        }

        if($this.hasClass('moneda')){
            //field moneda
            var fieldMoneda = $this.hasClass('moneda') ? 1 : 0;
        }

        if($this.hasClass('entero')) {
            //field entero
            var fieldEntero = $this.hasClass('entero') ? 1 : 0;
        }

        if($this.hasClass('reqinline')) {
            //field entero
            var fieldInline = $this.hasClass('reqinline') ? 1 : 0;
        }

        //filetypes
        var filetypes = $this.find('.field-extension').val();


        //check if this field has choices
        if($this.find('.choices li').length >= 1) {

            var choices = [];

            $this.find('.choices li').each(function() {

                var $thisChoice = $(this);

                //choice label
                var choiceLabel = $thisChoice.find('.choice-label').val();

                //choice selected
                var choiceSel = $thisChoice.hasClass('selected') ? 1 : 0;

                choices.push({
                    label: choiceLabel,
                    sel: choiceSel
                });

            });
        }

        //check if this field has choices
        if($this.find('.columns ul li').length >= 1) {

            var columns = [];

            $this.find('.columns ul li').each(function() {

                var $thisColumn = $(this);

                //choice label
                var columnTitle = $thisColumn.find('.column-title').val();

                //choice selected
                var columnValue = $thisColumn.find('.column-value').val();

                //choice type
                var columnType = $thisColumn.find('.column-type').val();

                columns.push({
                    title: columnTitle,
                    val: columnValue,
                    type: columnType
                });

            });
        }

        fields.push({
            type: fieldType,
            label: fieldLabel,
            name: fieldName,
            req: fieldReq,
            readonly: fieldReadOnly,
            choices: choices,
            columns: columns,
            filetypes: filetypes,
            moneda: fieldMoneda,
            entero: fieldEntero,
            columnas: fieldColumns,
            url: fieldUrl,
            resultFormat: fieldResultFormat,
            fnSelected: fieldFnSelected,
            fnActivate: fieldFnActivate,
            size: fieldSize,
            regex: fieldRegex,
            inline: fieldInline
        });
    });
    console.log(fields);
    inputDest.val(JSON.stringify(fields));
    generateForm(fields,divDest.find('.form-preview-form'));
    divDest.find('.form-preview-form').parsley().validate();
}

var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );

    return function( str ) {
        var ret = [];
        for( var i = 0, j = str.length; i < j; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }
        return ret.join( '' );
    }

})();


function formBuilder(jQdom){
    var divDestino = $(jQdom.attr('dest'));
    divDestino.val('[]');
    var html =
        '<div class="row">'+
            '<div class="col-md-8">'+
                '<h5>Previsualización del formulario</h5>'+
                '<div class="show-preview-form"><form class="form-preview-form row"></form></div>'+
            '</div>'+
            '<div class="col-md-4 form-builder-cont">'+
                '<h5>Configuración del documento</h5>'+

                '<div class="dropdown">'+
                    '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> Agregar campo de captura <span class="caret"></span> </button>'+
                    '<ul id="add-field" class="dropdown-menu" aria-labelledby="dropdownMenu1">'+
                        '<li><a id="add-file" data-type="file" href="#">Archivo</a></li>'+
                        '<li><a id="add-cfdi" data-type="cfdi" href="#">CFDI</a></li>'+
                        '<li><a id="add-text" data-type="text" href="#">Campo de texto</a></li>'+
                        '<li><a id="add-textarea" data-type="textarea" href="#">Textarea</a></li>'+
                        '<li><a id="add-currency" data-type="currency" href="#">Currency</a></li>'+
                        '<li><a id="add-date" data-type="datepicker" href="#">Fecha</a></li>'+
                        '<li><a id="add-modalpicker" data-type="modalpicker" href="#">Modal Picker</a></li>'+
                        '<li><a id="add-calculado" data-type="calculado" href="#">Campo calculado</a></li>'+
                        '<li><a id="add-select" data-type="select" href="#">Selección de combobox</a></li>'+
                        '<li><a id="add-radio" data-type="radio" href="#">Botones de Radio</a></li>'+
                        '<li><a id="add-checkbox" data-type="checkbox" href="#">Checkboxes</a></li>'+
                        '<li><a id="add-table" data-type="table" href="#">Tabla</a></li>'+
                    '</ul>'+
                '</div>'+
                '<hr class="line-nospace"/>'+
                '<form id="sjfb" novalidate>'+
                    '<div class="form-fields"></div>'+
                '</form>'+
            '</div>'+
        '</div>';
    jQdom.html(html);

    jQdom.on("keyup", ".field-label, .choice-label, .field-name, .column-title, .column-value, .field-extension, .field-url, .field-columns, .field-result-format, .field-fn-selected, .field-fn-activate, .field-regex", function() {
        autoForm(jQdom.find('.show-preview-form'),divDestino);
        $('.field-name').each(function(i,item){
            var divDom = $(item);
            divDom.val(normalize(divDom.val()).toLowerCase().replace(' ','').replace('.','').replace(',',''));
        });
    });

    jQdom.on("change", ".column-type", function() {
        autoForm(jQdom.find('.show-preview-form'),divDestino);
        $('.field-name').each(function(i,item){
            var divDom = $(item);
            divDom.val(normalize(divDom.val()).toLowerCase().replace(' ','').replace('.','').replace(',',''));
        });
    });

    jQdom.on('click','#add-field a', function() {
        event.preventDefault();
        $(addField($(this).data('type'))).appendTo($(this).parents('.form-builder-cont').find('.form-fields')).hide().slideDown('fast');
        $(this).parents('.form-builder-cont').find('.form-fields').sortable({
            update: function(event, ui){
                autoForm(jQdom.find('.show-preview-form'),divDestino);
            }
        });
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    jQdom.on("click", ".delete", function() {
        if (confirm('Esta seguro de querer eliminar el campo?')) {
            var $this = $(this);
            $this.parent().slideUp( "slow", function() {
                $this.parent().remove();
                autoForm(jQdom.find('.show-preview-form'),divDestino);
            });
        }
    });

    jQdom.on("click", ".display", function() {
        var $this = $(this);
        if($this.parent('.field').hasClass('fieldhidden')){
            $this.parent('.field').removeClass('fieldhidden');
            $this.html('<i class="fas fa-angle-double-up"></i>')
        }
        else{
            $this.parent('.field').addClass('fieldhidden');
            $this.html('<i class="fas fa-angle-double-down"></i>');
        }
    });

    jQdom.on('click', '.btn-create-node-tbl',function(){
        var $this = $(this);
        var HTMLcol = '<tr>';
        $this.parents('.sjfb-field').find('.item-col-form').each(function(){
            var tabla = $(this).attr('table');
            var inputType = $(this).attr('inputtype');
            var classType = '';
            if(inputType == 'currency'){classType='iscurrency';}
            if(inputType == 'fecha'){classType='isdatepicker';}
            HTMLcol += '<td class="td-input"><input name="'+tabla+'" class="form-control '+classType+'" type="text" required/></td>';
        });
        HTMLcol += '<td><a class="btn-del-input-form btn btn-xs btn-danger"><i class="fa fa-close"></i></a></td>';
        HTMLcol += '</tr>';
        $this.parents('.sjfb-field').find('tbody').append(HTMLcol);
        addIndexTableColumn($this);
        return false;
    });

    jQdom.on('click','.btn-download-node-tbl', function(){
        var $this = $(this);
        var csv = [];
        $this.parents('.sjfb-field').find('.item-col-form').each(function(){
            csv.push($(this).html());
        });
        var csvTxt = (csv.join())+'\n';
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvTxt);
        hiddenElement.target = '_blank';
        hiddenElement.download = $this.parents('.sjfb-field').find('label').html()+'.csv';
        hiddenElement.click();
        return false;
    });


    jQdom.on("click", ".toggle-inline", function() {
        requiredInline($(this));
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Makes fields size
    //$('#zn-app-container')
    jQdom.on("change", ".toggle-size", function() {
        requiredField($(this));
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Makes fields required
    //$('#zn-app-container')
    jQdom.on("click", ".toggle-required", function() {
        requiredField($(this));
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Makes fields readonly
    //$('#zn-app-container')
    jQdom.on("click", ".toggle-readonly", function() {
        readonlyField($(this));
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Makes fields moneda
    //$('#zn-app-container')
    jQdom.on("click", ".toggle-moneda", function() {
        monedaField($(this));
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Makes fields entero
    //$('#zn-app-container')
    jQdom.on("click", ".toggle-entero", function() {
        enteroField($(this));
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Makes choices selected
    //$('#zn-app-container')
    jQdom.on("click", ".toggle-selected", function() {
        selectedChoice($(this));
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Adds new choice to field with animation
    //$('#zn-app-container')
    jQdom.on('click', '.add-choice', function() {
        $(addChoice()).appendTo($(this).prev()).hide().slideDown('fast');
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

    //Adds new column to field table
    //$('#zn-app-container')
    jQdom.on('click', '.add-column', function() {
        $(addColumn()).appendTo($(this).prev()).hide().slideDown('fast');
        autoForm(jQdom.find('.show-preview-form'),divDestino);
    });

}

$.fn.formBuilder = function() {
    formBuilder(this);
};

function handleCFDIFiles(dom) {
    console.log($(dom));
    var files = dom.files;
    if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = function(event){
            var xml = event.target.result;
            var json = xmlToJson(new DOMParser().parseFromString(xml, 'text/xml'));
            json.nombreCampo = $(dom).attr('nameinput');
            loadDomTpl($(dom).parents('.sjfb-fcdi-field').find('.cont-cfdi-xml'),'./templates/extras/tpl.cfdi.hbs',json,function(){});
            console.log(json);
        };
        reader.onerror = errorNodeTblHandler;
    } else {
        alert('FileReader are not supported in this browser.');
    }
}


function errorNodeTblHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}


function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    // If just one text node inside
    if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
        obj = xml.childNodes[0].nodeValue;
    }
    else if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

function addIndexTableColumn(dom){
    var titlesNames = [];
    dom.parents('.sjfb-field').find('.item-col-form').each(function(y, item){
        titlesNames.push($(this).attr('table'));
    });
    dom.parents('.sjfb-field').find('tbody tr').each(function(i,item){
        $(item).find('.td-input').each(function(z,input){
            if($(input).find('input[type=hidden]').length>0){
                //console.log('Tiene hidden');
                $(input).find('input[type=hidden]').attr('name',titlesNames[z].replace("$i", i));
            }
            else{
                //console.log('No tiene hidden');
                $(input).find('input[type=text]').attr('name',titlesNames[z].replace("$i", i));
            }
        });
        fnMakeDatepicker($(item));
        fnMakeCurrency($(item));
    });
}

$('body').on('click', '.btn-create-node-tbl',function(){
    var $this = $(this);
    var HTMLcol = '<tr>';
    $this.parents('.sjfb-field').find('.item-col-form').each(function(){
        var tabla = $(this).attr('table');
        var inputType = $(this).attr('inputtype');
        var classType = '';
        if(inputType == 'currency'){classType='iscurrency';}
        if(inputType == 'fecha'){classType='isdatepicker';}
        HTMLcol += '<td class="td-input"><input name="'+tabla+'" class="form-control '+classType+'" type="text" required/></td>';
    });
    HTMLcol += '<td><a class="btn-del-input-form btn btn-xs btn-danger"><i class="fa fa-close"></i></a></td>';
    HTMLcol += '</tr>';
    $this.parents('.sjfb-field').find('tbody').append(HTMLcol);
    addIndexTableColumn($this);
    return false;
});

$('body').on('click','.btn-download-node-tbl', function(){
    var $this = $(this);
    var csv = [];
    $this.parents('.sjfb-field').find('.item-col-form').each(function(){
        csv.push($(this).html());
    });
    var csvTxt = (csv.join())+'\n';
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvTxt);
    hiddenElement.target = '_blank';
    hiddenElement.download = $this.parents('.sjfb-field').find('label').html()+'.csv';
    hiddenElement.click();
    return false;
});

$('body').on('click', '.btn-del-input-form',function(){
    var $this = $(this);
    var padre = $this.parents('table');
    $this.parents('tr').remove();
    addIndexTableColumn(padre);
    return false;
});


