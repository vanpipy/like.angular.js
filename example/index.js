'use strict';

provider.add('directive', 'mainRole', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {

        }
    }
});

provider.add('directive', 'ngController', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {

        }
    }
});

provider.add('directive', 'ngClick', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {
            element.bind('click', attr.ngClick);
        }
    }
});

provider.add('directive', 'ngModel', function () {
    return {
        restrict: 'A',
        link: function (scope, attr, element) {

        }
    }
});

provider.add('directive', 'markUp', function () {
    return {
        restrict: 'E',
        template: '<h1>Hello!</h1>',
        link: function (scope, attr, element) {

        }
    }
});

var $scope = new scope();
$scope.exampleWord = 'I am example word.';
$scope.sayHi = 'Hi, everyone.';
$scope.whoareyou = 'My name is vanpipy';

compiler.compile(document.getElementById('main'))($scope);
