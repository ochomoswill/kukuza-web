import globalVariables from '../../utils/Session'

export default class DocumentService {
    static getAllMyDocuments(pageSize, pageNumber, filterObj) {
        const url = `/me/documents`;
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

    static getMyDocument(document) {
        const url = `/me/documents/${document.id}`;
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

    static createMyDocument(fileObject) {
        const url = `/me/documents`;
        const method = "PUT";
        let config = {data: {}, headers: {}, params: {}};

        let data = new FormData();
        data.append("file", fileObject.file);
        data.append("attachmentTypeId", fileObject.attachmentTypeId);
        data.append("accessLevel", fileObject.accessLevel);

        config.data = data;

        config.header = {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "",
        };

        config.onUploadProgress = function (progressEvent) {
            let percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );

            console.log(percentCompleted);
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

    static updateMyDocument(document) {
        const url = `/me/documents/${document.id}`;
        const method = "PATCH";
        let config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: {
                firstName: document.firstName,
                lastName: document.surname,
                otherNames: document.otherNames,
                emailAddress: document.emailAddress,
                phoneNumber: document.phoneNumber,
                identificationNumber: document.idNumber,
                nextOfDocumentRelationId: document.relation,
                allocation: document.allocation
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

    static deleteMyDocument(document) {
        const url = `/me/documents/${document.id}`;
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


//DocumentService.getAllDocuments(10, 1, {});
//DocumentService.getAllDocuments(10, 1, {});
