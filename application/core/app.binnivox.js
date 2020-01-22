/**
 * Dyntpl. Dynamic template
 * @param {domTag}
 * @descriptor Renderiza contenido HTML pasando configuraciones dentro del DOM.
 */
function dyntpl(domTag){
    if (domTag.find('.dyn-tpl').length) {
        domTag.find('.dyn-tpl').each(function(i, item){
            $(this).html('');
            var config = {
                dom : $(this),
                templateID : (($(this).attr('idsource'))?("#"+$(this).attr('idsource')):false),
                templateURL : (($(this).attr('urlsource'))?($(this).attr('urlsource')):false),
                url : (($(this).attr('url'))?$(this).attr('url'):false),
                useBaseURL:(($(this).attr('baseurl'))?true:false),
                fnLoad : (($(this).attr('fnload'))?$(this).attr('fnload'):false)
            };
            var baseUrl = (config.useBaseURL)?($('body').attr('url-config')+'/'):'';
            if(config.templateURL && config.url){
                peticionApi('get',config.url)
                    .done(function(dataResult){
                        $.get( baseUrl+config.templateURL, function( source ) {
                            var template = Handlebars.compile(source);
                            config.dom.html(template(dataResult));
                            fnInit(config.dom);
                            if(config.fnLoad){
                                eval(config.fnLoad);
                            }
                        });
                    });
            }
            else if(config.templateID && config.url){
                peticionApi('get',config.url)
                    .done(function(dataResult){
                        config.dom.html(loadHTML(config.templateID,dataResult));
                        fnInit(config.dom);
                        if(config.fnLoad){
                            eval(config.fnLoad);
                        }
                    });
            }
            else if(config.templateURL){
                $.get( baseUrl+config.templateURL, function( source ) {
                    var template = Handlebars.compile(source);
                    config.dom.html(template());
                    fnInit(config.dom);
                    if(config.fnLoad){
                        eval(config.fnLoad);
                    }
                });
            }
            else if(config.templateID){
                config.dom.html(loadHTML(config.templateID,{}));
                fnInit(config.dom);
                if(config.fnLoad){
                    eval(config.fnLoad);
                }
            }
        });
    }
}

/**
 * dateInput
 * @descriptor Agrega propiedades de datepicker a un input con la clase .datepicker
 */
function dateInput(jQdom) {
    if (jQdom.find('.datepicker').length) {
        jQdom.find('.datepicker').each(function () {
            var dom = $(this);

            // Si tiene un valor de aaaa-mm-dd (que viene de la bd)
            // lo cambiamos a dd/mm/yyyy para mostrarlo al usuario
            // dom.val( dameFechaParaPantalla( dom.val() ) );
            dom.attr('readonly','readonly');
            dom.datepicker({
                // format: 'dd/mm/yyyy',
                format: 'yyyy-mm-dd',
                language: 'es',
                forceParse: false,
                startDate: (isDefined($(this).attr('start-date')))?$(this).attr('start-date'):false,
                endDate: (isDefined($(this).attr('end-date')))?$(this).attr('end-date'):false,
                templates:{
                    leftArrow: '<i class="glyphicon glyphicon-arrow-left"></i>',
                    rightArrow:'<i class="glyphicon glyphicon-arrow-right"></i>'
                }
            })
                .on('changeDate', function(e) {
                    dom.datepicker('hide');
                });

            // dom.blur(function(e){
            //     e.preventDefault();
            //     validaFecha( $(this).val(), $(this).attr("id"), true, false )
            //     e.stopPropagation();
            //     return false;
            // });

        });
    }
}

/**
 * dateTimeInput
 * @descriptor Agrega propiedades de datetimepicker a un input con la clase .datetimepicker
 */
function dateTimeInput(jQdom){
    if (jQdom.find('.datetimepicker').length) {
        jQdom.attr('readonly','readonly');
        jQdom.find('.datetimepicker').each(function () {
            var dom = $(this);
            dom.datetimepicker({
                format: 'yyyy-mm-dd hh:ii',
                language: 'es',
                autoclose: true
            });
        });
    }
}

/**
 * TimeInput
 * @descriptor Agrega propiedades de Timepicker a un input con la clase .timepicker
 */
function timeInput(jQdom){
    if (jQdom.find('.timepicker').length) {
        jQdom.attr('readonly','readonly');
        jQdom.find('.timepicker').each(function () {
            var dom = $(this);
            dom.timepicker({
                template: false,
                showInputs: false,
                minuteStep: 5
            });
        });
    }
}

/**
 * dateRangeInput
 * @descriptor Agrega propiedades de Timepicker a un input con la clase .timepicker
 */
