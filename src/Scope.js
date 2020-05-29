import Like from './Like';

var _id = -1000;
var empty = Number.NaN;

function getID () {
    return _id++;
}

function Scope () {
    this.$id = getID();
    this.children = [];

    this.$$phase = null;
    this.$$watcher = [];
}

Scope.prototype.$watch = function (watchExp, listener) {
    var _scope = this;
    var _getter;

    if (Like.isString(watchExp)) {
        _getter = function () {
            return _scope[watchExp];
        }
    }

    var watcher = {
        get: _getter,
        fn: listener,
        last: empty
    };

    _scope.$$watcher.unshift(watcher);

    return watcher;
};

Scope.prototype.$digest = function () {
    var _scope = this;
    var watchers = _scope.$$watcher;
    var dirty = false;

    var watcher, i = 0;

    do {
        dirty = false;

        while (watcher) {
            var newValue = watcher.get();
            var oldValue = watcher.last;

            if (newValue != oldValue) {
                dirty = true;

                watcher.fn(newValue, oldValue);
                //TODO: deep copy the newValue
                watcher.last = newValue;
            }

            watcher = watchers[i++]
        }

    } while (dirty);
};

Scope.prototype.$new = function () {
    var _scope = new Scope();
    var _parent = this;

    _scope.$parent = _parent;
    _parent.children.push(_scope);

    return _scope;
};

export default Scope;
