debugVars = {};

debugMode = true;

// Initialize Parse
Parse.initialize('wNpu76vwiBw69drSnb6bvfYnNeYCHxqPugSQfZvx', '3ibIg8GnmKrxkPCrmnm53SLjtED2qkfOEe5U8k0k');

var debugMsg = function(msg) {
    if (debugMode)
        console.log('<<<DEBUG>>> ' + msg);
}

var dataPackage = {};

//  Create Angular App
var ngApp = angular.module('ngApp', ['ngRoute', 'ngCrossfilter']);

ngApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/director.html',
            controller: 'CtrlDisplay'
        })
});

ngApp.controller('CtrlDisplay', ['$scope', '$location', 'Crossfilter', function($scope, $location, Crossfilter) {
    $scope.$ngc;

    // Enables a dynamic checkbox list for the various roles.
    $scope.selectedRoles = [
        {
            'name': 'International Court of Justice',
            'short': 'posICJ'
        },
        {
            'name': 'GA - Fourth Committee',
            'short': 'posGA4'
        },
        {
            'name': 'Human Rights Council',
            'short': 'posHRC'
        },
        {
            'name': 'UN Environmental Program',
            'short': 'posUNEP'
        },
        {
            'name': 'UN Office on Drugs and Crime',
            'short': 'posUNODC'
        },
        {
            'name': 'UN Economic and Social Council',
            'short': 'posECOSOC'
        },
        {
            'name': 'UN Security Council',
            'short': 'posSC'
        }
    ];

    // Enables a dynamic checkbox list for the various status conditions.
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
    ];

    $scope.shortPos = ['posICJ', 'posGA4', 'posHRC', 'posUNEP', 'posUNODC', 'posECOSOC', 'posSC'];
    $scope.shortPosSelection = ['posICJ', 'posGA4', 'posHRC', 'posUNEP', 'posUNODC', 'posECOSOC', 'posSC'];

    $scope.toggleSelection = function($ngc, posName) {
        var idx = $scope.shortPosSelection.indexOf(posName);
        // is currently selected
        if (idx > -1) {
            $scope.shortPosSelection.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.shortPosSelection.push(posName);
        }
        $scope.$ngc.filterBy('summonerTier', $scope.shortPosSelection, $ngc.filters.inArray('some'));
    };

    // Gets the data from the database
    $scope.readDatabase = function() {
        var DApplications = Parse.Object.extend('DApplications');

        var queryApplications = new Parse.Query(DApplications);

        var tempArray = [];

        queryApplications.find({
            success: function (results) {
                $scope.applicantList = [];
                results.map(function(applicant) {
                    tempArray.push(applicant.attributes);
                })
                $scope.$apply(function() {
                    debugMsg('apply was run!');
                    // Sets the $scope.applicantLIst equal to the tempArray with the data
                    $scope.applicantList = tempArray;

                    $scope.$ngc = new Crossfilter($scope.applicantList, ['name'])
                    $scope.$ngc.addDimension(['posICJ']);
                    $scope.$ngc.addDimension(['posGA4']);
                    $scope.$ngc.addDimension(['posHRC']);
                    $scope.$ngc.addDimension(['posUNEP']);
                    $scope.$ngc.addDimension(['posUNODC']);
                    $scope.$ngc.addDimension(['posECOSOC']);
                    $scope.$ngc.addDimension(['posSC']);

                    // Iterates through each applicant for more specific items
                    $scope.applicantList.map(function(applicant) {
                        applicant.id = $scope.applicantList.indexOf(applicant);
                        var tempPosition = [];
                        if(applicant.posICJ)
                            tempPosition.push('International Criminal Court');
                        if(applicant.posGA4)
                            tempPosition.push('General Assembly - Fourth Committee');
                        if(applicant.posHRC)
                            tempPosition.push('Human Rights Council');
                        if(applicant.posUNEP)
                            tempPosition.push('UN Environmental Program');
                        if(applicant.posUNODC)
                            tempPosition.push('UN Office on Drugs and Crime');
                        if(applicant.posECOSOC)
                            tempPosition.push('UN Economic and Social Council');
                        if(applicant.posSC)
                            tempPosition.push('UN Security Council');

                        applicant.positions = tempPosition;
                    })
                    debugVars.applicantList = $scope.applicantList;
                })
            }
        })
    }

    $scope.posFilter = function($ngc, position, filter) {
        if (filter)
            $ngc.filterBy(position, filter);
        else
            $ngc.unfilterBy(position)
    }

    $scope.selectedApplicant = null;

    $scope.selectOption = function(id) {
        $scope.applicantList.map(function(applicant) {
            if (applicant.id == id) {
                $('#' + id).addClass('alert-success');
                $scope.selectedApplicant = $scope.applicantList[id];
            }
            else
                $('#' + applicant.id).removeClass('alert-success');
        })
    }


}]);