function dateRangeInput(jQdom){
    if (jQdom.find('.daterangepickr').length) {
        jQdom.find('.daterangepickr').each(function () {
            var dom = $(this);
            dom.daterangepicker({
                    startDate: (isDefined($(this).attr('start-date')))?$(this).attr('start-date'):false,
                    endDate: (isDefined($(this).attr('end-date')))?$(this).attr('end-date'):false,
                    applyClass: "btn-primary",
                    "alwaysShowCalendars": true,
                    "autoApply": true,
                    ranges: {
                        'Hoy': [moment(), moment()],
                        'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],
                        'Últimos 30 dias': [moment().subtract(29, 'days'), moment()],
                        'Este mes': [moment().startOf('month'), moment().endOf('month')],
                        'Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    locale: {
                        format: 'YYYY-MM-DD',
                        applyLabel: 'Consulta Periodo',
                        cancelLabel: 'Limpiar',
                        fromLabel: 'Desde',
                        toLabel: 'Hasta',
                        customRangeLabel: 'Personalizar',
                        daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
                        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        firstDay: 1
                    }
                },
                function(start, end, label) {
                });
        });
    }
}

/**
 * selectLoad
 * @descriptor Select dinamico
 */
function selectLoad(jQdom){
    if (jQdom.find('.select-load').length) {
        jQdom.find('.select-load').each(function(){
            selectInit($(this));
        });
    }
}

/**
 * selectInit
 * @descriptor Ejecuta el comportamiento de un select dinamico
 */
function selectInit(dom){
    var domElem = dom;
    var url = domElem.attr('url');
    var valOption = domElem.attr('val');
    var keyOption = domElem.attr('key');
    var index = (isDefined(domElem.attr('index'))?domElem.attr('index'):false);
    var defaultVal = (isDefined(domElem.attr('default'))?domElem.attr('default'):false);
    var fnOnchange = (isDefined(domElem.attr('fn-change'))?domElem.attr('fn-change'):false);
    var reset = (isDefined(domElem.attr('reset'))?true:false);
    var seleccionado = false;
    if (typeof domElem.attr('seleccionado') !== typeof undefined && domElem.attr('seleccionado') !== false) {
        seleccionado = domElem.attr('seleccionado');
    }
    var seleccionadoKey = false;
    if (typeof domElem.attr('seleccionadokey') !== typeof undefined && domElem.attr('seleccionadokey') !== false) {
        seleccionadoKey = domElem.attr('seleccionadokey');
    }
    peticionApi('get',url)
        .done(function(dataResult){
            var values = false;
            if(index){
                values = dataResult[index]
            }
            else{
                values = dataResult;
            }
            if(reset){
                domElem.html('');
            }
            if(defaultVal){
                domElem.append('<option value=""> </option>');
            }
            $.each(values, function(i, item){
                if(seleccionado==false){
                    var html = '<option value="'+item[keyOption]+'">'+item[valOption]+'</option>';
                }
                else{
                    if(seleccionadoKey){
                        var html = '<option value="'+item[keyOption]+'" '+((seleccionado == String(item[seleccionadoKey]))?'selected':'')+'>'+item[valOption]+'</option>';
                    }
                    else{
                        var html = '<option value="'+item[keyOption]+'" '+((seleccionado == item[keyOption])?'selected':'')+'>'+item[valOption]+'</option>';
                    }
                }
                domElem.append(html);
            });
        });
    if(fnOnchange){
        domElem.change(function(){
            eval(fnOnchange);
        });
    }
}

/**
 * autocompleteAction
 * @descriptor Genera un autocompletado
 */
function autocompleteAction(jQdom){
    if (jQdom.find('.typeahead').length) {
        jQdom.find('.typeahead').each(function(){
            var domElem = $(this);
            domElem.attr("autocomplete","off");
            $('<input type="hidden" class="typehead-value">').insertBefore(domElem);
            (isDefined(domElem.attr('name')))?domElem.prev(".typehead-value").attr('name',domElem.attr('name')):'';
            (isDefined(domElem.attr('name')))?domElem.removeAttr('name',domElem.attr('name')):'';
            var config = {
                dom: domElem,
                url: domElem.attr('url'),
                keyoption: (isDefined(domElem.attr('key'))?domElem.attr('key'):"id"),
                valoption: (isDefined(domElem.attr('val'))?domElem.attr('val'):"name"),
                index: (isDefined(domElem.attr('index'))?domElem.attr('index'):"data"),
                defaultvalue: (isDefined(domElem.attr('default'))?domElem.attr('default'):false),
            };
            if(isDefined(config.url)){
                peticionApi('get',config.url)
                    .done(function(dataResult){
                        if(config.defaultvalue){
                            $.each(dataResult[config.index], function(i, item){
                                if(item[config.keyoption]==config.defaultvalue){
                                    domElem.prev(".typehead-value").val(config.defaultvalue);
                                    domElem.val(item[config.valoption]);
                                }
                            });
                        }
                        var configTypehead = {
                            source: dataResult[config.index],
                            autoSelect:false,
                            displayText:function(elem){
                                return elem[config.valoption];
                            },
                            afterSelect: function(elem){
                                domElem.prev(".typehead-value").val(elem[config.keyoption]);
                            }
                        };
                        domElem.typeahead(configTypehead);
                    });
            }
            domElem.keyup(function(e){
                if((e.keyCode == 8)||(e.keyCode == 46)) {
                    domElem.val('');
                    domElem.prev(".typehead-value").val('');
                }
            });
        });
    }
}

