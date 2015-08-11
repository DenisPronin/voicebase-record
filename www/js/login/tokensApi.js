var tokensApi = function () {

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
};

angular.module('voicebaseRecord')
    .service('tokensApi', tokensApi);
