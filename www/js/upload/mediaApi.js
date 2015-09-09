angular.module('voicebaseRecord')
    .service('mediaApi', [
        '$q',
        function ($q) {
            var url = 'https://apis.voicebase.com/v2-beta';

            var postMedia = function (token, fileEntry) {
                var deferred = $q.defer();

                var fileUri = fileEntry.toURL();

                var options = new FileUploadOptions();
                options.fileKey = "media";
                options.fileName = fileUri.substr(fileUri.lastIndexOf('/')+1);
                options.mimeType = "audio/wav";
                options.chunkedMode = false;
                options.headers = {
                    'Authorization': 'Bearer ' + token
                };

                var ft = new FileTransfer();
                ft.upload(fileUri, encodeURI(url + '/media'), function (data) {
                    console.log('POST media success', data);
                    deferred.resolve(JSON.parse(data.response));
                }, function (err) {
                    console.log('Error of POST media: ', err);
                    deferred.reject(err);
                }, options, true);

                return deferred.promise;
            };

            var checkMediaFinish = function (token, mediaId) {
                var deferred = $q.defer();

                jQuery.ajax({
                    type: 'GET',
                    url: url + '/media/' + mediaId,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    success: function (data) {
                        deferred.resolve(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown + ': Error ' + jqXHR.status);
                        deferred.reject('Something goes wrong!');
                    }
                });

                return deferred.promise;
            };


            return {
                postMedia: postMedia,
                checkMediaFinish: checkMediaFinish
            };

        }
    ]);
