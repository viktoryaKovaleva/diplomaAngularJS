'use strict';

angular.module('angularJSCalendar.auth-interceptor', [])

.factory('AuthInterceptor', function ($cookies, $q, $state, GooglePlus) {
    return {
        request: function(config) {
            let token = $cookies.get('authToken');
            if(token) config.headers.Authorization = 'Bearer ' + token;
            return config;
        },

        responseError: function(response) {
            if (response.status === 401) {
                GooglePlus.logout();
                angular.forEach($cookies.getAll(), function (v, k) { $cookies.remove(k); });
                $state.go('welcome-card');
            }
            return response || $q.when(response);
        }
    };
});