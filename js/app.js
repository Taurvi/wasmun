debugVars = {};

debugMode = true;

var debugMsg = function(msg) {
    if (debugMode)
        console.log('<<<DEBUG>>> ' + msg);
}

var dataPackage = {};

$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    $('.modal').each(function(){
        var src = $(this).find('iframe').attr('src');

        $(this).on('click', function(){

            $(this).find('iframe').attr('src', '');
            $(this).find('iframe').attr('src', src);

        });
    });
});

//  Create Angular App
var ngApp = angular.module('ngApp', ['ngRoute']);

ngApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'CtrlApply'
        })
        .when('/submit', {
            templateUrl: 'templates/submit.html',
            controller: 'CtrlSubmit'
        })
});

ngApp.controller('CtrlApply', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    $scope.data={};

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

    $scope.contactMethods = [
        {name: 'Select your preferred method of communication', value: null},
        {name: 'Text Message', value: 'sms'},
        {name: 'Phone Call', value: 'call'},
        {name: 'Email', value: 'email'},
        {name: 'Facebook', value: 'fb'},
    ]

    $scope.ngFormContact = null;

    $scope.experienceObject = {};
    $scope.staffObject = {};

    $scope.addExperience = function(year, experience, type) {
        var id = 0;
        if(type == "experience") {
            while ($scope.experienceObject.hasOwnProperty(id))
                id++;

            $scope.experienceObject[id] = {
                'id' : id,
                'year' : year,
                'experience' : experience
            };
            $scope.ngEnterYear = "";
            $scope.ngEnterExperience = "";
        } else {
            while ($scope.staffObject.hasOwnProperty(id))
                id++;

            $scope.staffObject[id] = {
                'id' : id,
                'year' : year,
                'experience' : experience
            };
            $scope.ngEnterSYear = "";
            $scope.ngEnterSExperience = "";
        }

    };

    $scope.removeExperience = function(id, type){
        $timeout(function() {
            if(type == 'experience')
                delete $scope.experienceObject[id];
            else
                delete $scope.staffObject[id];
        });
    };

    $scope.checkPositions = function() {
        return ($scope.ngPositionDG || $scope.ngPositionADG || $scope.ngPositionPR || $scope.ngPositionF || $scope.ngPositionL)
    }

    $scope.submitForm = function() {
        dataPackage.name = $scope.ngFormName;
        dataPackage.email = $scope.ngFormEmail;
        dataPackage.phone = $scope.ngFormPhone;
        dataPackage.bestContact = $scope.ngFormContact;
        dataPackage.occupation = $scope.ngFormJob;
        dataPackage.posDG = $scope.verifyPositions($scope.ngPositionDG);
        dataPackage.posADG = $scope.verifyPositions($scope.ngPositionADG);
        dataPackage.posPR = $scope.verifyPositions($scope.ngPositionPR);
        dataPackage.posF = $scope.verifyPositions($scope.ngPositionF);
        dataPackage.posL = $scope.verifyPositions($scope.ngPositionL);
        dataPackage.experienceStaff = JSON.stringify($scope.staffObject);
        dataPackage.experienceGeneral = JSON.stringify($scope.experienceObject);
        dataPackage.experienceOther = $scope.ngExperienceOther;
        dataPackage.why = $scope.ngEnterWhy;
        dataPackage.house = $scope.ngHoursWeek;
        dataPackage.available = $scope.ngAvailable;
        dataPackage.status = "review";
        /*var socket = io.connect('http://node.wasmun.org');
        socket.on('connect', function() {
            scoket.emit('formData', 'This form does not feel like doing anything!')
        });*/
    }

    $scope.verifyPositions = function(position) {
        if(!position)
            return false
        else
            return true;
    }
}]);

ngApp.controller('CtrlSubmit', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {

}]);
