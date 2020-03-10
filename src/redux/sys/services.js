import globalVariables from '../../utils/global'

export default class SysService {
    static getPreRegistrationRef() {
        const url = globalVariables.AppEndpoint + '/pre-registration-ref/';
        const request = {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
            }),
            json: true,
        };

        /*return fetch(url, request)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    return error;
                });*/

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

    static createSysVar(sysVar) {
        let url = globalVariables.AppEndpoint + '/sys-variables/';

        console.log(url);

        const request = {
            method: 'PUT',
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                key: sysVar.key,
                value: JSON.stringify(sysVar.value),
            }),
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

    static updateSysVar(sysVar) {
        let url = globalVariables.AppEndpoint + `/sys-variables/${sysVar.id}`;

        console.log(url);

        const request = {
            method: 'PATCH',
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                value: JSON.stringify(sysVar.value),
            }),
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

    static getAllSysVar(sysVar) {
        let url = globalVariables.AppEndpoint + `/sys-variables/`;

        console.log(url);

        const request = {
            method: 'GET',
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
                'Content-Type': 'application/json',
            }),
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
