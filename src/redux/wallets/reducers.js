import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Get all my wallets */
    myWallets: [],
    myWalletsTracker: 'idle',
    myWalletsTimestamp: undefined,

    /* Get my wallet */
    myWallet: [],
    myWalletTracker: 'idle',
    myWalletTimestamp: undefined,
});

export default function walletsReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get all my wallets */
        case types.GET_ALL_MY_WALLETS_REQUEST:
            return state.merge({
                myWalletsTracker: 'processing',
            });

        case types.GET_ALL_MY_WALLETS_SUCCESS:
            return state.merge({
                myWalletsTracker: 'success',
                myWallets: action.myWallets,
                myWalletsTimestamp: action.timestamp,
            });

        case types.GET_ALL_MY_WALLETS_FAILURE:
            return state.merge({
                myWalletsTracker: 'error',
            });

        case types.RESET_GET_ALL_MY_WALLETS:
            return state.merge({
                myWalletsTracker: 'idle',
            });

        /* Get my wallet */
        case types.GET_MY_WALLET_REQUEST:
            return state.merge({
                myWalletTracker: 'processing',
            });

        case types.GET_MY_WALLET_SUCCESS:
            return state.merge({
                myWalletTracker: 'success',
                myWallet: action.myWallet,
                myWalletTimestamp: action.timestamp,
            });

        case types.GET_MY_WALLET_FAILURE:
            return state.merge({
                myWalletTracker: 'error',
            });

        case types.RESET_GET_MY_WALLET:
            return state.merge({
                myWalletTracker: 'idle',
            });

        default:
            return state
    }
}
