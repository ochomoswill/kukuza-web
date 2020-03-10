import globalVariables from '../../utils/global'
import timeUtils from '../../utils/datetime'

export default class UsersService {
    static getAllUsers(pageSize, pageNumber, filterObj) {
        const url = globalVariables.AppEndpoint + `/users/?pageSize=${pageSize}&page=${pageNumber}`;
        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
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

    static getUser(user) {
        const url = globalVariables.AppEndpoint + `/user/?${user.id}`;
        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
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

    /*
      *
      * 001 - STANDARD USER [SHARE CAPITAL - 2500]
      * 100 - BUSINESS ADMIN [SHARE CAPITAL - 20000]
      *
      * */

    static createUser(user) {
        const url = globalVariables.AppEndpoint + '/users/?branchCode=K001&accountType=001';
        const request = {
            method: 'PUT',
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                otherNames: user.middleName,
                username: user.username,
                emailAddress: user.email,
                phoneNumber: user.phone,
                userPassword: user.password,
                identificationNumber: user.idNumber,
                dateOfBirth: timeUtils.formatDate(user.dateOfBirth),
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

    static updateUser(user) {
        const url = globalVariables.AppEndpoint + `/user/?${user.id}`;
        const request = {
            method: 'PATCH',
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName ? user.lastName : '',
                otherNames: user.otherNames ? user.otherNames : '',
                username: user.username,
                emailAddress: user.emailAddress,
                phoneNumber: user.phoneNumber,
                userPassword: user.userPassword,
                identificationNumber: user.identificationNumber,
                dateOfBirth: timeUtils.formatDate(user.dateOfBirth),
            }),
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

    static deleteUser(user) {
        const url = globalVariables.AppEndpoint + `/user/?${user.id}`;
        const request = {
            method: 'DELETE',
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


    /* ME */

    // Get me
    static getMe() {
        const url = globalVariables.AppEndpoint + `/me/`;
        const method = "GET";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
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


    // Update me
    static updateMe(me) {
        const url = `/me/`;
        const method = "PATCH";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: me
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
}
