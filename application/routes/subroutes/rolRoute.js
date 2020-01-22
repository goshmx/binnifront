rolRouter = Backbone.SubRoute.extend({
    routes: {
        ""               : "indexRouter",
        'nuevo'          : "nuevoRol",
        'editar/:id'     : "editarRol",
    },
    indexRouter: function() {
        peticionApi('GET',configurationApp.url.api+'rol')
            .done(function(dataResult){
                $('#app-container').loadRemoteTpl('./templates/modules/roles/listado.hbs',dataResult,function(){});
            });
    },
    nuevoRol: function(){
        $('#app-container').loadRemoteTpl('./templates/modules/roles/nuevo.hbs',{},function(){});
    },
    editarRol: function(id){
        peticionApi('GET',configurationApp.url.api+'rol/'+id)
            .done(function(dataResult){
                $('#app-container').loadRemoteTpl('./templates/modules/roles/editar.hbs',dataResult,function(){});
            });
    }
});

