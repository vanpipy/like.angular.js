
(function(w, _$) {
    'use strict';

    function Like() {

    }

    var map = _$.map;
    var compose = _$.compose;
    var curry = _$.curry;

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

    w.LA = Like;
})(window, window._$);
