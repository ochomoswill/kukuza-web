import globalVariables from '../../utils/global'

export default class KinService {
    static getAllMyKins(pageSize, pageNumber, filterObj) {
        const url = `/me/next-of-kin`;
        const method = "GET";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            params: {
                pageSize,
                page: pageNumber
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

    static getKin(kin) {
        const url = `/me/next-of-kin/${kin.id}`;
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


    static createKin(kin) {
        const url = `/me/next-of-kin`;
        const method = "PUT";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: {
                firstName: kin.firstName,
                lastName: kin.surname,
                otherNames: kin.otherNames,
                emailAddress: kin.emailAddress,
                phoneNumber: kin.phoneNumber,
                identificationNumber: kin.idNumber,
                nextOfKinRelationId: kin.relation,
                allocation: kin.allocation
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

    static updateKin(kin) {
        const url = `/me/next-of-kin/${kin.id}`;
        const method = "PATCH";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: {
                firstName: kin.firstName,
                lastName: kin.surname,
                otherNames: kin.otherNames,
                emailAddress: kin.emailAddress,
                phoneNumber: kin.phoneNumber,
                identificationNumber: kin.idNumber,
                nextOfKinRelationId: kin.relation,
                allocation: kin.allocation
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

    static deleteKin(kin) {
        const url = `/me/next-of-kin/${kin.id}`;
        const method = "DELETE";
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
}


//KinService.getAllKins(10, 1, {});
//KinService.getAllKins(10, 1, {});