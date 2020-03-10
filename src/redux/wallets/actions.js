import * as types from './actionTypes'
import WalletsService from './services'
import timeUtils from '../../utils/datetime'

// Get all my wallets
export function fetchAllMyWallets() {
    return dispatch => {
        dispatch({type: types.GET_ALL_MY_WALLETS_REQUEST});
        WalletsService.getAllMyWallets().then(response => {
            console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_ALL_MY_WALLETS_SUCCESS,
                    myWallets: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_ALL_MY_WALLETS_FAILURE})
            }
        })
    }
}

export function resetFetchAllMyWallets() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_MY_WALLETS})
    }
}

// Get my wallet
export function fetchMyWallet(walletId) {
    return dispatch => {
        dispatch({type: types.GET_MY_WALLET_REQUEST});
        WalletsService.getMyWallet(walletId).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('walletName')) {
                return dispatch({
                    type: types.GET_MY_WALLET_SUCCESS,
                    myWallet: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_MY_WALLET_FAILURE})
            }
        })
    }
}

export function resetFetchMyWallet() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_MY_WALLET})
    }
}
