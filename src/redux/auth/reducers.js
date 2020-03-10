import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Log In */
    login: [],
    loginTracker: 'idle',
    loginTimestamp: undefined,

    /* Authenticate Users */
    authUser: [],
    authUserTracker: {status: 'idle'},
    authUserTimestamp: undefined,

    /* Reset Password */
    resetPassword: [],
    resetPasswordTracker: 'idle',
    resetPasswordTimestamp: undefined,
});

export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Log In */
        case types.LOGIN_REQUEST:
            return state.merge({
                loginTracker: 'processing',
            });

        case types.LOGIN_SUCCESS:
            return state.merge({
                loginTracker: 'success',
                login: action.login,
                loginTimestamp: action.timestamp,
            });

        case types.LOGIN_FAILURE:
            return state.merge({
                loginTracker: 'error',
            });

        case types.RESET_LOGIN:
            return state.merge({
                loginTracker: 'idle',
            });

        /* Authenticate User */
        case types.AUTHENTICATE_USER_REQUEST:
            return state.merge({
                authUserTracker: {status: 'processing'},
            });

        case types.AUTHENTICATE_USER_SUCCESS:
            return state.merge({
                authUserTracker: {status: 'success'},
                authUser: action.authUser,
                authUserTimestamp: action.timestamp,
            });

        case types.AUTHENTICATE_USER_FAILURE:
            return state.merge({
                authUserTracker: {
                    status: 'error',
                    errors: action.error
                },
            });

        case types.RESET_AUTHENTICATE_USER:
            return state.merge({
                authUserTracker: {status: 'idle'},
            });


        /* Reset Password */
        case types.RESET_PWD_REQUEST:
            return state.merge({
                resetPasswordTracker: {status: 'processing'},
            });

        case types.RESET_PWD_SUCCESS:
            return state.merge({
                resetPasswordTracker: {status: 'success'},
                resetPassword: action.resetPassword,
                resetPasswordTimestamp: action.timestamp,
            });

        case types.RESET_PWD_FAILURE:
            return state.merge({
                resetPasswordTracker: {
                    status: 'error',
                    errors: action.errors
                },
            });

        case types.RESET_RESET_PWD:
            return state.merge({
                resetPasswordTracker: {status: 'idle'},
            });

        default:
            return state
    }
}
