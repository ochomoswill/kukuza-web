import * as types from './actionTypes'
import AuthService from './services'
import timeUtils from 'utils/datetime'

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
