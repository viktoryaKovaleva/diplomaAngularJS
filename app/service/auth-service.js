'use strict';

angular.module('angularJSCalendar.auth-service', [])

    .service('AuthService', function ($rootScope, $state, $cookies, GooglePlus) {

        this.login = function () {
            GooglePlus.login().then(function (authResult) {
                $cookies.put("authToken", authResult['access_token']);
                GooglePlus.getUser().then(function (user) {
                    $cookies.put("authUser", angular.toJson(user));
                    $state.go('home-page');
                });
            }, function (err) {
                console.log(err);
            });
        };

        this.logout = function () {
            GooglePlus.logout();
            angular.forEach($cookies.getAll(), function (v, k) { $cookies.remove(k); });
            $state.go('login');
        };

        this.authUser = function() {
            let authUser = $cookies.get('authUser');
            return JSON.parse(authUser);
        };

        // return authService;

    });
