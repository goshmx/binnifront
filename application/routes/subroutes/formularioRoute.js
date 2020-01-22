formularioRouter = Backbone.SubRoute.extend({
    routes: {
        ""               : "indexRouter",
        'nuevo'          : "nuevoForm",
        'editar/:id'     : "editarForm",
    },
    indexRouter: function() {
        peticionApi('GET',configurationApp.url.api+'formulario')
            .done(function(dataResult){
                $('#app-container').loadRemoteTpl('./templates/modules/formularios/listado.hbs',dataResult,function(){});
            });
    },
    nuevoForm: function(){
        $('#app-container').loadRemoteTpl('./templates/modules/formularios/nuevo.hbs',{},function(){
            $('#form-create-formulario').formBuilder();
        });
    },
    editarForm: function(id){
        peticionApi('GET',configurationApp.url.api+'rol/'+id)
            .done(function(dataResult){
                $('#app-container').loadRemoteTpl('./templates/modules/formularios/editar.hbs',dataResult,function(){});
            });
    }
});

