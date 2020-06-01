
'use strict';

function Provider (providers, prefix) {
    this.providers = providers;
    this.prefix = prefix;
    this.providersIndex = [];
}

Provider.prototype.set = function (name, provider) {
    this.providersIndex.push(this.getComponentName(name));
    this.providers.push(provider);
};

Provider.prototype.get = function (name) {
    const _index = this.providersIndex.indexOf(this.getComponentName(name));

    if (_index > -1) {
        return this.providers[_index];
    }
};

Provider.prototype.getComponentName = function(name) {
    if (name) {
        return `${this.prefix}_${camelName(name)}`;
    }

    return '';
};

function camelName(name) {
    const words = name.split('-');
    const first = words.shift();
    return words.length ? `${first}${words.map(upperCaseFirstLetter)}` : first;
}

function upperCaseFirstLetter(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
}

export default Provider;
