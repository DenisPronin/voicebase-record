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
            $scope.clearRecordTimer();
        };

        $scope.playRecord = function () {
            $record.play();
            $scope.showPlayTimer();
        };

        $scope.showRecordTimer = function () {
            var pos = 0;
            $scope.recordTimer.timerId = $interval(function () {
                pos++;
                $scope.recordTimer.seconds = pos;
            }, 1000)
        };

        $scope.showPlayTimer = function () {
            $scope.recordTimer.timerId = $interval(function () {
                $record.getCurrentPosition().then(function (pos) {
                    if (pos >= 0) {
                        $scope.recordTimer.seconds = pos;
                    }
                    else {
                        $scope.clearRecordTimer();
                    }
                }, function (err) {
                    console.log('Error: ' + err);
                });
            }, 1000)

        };

        $scope.clearRecordTimer = function () {
            $interval.cancel($scope.recordTimer.timerId);
            $scope.recordTimer = {
                timerId: null,
                seconds: 0
            };
        };

        $scope.hasRecord = function () {
            return !!$record.getRecord();
        };

        $scope.showPlayBtn = function () {
            return $scope.hasRecord() && !$scope.isRecord;
        };

        $scope.cancel = function () {
            $scope.clearRecordTimer();
        };

    }]);