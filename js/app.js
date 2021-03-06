debugVars = {};

debugMode = false;

// Initialize Parse
Parse.initialize('wNpu76vwiBw69drSnb6bvfYnNeYCHxqPugSQfZvx', '3ibIg8GnmKrxkPCrmnm53SLjtED2qkfOEe5U8k0k');

var debugMsg = function(msg) {
    if (debugMode)
        console.log('<<<DEBUG>>> ' + msg);
};

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
        //.when('/', {
        //    templateUrl: 'templates/main.html',
        //    controller: 'CtrlApply'
        //})
        .when('/', {
            templateUrl: 'templates/ad-chair.html',
            controller: 'CtrlAdChair'
        })
        .when('/submit', {
            templateUrl: 'templates/submit.html',
            controller: 'CtrlSubmit3'
        })
});

ngApp.controller('CtrlAdChair', ['$scope', '$location', function($scope, $location) {
    $scope.contactMethods = [
        {name: 'Select your preferred method of communication', value: null},
        {name: 'Text Message', value: 'sms'},
        {name: 'Phone Call', value: 'call'},
        {name: 'Email', value: 'email'},
        {name: 'Facebook', value: 'fb'}
    ];

    $scope.ngAdRequest = [];
    $scope.ngChairRequest = [];

    $scope.ngAd1 = '';
    $scope.ngAd2 = '';
    $scope.ngAd3 = '';

    $scope.ngChair1 = '';
    $scope.ngChair2 = '';

    $scope.ngFormContact = null;

    $scope.checkAdChair = function() {
        if ($scope.ngHomeGovernment)
            return true;
        if ($scope.ngAdRequest.length > 0 || $scope.ngChairRequest.length > 0)
            return true;
        else
            return false;
    }

    $scope.resetField = function(field) {
        if (field == 'ad')
            $scope.ngAdRequest = '';
        if (field == 'chair')
            $scope.ngChairRequest = '';
    }

    $scope.verifyBoolean = function(boo) {
        if(!boo)
            return false;
        else
            return true;
    };


    $scope.submitForm = function() {
        dataPackage.name = $scope.ngFormName;
        dataPackage.email = $scope.ngFormEmail;
        dataPackage.phone = $scope.ngFormPhone;
        dataPackage.bestContact = $scope.ngFormContact;
        dataPackage.occupation = $scope.ngFormJob;

        dataPackage.hgRequest = $scope.ngHomeGovernment;
        dataPackage.adRequest = $scope.ngAdRequest;
        dataPackage.chairRequest = $scope.ngChairRequest;

        dataPackage.enterInterest = $scope.ngEnterInterest;
        dataPackage.enterPastWasmun = $scope.ngEnterPastWasmun;
        dataPackage.enterPast = $scope.ngEnterPast;
        dataPackage.enterCollab = $scope.ngEnterCollab;
        dataPackage.enterAvail = $scope.ngEnterAvail;

        dataPackage.enterCollabHg = $scope.ngEnterCollabHg;
        dataPackage.hg1 = $scope.ngHg1;

        dataPackage.ad1 = $scope.ngAd1;
        dataPackage.ad2 = $scope.ngAd2;
        dataPackage.ad3 = $scope.ngAd3;

        dataPackage.chair1 = $scope.ngChair1;
        dataPackage.chair2 = $scope.ngChair2;

        dataPackage.status = "review";
        /*var socket = io.connect('http://node.wasmun.org');
         socket.on('connect', function() {
         scoket.emit('formData', 'This form does not feel like doing anything!')
         });*/

        console.log(dataPackage);
        $location.path("/submit");
    }
}]);

