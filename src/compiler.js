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
        if (LA.isLiteNode(element)) {

        }

        return function bindToScope() {

        };
    };

    w.compiler = new Compiler();
})(window, window.LA);
