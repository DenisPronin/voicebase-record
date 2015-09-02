angular.module('voicebaseRecord')
    .service('mediaApi', [
        '$q',
        function ($q) {
            var url = 'https://apis.voicebase.com/v2-beta';

            var postMedia = function (token, file) {
                var deferred = $q.defer();

                var data = new FormData();
                data.append('media', file);

                jQuery.ajax({
                    url: url + '/media',
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    success: function (mediaStatus) {
                        deferred.resolve(mediaStatus);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown + ': Error ' + jqXHR.status);
                        deferred.reject(errorThrown + ': Error ' + jqXHR.status);
                    }
                });

                return deferred.promise;
            };


            return {
                postMedia: postMedia
            };

        }
    ]);
