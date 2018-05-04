
(function (w, LA) {
    'use strict';

    function LiteNode (element) {
        if (isElement(element)) {
            this[0] = element;
            this.length = 1;
        }

        if (LA.isString(element)) {
            return LiteNode.prototype.create.call(null, element);
        }

        if (isLiteNode(element)) {
            return element;
        }
    }

    LiteNode.prototype.create = function (input) {
        if (LA.isString(input)) {
            var _box = document.createElement('div');
            _box.innerHTML = input;

            if (_box.childNodes.length <= 1) {
                return new Lite(_box.childNodes[0]);
            } else {
                _box = undefined;

                //TODO: Fix console.log to error report.
                console.log('Multiple createing is not supported.');
            }
        }
    };

    LiteNode.prototype.attr = function (key, value) {
        if (LA.isDefined(key)) {
            if (LA.isDefined(value)) {
                return this[0].setAttribute(key, value);
            }

            return this[0].getAttribute(key);
        }
    };

    LiteNode.prototype.childNodes = function () {
        return childNodesIter(this[0].childNodes, []);
    };

    LiteNode.prototype.attributes = function () {
        return this[0].attributes;
    };

    var filterName = LA.map(function(a) { return a.name; });
    LiteNode.prototype.getMarks = function () {
        if (this[0].attributes) {
            return [this[0].nodeName.toLowerCase()].concat(filterName(this[0].attributes));
        }
    };

    LiteNode.prototype.bind = function (eventName, fn) {
        this[0].addEventListener(eventName, fn, false);
    };

    LiteNode.prototype.append = function (node) {
        if (LA.isString(node)) {
            this[0].innerHTML = this[0].innerHTML + node;
        } else {
            node = new Lite(node);
            this[0].appendChild(node[0]);
        }

    };

    LiteNode.prototype.cleanInnerHTML = function () {
        this[0].innerHTML = '';
    };

    LiteNode.prototype.isTextNode = function () {
        return this[0].nodeType == 3;
    };

    LiteNode.prototype.text = function (value) {
        if (LA.isDefined(value)) {
            this[0].data = value;
        }

        return this[0].data;
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
    }

    w.Lite = LiteNode;
})(window, window.LA, window._$);
