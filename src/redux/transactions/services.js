import globalVariables from '../../utils/Session'

export default class TransactionsService {
    static getAllTransactions(pageSize, pageNumber, filterObj) {
        let url = globalVariables.AppEndpoint + '/users/transactions';

        if (pageSize !== undefined) {
            url += '?pageSize=' + pageSize;

            if (pageNumber !== undefined) {
                url += '&page=' + pageNumber
            }
        }

        if (filterObj.transactionTypeId !== undefined) {
            url += '&filter=transactionTypeId:eq:' + filterObj.transactionTypeId
        }

        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
            }),
        };

        console.log('URL is ', url);

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

    // Get my transactions
    static getAllMyTransactions(pageSize, pageNumber, filterObj) {
        let url = globalVariables.AppEndpoint + '/me/transactions';

        if (pageSize !== undefined) {
            url += '?pageSize=' + pageSize;

            if (pageNumber !== undefined) {
                url += '&page=' + pageNumber
            }
        }

        if (filterObj.fromDate !== undefined) {
            url += '&filter=transactionStatusDate:gte:' + filterObj.fromDate
        }

        if (filterObj.toDate !== undefined) {
            url += '&filter=transactionStatusDate:lte:' + filterObj.toDate
        }

        const request = {
            headers: new Headers({
                Authorization: globalVariables.getAuthToken(),
            }),
        };

        console.log('URL is ', url);

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

    // Get my wallet by wallet id
    static getMyTransaction(transactionId) {
        const url = globalVariables.AppEndpoint + `/me/transactions/?${transactionId}`;
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
}
