var myApp;
$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    timeout: 30000
});
$.ajaxSettings.cache = false;

$(document).ready(function(){
    $('body').attr('url-tpl',configurationApp.url.app);
    if(configurationApp.debug){
        $('body').addClass('debug');
    }
    if(configurationApp.logo.icon){$("#favicon").attr("href",configurationApp.logo.icon);}
    if(configurationApp.login.enable_login){
        var login_url_api = {};
        $.each(configurationApp.login.url_api, function(i, item){ login_url_api[i]=configurationApp.url.api+item; });
        peticionApi('get',configurationApp.url.api+configurationApp.login.url_api.me)
            .done(function(dataSession){
                dataSession.url_api=login_url_api;
                configurationApp.me = dataSession.data;
                var templateURL = './templates/layouts/application.hbs';
                $.get( templateURL, function( source ) {
                    var template = Handlebars.compile(source);
                    $('body').addClass('hold-transition').addClass('layout-fixed').addClass('sidebar-mini').addClass('text-sm').prepend(template(dataSession));
                    if(configurationApp.logo.main){$("#logo-main").attr("src",configurationApp.logo.main).attr("alt",configurationApp.appname);}
                    alteInit();
                    myApp = new BinniApp(configurationApp);
                    $('body').binnivox();
                    $('body').Layout();
                    $('body').Treeview();
                    (configurationApp.route_default === false)?window.location.replace('#demo/'):window.location.replace('#'+configurationApp.route_default);

                    return false;
                });
            })
            .fail(function(dataError){
                var templateURL = './templates/login/login.hbs';
                $.get( templateURL, function( source ) {
                    var dataLogin = configurationApp.login;
                    dataLogin.url_api=login_url_api;
                    var template = Handlebars.compile(source);
                    $('body').addClass('hold-transition').addClass('login-page').prepend(template(dataLogin));
                    if(configurationApp.logo.alter){$("#logo-alter").attr("src",configurationApp.logo.alter).attr("alt",configurationApp.appname);}
                    alteInit();
                    $('body').binnivox();
                    $('body').Layout();
                    return false;
                });
            });
    }
    else{
        var templateURL = './templates/layouts/application.nologin.hbs';
        $.get( templateURL, function( source ) {
            var dataApplication = {};
            var template = Handlebars.compile(source);
            $('body').addClass('hold-transition').addClass('layout-fixed').addClass('sidebar-mini').prepend(template(dataApplication));
            if(configurationApp.logo.main){$("#logo-main").attr("src",configurationApp.logo.main).attr("alt",configurationApp.appname);}
            myApp = new BinniApp(configurationApp);
            alteInit();
            $('body').binnivox();
            $('body').Layout();
            $('body').Treeview();
            console.log(configurationApp.route_default);
            (configurationApp.route_default === false)?window.location.replace('#demo/'):window.location.replace('#'+configurationApp.route_default);
            return false;
        });
    }
});