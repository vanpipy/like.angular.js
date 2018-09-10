'use strict';

(function(w, LA, Provider) {
    function noop () {}

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

    var textExp = /\{\{|\}\}/;
    var hasText = function (node) {
        return textExp.test(node.text()) || textExp.test(node._markupText);
    };

    Template.prototype.bindToScope = function (scope) {
        var templateHandler = this;
        var textMarkups = templateHandler.textMarkupNodes;

        for (var i = 0, l = textMarkups.length; i < l; i++) {
            var node = textMarkups[i], matchedWithScope;

            if (hasText(node)) {
                node._markupText = node.text();

                matchTextMarkup(node, scope, templateHandler);
            }
        }

        return this;
    };

    Template.prototype.activateByScope = function (scope, type) {
        var templateHandler = this;
        var textMarkups = templateHandler.textMarkupNodes;

        for (var i = 0, l = textMarkups.length; i < l; i++) {
            var node = textMarkups[i], matchedWithScope;

            if (hasText(node)) {
                matchedWithScope = matchTextMarkup(node, scope, templateHandler, 'update');

                node.text(matchedWithScope)
            }
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

    function matchTextMarkup (node, scope, template, type) {
        var text = node._markupText;
        var startRemember = false;
        var frame = '';
        var frames = '';

        for (var i = 0, l = text.length; i < l; i += 1) {
            if (startRemember) {
                frame += text[i];

                if (text[i + 1] + text[i + 2] == '}}') {
                    frame = trim(frame);
                    frames += scope[frame];

                    if (type != 'update') {
                        scope.$watch(frame, function() {
                            template.activateByScope(scope, 'update');
                        });
                    }

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
                .bindToScope(scope);
        };
    };

    Compiler.prototype.templatize = function (LiteNode) {
        var children = LiteNode.childNodes();
        var template = new Template([LiteNode[0]].concat(children), this.provider);

        return template.init();
    };

    w.compiler = new Compiler(Provider);
})(window, window.LA, window.provider);
