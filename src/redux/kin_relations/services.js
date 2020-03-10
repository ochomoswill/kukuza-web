import globalVariables from '../../utils/global'

export default class KinRelationsService {
    static getAllKinRelations(pageSize, pageNumber, filterObj) {
        const url = `/kin-relations/`;
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

    static getKinRelation(kinRelation) {
        const url = `/kin-relations/${kinRelation.id}`;
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


    static createKinRelation(kinRelation) {
        const url = `/kin-relations/`;
        const method = "PUT";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: {
                nokRelationName: kinRelation.nokRelationName,
                description: kinRelation.description
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

    /*static updateKinRelation(kin) {
        const url = `/me/next-of-kin/${kin.id}`;
        const method = "PATCH";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: {
                firstName: kin.firstName,
                lastName: kin.lastName,
                otherNames: kin.otherNames,
                emailAddress: kin.emailAddress,
                phoneNumber: kin.phoneNumber,
                identificationNumber: kin.idNumer,
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
    }*/

    static deleteKinRelation(kinRelation) {
        const url = `/kin-relations/${kinRelation.id}`;
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