ngApp.controller('CtrlSubmit3', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    debugMsg('registerToDatabase() called.');
    var ADCApplications = Parse.Object.extend('ADCApplications');
    debugMsg('Extended Parse table: ADCApplications');
    var newADCApp = new ADCApplications();
    debugMsg('Created new AD/Chair App.');

    newADCApp.set('name', dataPackage.name);
    newADCApp.set('email', dataPackage.email);
    newADCApp.set('phone', dataPackage.phone);
    newADCApp.set('bestContact', dataPackage.bestContact);
    newADCApp.set('occupation', dataPackage.occupation);

    newADCApp.set('hgRequest', dataPackage.hgRequest);
    newADCApp.set('adRequest', dataPackage.adRequest);
    newADCApp.set('chairRequest', dataPackage.chairRequest);

    newADCApp.set('enterInterest', dataPackage.enterInterest);
    newADCApp.set('enterPastWasmun', dataPackage.enterPastWasmun);
    newADCApp.set('enterPast', dataPackage.enterPast);

    newADCApp.set('enterAvail', dataPackage.enterAvail);

    newADCApp.set('enterCollab', dataPackage.enterCollab);
    newADCApp.set('enterCollabHg', dataPackage.enterCollabHg);
    newADCApp.set('hg1', dataPackage.hg1);

    newADCApp.set('ad1', dataPackage.ad1);
    newADCApp.set('ad2', dataPackage.ad2);
    newADCApp.set('ad3', dataPackage.ad3);

    newADCApp.set('chair1', dataPackage.chair1);
    newADCApp.set('chair2', dataPackage.chair2);


    newADCApp.save().then(function(newADCApp) {
        debugMsg('Form successfully submitted.');
        $('#register-id').text(newADCApp.id);
        $('#submitPending').css('display', 'none');
        $('#submitSuccess').css('display', 'initial');
    }, function() {
        debugMsg('Form failed.');
        $('#submitPending').css('display', 'none');
        $('#submitFail').css('display', 'initial');
    })
}]);



ngApp.controller('CtrlDirector', ['$scope', '$location', function($scope, $location) {
    $scope.contactMethods = [
        {name: 'Select your preferred method of communication', value: null},
        {name: 'Text Message', value: 'sms'},
        {name: 'Phone Call', value: 'call'},
        {name: 'Email', value: 'email'},
        {name: 'Facebook', value: 'fb'}
    ];

    $scope.verifyBoolean = function(boo) {
        if(!boo)
            return false;
        else
            return true;
    };


    $scope.checkPositions = function() {
        return ($scope.ngPositionICJ || $scope.ngPositionGA4 || $scope.ngPositionHRC || $scope.ngPositionUNEP || $scope.ngPositionUNODC || $scope.ngPositionECOSOC || $scope.ngPositionSC)
    }

    $scope.submitForm = function() {

        dataPackage.name = $scope.ngFormName;
        dataPackage.email = $scope.ngFormEmail;
        dataPackage.phone = $scope.ngFormPhone;
        dataPackage.bestContact = $scope.ngFormContact;
        dataPackage.occupation = $scope.ngFormJob;

        dataPackage.posICJ = $scope.verifyBoolean($scope.ngPositionICJ);
        dataPackage.posGA4 = $scope.verifyBoolean($scope.ngPositionGA4);
        dataPackage.posHRC = $scope.verifyBoolean($scope.ngPositionHRC);
        dataPackage.posUNEP = $scope.verifyBoolean($scope.ngPositionUNEP);
        dataPackage.posUNODC = $scope.verifyBoolean($scope.ngPositionUNODC);
        dataPackage.posECOSOC = $scope.verifyBoolean($scope.ngPositionECOSOC);
        dataPackage.posSC = $scope.verifyBoolean($scope.ngPositionSC);

        dataPackage.why = $scope.ngEnterWhy;
        dataPackage.enterPast = $scope.ngEnterPast;
        dataPackage.enterTopics = $scope.ngEnterTopics;
        dataPackage.enterCollab = $scope.ngEnterCollab;
        dataPackage.status = "review";
        /*var socket = io.connect('http://node.wasmun.org');
         socket.on('connect', function() {
         scoket.emit('formData', 'This form does not feel like doing anything!')
         });*/
        $location.path("/submit");
    }
}]);

