import * as types from './actionTypes'
import TransactionsService from './services'
import timeUtils from '../../utils/datetime'

// Get all transactions
export function fetchAllTransactions(pageSize, pageNumber, filterObj) {
    return dispatch => {
        dispatch({type: types.GET_ALL_TRANSACTIONS_REQUEST});
        TransactionsService.getAllTransactions(pageSize, pageNumber, filterObj).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_ALL_TRANSACTIONS_SUCCESS,
                    allTransactions: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_ALL_TRANSACTIONS_FAILURE})
            }
        })
    }
}

export function resetFetchAllTransactions() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_TRANSACTIONS})
    }
}

// Get all my transactions
export function fetchAllMyTransactions(pageSize, pageNumber, filterObj) {
    return dispatch => {
        dispatch({type: types.GET_ALL_MY_TRANSACTIONS_REQUEST});
        TransactionsService.getAllMyTransactions(pageSize, pageNumber, filterObj).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_ALL_MY_TRANSACTIONS_SUCCESS,
                    myTransactions: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_ALL_MY_TRANSACTIONS_FAILURE})
            }
        })
    }
}

export function resetFetchAllMyTransactions() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_MY_TRANSACTIONS})
    }
}

// Get my wallet
export function fetchMyTransaction(transactionId) {
    return dispatch => {
        dispatch({type: types.GET_MY_TRANSACTION_REQUEST});
        TransactionsService.getMyTransaction(transactionId).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('walletName')) {
                return dispatch({
                    type: types.GET_MY_TRANSACTION_SUCCESS,
                    myTransaction: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_MY_TRANSACTION_FAILURE})
            }
        })
    }
}

export function resetFetchMyTransaction() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_MY_TRANSACTION})
    }
}
