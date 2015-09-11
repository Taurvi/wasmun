debugVars = {};

debugMode = false;

// Initialize Parse
Parse.initialize('wNpu76vwiBw69drSnb6bvfYnNeYCHxqPugSQfZvx', '3ibIg8GnmKrxkPCrmnm53SLjtED2qkfOEe5U8k0k');

var debugMsg = function(msg) {
    if (debugMode)
        console.log('<<<DEBUG>>> ' + msg);
}

var dataPackage = {};

//  Create Angular App
var ngApp = angular.module('ngApp', ['ngRoute']);

ngApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'CtrlDisplay'
        })
});

ngApp.controller('CtrlDisplay', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    $scope.selectedRoles = [
        {
            'name': 'Director General',
            'short': 'dg'
        },
        {
            'name': 'Assistant Director General',
            'short': 'adg'
        },
        {
            'name': 'USG of Public Relations',
            'short': 'pr'
        },
        {
            'name': 'USG of Finances',
            'short': 'f'
        },
        {
            'name': 'USG of Logistics',
            'short': 'l'
        }
    ];

    $scope.selectedStatus = [
        {
            'name': 'Pending Review',
            'short': 'review'
        },
        {
            'name': 'Pending Interview',
            'short': 'interview'
        },
        {
            'name': 'Pending Decision',
            'short': 'decision'
        },
        {
            'name': 'Accepted',
            'short': 'accepted'
        },
        {
            'name': 'Rejected',
            'short': 'rejected'
        }
    ]

}]);


