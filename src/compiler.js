'use strict';

(function(w, LA, Provider) {
    function Template (LiteNodesArray, provider) {
        this.nodes = LiteNodesArray || [];
        this.provider = provider || [];
        this.markups = [];
        this.textMarkupNodes = [];
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

            if (node.isTextNode()) {
                this.textMarkupNodes.push(node);
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
            var transclude = callback.transclude;

            if (hasRestrict(linkRestrict, 'E')) {
                w.compiler.compile(Lite(callback.template))(scope);

                if (!transclude) {
                    node.cleanInnerHTML();
                }

                node.append(callback.template);
            }

            linkFn(scope, node.attributes(), node);
        }

        return this;
    };

    var hasText = function (node) {
        return /\{\{|\}\}/.test(node.text());
    };

    Template.prototype.activateByScope = function (scope) {
        var textMarkups = this.textMarkupNodes.filter(hasText);

        for (var i = 0, l = textMarkups.length; i < l; i++) {
            var node = textMarkups[i];
            var matchedWithScope = matchTextMarkup(node, scope);

            node.text(matchedWithScope)
        }

        return this;
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

    function matchTextMarkup (node, scope) {
        var text = node.text();
        var startRemember = false;
        var frame = '';
        var frames = '';

        for (var i = 0, l = text.length; i < l; i += 1) {
            if (startRemember) {
                frame += text[i];

                if (text[i + 1] + text[i + 2] == '}}') {
                    frames += scope[trim(frame)];

                    startRemember = false;
                    frame = '';
                    i = i + 2;
                }

                continue;
            }

            if (text[i] + text[i + 1] == '{{') {
                startRemember = true;
                i = i + 1;

                continue;
            }

            frames += text[i];
        }

        return frames;
    }


    function trim (string) {
        return string.replace(/^\s+/, '').replace(/\s+$/, '');
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
            _template
                .extractMark(scope)
                .activateByScope(scope);
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
$scope.exampleWord = 'I am example word.';
$scope.sayHi = 'Hi, everyone.';
$scope.whoareyou = 'My name is vanpipy';

compiler.compile(document.getElementById('main'))($scope);
