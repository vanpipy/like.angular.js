
(function (w, LA) {
    'use strict';

    function LiteNode (element) {
        if (LA.isLiteNode(element)) {
            this[0] = element;
            this.node = this[0];
            this.length = 1;
        }
    }

    LiteNode.prototype.attr = function (key, value) {
        if (LA.isDefined(key)) {

            if (LA.isDefined(value)) {
                return this.node.setAttribute(key);
            }
            
            return this.node.getAttribute(key);
        }
    };

    LiteNode.prototype.attributes = function () {
        return this.node.attributes;
    };

    w.Lite = LiteNode;
})(window, window.LA);
