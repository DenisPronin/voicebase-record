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
            hours: '00',
            minutes: '00',
            seconds: '00'
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
                var time = toHHMMSS(pos);
                $scope.recordTimer.hours = time.hours;
                $scope.recordTimer.minutes = time.minutes;
                $scope.recordTimer.seconds = time.seconds;
            }, 1000)
        };

        $scope.showPlayTimer = function () {
            $scope.recordTimer.timerId = $interval(function () {
                $record.getCurrentPosition().then(function (pos) {
                    if (pos >= 0) {
                        var time = toHHMMSS(pos);
                        $scope.recordTimer.hours = time.hours;
                        $scope.recordTimer.minutes = time.minutes;
                        $scope.recordTimer.seconds = time.seconds;
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
                hours: '00',
                minutes: '00',
                seconds: '00'
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

        var toHHMMSS = function (pos) {
            var sec_num = parseInt(pos, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0" + hours;}
            if (minutes < 10) {minutes = "0" + minutes;}
            if (seconds < 10) {seconds = "0" + seconds;}
            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        };

    }]);