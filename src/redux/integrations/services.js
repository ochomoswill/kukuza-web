import globalVariables from '../../utils/Session'

export default class IntegrationService {
    static confirmPayment(paymentType = 'FIRST TIME REGISTRATION', accountNo) {
        const url = `${
            globalVariables.AppEndpoint
            }/confirm-payment/sky-mpesa?type=${paymentType}&account=${accountNo}`;
        const request = {
            method: 'GET',
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

        /*return fetch(url, request)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    return error;
                });*/
    }

    static initiateSTKPush(payment) {
        /* Sample Payment Argument Format */
        /*const paymentObj  = {
                amount: 1,
                phoneNo: 25472372649,
                contributionId: "CON1009",
                transactionDesc: "Contribution"
            };*/

        const url =
            globalVariables.AppEndpoint +
            `/integrations/safaricom/stk-push?amount=${payment.amount}&phoneNumber=${
                payment.phoneNo
                }&accountReference=${payment.contributionId}&transactionDesc=${payment.transactionDesc}`;
        const request = {
            method: 'POST',
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
}
