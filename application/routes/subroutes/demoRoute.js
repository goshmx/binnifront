demoRouter = Backbone.SubRoute.extend({
    routes: {
        ""                  : "indexRouter",
        "componentes"       : "componentesRouter"
    },
    indexRouter: function() {
        $('#app-container').loadRemoteTpl('./templates/demo/inicio.demo.hbs',{},function(){});
    },
    componentesRouter: function() {
        $('#app-container').loadRemoteTpl('./templates/demo/componentes.demo.hbs',{},function(){});
    },
});

