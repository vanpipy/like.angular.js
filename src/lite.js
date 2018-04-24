
(function (w, LA) {
    'use strict';

    function LiteNode (element) {
        if (isElement(element)) {
            this[0] = element;
            this.length = 1;
        }

        if (isLiteNode(element)) {
            return element;
        }
    }

    LiteNode.prototype.attr = function (key, value) {
        if (LA.isDefined(key)) {

            if (LA.isDefined(value)) {
                return this.node.setAttribute(key, value);
            }
            
            return this.node.getAttribute(key);
        }
    };

    LiteNode.prototype.childNodes = function () {
        return childNodesIter(this[0]);
    };

    LiteNode.prototype.markups = function () {
        return [this[0].nodeName.toLowerCase()].concat(LA.map(function(a) {
            return a.name;
        }, this[0].attributes));
    };

    LiteNode.prototype.bind = function (eventName, fn) {
        this[0].addEventListener(eventName, fn, false);
    };

    function childNodesIter (root) {
        var node = Array.prototype.filter.call(root.getElementsByTagName('*'), getDOMNode);

        return LA.map(function(n) {
            return new Lite(n);
        }, node);
    }

    function getDOMNode (node) {
        return node.nodeType != 3 && node.nodeName !== 'SCRIPT';
    }

    function isElement (element) {
        return element && element.nodeName;
    }

    function isLiteNode(node) {
        return node instanceof LiteNode;
    };

    w.Lite = LiteNode;
})(window, window.LA);
