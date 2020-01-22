var appUrls;
var BinniApp = function(opciones){
    var p = this;
    p.appname = opciones.appname;
    p.debug = opciones.debug;
    p.routes = opciones.routes;
    appUrls = opciones.url;
    p.url = opciones.url || {};
    p.init(p);
    return this;
};

BinniApp.prototype.init = function(aplicacion){
    app = this;
    var initializeRouter = function(){
        $(document).ready(function(){
            $('#'+aplicacion.loader).remove();
            Backbone.history.start();
        });
    };
    initializeRouter();
    app.log("Inicializando BinniApp");
};

BinniApp.prototype.log = function(text){
    if(this.debug){
        console.log(text);
    }
};