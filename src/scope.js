
(function(w, LA) {
    'use strict';

    function Scope () {

    }

    Scope.prototype.$new = function () {
        return new Scope();
    };

    w.scope = Scope;
})(window, window.LA)
