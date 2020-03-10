import * as types from './actionTypes'
import IntegrationService from './services'
import timeUtils from '../../utils/datetime'

// Confirm Payment
export function confirmPayment(paymentType, accountNo) {
    return dispatch => {
        dispatch({type: types.CONFIRM_PAYMENT_REQUEST});
        IntegrationService.confirmPayment(paymentType, accountNo).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('account')) {
                return dispatch({
                    type: types.CONFIRM_PAYMENT_SUCCESS,
                    paymentStatus: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.CONFIRM_PAYMENT_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetFetchPreRegReference() {
    return dispatch => {
        return dispatch({type: types.RESET_CONFIRM_PAYMENT})
    }
}

// Initiate STK Push
export function initiateSTKPush(payment) {
    return dispatch => {
        dispatch({type: types.INITIATE_STK_PUSH_REQUEST});
        IntegrationService.initiateSTKPush(payment).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('sender')) {
                return dispatch({
                    type: types.INITIATE_STK_PUSH_SUCCESS,
                    initiateSTKPush: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.INITIATE_STK_PUSH_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetInitiateSTKPush() {
    return dispatch => {
        return dispatch({type: types.RESET_INITIATE_STK_PUSH})
    }
}