ngApp.controller('CtrlSubmit2', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    debugMsg('registerToDatabase() called.');
    var DApplications = Parse.Object.extend('DApplications');
    debugMsg('Extended Parse table: DApplications');
    var newDirApp = new DApplications();
    debugMsg('Created new director app.');

    newDirApp.set('name', dataPackage.name);
    newDirApp.set('email', dataPackage.email);
    newDirApp.set('phone', dataPackage.phone);
    newDirApp.set('bestContact', dataPackage.bestContact);
    newDirApp.set('occupation', dataPackage.occupation);

    newDirApp.set('posICJ', dataPackage.posICJ);
    newDirApp.set('posGA4', dataPackage.posGA4);
    newDirApp.set('posHRC', dataPackage.posHRC);
    newDirApp.set('posUNEP', dataPackage.posUNEP);
    newDirApp.set('posUNODC', dataPackage.posUNODC);
    newDirApp.set('posECOSOC', dataPackage.posECOSOC);
    newDirApp.set('posSC', dataPackage.posSC);


    newDirApp.set('why', dataPackage.why);
    newDirApp.set('enterPast', dataPackage.enterPast);
    newDirApp.set('enterTopics', dataPackage.enterTopics);
    newDirApp.set('enterCollab', dataPackage.enterCollab);
    newDirApp.set('status', dataPackage.status);

    newDirApp.save().then(function(newDirApp) {
        debugMsg('Form successfully submitted.');
        $('#register-id').text(newDirApp.id);
        $('#submitPending').css('display', 'none');
        $('#submitSuccess').css('display', 'initial');
    }, function() {
        debugMsg('Form failed.');
        $('#submitPending').css('display', 'none');
        $('#submitFail').css('display', 'initial');
    })

}]);


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
        {name: 'Facebook', value: 'fb'}
    ];

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
    };

    $scope.submitForm = function() {
        dataPackage.name = $scope.ngFormName;
        dataPackage.email = $scope.ngFormEmail;
        dataPackage.phone = $scope.ngFormPhone;
        dataPackage.bestContact = $scope.ngFormContact;
        dataPackage.occupation = $scope.ngFormJob;
        dataPackage.posDG = $scope.verifyBoolean($scope.ngPositionDG);
        dataPackage.posADG = $scope.verifyBoolean($scope.ngPositionADG);
        dataPackage.posPR = $scope.verifyBoolean($scope.ngPositionPR);
        dataPackage.posF = $scope.verifyBoolean($scope.ngPositionF);
        dataPackage.posL = $scope.verifyBoolean($scope.ngPositionL);
        dataPackage.experienceStaff = JSON.stringify($scope.staffObject);
        dataPackage.experienceGeneral = JSON.stringify($scope.experienceObject);
        dataPackage.experienceOther = $scope.ngExperienceOther;
        dataPackage.why = $scope.ngEnterWhy;
        dataPackage.hours = $scope.ngHoursWeek;
        dataPackage.available = $scope.verifyBoolean($scope.ngAvailable);
        dataPackage.status = "review";
        /*var socket = io.connect('http://node.wasmun.org');
        socket.on('connect', function() {
            scoket.emit('formData', 'This form does not feel like doing anything!')
        });*/
        $location.path("/submit");
    };

    $scope.verifyBoolean = function(boo) {
        if(!boo)
            return false;
        else
            return true;
    }
}]);

ngApp.controller('CtrlSubmit', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    debugMsg('registerToDatabase() called.');
    var SApplications = Parse.Object.extend('SApplications');
    debugMsg('Extended Parse table: SApplications');
    var newSecApp = new SApplications();
    debugMsg('Created new secretariat app.');

    newSecApp.set('name', dataPackage.name);
    newSecApp.set('email', dataPackage.email);
    newSecApp.set('phone', dataPackage.phone);
    newSecApp.set('bestContact', dataPackage.bestContact);
    newSecApp.set('occupation', dataPackage.occupation);
    newSecApp.set('posDG', dataPackage.posDG);
    newSecApp.set('posADG', dataPackage.posADG);
    newSecApp.set('posPR', dataPackage.posPR);
    newSecApp.set('posF', dataPackage.posF);
    newSecApp.set('posL', dataPackage.posL);
    newSecApp.set('experienceStaff', dataPackage.experienceStaff);
    newSecApp.set('experienceGeneral', dataPackage.experienceGeneral);
    newSecApp.set('experienceOther', dataPackage.experienceOther);
    newSecApp.set('why', dataPackage.why);
    newSecApp.set('hours', dataPackage.hours);
    newSecApp.set('available', dataPackage.available);
    newSecApp.set('status', dataPackage.status);

    newSecApp.save().then(function(newSecApp) {
        debugMsg('Form successfully submitted.');
        $('#register-id').text(newSecApp.id);
        $('#submitPending').css('display', 'none');
        $('#submitSuccess').css('display', 'initial');
    }, function() {
        debugMsg('Form failed.');
        $('#submitPending').css('display', 'none');
        $('#submitFail').css('display', 'initial');
    })

}]);
