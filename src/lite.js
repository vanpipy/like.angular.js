
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
        return childNodesIter(this[0].childNodes, []);
    };

    LiteNode.prototype.markups = function () {
        return [this[0].nodeName.toLowerCase()].concat(LA.map(function(a) {
            return a.name;
        }, this[0].attributes));
    };

    LiteNode.prototype.bind = function (eventName, fn) {
        this[0].addEventListener(eventName, fn, false);
    };

    function childNodesIter (nodesArray, result) {
        var i = 0;
        var nextNodesArray = [];
        var endCount = 0;

        while (i < nodesArray.length) {
            if (nodesArray[i].childNodes.length) {
                nextNodesArray = nextNodesArray.concat(sliceDOMList(nodesArray[i].childNodes));
            } else {
                endCount += 1;
            }

            result.push(nodesArray[i]);

            i++;
        }

        if (endCount === i) {
            return result;
        } else {
            return childNodesIter(nextNodesArray, result);
        }

    }

    function sliceDOMList (domList) {
        return Array.prototype.slice.call(domList);
    }

    function getDOMNode (node) {
        return node.nodeName !== 'SCRIPT';
    }

    function makeLiteNode (node) {
        return new Lite(node);
    }

    function isElement (element) {
        return element && element.nodeName;
    }

    function isLiteNode(node) {
        return node instanceof LiteNode;
    };

    w.Lite = LiteNode;
})(window, window.LA);
