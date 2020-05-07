
'use strict';

function Like() {

}

var defineTypeChecker = curry(function(typeString, input) {
    return Object.prototype.toString.call(input) == '[object '+ typeString +']';
});

Like.isString = defineTypeChecker('String');
Like.isFunction = defineTypeChecker('Function');

Like.isNull = defineTypeChecker('Null');
Like.isUndefined = defineTypeChecker('Undefined');

Like.isDefined = function (input) {
    return !Like.isNull(input) && !Like.isUndefined(input);
};

Like.providers = [];

Like.providerPrefix = {
    directive: 'D_',
    controller: 'C_',
    service: 'S_'
};

var FnNameStringMatcher = /([\w]+)(\(.+\))?/;

Like.extractFnNameString = function (FnNameString) {
    var result = FnNameStringMatcher.exec(FnNameString) || [];
    return {
        name: result[1],
        params: result[2] ? extractFnParams(result[2]) : [],
    };
};

Like.trim = trim;

var matcherBefore = /^[\(\s]+/;
var matcherAfter = /[\)\s]+$/;

function extractFnParams (FnParamsString) {
    return trim(FnParamsString).split(',').map(trim);
}

function trim (string) {
    return string.replace(matcherBefore, '').replace(matcherAfter, '');
}

export default Like;
