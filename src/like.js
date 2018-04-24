
(function(w, _$) {
    'use strict';

    function LikeAngularjs() {

    }

    var Like = LikeAngularjs;

    var compose = _$.compose;
    var curry = _$.curry;

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

    Like.isLiteNode = function (node) {
        return node && node.nodeName || node instanceof LiteNode;
    };

    w.LA = LikeAngularjs;
})(window, window._$);
