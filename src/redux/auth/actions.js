import * as types from './actionTypes'
import AuthService from './services'
import timeUtils from 'utils/datetime'
import { REVOKE_TOKEN_REQUEST_ERROR } from './actionTypes'
import { RESET_REVOKE_TOKEN_REQUEST } from './actionTypes'
import { REVOKE_TOKEN_REQUEST_SUCCESS } from './actionTypes'
import { REVOKE_TOKEN_REQUESTING } from './actionTypes'
import { LOGOUT_USER } from './actionTypes'
import { SET_ACCESS_TOKEN } from './actionTypes'
import { SET_AUTHENTICATION_STATUS } from './actionTypes'
import { SET_USER } from './actionTypes'
import {action} from '../helpers'

// Log In
export function login(authDetails) {
    return dispatch => {
        dispatch({type: types.LOGIN_REQUEST});
        AuthService.verifyPassword(authDetails).then(response => {
            //console.log(response);

            if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.LOGIN_FAILURE,
                    errors: response.error,
                })
            } else {
                return dispatch({
                    type: types.LOGIN_SUCCESS,
                    login: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }

            /*if (response.hasOwnProperty('accessToken')) {
                return dispatch({
                    type: types.LOGIN_SUCCESS,
                    login: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.LOGIN_FAILURE})
            }*/
        })
    }
}

export function resetLogin() {
    return dispatch => {
        return dispatch({type: types.RESET_LOGIN})
    }
}

// Authenticate User
export function authenticateUser(authDetails) {
    return dispatch => {
        dispatch({type: types.AUTHENTICATE_USER_REQUEST});
        try {
            AuthService.verifyPassword(authDetails).then(response => {
                console.log("@authenticateUser response", response);
                if (response === true) {
                    return dispatch({
                        type: types.AUTHENTICATE_USER_SUCCESS,
                        authUser: response
                    })
                } else {
                    return dispatch({
                        type: types.AUTHENTICATE_USER_FAILURE,
                        errors: "Invalid Password!"
                    })
                }
            })
        } catch (e) {
            return dispatch({
                type: types.AUTHENTICATE_USER_FAILURE,
                errors: e
            })
        }
    }
}

export function resetAuthenticateUser() {
    return dispatch => {
        return dispatch({type: types.RESET_AUTHENTICATE_USER})
    }
}


export const resetPassword = userIdentifier => {
    return dispatch => {
        dispatch({type: types.RESET_PWD_REQUEST});

        try {
            AuthService.resetPassword(userIdentifier).then(response => {
                console.log("@resetPwd response", response);
                if (response.hasOwnProperty("status")) {
                    if (response.status === 200) {
                        if (response.data.hasOwnProperty("username")) {
                            return dispatch({
                                type: types.RESET_PWD_SUCCESS,
                                resetPassword: response.data
                            })
                        }
                    } else {
                        return dispatch({
                            type: types.RESET_PWD_FAILURE,
                            errors: response.data.message
                        })
                    }
                }
            })
        } catch (e) {
            return dispatch({
                type: types.RESET_PWD_FAILURE,
                errors: e
            })
        }

    }
};

export function resetResetPassword() {
    return dispatch => {
        dispatch({type: types.RESET_RESET_PWD});
    }
}





///

// NEW FUNCTIONS
/* Set Logged In User Details */
export const setUser = (user) => action(SET_USER, user);

/* Set User's Authentication Status */
export const setAuthenticationStatus = (isAuthenticated) => action(SET_AUTHENTICATION_STATUS, isAuthenticated);

/* Set User's Access Token */
export const setAccessToken = (accessToken) => action(SET_ACCESS_TOKEN, accessToken);

/* Logout User */
export const logoutUser = () => action(LOGOUT_USER);


/* Revoke access token */
export const revokeTokenRequest = () => action(REVOKE_TOKEN_REQUESTING);

export const revokeTokenRequestSuccess = (revokeToken) => action(REVOKE_TOKEN_REQUEST_SUCCESS, revokeToken);

export const revokeTokenRequestError = (error) => action(REVOKE_TOKEN_REQUEST_ERROR, error);

export const resetRevokeTokenRequest = () => action(RESET_REVOKE_TOKEN_REQUEST);



