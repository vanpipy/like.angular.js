'use strict';

(function(w, LA) {
    function Template (LiteNodesArray, provider) {
        this.nodes = LiteNodesArray || [];
        this.provider = provider || [];
    }

    Template.prototype.getMark = function () {
        var i = 0;

        while (i < this.nodes.length) {


            i++;
        }
    };

    Template.prototype.markup = function (mark) {

    };


    /*
     * @name Compiler
     * @param template {String}
     * @param attrs {Scope}
     *
     * @Description
     * Tha Compiler do things about compile only.
     * Raw element > LiteNode > ScopeBindedNode
     */
    function Compiler (provider) {
        this.provider = provider;
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
        var provider = this.provider;
        var template = new Template();

        var markups = template.getMark();
    };

    w.compiler = new Compiler(LA.providers);
})(window, window.LA, window.LA.provider);

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