/**
 * fnLanzaModal
 * @descriptor Muestra un modal con el contenido de una plantilla
 */
function fnLanzaModal(){
    /*
     * Configuración
     *
     * Se asigna la propiedad al HTML
     * Ej. <button data-size="modal-sm" data-header="Testing Header">Test</button>
     *
     * Size: full-width|modal-lg|modal-sm
     * Header: String
     */
    $('#modal-system').find('.modal-dialog').removeClass('full-width').removeClass('modal-lg').removeClass('modal-sm');
    $('#modal-system').find('.modal-header h4').remove();
    $('#modal-system').removeClass('colored-header').removeClass('red').removeClass('success').removeClass('warning').removeClass('prusia').removeClass('dark');
    $('#modal-system').find('.modal-body').html('');

    var config = {
        size : (($(this).data('size') != '')?$(this).data('size'):false),
        header : (($(this).data('header'))?$(this).data('header'):false),
        header_color : (($(this).data('headercolor'))?$(this).data('headercolor'):false),
        templateID : (($(this).data('idsource'))?("#"+$(this).data('idsource')):false),
        templateURL : (($(this).data('urlsource'))?($(this).data('urlsource')):false),
        url : (($(this).data('url'))?$(this).data('url'):false),
        json : (($(this).data('json'))?$(this).data('json'):false),
        fnsuccess : (($(this).data('fnsuccess'))?$(this).data('fnsuccess'):false),
        fnLoad : (($(this).data('fnload'))?$(this).data('fnload'):false)
    };

    if(config.size){$('#modal-system').find('.modal-dialog').addClass(config.size);}
    if(config.header){$('#modal-system').find('.modal-header').append('<h4 class="modal-title">'+config.header+'</h4>');}
    if(config.header){$('#modal-system').addClass('colored-header');}
    if(config.header_color){$('#modal-system').addClass(config.header_color);}

    $('#modal-system').find('.modal-body').empty();
    if(config.templateURL && config.url){
        peticionApi('get',config.url)
            .done(function(dataResult){
                if(dataResult.status == true){
                    $.get( $('body').attr('url-tpl')+'/'+config.templateURL, function( source ) {
                        var template = Handlebars.compile(source);
                        $('#modal-system').find('.modal-body').html(template(dataResult));
                        $('#modal-system').modal("show");
                        fnInit($('#modal-system').find('.modal-body'));
                        if(config.fnLoad){
                            eval(config.fnLoad);
                        }
                        return false;
                    });
                }
                else{
                    console.log('Error');
                }
            }).fail(function(x){
                console.log('Error');
            });
    }
    else if (config.templateURL && config.json) {
        $.get( $('body').attr('url-tpl')+'/'+config.templateURL, function( source ) {
            var template = Handlebars.compile(source);
            $('#modal-system').find('.modal-body').html(template(config.json));
            $('#modal-system').modal("show");
            fnInit($('#modal-system').find('.modal-body'));
            if(config.fnLoad){
                eval(config.fnLoad);
            }
            return false;
        });
    }
    else if (config.templateURL) {
        $.get( $('body').attr('url-tpl')+'/'+config.templateURL, function( source ) {
            var template = Handlebars.compile(source);
            $('#modal-system').find('.modal-body').html(template(config.url));
            $('#modal-system').modal("show");
            fnInit($('#modal-system').find('.modal-body'));
            if(config.fnLoad){
                eval(config.fnLoad);
            }
            return false;
        });
    }
    else if(config.templateID && config.url){
        peticionApi('get',config.url)
            .done(function(dataResult){
                if(dataResult.status == true){
                    $('#modal-system').find('.modal-body').html(loadHTML(config.templateID,dataResult));
                    $('#modal-system').modal("show");
                    fnInit($('#modal-system').find('.modal-body'));
                    if(config.fnLoad){
                        eval(config.fnLoad);
                    }
                }
                else{
                    console.log('Error');
                }
            }).fail(function(){
                console.log('Error');
            });
    }
    else if (config.templateID && config.json) {
        $('#modal-system').find('.modal-body').html(loadHTML(config.templateID,config.json));
        $('#modal-system').modal("show");
        fnInit($('#modal-system').find('.modal-body'));
        if(config.fnLoad){
            eval(config.fnLoad);
        }
    }
    else if (config.templateID) {
        var html = loadHTML(config.templateID,config.url);
        $('#modal-system').find('.modal-body').html(html);
        $('#modal-system').modal("show");
        fnInit($('#modal-system').find('.modal-body'));
        if(config.fnLoad){
            eval(config.fnLoad);
        }
    } else {
        $('#modal-system').modal("show");
    }
    if(config.fnsuccess){
        eval(config.fnsuccess);
    }
    return false;
}

