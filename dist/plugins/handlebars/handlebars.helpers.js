/**
 * Helper ifvalue
 *
 * Valida si un valor es igual al definido en la plantilla
 * handlebars:
 *  {{#ifvalue variable value="hero"}}
 *      Entra, visualiza contenido
 *  {{/ifvalue}}
**/
Handlebars.registerHelper('ifvalue', function (conditional, options) {
    if (options.hash.value === conditional) {
        return options.fn(this)
    } else {
        return options.inverse(this);
    }
});

/**
 * Helper ifnotvalue
 *
 * Valida si un valor es igual al definido en la plantilla
 * handlebars:
 *  {{#ifnotvalue variable value="hero"}}
 *      Si el valor no existe este contenido se visualiza
 *  {{/ifnotvalue}}
 **/
Handlebars.registerHelper('ifnotvalue', function (conditional, options) {
    if (options.hash.value !== conditional) {
        return options.fn(this)
    } else {
        return options.inverse(this);
    }
});

/**
 * Helper ifeq
 *
 * Valida si un valor es igual al definido en la plantilla
 * handlebars:
 *  {{#ifeq variable 1}}
 *      Si variable es igual a 1 entra
 *  {{/ifeq}}
 **/
Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    else { return options.inverse(this); }
});

/**
 * Helper ifCond
 *
 * Valida si un valor es igual al definido en la plantilla con un condicional
 * handlebars:
 *  {{#ifCond variable '>=' 1}}
 *      Si variable es mayor o igual a 1 entra
 *  {{/ifCond}}
 **/
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});