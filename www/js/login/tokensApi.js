angular.module('voicebaseRecord')
    .service('tokensApi', [
        function () {

            var token;

            var getToken = function () {
                return token;
            };

            var setToken = function (_token) {
                token = _token;
            };

            return {
                getToken: getToken,
                setToken: setToken
            }

        }
    ]);
