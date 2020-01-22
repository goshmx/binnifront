/**
 * Simple jQuery Form Builder (SJFB)
 * Copyright (c) 2015 Brandon Hoover, Hoover Web Development LLC (http://bhoover.com)
 * http://bhoover.com/simple-jquery-form-builder/
 * SJFB may be freely distributed under the included MIT license (license.txt).
 */

//generates the form HTML
function generateForm(data, divId, editData) {
    //empty out the preview area
    divId.empty();
        if (data) {
            //go through each saved field object and render the form HTML
            $.each( data, function( k, v ) {
                var colCount = 0;

                var fieldType = v['type'];
                var fieldName = v['name'];

                //Add the field
                divId.append(addFieldHTML(fieldType,fieldName));
                var $currentField = divId.find('.sjfb-fieldtype').last();

                //Add the label
                $currentField.find('.sjfb-fieldtype-label').text(v['label']);

                (v['size'])?$currentField.addClass('col-md-'+v['size']):$currentField.addClass('col-xs-12');
                colCount+= parseInt((v['size'])?v['size']:12);
                if(colCount>=12){
                    divId.append('<div class="clearfix"></div>');
                    colCount=0;
                }

                if(fieldType == 'modalpicker'){
                    $currentField.find('input').attr('url',v['url']);
                    $currentField.find('input').attr('data-columnas',v['columnas']);
                    $currentField.find('input').attr('data-resultformat',v['resultFormat']);
                    $currentField.find('input').attr('fn-selected',v['fnSelected']);
                    getUrlFromApp($currentField);
                    inputModalPicker($currentField.find('input'));
                }

                if(fieldType == 'calculado'){
                    $currentField.find('input').attr('fn-event',v['fnActivate']);
                    inputCalculado($currentField.find('input'));
                }

                if(fieldType == 'file'){
                    divId.find('.sjfb-file-field').last().find('.file-preview').attr('accept',v['filetypes']);
                    fileFormPreview(divId.find('.sjfb-file-field').last());
                    divId.find('.sjfb-file-field').last().find('.file-preview').attr('accept',v['filetypes']);
                }

                if(fieldType == 'currency'){
                    console.log('Es currency');
                    inputCurrency($currentField.find('input[type=text]'));
                }

                if(fieldType == 'datepicker'){
                    console.log('Es datepicker');
                    inputDatePicker($currentField.find('input[type=text]'));
                }

                //Any choices?
                if (v['choices']) {
                    var nameChoicesInput = v['name'];
                    var inline = v['inline'];

                    var uniqueID = Math.floor(Math.random()*999999)+1;

                    $.each( v['choices'], function( k, v ) {

                        if (fieldType == 'select') {
                            var selected = v['sel'] ? ' selected' : '';
                            var choiceHTML = '<option' + selected + '>' + v['label'] + '</option>';
                            $currentField.find(".choices").append(choiceHTML);
                        }
                        else if (fieldType == 'radio') {
                            var selected = v['sel'] ? ' checked' : '';
                            var choiceHTML = '<div class="'+((inline)?'radio-inline':'radio')+'"><label><input type="radio" name="' + nameChoicesInput + '"' + selected + ' value="' + v['label'] + '">' + v['label'] + '</label></div>';
                            $currentField.find(".choices").append(choiceHTML);
                        }

                        else if (fieldType == 'checkbox') {
                            var selected = v['sel'] ? ' checked' : '';
                            var choiceHTML = '<div class="'+((inline)?'checkbox-inline':'checkbox')+'"><label><input type="checkbox" name="' + nameChoicesInput + '[]"' + selected + ' value="' + v['label'] + '">' + v['label'] + '</label></div>';
                            $currentField.find(".choices").append(choiceHTML);
                        }

                    });
                }

                //Any columns?
                if (v['columns']) {
                    var uniqueID = Math.floor(Math.random()*999999)+1;
                    $.each( v['columns'], function( k, v ) {
                        var columnHTML = '<th class="item-col-form" inputtype="'+v['type']+'" table="'+fieldName+'[table][$i]['+v['val']+']">'+v['title']+'</th>';
                        $currentField.find(".tcolumns").append(columnHTML);
                    });
                    var columnHTML = '<th class="del-col-form"></th>';
                    $currentField.find(".tcolumns").append(columnHTML);
                    $currentField.find('.cont-btn-add-node-tbl').append('<button class="btn-create-node-tbl btn btn-xs btn-info">Agregar</button>');
                    $currentField.find('.cont-btn-add-node-tbl').append('<button class="btn-download-node-tbl pull-right btn btn-xs bg-olive" style="margin-left: 3px;" data-toggle="tooltip" data-placement="bottom" title="Descargar plantilla"><i class="fa fa-download"></i></button>');
                    $currentField.find('.cont-btn-add-node-tbl').append('<label class="btn-upload-node-tbl pull-right btn btn-xs bg-purple" data-toggle="tooltip" data-placement="bottom" title="Subir plantilla CSV"><i class="fa fa-file-excel-o"></i><input type="file" class="input-upload-node-tbl" id="csvFileInput" onchange="handleNodeTblFiles(this)" accept=".csv" style="display:none;"></label>');
                    $currentField.find('.cont-btn-add-node-tbl').append('<img class="img-loading pull-right hide" src="'+configurationApp.url.app+'dist/img/table-loader.gif">');
                }

                //Is it required?
                if (v['req']) {
                    if (fieldType == 'text') { $currentField.find("input").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'currency') { $currentField.find("input[type=text]").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'datepicker') { $currentField.find("input[type=text]").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'textarea') { $currentField.find("textarea").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'select') { $currentField.find("select").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'radio') { $currentField.find("input").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'file') { divId.find('.sjfb-file-field').last().find("input[type=file]").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'cfdi') { divId.find('.sjfb-fcdi-field').last().find("input[type=file]").prop('required',true).addClass('required-choice') }
                    $currentField.addClass('required-field');
                }

                if (v['readonly']) {
                    $currentField.find("input[type=text]").attr('readonly','readonly');
                }

                if (v['moneda']) {
                    $currentField.find("input[type=text]").addClass('moneda');
                }

                if (v['regex']){
                    $currentField.find("input[type=text]").attr('data-parsley-pattern',v['regex']);
                }

                if (v['entero']) {
                    $currentField.find("input[type=text]").addClass('entero');
                }

            });
            $('[data-toggle="tooltip"]').tooltip();
            if(editData){
                var ind=0;
                var dataInput = data;
                $.each(editData, function (i, data) {
                    if(data != null){
                        var domInput = divId.find('#field-input-'+i);
                        if(data.hasOwnProperty("cfdi:Comprobante")){
                            loadDomTpl(domInput,'./templates/extras/tpl.cfdi.hbs',data,function(){});
                            domInput.parents('.sjfb-fcdi-field').find('#cfdiFileInput').removeAttr('required');
                            //divId.find('#cfdifile-field-input-'+i).html('<a href="'+configurationApp.url.api+'documento-download/'+data.file+'" target="_blank" class="btn btn-primary btn-xs"><i class="fa fa-file-code-o"></i></a>');
                        }
                        else{

                            var type = domInput.attr('fieldtype');
                            if(type == 'file'){
                                domInput.parents('.sjfb-file-field').find('.text-inputfilefield').val(data)
                                domInput.removeAttr('required');
                            }
                            else if(type == 'table'){
                                console.log(dataInput[ind]);
                                $.each(data.table, function(i,item){
                                    var keys = Object.keys(item);
                                    var html = '<tr>';
                                    domInput.parents('.sjfb-table-field').find('.item-col-form').each(function(index,dom){
                                        $(this).attr('table');
                                        var tabla = $(this).attr('table');
                                        var classinput = '';
                                        var valor = (isDefined(item[keys[index]])?item[keys[index]]:'');
                                        if(dataInput[ind].columns[index].type == 'fecha'){
                                            classinput='isdatepicker';
                                        }
                                        if(dataInput[ind].columns[index].type == 'currency'){
                                            classinput='iscurrency'
                                        }
                                        html += '<td class="td-input"><input name="'+tabla+'" value="'+valor+'" class="form-control '+classinput+'" type="text" required/></td>';
                                    });
                                    html += '<td><a class="btn-del-input-form btn btn-xs btn-danger"><i class="fa fa-close"></i></a></td>';
                                    html += '</tr>';
                                    domInput.parents('.sjfb-table-field').find('tbody').append(html);
                                    addIndexTableColumn(domInput);
                                });
                            }
                            else{
                                divId.find('#field-input-'+i).val(data);
                                if(type == 'currency'){
                                    dataCurrency(divId.find('#field-input-'+i));
                                }
                                if(type == 'datepicker'){
                                    dataDatePicker(divId.find('#field-input-'+i));
                                }
                            }
                        }
                    }
                    ind++;
                });
            }
        }

        //HTML templates for rendering frontend form fields
        function addFieldHTML(fieldType,fieldName) {

            var uniqueID = Math.floor(Math.random()*999999)+1;

            switch (fieldType) {

                case 'table':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-table-field">'+
                        '<label class="sjfb-fieldtype-label" for="text-' + uniqueID + '"></label>' +
                        '<table class="table table-hover table-bordered" style="margin-bottom: 5px;">'+
                        '<thead><tr class="tcolumns"></tr></thead>'+
                        '<tbody id="field-input-'+fieldName+'" fieldtype="'+fieldType+'"></tbody>'+
                        '</table>'+
                        '<p align="center" class="cont-btn-add-node-tbl"></p>'+
                        '</div>';
                case 'cfdi':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-fcdi-field form-group">'+
                        '<label class="sjfb-fieldtype-label" for="text-' + uniqueID + '"></label>' +
                        '<p align="center" class="cont-btn-add-cfdi"><label class="btn-upload-cfdi btn btn-xs btn-info">Cargar CFDI<input type="file" class="input-upload-cfdi" id="cfdiFileInput" nameinput="'+fieldName+'" name="'+fieldName+'[file]" onchange="handleCFDIFiles(this)" accept=".xml" style="display:none;"></label></p>'+
                        '<div class="cont-cfdi-xml" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'" table-name="'+fieldName+'"></div>' +
                        '</div>';
                case 'modalpicker':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-modalpicker-field form-group">'+
                        '<label class="sjfb-fieldtype-label" for="field-'+fieldName+'"></label>' +
                        '<input type="text" mp-type="inline" url-index="api" target="url" name="'+fieldName+'" class="get-url form-control" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'">' +
                        '</div>';
                case 'file':
                    return ''+
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-file-field form-group">'+
                        '<label  class="file-input-title sjfb-fieldtype-label"></label>'+
                        '<p class="input-image-cont" align="center">'+
                        '<img class="previewFile" src="./dist/img/filetypes/file.png" height="50"/>'+
                        '<div class="input-group">'+
                        '<label class="input-group-btn">'+
                        '<span class="btn btn-default">'+
                        'Selecciona archivo <input id="field-input-'+fieldName+'" fieldtype="'+fieldType+'" type="file" name="' + fieldName +'" class="file-preview" accept="" style="display: none;">'+
                        '</span>'+
                        '</label>'+
                        '<input type="text" class="form-control text-inputfilefield" readonly>'+
                        '</div>'+
                        '</p>'+
                        '</div>';
                case 'calculado':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-text form-group">' +
                        '<label class="sjfb-fieldtype-label" for="field-'+fieldName+'"></label>' +
                        '<input type="text" name="'+fieldName+'" class="form-control input-calculate" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'">' +
                        '</div>';
                case 'text':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-text form-group">' +
                        '<label class="sjfb-fieldtype-label" for="field-'+fieldName+'"></label>' +
                        '<input type="text" name="'+fieldName+'" class="form-control" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'">' +
                        '</div>';

                case 'datepicker':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-datepicker form-group">' +
                        '<label class="sjfb-fieldtype-label" for="field-'+fieldName+'"></label>' +
                        '<input type="text" name="'+fieldName+'" class="form-control" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'">' +
                        '</div>';

                case 'currency':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-currency form-group">' +
                        '<label class="sjfb-fieldtype-label" for="field-'+fieldName+'"></label>' +
                        '<input type="text" step=".01" name="'+fieldName+'" class="form-control" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'">' +
                        '</div>';

                case 'textarea':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-textarea form-group">' +
                        '<label class="sjfb-fieldtype-label" for="field-'+fieldName+'"></label>' +
                        '<textarea name="'+fieldName+'" class="form-control" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'"></textarea>' +
                        '</div>';

                case 'select':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-select form-group">' +
                        '<label class="sjfb-fieldtype-label" for="field-'+fieldName+'"></label>' +
                        '<select name="'+fieldName+'" id="field-input-'+fieldName+'" fieldtype="'+fieldType+'" class="choices choices-select form-control"></select>' +
                        '</div>';

                case 'radio':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-radio">' +
                        '<label class="sjfb-fieldtype-label"></label>' +
                        '<div id="field-'+fieldName+'" fieldtype="'+fieldType+'" class="choices choices-radio"></div>' +
                        '</div>';

                case 'checkbox':
                    return '' +
                        '<div id="sjfb-checkbox-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-checkbox form-group">' +
                        '<label class="sjfb-fieldtype-label sjfb-label"></label>' +
                        '<div id="field-'+fieldName+'" fieldtype="'+fieldType+'" class="choices choices-checkbox"></div>' +
                        '</div>';

                case 'agree':
                    return '' +
                        '<div id="sjfb-agree-' + uniqueID + '" class="sjfb-fieldtype sjfb-field sjfb-agree required-field form-group">' +
                        '<input name="agree[]['+fieldName+']" type="checkbox" required>' +
                        '<label class="sjfb-fieldtype-label"></label>' +
                        '</div>'
            }
        }
}


