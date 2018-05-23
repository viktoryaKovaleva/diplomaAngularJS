'use strict';


angular.module('angularJSCalendar.login', [ 'ui.router', 'ngMaterial'])

    .config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'welcome-card/welcome-card.component.html',
            controller: 'LoginCtrl',
            data: {
                permissions: {
                    except: ['isAuthenticated'],
                    redirectTo: 'home-page'
                }
            }
        });
    })

.controller('LoginCtrl', function($scope, AuthService) {
     $scope.googleLogin = AuthService.login;
});