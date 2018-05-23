'use strict';

// Declare app level module which depends on views, and components
angular.module('angularJSCalendar', [
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'googleplus',
  'ui.router',
  'permission',
  'permission.ui',
  'angularJSCalendar.login',
  'angularJSCalendar.home-page',
  'angularJSCalendar.calendar-days',
  'angularJSCalendar.auth-interceptor',
  'angularJSCalendar.auth-permission-store',
  'angularJSCalendar.auth-service',
  'angularJSCalendar.calendar-service',
  // 'angularJSCalendar.error-alert',
  // 'angularJSCalendar.create-calendar',
  // 'angularJSCalendar.calendar-day',
  // 'angularJSCalendar.calendar-dat-details'
]).config([
    '$locationProvider',
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider',
    'GooglePlusProvider',
function (
    $locationProvider,
    $httpProvider,
    $stateProvider,
    $urlRouterProvider,
    GooglePlusProvider
) {
    $locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise('/home-page');

    $httpProvider.interceptors.push('AuthInterceptor');

    GooglePlusProvider.init({
        clientId: '264020862118-655vmn9qkegmb7eqpgjr8vd59jni49nf.apps.googleusercontent.com',
        scopes: ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.readonly"]
    });

}]);