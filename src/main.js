'use strict';

import Like from './Like';
import Provider from './Provider';
import Injector from './Injector';
import Compiler from './Compiler';
import Scope from './Scope';


const services = [];
const directives = [];
const controllers = [];

const service = new Provider(services, 'provider');
const directive = new Provider(directives, 'directive');
const controller = new Provider(controllers, 'contoller');

const injector = new Injector(service);
const $rootScope = new Scope();

const compiler = new Compiler();

Like.inject = function(params) {
    return injector.invoke(params);
}

Like.service = function(name, fn) {
    service.set(name, fn);
}

Like.directive = function(name, fn) {
    directive.set(name, fn);
}

Like.controller = function(name, handler) {
    controller.set(name, handler);
}

Like.service('$rootScope', $rootScope);

Like.directive('ngContoller', function() {
    return {
        restrict: 'A',
        link: function(scope, attr) {
            const control = controller.get(attr['ng-contoller'].value);

            control();
        }
    };
});

Like.directive('ngInit', function() {
    return {
        restrict: 'A',
        link: function(scope, attr, element) {
            compiler.compile(element)(scope);
        }
    }
});

global.Like = Like;
global.compiler = compiler;