/**
 * isDefined
 * @descriptor Evalua si una variable esta definida o no
 */
function isDefined(variable){
    if(typeof variable == 'undefined'){
        return false;
    }
    else{
        return true;
    }
}

/**
 * parseHTML
 * @descriptor Compila un template de handlebars y retorna la cadena HTML
 */
function parseHTML(source,data){
    var template = Handlebars.compile(source);
    if(data){
        return template(data);
    }
    else{
        return template;
    }
}

/**
 * loadHTML
 * @descriptor Recibe un DIV lo compila como template de handlebars y retorna la cadena HTML
 */
function loadHTML(templateID,data){
    var source   = $(templateID).html();
    var template = Handlebars.compile(source);
    if(data){
        return template(data);
    }
    else{
        return template;
    }
}

/**
 * loadRemoteTpl
 * @descriptor Carga un template por su URL, lo compila con hanlebars y lo añade en un DOM definido
 */
function loadRemoteTpl(domDest,urlTpl,data,fn){
    $.get( urlTpl, function( source ) {
        var template = Handlebars.compile(source);
        $(domDest).html(template(data));
        fnInit($(domDest));
        if(isDefined(fn)){
            fn();
        }
    });
    return false;
}
/**
 * loadRemoteTplJquery
 * @descriptor Carga un template por su URL, lo compila con hanlebars y lo añade en un DOM definido
 */
function jQloadRemoteTpl(domDest,urlTpl,data,fn){
    $.get( urlTpl, function( source ) {
        var template = Handlebars.compile(source);
        domDest.html(template(data));
        fnInit(domDest);
        if(isDefined(fn)){
            fn();
        }
    });
    return false;
}
/** Plugin de Jquery para facilitar su ejecución */
$.fn.loadRemoteTpl = function(urlTpl,data,fn) {
    jQloadRemoteTpl(this,urlTpl,data,fn)
};

/**
 * peticionApi
 * @param metodo        Método de peticion GET,POST,PUT,DELETE
 * @param url           URl de la petición HTTP
 * @param parametros    parametros de la petición HTTP
 * @descriptor Realiza una petición HTTPP a una URL
 */
function peticionApi(metodo,url,parametros) {
    var opcionesAjax ={
        type: metodo,
        url: url,
        dataType: "json",
        timeout: 0
    };
    if((typeof parametros != 'undefined') || (parametros != false)){
        opcionesAjax.data = parametros;
    };
    if($('body').hasClass('debug')){
        console.log("Peticion AJAX: "+metodo);
        console.log("Peticion url: "+url);
        console.log("Peticion parametros: "+parametros);
    }
    return $.ajax(opcionesAjax);
}

/**
 * peticionFormData
 * @param metodo        Método de peticion GET,POST,PUT,DELETE
 * @param url           URl de la petición HTTP
 * @param data    parametros de la petición HTTP
 * @descriptor Realiza una petición HTTPP a una URL utilizando FORMDATA
 */
function peticionFormData(metodo, url, data){
    var opcionesAjax ={
        type: metodo,
        url: url,
        dataType: "json",
        data: data,
        processData: false,
        contentType: false
    };
    if($('body').hasClass('debug')){
        console.log("Peticion AJAX: "+metodo);
        console.log("Peticion url: "+url);
        //console.log("Peticion parametros: "+parametros);
    }
    return $.ajax(opcionesAjax);
}

/**
 * rndrConfig
 * @param jQdom        DOM de busqueda
 * @descriptor Sustituye los valores HTML de la clase render-config con lo que tenga en su atributo config, del archivo config.js
 */
function rndrConfig(jQdom){
    if (jQdom.find('.render-config').length) {
        jQdom.find('.render-config').each(function () {
            $(this).html(configurationApp[$(this).attr('config')]);
        });
    }
}

