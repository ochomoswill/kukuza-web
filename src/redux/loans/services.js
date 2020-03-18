import globalVariables from '../../utils/Session'
import timeUtils from '../../utils/datetime'

export default class LoansService {
    static createLoan(loanDetails) {
        /*const url = globalVariables.AppEndpoint + '/me/loans'
        const request = {
            method: 'PUT',
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                loanTypeId: loanDetails.loanTypeId,
                loanFundDueDate: timeUtils.formatDate(loanDetails.loanFundDueDate),
                loanAmountRequested: loanDetails.loanAmountRequested,
                loanInterestRate: loanDetails.loanInterestRate,
                guarantors: loanDetails.guarantors,
            }),
        }*/


        let method = 'put';
        let url = '/me/loans';
        let config = {data: {}, headers: {}, params: {}};

        config.header = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        config.data = {
            loanTypeId: loanDetails.loanTypeId,
            loanFundDueDate: timeUtils.formatDate(loanDetails.loanFundDueDate),
            loanAmountRequested: loanDetails.loanAmountRequested,
            loanInterestRate: loanDetails.loanInterestRate,
            guarantors: loanDetails.guarantors,
        };

        return globalVariables.makeRequest(method, url, config, true)
            .then(function (response) {
                // return the success response or business logic failure
                return response
            }).catch(function (error) {
                return error
                //return {exception: "The request was made but no response was received or it triggered an error"}
            });

        /*return globalVariables
            .secureFetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                console.log(error)
                return error
            })*/
    }

    // Get my loans
    static getAllMyLoans() {
        let url = globalVariables.AppEndpoint + '/me/loans';

        /*if(pageSize !== undefined){
                url += "?pageSize="+ pageSize;

                if(pageNumber !== undefined){
                    url += "&page="+pageNumber
                }
            }*/

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

        /*return fetch(url, request)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    return error;
                });*/
    }

    // Get my loan by loan id
    static getMyLoan(loanId) {
        const url = globalVariables.AppEndpoint + `/me/loans/?${loanId}`;
        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
            }),
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

    static getAllLoanTypes() {
        let url = globalVariables.AppEndpoint + '/loan-types/';

        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
            }),
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

    static getAllLoanStatus() {
        let url = globalVariables.AppEndpoint + '/loan-status/';

        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
            }),
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

    // Get my guarantors
    static getAllMyGuarantors(filterObj) {
        let url = globalVariables.AppEndpoint + `/me/loans/${filterObj.loanId}/guarantors/`;

        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
            }),
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

    // Get my guarantors requests
    static getAllMyGuarantorsRequests() {
        let url = globalVariables.AppEndpoint + `/me/loans/guarantorship-requests`;

        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
            }),
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

    // Update guarantors requests
    static updateGuarantorsRequests(filterObj) {
        let url =
            globalVariables.AppEndpoint +
            `/me/loans/update-guarantorship/${filterObj.guarantorshipRequestId}`;

        console.log(url);
        const request = {
            method: 'POST',
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                loanId: filterObj.loanId,
                amountGuaranteed: filterObj.amountGuaranteed,
                confirmed: filterObj.confirmed,
                status: filterObj.status,
                metaData: filterObj.comment,
            }),
        };

        //console.log(request);

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
}
