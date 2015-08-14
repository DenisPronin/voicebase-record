/**
 * Record service
 * @module record
 * @author Claudio A. Marrero
 * @class famvoice
 */
angular.module('voicebaseRecord').factory('$record', [
    '$q',
    '$timeout',
    function ($q, $timeout) {

        var mediaRec;
        var playFile;
        var recordName = 'myrecording.wav';

        var startRecord = function () {
            console.log('startRecord');
            mediaRec = new Media(recordName,
                function () {
                    console.log("*** new Media() success ***");
                },
                function (err) {
                    console.log("*** new Media() Error: " + err);
                });
            mediaRec.startRecord();
        };

        var stopRecord = function () {
            console.log('stopRecord');
            mediaRec.stopRecord();
        };

        var playRecord = function () {
            console.log('playRecord');
            playFile = new Media(recordName,
                function () {
                    console.log("playAudio():Audio Success");
                },
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
            );
            playFile.play();
        };

        var getRecord = function () {
            return mediaRec;
        };

        var getCurrentPosition = function () {
            var deferred = $q.defer();
            if (playFile) {
                playFile.getCurrentPosition(function (position) { // in seconds
                    deferred.resolve(position);
                }, function (err) {
                    deferred.reject(err);
                });
            }
            else {
                $timeout(function () {
                    deferred.resolve(0);
                }, 0);
            }
            return deferred.promise;
        };

        return {
            getRecord: getRecord,
            getCurrentPosition: getCurrentPosition,
            start: startRecord,
            stop: stopRecord,
            play: playRecord
        };
    }]);