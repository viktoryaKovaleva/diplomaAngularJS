'use strict';

angular.module('angularJSCalendar.home-page', ['ngMaterial'])

    .config(function ($stateProvider) {
        $stateProvider.state('home-page', {
            url: '/home-page',
            templateUrl: 'home-page/home-page.component.html',
            controller: 'HomeCtrl',
            data: {
                permissions: {
                    except: ['isAnonymous'],
                    redirectTo: 'login'
                }
            }
        });
    })

.controller('HomeCtrl', function($scope, $window,  $rootScope, $timeout, $mdDialog, $mdToast, CalendarService, AuthService) {
    $scope.googleLogout = AuthService.logout;
    $scope.googleCalendar = CalendarService.getStoredCalendar();
    $scope.googleUser = AuthService.authUser();


    $scope.createCalendar = function($event){
        var confirm = $mdDialog.prompt()
            .title('What would you name your calendar?')
            .placeholder('Calendar')
            .ariaLabel('Calendar')
            .targetEvent($event)
            .required(true)
            .ok('Save')
            .cancel('Close');

        $mdDialog.show(confirm).then(function(result) {
            $scope.created = false;
            CalendarService.addCalendar(result).then(function (calendar) {
                $scope.created = true;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(`Calendar ${calendar.summary} created!`)
                        .hideDelay(1000)
                );
            })
        }, function() {
            $scope.status = 'You didn\'t name your dog.';
        });
    };


    $scope.chooseCalendar = function ($event) {
        $mdDialog.show({
            targetEvent: $event,
            controller: DialogController,
            templateUrl: 'home-page/calendar-dialog.html',
            locals: { items: CalendarService.getAllCalendars() }
        });

        function DialogController($scope, $rootScope, $mdDialog, items) {
            $scope.items = items;
            $scope.closeDialog = function () {
                $mdDialog.hide();
            };

            $scope.openCalendar = function (item) {
                console.log(item);
                CalendarService.storeCalendar(item);
                $mdDialog.hide();
                $window.location.reload();
            }
        }
    };
});