function generateDataForm(inputData,formData,divId){
    divId.empty();
    if (formData) {
        divId.html('<table class="table table-bordered"><tr><td colspan="2" align="right">Archivos<br><div id="files-list" class="row"></div></td></tr><tr><td colspan="2"><div id="inputs-list"></div></td></tr></table>');
        //go through each saved field object and render the form HTML
        $.each(formData, function (i, input) {
            var colCount = 0;

            if(input['type']=='file'){
                divId.find('#files-list').append('<div class="file-result inline margin-r-5 col-md-'+input['size']+'" fieldtype="'+input['type']+'" id="field-input-'+input['name']+'" data-toggle="tooltip" data-placement="bottom" title="'+input['label']+'"></div>');
            }
            else if(input['type']=='cfdi'){
                divId.find('#inputs-list').append('<div class="form-group col-md-'+input['size']+'"><div class="input-name"><strong>'+input['label']+'</strong></div> <div class="input-result" fieldtype="'+input['type']+'" id="cfdidata-field-input-'+input['name']+'"></div></div>');
                divId.find('#files-list').append('<div class="file-result inline margin-r-5" fieldtype="'+input['type']+'" id="cfdifile-field-input-'+input['name']+'" data-toggle="tooltip" data-placement="bottom" title="'+input['label']+'"></div>');
            }
            else if(input['type']=='table'){
                var columns = '';
                $.each(input.columns, function(i,column){
                    columns+='<th>'+column.title+'</th>';
                });
                var table = '<table class="table table-hover"><thead><tr>'+columns+'</tr></thead><tbody fieldtype="'+input['type']+'" id="field-input-'+input['name']+'"></tbody></table>';
                divId.find('#inputs-list').append('<div class="form-group col-md-'+input['size']+'"><div class="input-name"><strong>'+input['label']+'</strong></div> <div class="input-result">'+table+'</div></div>');
            }else{
                divId.find('#inputs-list').append('<div class="form-group col-md-'+input['size']+'"><div class="input-name"><strong>'+input['label']+'</strong></div> <div class="input-result" fieldtype="'+input['type']+'" id="field-input-'+input['name']+'"></div></div>');
            }

        });
        //Validamos los datos;
        var ind=0;
        $.each(inputData, function (i, data) {
            if(data != null){
                if(data.hasOwnProperty("cfdi:Comprobante")){
                    loadDomTpl(divId.find('#cfdidata-field-input-'+i),'./templates/extras/tpl.cfdi.hbs',data,function(){});
                    divId.find('#cfdifile-field-input-'+i).html('<a href="'+configurationApp.url.api+'documento-download/'+data.file+'" target="_blank" class="btn btn-primary btn-xs"><i class="fa fa-file-code-o"></i></a>');
                }
                else{
                    var type = divId.find('#field-input-'+i).attr('fieldtype');
                    if(type == 'file'){
                        divId.find('#field-input-'+i).html('<a href="'+configurationApp.url.api+'documento-download/'+data+'" target="_blank" class="btn btn-info btn-xs"><i class="fa fa-file-archive-o"></i></a>');
                    }
                    else if(type == 'table'){
                        var columnasTabla = formData[ind].columns;
                        $.each(data.table, function(y,column){
                            var indCol = 0;
                            var row = '<tr>';
                            $.each(column,function(z,td){
                                if(columnasTabla[indCol].type == 'fecha'){
                                    td = moment(td).format('DD/MM/YYYY')
                                }
                                row += '<td>'+td+'</td>';
                                indCol++;
                            });
                            row+='</tr>';
                            divId.find('#field-input-'+i).append(row);
                        });
                    }
                    else{
                        divId.find('#field-input-'+i).html(data);
                    }
                }
            }
            ind++;
        });
        divId.find('#files-list .file-result').tooltip({trigger:'hover'});
    }
}

