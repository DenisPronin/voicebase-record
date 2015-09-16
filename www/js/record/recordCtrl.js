angular.module('voicebaseRecord').controller('recordCtrl', [
    '$scope',
    '$state',
    '$interval',
    '$record',
    'tokensApi',
    function ($scope, $state, $interval, $record, tokensApi) {

        $scope.isRecord = false;
        $scope.recordTimer = {
            timerId: null,
            seconds: 0
        };

        $scope.playTimer = {
            timerId: null,
            seconds: 0
        };

        $scope.toggleRecord = function () {
            $scope.isRecord = !$scope.isRecord;

            if($scope.isRecord) {
                $scope.startRecord();
            }
            else {
                $scope.stopRecord();
            }
        };

        $scope.startRecord = function () {
            $record.start();
            $scope.showRecordTimer();
        };

        $scope.stopRecord = function () {
            $record.stop();
            $scope.clearTimer('recordTimer');
        };

        $scope.startPlaying = false;
        $scope.playRecord = function () {
            $scope.startPlaying = true;
            $record.play();
            $scope.showPlayTimer();
        };

        $scope.pauseRecord = function () {
            $scope.startPlaying = false;
            $record.pause();
        };

        $scope.showRecordTimer = function () {
            var pos = 0;
            $scope.clearTimer('playTimer');
            $scope.clearTimer('recordTimer');
            $scope.recordTimer.timerId = $interval(function () {
                pos++;
                $scope.recordTimer.seconds = pos;
            }, 1000)
        };

        $scope.showPlayTimer = function () {
            $scope.playTimer.timerId = $interval(function () {
                $record.getCurrentPosition().then(function (pos) {
                    if (pos >= 0) {
                        $scope.playTimer.seconds = pos;
                    }
                    else {
                        $scope.clearTimer('playTimer');
                    }
                }, function (err) {
                    console.log('Error: ' + err);
                });
            }, 1000)

        };

        $scope.clearTimer = function (timerName) {
            $scope.startPlaying = false;
            $interval.cancel($scope[timerName].timerId);
            $scope[timerName] = {
                timerId: null,
                seconds: 0
            };
        };

        $scope.hasRecord = function () {
            return !!$record.getRecord();
        };

        $scope.isRecordReady = function () {
            return $scope.hasRecord() && !$scope.isRecord;
        };

        $scope.uploadRecord = function () {
            $state.go("upload");
        };

        $scope.cancel = function () {
            $scope.isRecord = false;
            $record.clearRecord();
            $scope.clearTimer('playTimer');
            $scope.clearTimer('recordTimer');
        };

    }]);