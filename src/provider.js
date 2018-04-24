
(function(w, LA) {
    'use strict';
    
    function Provider (providers, prefixs) {
        this.providers = providers;
        this.prefixs = prefixs;
        this.providersIndex = [];
    }

    Provider.prototype.add = function (type, name, fn) {
        this.providers.push({
            name: this.prefixs[type] +  name,
            callback: fn
        });

        this.providersIndex.push(name);
    };

    Provider.prototype.get = function (name) {
        name = restructProviderName(name);
        var _index = this.providersIndex.indexOf(name);

        if (_index > -1) {
            return this.providers[_index];
        }
    };

    function restructProviderName (name) {
        if (/\-/.test(name)) {
            name = LA.map(restructFilter, name.split('-')).join('');
        }

        return name;
    }

    function restructFilter (name, index) {
        return index > 0 ? name[0].toUpperCase() + name.slice(1) : name;
    }

    w.provider = new Provider(LA.providers, LA.providerPrefix);
})(window, window.LA);
