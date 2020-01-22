var rutas = Backbone.Router.extend({
    initialize: function(options) {
        this.routesHit = 0;
        //Mantiene el conteo del numero de rutas enlazadas para la aplicacion
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },
    refresh: function(){
        Backbone.history.loadUrl();
    },
    back: function() {
        if(this.routesHit > 1) {
            this.routesHit = this.routesHit - 2;
            window.history.back();
        } else {
            //Sino regresa al principal de la app
            if(Backbone.history.getFragment() != '/')
                this.routesHit = 0;
            this.navigate('/', {trigger:true, replace:true});
        }
    },
    /*
     *Override navigate function
     *@param {String} route el Hash de la ruta
     *@param {PlainObject} options Opcions para la navegacion.
     *              Enviar en el indice "params" para enviar datos adicionales ejemplo:
     *              {
     *               params: 'data'
     *              }
     **/
    navigate: function(route, options) {
        var routeOption = {
                trigger: true
            },
            params = (options && options.params) ? options.params : null;
        $.extend(routeOption, options);
        delete routeOption.params;

        //set the params for the route
        this.param(route, params);
        Backbone.Router.prototype.navigate(route, routeOption);
    },
    /*
     *Getter o setter de "params" para envio de parametros
     *@param {String} fragment Exact route hash. for example:
     *                   If you have route for 'profile/:id', then to get set param
     *                   you need to send the fragment 'profile/1' or 'profile/2'
     *@param {Any Type} params The parameter you to set for the route
     *@return param value for that parameter.
     **/
    param: function(fragment, params) {
        if(typeof fragment === 'undefined'){
            fragment = Backbone.history.getFragment();
        }
        else{
            var matchedRoute;
            _.any(Backbone.history.handlers, function(handler) {
                if (handler.route.test(fragment)) {
                    matchedRoute = handler.route;
                }
            });
            if (params !== undefined) {
                this.routeParams[fragment] = params;
            }
        }
        return this.routeParams[fragment];
    },
    route: function(route, name, callback) {
        //Colocar aqui eventos antes y despues del renderizado de la vista
        var router = this;
        if (!callback) callback = this[name];
        var f = function() {
            //myApp.consola('Evento de ruta '+route+' antes de renderizar', 'debug');
            callback.apply(router, arguments);
            //myApp.consola('Evento de ruta despues de renderizar', 'debug');
            //dataSubmit.init('.form-validate');/*Validacion de formularios por default COLOCAR EN CLIENTVOX TAMBIEN*/
        };
        return Backbone.Router.prototype.route.call(this, route, name, f);
    },
    routeParams: {},
    routes : {
        '' :                       'inicioSubRoute',
        'demo/*subroute'            :  'demoSubRoute',//quit in production
        'rol/*subroute'             :  'rolSubRoute',
        'usuario/*subroute'         :  'usuarioSubRoute',
        'formulario/*subroute'      :  'formularioSubRoute',
        '*notFound':               'notFound'
    },
    notFound: function(){
        this.navigate('/');
    },
    /*SUBRUTAS*/
    inicioSubRoute: function(subroute){
        var inicioSubRoute = new inicioRouter("");
    },
    demoSubRoute: function(subroute){
        var demoSubRoute = new demoRouter("demo/");
    },
    rolSubRoute: function(subroute){
        var rolSubRoute = new rolRouter("rol/");
    },
    usuarioSubRoute: function(subroute){
        var usuarioSubRoute = new usuarioRouter("usuario/");
    },
    formularioSubRoute: function(subroute){
        var formularioSubRoute = new formularioRouter("formulario/");
    },
});