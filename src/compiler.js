'use strict';

(function(w, LA) {
    /*
     * @name Compiler
     * @param template {String}
     * @param attrs {Scope}
     */
    function Compiler (template, attrs) {
        this.template = template;
        this.scope = attrs;

        return this.compile;
    }

    Compiler.prototype.compile = function (scope) {
        if (LA.isUndefined(this.scope)) {
            this.scope = scope;
        }


    };

    LA.compiler = Compiler;
})(window, window.LA);
