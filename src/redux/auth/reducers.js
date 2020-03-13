import * as types from './actionTypes'
import Immutable from 'seamless-immutable'
import { SET_USER } from './actionTypes'
import { SET_AUTHENTICATION_STATUS } from './actionTypes'
import { SET_ACCESS_TOKEN } from './actionTypes'
import { LOGOUT_USER } from './actionTypes'
import { REVOKE_TOKEN_REQUESTING } from './actionTypes'
import { REVOKE_TOKEN_REQUEST_SUCCESS } from './actionTypes'
import { REVOKE_TOKEN_REQUEST_ERROR } from './actionTypes'
import { RESET_REVOKE_TOKEN_REQUEST } from './actionTypes'
import { clearLocalStorageOnLogout, getAuthToken, getUserDetails } from '../../utils/global'




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
	
	
	///
	// NEW INITIAL STATE
	isAuthenticated: !!getAuthToken(),
	user: getUserDetails() ? getUserDetails() : undefined,
	accessToken: getAuthToken() ? getAuthToken() : undefined,
	/* Revoke access token */
	revokeToken: [],
	revokeTokenTracker: {status: 'idle'},
	revokeTokenTimestamp: undefined,
	
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
            
            
            
        ///
				// NEW REDUCERS
			/* Set Logged In User Details */
			case SET_USER:
				return {...state, user: action.payload};

			/* Set User's Authentication Status */
			case SET_AUTHENTICATION_STATUS:
				return {...state, isAuthenticated: action.payload};

			/* Set User's Access Token */
			case SET_ACCESS_TOKEN:
				return {...state, accessToken: action.payload};

			/* Logout User */
			case LOGOUT_USER:
				clearLocalStorageOnLogout();
				return {
					...state,
					isAuthenticated: false,
					user: undefined,
					accessToken: undefined,
				};


			/* Revoke access token */
			case REVOKE_TOKEN_REQUESTING:
				return {
					...state,
					revokeTokenTracker: {status: 'processing'},
				};

			case REVOKE_TOKEN_REQUEST_SUCCESS:
				return {
					...state,
					revokeTokenTracker: {status: 'success'},
					revokeToken: action.payload,
					revokeTokenTimestamp: action.payload,
				};

			case REVOKE_TOKEN_REQUEST_ERROR:
				return {
					...state,
					revokeTokenTracker: {
						status: 'error',
						errors: action.payload,
					},
					revokeTokenTimestamp: action.payload,
				};

			case RESET_REVOKE_TOKEN_REQUEST:
				return {
					...state,
					revokeTokenTracker: {status: 'idle'},
				};

        default:
            return state
    }
}
