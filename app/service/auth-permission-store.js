'use strict';

angular.module('angularJSCalendar.auth-permission-store', [])

    .run(function (PermPermissionStore, $cookies) {
        PermPermissionStore
            .definePermission('isAuthenticated', function () {
                return $cookies.get("authToken") != null;
            });
        PermPermissionStore
            .definePermission("isAnonymous", function () {
                return $cookies.get("authToken") == null;
            });

});