/**
 * setAttrFromConfig
 * @param jQdom        DOM de busqueda
 * @descriptor Sustituye los valores de atributos de HTML de la clase set-url-config[url-index] en un Atributo definido como target con lo que tenga en su atributo config, del archivo config.js
 */
function setUrlFromConfig(jQdom){
    if (jQdom.find('.set-url-config').length) {
        jQdom.find('.set-url-config').each(function () {
            if(!$(this).hasClass('getted-url')){
                var dom = $(this);
                var config = {
                    dom: dom,
                    index: (isDefined($(this).attr('url-index')))?appUrls[$(this).attr('url-index')]:'api',
                    target: (isDefined($(this).attr('attr-target')))?$(this).attr('attr-target'):'action'
                };
                if(config.index && config.target){
                    dom.attr(config.target,config.index+dom.attr(config.target)).addClass('getted-url');
                }
            }
        });
    }
}

/**
 * fnInit
 * @param jQdom        DOM de busqueda
 * @descriptor Inicializa componentes en el DOM definido.
 */
function fnInit(jQdom){
    setUrlFromConfig(jQdom);
    dyntpl(jQdom);
    rndrConfig(jQdom);
    fnMakeModal(jQdom);
    fnFormSubmit(jQdom);
    fnDelButton(jQdom);
    dateInput(jQdom);
    dateTimeInput(jQdom);
    timeInput(jQdom);
    dateRangeInput(jQdom);
    fileFormPreview(jQdom);
    selectLoad(jQdom);
    autocompleteAction(jQdom);
    fnDatatables(jQdom);
    colorpicker(jQdom);
    fnMultiElement(jQdom);
    fnCloseMultiElement(jQdom);
    fnAddMultiElement(jQdom);
    fnPrinting(jQdom);
}
/** Plugin de Jquery para facilitar la ejcución */
$.fn.binnivox = function() {
    fnInit(this);
};

/**
 * fnFormSubmit
 * @param jQdom        DOM de busqueda
 * @descriptor Inicializa componentes de formulario en el DOM definido.
 */
function fnFormSubmit(jQdom){
    if (jQdom.find('.form-submit').length) {
        jQdom.find('.form-submit').each(function(){
            $(this).off();
            $(this).parsley();
            $(this).submit(function(){
                if($(this).parsley().validate()){
                    var config = {
                        dom: $(this),
                        tipoEnvio: (isDefined($(this).attr('tipo-envio'))?$(this).attr('tipo-envio'):'ajax'),
                        metodo: $(this).attr('method'),
                        url: $(this).attr('action'),
                        data: $(this).serialize(),
                        redirect: (isDefined($(this).attr('redirect'))?$(this).attr('redirect'):false),
                        msgTitle: (isDefined($(this).attr('msg-title'))?$(this).attr('msg-title'):'OK!'),
                        msgQuery: (isDefined($(this).attr('msg-query'))?$(this).attr('msg-query'):'La operación se ha realizado correctamente!'),
                        fnSuccess: (isDefined($(this).attr('fn-success'))?$(this).attr('fn-success'):false),
                        fnFail: (isDefined($(this).attr('fn-fail'))?$(this).attr('fn-fail'):false),
                        disableAlert: (isDefined($(this).attr('disable-alert'))?$(this).attr('disable-alert'):false)
                    };
                    console.log(config);
                    $( ".btn" ).prop( "disabled", true );
                    config.dom.find('button').attr('disabled','disabled');
                    var envio;
                    if(config.tipoEnvio == 'formdata'){
                        config.data = new FormData(config.dom[0]);
                        config.dom.find('.cam-file').each(function(){
                            if($(this).val().length > 0){
                                var ImageURL = $(this).val();
                                var nameInput = $(this).attr('name-file');
                                var block = ImageURL.split(";");
                                var contentType = block[0].split(":")[1];
                                var realData = block[1].split(",")[1];
                                var blob = b64toBlob(realData, contentType);
                                config.data.append(nameInput, blob);
                            }
                        });
                        envio = peticionFormData(config.metodo,config.url,config.data);
                    }
                    else{
                        envio = peticionApi(config.metodo,config.url,config.data);
                    }
                    envio
                        .done(function(dataResult){
                            if(!config.disableAlert){
                                Swal.fire({
                                    type: 'success',
                                    title: config.msgTitle,
                                    text: config.msgQuery
                                }).then(function(result) { });
                            }
                            config.dom.find('button').removeAttr('disabled');
                            if(config.fnSuccess){
                                eval(config.fnSuccess);
                            }
                            if(config.redirect){
                                window.location.replace(config.redirect);
                            }
                        })
                        .fail(function(dataFail,response,jqXHR){
                            try {
                                if(jqXHR == 'Unauthorized'){
                                    location.reload();
                                }
                            } catch (e ) {
                                console.log( response );
                                console.log( dataFail );
                            }
                            if(!config.disableAlert){
                                Swal.fire({
                                    type: 'warning',
                                    title: 'Aviso: N/A',
                                    text: 'Hay un problema con los datos enviados',
                                });
                            }
                            config.dom.find('button').removeAttr('disabled');
                            if(config.fnFail){
                                eval(config.fnFail);
                            }
                        })
                        .always(function(){
                            config.dom.find('button').removeAttr('disabled');
                            $( ".btn" ).prop( "disabled", false );
                        });
                    return false;
                }
                return false;
            });
        });
    }
}

