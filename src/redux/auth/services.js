import globalVariables from '../../utils/global'

export default class AuthService {
    static async getAccessToken(userCredentials) {
        const url =
            globalVariables.AppEndpoint +
            '/o/token?username=' +
            userCredentials.username +
            '&password=' +
            btoa(userCredentials.password) +
            '&grant_type=password';
        const request = {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json',
            }),
            json: true,
        };

        console.log('Url ', url);

        let response = await fetch(url, request);

        console.log('Response is here ', response);

        if (response.status === 200) {
            console.log('Response ', response.status);
            return await response.json()
        }

        throw new Error(response.status)

        /*return fetch(url, request)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    return error;
                });*/
    }

    static authenticateUser(userCredentials) {
        let method = 'post';
        let url = '/o/token';
        let config = {data: {}, headers: {}, params: {}};

        config.header = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "",
        };

        config.params = {
            username: userCredentials.username,
            password: btoa(userCredentials.password),
            grant_type: "password"
        };

        return globalVariables.makeRequest(method, url, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error);
                return error
            })
    }


    static verifyPassword(userCredentials) {

        console.log("hERE ARE THE CREDENTIALS SENT ", userCredentials);
        let method = 'get';
        let url = '/o/verify-password';
        let config = {data: {}, headers: {}, params: {}};

        config.header = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "",
        };

        config.params = {
            userId: userCredentials.userId,
            password: btoa(userCredentials.password),
        };

        return globalVariables.makeRequest(method, url, config, true)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error);
                return error
            })
    }

    static resetPassword(userIdentifier) {
        let method = 'POST';
        const url = `/o/reset-password`;

        let config = {data: {}, headers: {}, params: {}};

        config.header = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "",
        };

        config.params = {
            userIdentifier: userIdentifier
        };

        return globalVariables.makeRequest(method, url, config)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error);
                return error
            });
    }

    static refreshAccessToken() {
        const url = globalVariables.AppEndpoint + '/o/refresh';
        const request = {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json',
            }),
            json: true,
        };

        return globalVariables
            .secureFetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                console.log(error);
                return error
            })
    }

    static revokeAccessToken(accessToken) {
        const url = globalVariables.AppEndpoint + '/o/revoke';
        const request = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + accessToken,
            }),
            json: true,
        };

        return globalVariables
            .secureFetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                console.log(error);
                return error
            })
    }
}
