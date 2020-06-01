'use strict';

/*
 *provider.add('directive', 'mainRole', function () {
 *    return {
 *        restrict: 'A',
 *        link: function (scope, attr, element) {
 *
 *        }
 *    }
 *});
 *
 *provider.add('directive', 'markUp', function () {
 *    return {
 *        restrict: 'E',
 *        template: '<h1>Hello!</h1>',
 *        link: function (scope, attr, element) {
 *
 *        }
 *    }
 *});
 *
 *var $scope = new scope();
 *$scope.exampleWord = 'I am example word.';
 *$scope.sayHi = 'Hi, everyone.';
 *$scope.whoareyou = 'My name is vanpipy';
 *$scope.test = function (e, a, b) {
 *    console.log(e, a, b);
 *};
 *
 *compiler.compile(document.getElementById('main'))($scope);
 */

Like.controller('mainController', ['$rootScope', function($rootScope) {
    console.log('hello world', $rootScope)
}]);

Like.bootstrap(document.getElementById('main'));
