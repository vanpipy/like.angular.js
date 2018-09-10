
(function(w, LA, Provider) {
    'use strict';

    Provider.add('directive', 'ngClick', function () {
        return {
            restrict: 'A',
            link: function (scope, attr, element) {
                var fn = LA.extractFnNameString(attr['ng-click'].value);
                var hasDefaultEvent = fn.params.indexOf('$event') > -1;

                element.bind('click', function(event) {
                    if (hasDefaultEvent && LA.isUndefined($scope.event)) {
                        scope.$event = event;
                    }

                    scope[fn.name].apply(scope, fn.params.map(switchWithScope));
                });

                function switchWithScope (name) {
                    return scope[name];
                }
            },
        }
    });

    Provider.add('directive', 'ngModel', function () {
        return {
            restrict: 'A',
            link: function (scope, attr, element) {
                var key = attr['ng-model'].value;
            }
        }
    });
})(window, window.LA, window.provider);
