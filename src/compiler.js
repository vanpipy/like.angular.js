'use strict';

(function(w, LA) {
    /*
     * @name Compiler
     * @param template {String}
     * @param attrs {Scope}
     *
     * @Description
     * Tha Compiler do things about compile only.
     * Raw element > LiteNode > ScopeBindedNode
     */
    function Compiler () {

    }

    Compiler.prototype.compile = function (element) {
        if (LA.isDefined(element)) {

        }

        return function bindToScope() {

        };
    };

    LA.compiler = Compiler;
})(window, window.LA);
