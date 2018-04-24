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
    function Compiler (providers) {
        this.providers = providers;
        //TODO: Make an angularjs template engine.
        //this.template
    }

    Compiler.prototype.compile = function (element) {
        element = this.templatize(new Lite(element));

        return function() {

        };
    };

    Compiler.prototype.templatize = function (LiteNode) {
        var children = LiteNode.childNodes();
        var validMarkup;

        for (var i = 0, length = children.length; i < length; i++) {
            var attrsName = children[i].markups();

            for (var j = 0, l = attrsName.length; j < l; j++) {
                validMarkup = provider.get(attrsName[j]);

                if (validMarkup) {
                    //TODO: Bind markup to template.
                };
            }
        }
    };

    w.compiler = new Compiler(LA.providers);
})(window, window.LA);

provider.add('directive', 'mainRole', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {

        }
    }
});

provider.add('directive', 'ngController', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {

        }
    }
});

provider.add('directive', 'ngClick', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {
            element.bind('click', attr.ngClick);
        }
    }
});

provider.add('directive', 'ngModel', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {

        }
    }
});

provider.add('directive', 'markUp', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {

        }
    }
});

compiler.compile(document.getElementById('main'));