/**
 * colorpicker
 * @param jQdom        DOM de busqueda
 * @descriptor Agrega color picker a un input HTML
 */
function colorpicker(jQdom){
    if (jQdom.find('.color-picker').length) {
        jQdom.find('.color-picker').each(function () {

            var dom = $(this);
            var config = {
                dom: dom,
            };
            config.dom.attr('readonly','readonly');
            config.dom.colorpicker();
        });
    }
}

/**
 * multiElement
 * @param jQdom        DOM de busqueda
 * @descriptor Agrega elemento multielement a un div HTML
 */
function fnMultiElement(jQdom){
    if (jQdom.find('.multi-input').length) {
        jQdom.find('.multi-input').each(function () {
            var dom = $(this);
            var config = {
                dom: dom,
                templateURL : dom.attr('url-tpl'),
                closeDiv : (isDefined(dom.attr('close-class'))?dom.attr('close-class'):false),
                addDiv : (isDefined(dom.attr('add-class'))?dom.attr('add-class'):false),
            };
            if (config.dom.find('.multi-element').length) {
                config.dom.find('.multi-element').each(function () {
                    var subDom = $(this);
                    subDom.addClass('added');
                    if(config.closeDiv){
                        subDom.find(config.closeDiv).append('<a href="#" class="btn btn-xs btn-outline-danger btn-close-multi-input"><i class="fa fa-times"></i></a>');
                    }
                    else{
                        subDom.append('<a href="#" style="position: absolute; top:0; right:0; font-size: 0.675em !important;" class="btn btn-xs btn-outline-danger btn-close-multi-input"><i class="fa fa-times"></i></a>');
                    }
                });
            }
            config.dom.after('<a href="#" class="btn btn-block btn-xs btn-default btn-add-multi-input" align="center">Agregar</a>');
        });
    }
}

/**
 * fnCloseMultiElement
 * @param jQdom        DOM de busqueda
 * @descriptor Busca botones de borrado de un multielement
 */
function fnCloseMultiElement(jQdom){
    jQdom.find('.btn-close-multi-input').on('click',function(){
        var dom = $(this);
        dom.parents('.multi-element').remove();
        return false;
    });
}

/**
 * fnAddMultiElement
 * @param jQdom        DOM de busqueda
 * @descriptor Busca botones de añadir multiinputs de un multielement
 */
function fnAddMultiElement(jQdom){
    jQdom.find('.btn-add-multi-input').on('click',function(){
        var dom = $(this);
        var config = {
            dom: dom.prev('.multi-input'),
            templateURL : dom.prev('.multi-input').attr('url-tpl'),
            closeDiv : (isDefined(dom.prev('.multi-input').attr('close-class'))?dom.prev('.multi-input').attr('close-class'):false)
        };
        console.log(config);
        $.get( $('body').attr('url-tpl')+'/'+config.templateURL, function( source ) {
            var template = Handlebars.compile(source);
            config.dom.append(template({}));
            if (config.dom.find('.multi-element').length) {
                config.dom.find('.multi-element').each(function () {
                    console.log($(this));
                    var subDom = $(this);
                    if(!(subDom.hasClass('added'))){
                        subDom.addClass('added');
                        if(config.closeDiv){
                            subDom.find(config.closeDiv).append('<a href="#" class="btn btn-xs btn-outline-danger btn-close-multi-input"><i class="fa fa-times"></i></a>');
                        }
                        else{
                            subDom.append('<a href="#" style="position: absolute; top:0; right:0;" class="btn btn-xs btn-outline-danger btn-close-multi-input"><i class="fa fa-times"></i></a>');
                        }
                        fnInit(subDom);
                    }
                });
            }
            return false;
        });
        return false;
    });
}

/**
 * fnPrinting
 * @param jQdom        DOM de busqueda
 * @descriptor Busca la clase .print-btn para mandar a imprimir
 */
