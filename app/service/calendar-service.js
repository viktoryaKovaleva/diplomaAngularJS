'use strict';

angular.module('angularJSCalendar.calendar-service', [])

    .service('CalendarService', function ($state, $http, $cookies) {
        const GOOGLE_API = 'https://www.googleapis.com/calendar/v3';

        this.getAllCalendars = function () {
            return $http.get(`${GOOGLE_API}/users/me/calendarList`).then(function (response) {
                return response.data.items;
            });
        };

        this.addCalendar = function (calendar) {
            return $http.post(`${GOOGLE_API}/calendars/`, {summary: calendar}).then(function (response) {
                return response.data;
            })
        };

        this.findById = function (calendarId) {
            return $http.get(`${GOOGLE_API}/calendars/${calendarId}`).then(function (response) {
                return response.data;
            });
        };

        this.getCalendarEvents = function(calendarId, date) {
            let timeMin = moment(date).toISOString();
            let timeMax = moment(date).add(1,'days').toISOString();
            return $http.get(`${GOOGLE_API}/calendars/${calendarId}/events?timeMin=${timeMin}&timeMax=${timeMax}`).then(function (response) {
                return response.data.items;
            });
        };

        this.addEvent = function (calendarId, event, day) {
            let timeMin = moment(day).toISOString();
            let timeMax = moment(day).add(1,'days').toISOString();
            return $http.post(`${GOOGLE_API}/calendars/${calendarId}/events`, {
                "end": {
                    "dateTime": timeMax
                },
                "start": {
                    "dateTime": timeMin
                },
                "summary": event
            }).then(function (response) {
                return response.data;
            })
        };

        this.removeEvent = function (calendarId, eventId) {
            return $http.delete(`${GOOGLE_API}/calendars/${calendarId}/events/${eventId}`).then(function (response) {
                return response.data;
            })
        };

        this.updateEvent = function (calendarId, eventId, event) {
            return $http.patch(`${GOOGLE_API}/calendars/${calendarId}/events/${eventId}`, JSON.stringify(event)).then(function (response) {
                return response.data;
            })
        };

        this.storeCalendar = function (calendar) {
            $cookies.put("calendar", angular.toJson(calendar));
        };

        this.getStoredCalendar = function () {
            let calendar = $cookies.get("calendar");
            if(calendar) return JSON.parse(calendar);
        };

});
