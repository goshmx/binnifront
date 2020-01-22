dashboardRouter = Backbone.SubRoute.extend({
    routes: {
        ""               : "indexRouter",
    },
    indexRouter: function() {
        loadRemoteTpl('#app-container','./templates/modules/panel-control/administrador.hbs',{},function(){
        });
    },
});

