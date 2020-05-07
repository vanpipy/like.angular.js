
'use strict';

function Provider (providers, prefix) {
    this.providers = providers;
    this.prefix = prefix;
    this.providersIndex = [];
}

Provider.prototype.set = function (name, fn) {
    const _name = this.getComponentName(name);
    this.providers.push({ name: _name, callback: fn });
    this.providersIndex.push(_name);
};

Provider.prototype.get = function (name) {
    const _index = this.providersIndex.indexOf(this.getComponentName(name));

    if (_index > -1) {
        return this.providers[_index];
    }
};

Provider.prototype.getComponentName = function(name) {
    return `${this.prefix}_${name}`;
};

export default Provider;
