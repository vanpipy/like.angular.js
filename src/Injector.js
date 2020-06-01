/*
 * A injector is a module requirer
 *
 * const injector = new Injector();
 *
 * injector.$inject = [fnA, fnB, ...];
 * injector.invode(function(fnA, fnB, ...) {
 *   ...
 *
 *   fnA();
 *   fnB():
 * })
 */

function Injector(provider) {
    this._provider = provider;
}

Injector.prototype.get = function(key) {
    return this._provider.get(key);
}

Injector.prototype.invoke = function(params) {
    const callback = params.pop();
    return callback.apply(null, params.map(this.getFunction.bind(this)));
}

Injector.prototype.getFunction = function(name) {
    return this.get(name);
}

export default Injector;
