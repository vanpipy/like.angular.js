'use strict';

import Like from './Like';
import Lite from './LiteNode';

function Template ({ LiteNodesArray, providers, compiler }) {
    this.nodes = LiteNodesArray || [];
    this.providers = providers || [];
    this.markups = [];
    this.textMarkupNodes = [];
    this.compiler = compiler;
}

Template.prototype.init = function () {
    for (let i = 0, l = this.nodes.length; i < l; i++) {
        let node = new Lite(this.nodes[i]);

        if (node.isTextNode()) {
            this.textMarkupNodes.push(node);
            continue;
        }

        let markup;
        let markupLinked;
        let markups = node.getMarks();

        if (markups && markups.length) {
            for (var k = 0, len = markups.length; k < len; k++) {
                markup = markups[k];

                markupLinked = this.providers.directive.get(markup);

                if (markupLinked) {
                    this.markups.push([ node, markupLinked ]);
                }
            }
        }

    }

    return this;
};

Template.prototype.extractMark = function (scope) {
    let markups = this.markups;

    for (let i = 0, l = markups.length; i < l; i++) {
        let node = markups[i][0];
        let bindedCallback = markups[i][1];

        let bindedObject = bindedCallback();
        let linkRestrict = bindedObject.restrict;
        let linkFn = bindedObject.link;
        let transclude = bindedObject.transclude;

        if (hasRestrict(linkRestrict, 'E')) {
            this.compiler.compile(Lite(bindedObject.template))(scope);

            if (!transclude) {
                node.cleanInnerHTML();
            }

            node.append(bindedObject.template);
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
        var node = textMarkups[i];

        if (hasText(node)) {
            node._markupText = node.text();

            matchTextMarkup(node, scope, templateHandler);
        }
    }

    return this;
};

Template.prototype.activateByScope = function (scope) {
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
                frame = Like.trim(frame);
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

/*
 * @name Compiler
 * @param provider {EnvironmentForCompiler}
 *
 * @Description
 * The Compiler do things about compile only.
 * Raw element > LiteNode > ScopeBindedNode
 */
function Compiler (providers) {
    this.providers = providers;
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
    var template = new Template({
        LiteNodesArray: [LiteNode[0]].concat(children),
        providers: this.providers,
        compiler: this
    });

    return template.init();
};

export default Compiler;
