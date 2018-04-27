
(function(w, LA) {
    'use strict';

    function Scope () {
        this.$watcher = [];
    }

    Scope.prototype.$digest = function () {
        
    };

    Scope.prototype.$new = function () {
        return new Scope();
    };

    w.scope = Scope;
})(window, window.LA)