function fnPrinting(jQdom){
    if (jQdom.find('.print-btn').length) {
        jQdom.find('.print-btn').each(function () {
            $(this).on('click', function(){
                var dom = $(this);
                var config = {
                    dom: dom,
                    divPrint : (isDefined(dom.attr('div-print'))?dom.attr('div-print'):false),
                    stylesheet: (isDefined(dom.attr('stylesheet'))?dom.attr('stylesheet'):false),
                    title: (isDefined(dom.attr('title'))?dom.attr('title'):'')
                };
                if ($.fn.print) {
                    $(config.divPrint).print({
                        globalStyles: true,
                        mediaPrint: true,
                        stylesheet: config.stylesheet,
                        noPrintSelector: ".no-print",
                        iframe: true,
                        append: null,
                        prepend: null,
                        manuallyCopyFormValues: true,
                        deferred: $.Deferred(),
                        timeout: 750,
                        title: config.title,
                        doctype: '<!doctype html>'
                    });
                }
                return false;
            });
        });
    }
}

/**
 * fnDelButton
 * @param jQdom        DOM de busqueda
 * @descriptor Busca botones de borrado realizando un petición a una URL por http
 */
function fnDelButton(jQdom){
    if (jQdom.find('.delete-btn').length) {
        jQdom.find('.delete-btn').each(function () {
            var config = {
                dom : $(this),
                title:(isDefined($(this).attr('title'))?$(this).attr('title'):'Elemento'),
                action: (($(this).attr('action'))?$(this).attr('action'):false),
                header: (isDefined($(this).attr('alert-header'))?$(this).attr('alert-header'):'Confirmación'),
                message: (isDefined($(this).attr('alert-msg'))?$(this).attr('alert-msg'):'¿Estas seguro de eliminar el elemento?'),
                txtBotonSi: (isDefined($(this).attr('alert-btn-yes'))?$(this).attr('alert-btn-yes'):'Si, eliminar'),
                txtBotonNo: (isDefined($(this).attr('alert-btn-no'))?$(this).attr('alert-btn-no'):'No, cancelar!'),
                successHeader: (isDefined($(this).attr('alert-header-success'))?$(this).attr('alert-header-success'):'¡Elemento Eliminado!'),
                successMsg: (isDefined($(this).attr('alert-msg-success'))?$(this).attr('alert-msg-success'):(isDefined($(this).attr('title'))?$(this).attr('title'):'Elemento')+' eliminado exitosamente!'),
                metodo: (isDefined($(this).attr('method'))?$(this).attr('method'):'delete'),
                fnSuccess: (isDefined($(this).attr('fn-success'))?$(this).attr('fn-success'):false)
            };
            config.dom.on('click', function(){
                console.log('Btn de borrado activado!');
                console.log(config.dom);
                Swal.fire({
                    title: config.header,
                    text: config.message,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: config.txtBotonSi,
                    cancelButtonText: config.txtBotonNo,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: true
                }).then(function (action) {
                    if(isDefined(action.value)){
                        if(action.value == true){
                            peticionApi(config.metodo,config.action)
                                .done(function(dataResult){
                                    Swal.fire({
                                        type: 'success',
                                        title: config.successHeader,
                                        text: config.successMsg
                                    });
                                    if(config.fnSuccess){
                                        eval(config.fnSuccess);
                                    }
                                    return false;
                                })
                                .fail(function(dataFail,response,jqXHR){
                                    // Si trae un mensaje de error
                                    if ( dataFail.responseJSON.message !== undefined ) {
                                        Swal.fire({
                                            type: 'error',
                                            title: 'Aviso',
                                            text: dataFail.responseJSON.message
                                        });
                                    } else if ( dataFail.responseJSON.msg !== undefined ) {
                                        Swal.fire({
                                            type: 'error',
                                            title: 'Aviso',
                                            text: dataFail.responseJSON.msg
                                        });
                                    } else {
                                        Swal.fire({
                                            type: 'Aviso',
                                            text: 'Resultado No Identificado", "Houston... tenemos un problema...'
                                        });
                                    }
                                });

                            return false;
                        }
                        else{
                            return false;
                        }
                    }
                    else{
                        return false;
                    }
                }, function (dismiss) {
                    return false;
                });
                return false;
            });
        });
    }
}

