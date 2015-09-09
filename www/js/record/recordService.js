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

        var clearRecord = function () {
            if(playFile) {
                playFile.stop();
                playFile = null;
            }
            if(mediaRec) {
                mediaRec.stopRecord();
                mediaRec = null;
            }
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

        var getMediaFile = function () {
            var deferred = $q.defer();

            function failGettingMedia(err){
                console.log(err);
                deferred.reject(err);
            }

            // setting the file system to persistent
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                // geting the file for disk
                fileSystem.root.getFile(recordName, null, function (fileEntry) {

                    deferred.resolve(fileEntry);

                }, failGettingMedia);
            }, failGettingMedia);

            return deferred.promise;
        };


        return {
            clearRecord: clearRecord,
            getRecord: getRecord,
            getCurrentPosition: getCurrentPosition,
            start: startRecord,
            stop: stopRecord,
            play: playRecord,
            getMediaFile: getMediaFile
        };
    }]);