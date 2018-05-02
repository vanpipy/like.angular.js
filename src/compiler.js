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

        for (var i = 0, l = markups.length; i < l; i++) {
            var node = markups[i][0];
            var bindedObject = markups[i][1];

            var callback = bindedObject.callback();
            var linkRestrict = callback.restrict;
            var linkFn = callback.link;

            if (hasRestrict(linkRestrict, 'E')) {
                w.compiler.compile(Lite(callback.template))(scope);
                node.append(callback.template);
            }

            linkFn(scope, node.attributes(), node);
        }
    };

    Template.prototype.activateByScope = function (scope) {
        //TODO: Dirty checker and activate scope again and again.
    };

    /*
     * @param {String} type
     * @Description the type is 'A' or 'E'. 'A' represent attribute, 'E' represent element and use template for inserted.
     */
    function hasRestrict (restrict, type) {
        var i = 0;
        var has = false;

        while (i < restrict.length) {
            if (restrict[i] == type) {
                has = true;
                break;
            }

            i++;
        }

        return has;
    }

    /*
     * @name Compiler
     * @param provider {EnvironmentForCompiler}
     *
     * @Description
     * The Compiler do things about compile only.
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
        template: '<h1>Hello!</h1>',
        link: function (scope, attr, element) {

        }
    }
});

var $scope = new scope();
compiler.compile(document.getElementById('main'))($scope);
