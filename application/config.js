var configurationApp = {
    debug: true,
    store:true,
    appname: "Binnifront",
    title: "Frontend Demo Application",
    logo:{
        main:false,/* dist/img/favicon.png */
        alter:false, /* dist/img/favicon.png */
        icon:false
    },
    loader: "loader",
    url:{
        app: 'http://localhost:3000/',
        api: 'http://localhost:1337/api/v1/',
    },
    routes: new rutas(),
    route_default: false, /*  'inicio/'  */
    style:{
        topbar:'', /* blue,gray,cyan,green,red,indigo,purple,pink,teal,gray-dark,white,orange,yellow */
        topbar_accent:'',
        brandbar:'',
        sidebar:'',
        sidebar_accent:''
    },
    login:{
        enable_login:true,
        enable_rememberme:true,
        enable_social_login:false,
        enable_register:false,
        enable_forgot_password:false,
        url_api:{
            me: 'sesion/me',
            login:'sesion/login',
            logout:'sesion/logout',
            google: '',
            facebook:''
        }
    },
    maps:{
        lat: 17.0550209,
        lng: -96.7226412
    },
};

