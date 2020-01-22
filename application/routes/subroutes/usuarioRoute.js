usuarioRouter = Backbone.SubRoute.extend({
    routes: {
        ""               : "indexRouter",
        'nuevo'          : "nuevoUsuario",
        'editar/:id'     : "editarUsuario",
    },
    indexRouter: function() {
        peticionApi('GET',configurationApp.url.api+'users')
            .done(function(dataResult){
                $('#app-container').loadRemoteTpl('./templates/modules/usuarios/listado.hbs',dataResult,function(){});
            });
    },
    nuevoUsuario: function(){
        peticionApi('GET',configurationApp.url.api+'rol')
            .done(function(dataResult) {
                $('#app-container').loadRemoteTpl('./templates/modules/usuarios/nuevo.hbs', dataResult, function () {
                });
            });
    },
    editarUsuario: function(id){
        peticionApi('GET',configurationApp.url.api+'rol')
            .done(function(rolesResult){
                peticionApi('GET',configurationApp.url.api+'users/'+id)
                    .done(function(dataResult){
                        dataResult.roles = rolesResult.data;
                        $('#app-container').loadRemoteTpl('./templates/modules/usuarios/editar.hbs',dataResult,function(){});
                    });
            });
    }
});