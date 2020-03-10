import globalVariables from '../../utils/global'

export default class WalletsService {
    // Get my wallet
    static getAllMyWallets() {
        //const url = globalVariables.AppEndpoint + `/me/wallets/?pageSize=${pageSize}&page=${pageNumber}`;
        const url = globalVariables.AppEndpoint + `/me/wallets`;
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
                    console.log("Here is the error ",error);
                    return error;
                });*/
    }

    // Get my wallet by wallet id
    static getMyWallet(walletId) {
        const url = globalVariables.AppEndpoint + `/me/wallets/?${walletId}`;
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
}
