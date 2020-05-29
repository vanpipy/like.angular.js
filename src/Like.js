
'use strict';

const Like = {};

const defineTypeChecker = curry(function(typeString, input) {
    return Object.prototype.toString.call(input) == '[object '+ typeString +']';
});

const FnNameStringMatcher = /([\w]+)(\(.+\))?/;

const matcherBefore = /^[(\s]+/;
const matcherAfter = /[)\s]+$/;

Like.isString = defineTypeChecker('String');
Like.isFunction = defineTypeChecker('Function');

Like.isNull = defineTypeChecker('Null');
Like.isUndefined = defineTypeChecker('Undefined');

Like.isDefined = function (input) {
    return !Like.isNull(input) && !Like.isUndefined(input);
};

Like.providers = [];

Like.extractFnNameString = function (FnNameString) {
    const result = FnNameStringMatcher.exec(FnNameString) || [];
    return {
        name: result[1],
        params: result[2] ? extractFnParams(result[2]) : [],
    };
};

Like.trim = trim;

function extractFnParams (FnParamsString) {
    return trim(FnParamsString).split(',').map(trim);
}

function trim (string) {
    return string.replace(matcherBefore, '').replace(matcherAfter, '');
}

function curry (Fn) {
    return rebuild(Fn, [], Fn.length);
}

function rebuild (originalFn, validParams, validParamsLength) {
    return function () {
        const params = Array.prototype.slice.call(arguments);

        if (validParamsLength - params.length > 0) {
            return rebuild(originalFn, validParams.concat(params), validParamsLength - params.length);
        } else {
            return originalFn.apply(this, validParams.concat(params));
        }
    };
}

export default Like;
