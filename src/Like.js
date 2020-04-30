
(function(w, _$) {
    'use strict';

    function Like() {

    }

    var curry = _$.curry;
    var compose = _$.compose;
    var map = curry(_$.map);

    var defineTypeChecker = curry(function(typeString, input) {
        return Object.prototype.toString.call(input) == '[object '+ typeString +']';
    });

    Like.map = map;
    Like.compose = compose;
    Like.curry = curry;

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

    Like.curry = curry;
    Like.compose = compose;
    Like.map = map;

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

    w.LA = Like;
})(window, window._$);