function fnDatatables(jQdom){
    if (jQdom.find('.datatable').length) {
        jQdom.find('.datatable').each(function(){
            var domElem = $(this);
            var ajax = isDefined(domElem.attr('ajax'))?{url:domElem.attr('ajax'),type: "POST"}:false;
            var processing = isDefined(domElem.attr('processing'))?domElem.attr('processing'):false;
            var serverSide = isDefined(domElem.attr('serverside'))?domElem.attr('serverside'):false;
            var columns = isDefined(domElem.attr('columns-tpl'))?eval(domElem.attr('columns-tpl')):false;
            var fnDraw = isDefined(domElem.attr('fndraw'))?(domElem.attr('fndraw')):false;

            var tconfig = {
                paging: true,
                language: {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            };
            if(ajax){tconfig.ajax = ajax;}
            if(processing){tconfig.processing = processing;}
            if(serverSide){tconfig.serverSide = serverSide;}
            if(columns){tconfig.columns = columns;}

            domElem.DataTable(tconfig);
            if(fnDraw){
                domElem.on('draw.dt', function () {eval(fnDraw);});
            }
        });
    }
}

function fileFormPreview(jQdom){
    if (jQdom.find('.file-preview').length) {
        jQdom.find('.file-preview').each(function(){
            var dom = $(this);
            dom.change(function(){
                var numFiles = $(this).get(0).files ? $(this).get(0).files.length : 1;
                var label = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');

                if(numFiles>1){
                    alert("Número de archivos no válido");
                    this.value = '';
                    return false;
                }
                else{
                    dom.parents('.input-group').find('.form-control').val(label);
                    var accept = $(this).attr('accept');
                    var acceptArr = accept.split(',');
                    acceptArr = acceptArr.map(function (el) {
                        return el.trim();
                    });
                    var extension = $(this).val().replace(/^.*\./, '');
                    if (extension ==  $(this).val()) {
                        extension = '';
                    } else {
                        extension = extension.toLowerCase();
                    }
                    if (!($.inArray("image/*",acceptArr) == -1)) {
                        acceptArr = acceptArr.concat(['.png','.jpg','.jpeg','.gif']);
                    }
                    if ($.inArray("."+extension,acceptArr) == -1) {
                        dom.parents('.input-group').parent().find('.previewFile').attr('src', '#');
                        alert("Formato de imagen no válido");
                        this.value = '';
                        return false;
                    }
                    else{
                        switch (extension) {
                            case 'jpg':
                                readImgFileUrl(dom,this);
                                break;
                            case 'jpeg':
                                readImgFileUrl(dom,this);
                                break;
                            case 'png':
                                readImgFileUrl(dom,this);
                                break;
                            case 'gif':
                                readImgFileUrl(dom,this);
                                break;
                            case 'pdf':
                                readFileType(dom,'pdf');
                                break;
                            case 'doc':
                                readFileType(dom,'doc');
                                break;
                            case 'docx':
                                readFileType(dom,'doc');
                                break;
                            case 'xls':
                                readFileType(dom,'xls');
                                break;
                            case 'xlsx':
                                readFileType(dom,'xls');
                                break;
                            case 'ppt':
                                readFileType(dom,'ppt');
                                break;
                            case 'pptx':
                                readFileType(dom,'ppt');
                                break;
                            case 'zip':
                                readFileType(dom,'zip');
                                break;
                            case 'rar':
                                readFileType(dom,'rar');
                                break;
                            case 'txt':
                                readFileType(dom,'txt');
                                break;
                            default:
                                readFileType(dom,'file');
                        }
                    }
                }
            });
        });
    }
}

function readImgUrl(element,input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            element.parents('.input-group').parent().find('.previewImg').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function readImgFileUrl(element,input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            element.parents('.input-group').parent().find('.previewFile').attr('src', e.target.result).removeAttr('height').attr('width',100);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function readFileType(element,tipo){
    element.parents('.input-group').parent().find('.previewFile').attr('src', $('body').attr('url-tpl')+"/dist/img/filetypes/"+tipo+'.png').removeAttr('width').attr('height',50);
}

function fnMakeModal(jQdom){
    if ($('body').find('#modal-system').length) {
        jQdom.find('.modal-event').on('click',fnLanzaModal);
    }
    else{
        $('body').append('<div id="modal-system" class="modal fade in" style="z-index:1200;" tabindex="-1" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> </div> <div class="modal-body"> </div> </div> </div> </div>');
        jQdom.find('.modal-event').on('click',fnLanzaModal);
    }
}

/**
 * b64toBlob
 * @param b64Data           Datos encodificados del archivo
 * @param contentType       Tipo de contenido que se está codificando
 * @param sliceSize
 * @descriptor Convierte los valores de una cadena de base64 en un archivo Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

/*
function showDate(){
    var date = new Date(), str = date.toUTCString();
    return str;
}
var orig = console.log;
console.log = function() {
    if($('body').hasClass('debug')){
        var msgs = [];

        while(arguments.length) {
            msgs.push("[" + showDate() + "]" + ': ' + [].shift.call(arguments));
        }

        orig.apply(console, msgs);
    }
};*/