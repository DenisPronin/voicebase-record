/**
 * Record service
 * @module record
 * @author Claudio A. Marrero
 * @class famvoice
 */
angular.module('voicebaseRecord').factory('$record', [
    function() {

        var mediaRec;
        var recordName = 'myrecording.wav';

        /**
         * Start a record
         *
         * @method startRecord
         */
        function startRecord(){
            console.log('startRecord');
            mediaRec = new Media(recordName,
                function() {
                    console.log("*** new Media() success ***");
                },
                function(err) {
                    console.log("*** new Media() Error: " + err);
                });
            mediaRec.startRecord();
        }

        /**
         * Stop record
         *
         * @method stopRecord
         */
        function stopRecord(){
            console.log('stopRecord');
            mediaRec.stopRecord();
        }

        /**
         * Play record
         *
         * @method playRecord
         */
        function playRecord(){
            console.log('playRecord');
            var mediaFile = new Media(recordName,
                function() {
                    console.log("playAudio():Audio Success");
                },
                function(err) {
                    console.log("playAudio():Audio Error: "+err);
                }
            );
            // Play audio
            mediaFile.play();
        }

        return {
            start: startRecord,
            stop: stopRecord,
            play:playRecord
        };
    }]);