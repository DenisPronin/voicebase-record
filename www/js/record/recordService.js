/**
 * Record service
 * @module record
 * @author Claudio A. Marrero
 * @class famvoice
 */
angular.module('voicebaseRecord').factory('$record', [
    function () {

        var mediaRec;
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
            var mediaFile = new Media(recordName,
                function () {
                    console.log("playAudio():Audio Success");
                },
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
            );
            // Play audio
            mediaFile.play();
        };

        var getRecord = function () {
            return mediaRec;
        };

        var getCurrentPosition = function () {
            if(mediaRec) {
                mediaRec.getCurrentPosition(function () {

                }, function (err) {

                });
            }
            return (mediaRec) ? mediaRec.getCurrentPosition() : 0;
        };

        return {
            getRecord: getRecord,
            getCurrentPosition: getCurrentPosition,
            start: startRecord,
            stop: stopRecord,
            play: playRecord
        };
    }]);