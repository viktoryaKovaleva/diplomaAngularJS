'use strict';

angular.module('angularJSCalendar.calendar-days', ['ngMaterial'])


    .controller('CalendarDaysCtrl', function ($scope, $state, $mdDialog, CalendarService) {
        let startOfWeek = moment().startOf('isoWeek');
        let endOfWeek = moment().endOf('isoWeek');

        $scope.week = [];
        var day = startOfWeek;

        while (day <= endOfWeek) {
            $scope.week.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        $scope.openDay = function ($event, day) {
            $mdDialog.show({
                targetEvent: $event,
                controller: DialogController,
                templateUrl: 'calendar-days/calendar-day-details.component.html',
                locals: { day: day, events: CalendarService.getCalendarEvents(CalendarService.getStoredCalendar()['id'], day) }
            });

            function DialogController($scope, $mdDialog, $mdToast, day, events) {
                $scope.events = events;
                console.log(events);
                $scope.day = day;
                $scope.eventName = '';
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                };
                $scope.deleteEvent = function (event, $index) {
                    CalendarService.removeEvent(CalendarService.getStoredCalendar()['id'], event['id']);
                    $scope.events.splice($index, 1);
                };
                $scope.editEvent = function (event) {
                    console.log(event);
                    CalendarService.updateEvent(CalendarService.getStoredCalendar()['id'], event['id'], event).then(function () {
                        $mdToast.show($mdToast.simple()
                            .parent('#toast')
                            .position('top left')
                            .textContent('Task updated!')
                        );
                    })
                };
                $scope.creteEvent = function () {
                    console.log($scope.day);
                    CalendarService.addEvent(CalendarService.getStoredCalendar()['id'], $scope.eventName, $scope.day).then(function (event) {
                        $scope.events.push(event);
                        $scope.eventName = '';
                        $mdToast.show($mdToast.simple()
                            .parent('#toast')
                            .position('top left')
                            .textContent('Task created!')
                        );
                    });
                }
            }
        };
    });