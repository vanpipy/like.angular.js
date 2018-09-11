/*
 * A injector is a module requirer
 *
 * const injector = new Injector();
 *
 * injector.$inject = [fnA, fnB, ...];
 * injector.invode = function(fnA, fnB, ...) {
 *   ...
 *
 *   fnA();
 *   fnB():
 * }
 */

Injector = function() {
    this.$inject = [];
}

Injector.prototype.get = function(key) {
    return this.$inject[key];
}

Injector.prototype.invoke = function() {
    var argumentsLength = arguments.length;
    var parameters = arguments.slice(0, argumentsLength.length - 1);
    var callback = arguments[argumentsLength - 1];

    callback.apply(null, parameters.map(function(param) {
        return this.get(param);
    }));
}
