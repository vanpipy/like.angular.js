
import Like from './Like';

function LiteNode (element) {
    if (isElement(element)) {
        this[0] = element;
        this.length = 1;
    }

    if (Like.isString(element)) {
        return LiteNode.prototype.create.call(null, element);
    }

    if (isLiteNode(element)) {
        return element;
    }
}

LiteNode.prototype.create = function (input) {
    if (Like.isString(input)) {
        var _box = document.createElement('div');
        _box.innerHTML = input;

        if (_box.childNodes.length <= 1) {
            return new LiteNode(_box.childNodes[0]);
        } else {
            _box = undefined;

            //TODO: Fix console.log to error report.
            console.log('Multiple createing is not supported.');
        }
    }
};

LiteNode.prototype.attr = function (key, value) {
    if (Like.isDefined(key)) {
        if (Like.isDefined(value)) {
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
}

const filterName = function(attr) { return attr.name; };

LiteNode.prototype.attributesName = function () {
    const attributes = this[0].attributes || [];
    return attributes.map(filterName);
};

LiteNode.prototype.getMarks = function () {
    return [this[0].nodeName.toLowerCase()].concat(this.attributesName());
};

LiteNode.prototype.bind = function (eventName, fn) {
    this[0].addEventListener(eventName, fn, false);
};

LiteNode.prototype.append = function (node) {
    if (Like.isString(node)) {
        this[0].innerHTML = this[0].innerHTML + node;
    } else {
        node = new LiteNode(node);
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
    if (Like.isDefined(value)) {
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

function isElement (element) {
    return element && element.nodeName;
}

function isLiteNode(node) {
    return node instanceof LiteNode;
}

export default LiteNode;
