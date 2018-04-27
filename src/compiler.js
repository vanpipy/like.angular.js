'use strict';

(function(w, LA, Provider) {
    function Template (LiteNodesArray, provider) {
        this.nodes = LiteNodesArray || [];
        this.provider = provider || [];
        this.markups = [];
    }

    Template.prototype.init = function () {
        for (var i = 0, l = this.nodes.length; i < l; i++) {
            var node = new Lite(this.nodes[i]);
            var markups = node.getMarks();
            var markupLinked;

            if (markups && markups.length) {
                for (var k = 0, len = markups.length; k < len; k++) {
                    if (markupLinked = this.provider.get(markups[k])) {
                        this.markups.push([ node, markupLinked ]);
                    }
                }
            }
        }

        return this;
    };

    Template.prototype.extractMark = function (scope) {
        var markups = this.markups;

        //TODO: Make binded function running.
    };

    Template.prototype.activateByScope = function (scope) {
        //TODO: Dirty checker and activate scope again and again.
    };

    /*
     * @name Compiler
     * @param provider {EnvironmentForCompiler}
     *
     * @Description
     * Tha Compiler do things about compile only.
     * Raw element > LiteNode > ScopeBindedNode
     */
    function Compiler (provider) {
        this.provider = provider;
    }

    Compiler.prototype.compile = function (element) {
        var _template = this.templatize(new Lite(element));

        return function(scope) {
            _template.extractMark(scope);
        };
    };

    Compiler.prototype.templatize = function (LiteNode) {
        var children = LiteNode.childNodes();
        var template = new Template(children, this.provider);

        return template.init();
    };

    w.compiler = new Compiler(Provider);
})(window, window.LA, window.provider);

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
        restrict: 'E',
        link: function (scope, attr, element) {

        }
    }
});

compiler.compile(document.getElementById('main'));
