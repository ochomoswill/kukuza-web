import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Get all transactions */
    allTransactions: [],
    allTransactionsTracker: 'idle',
    allTransactionsTimestamp: undefined,

    /* Get all my transactions */
    myTransactions: [],
    myTransactionsTracker: 'idle',
    myTransactionsTimestamp: undefined,

    /* Get my transaction */
    myTransaction: [],
    myTransactionTracker: 'idle',
    myTransactionTimestamp: undefined,
});

export default function transactionsReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get all transactions */
        case types.GET_ALL_TRANSACTIONS_REQUEST:
            return state.merge({
                allTransactionsTracker: 'processing',
            });

        case types.GET_ALL_TRANSACTIONS_SUCCESS:
            return state.merge({
                allTransactionsTracker: 'success',
                allTransactions: action.allTransactions,
                allTransactionsTimestamp: action.timestamp,
            });

        case types.GET_ALL_TRANSACTIONS_FAILURE:
            return state.merge({
                allTransactionsTracker: 'error',
            });

        case types.RESET_GET_ALL_TRANSACTIONS:
            return state.merge({
                allTransactionsTracker: 'idle',
            });

        /* Get all my transactions */
        case types.GET_ALL_MY_TRANSACTIONS_REQUEST:
            return state.merge({
                myTransactionsTracker: 'processing',
            });

        case types.GET_ALL_MY_TRANSACTIONS_SUCCESS:
            return state.merge({
                myTransactionsTracker: 'success',
                myTransactions: action.myTransactions,
                myTransactionsTimestamp: action.timestamp,
            });

        case types.GET_ALL_MY_TRANSACTIONS_FAILURE:
            return state.merge({
                myTransactionsTracker: 'error',
            });

        case types.RESET_GET_ALL_MY_TRANSACTIONS:
            return state.merge({
                myTransactionsTracker: 'idle',
            });

        /* Get my transaction */
        case types.GET_MY_TRANSACTION_REQUEST:
            return state.merge({
                myTransactionTracker: 'processing',
            });

        case types.GET_MY_TRANSACTION_SUCCESS:
            return state.merge({
                myTransactionTracker: 'success',
                myTransaction: action.myTransaction,
                myTransactionTimestamp: action.timestamp,
            });

        case types.GET_MY_TRANSACTION_FAILURE:
            return state.merge({
                myTransactionTracker: 'error',
            });

        case types.RESET_GET_MY_TRANSACTION:
            return state.merge({
                myTransactionTracker: 'idle',
            });

        default:
            return state
    }
}
