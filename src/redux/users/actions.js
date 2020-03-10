import * as types from './actionTypes'
import UsersService from './services'
import timeUtils from '../../utils/datetime'

// Get all users
export function fetchAllUsers(pageSize, pageNumber, filterObj) {
    return dispatch => {
        dispatch({type: types.GET_ALL_USERS_REQUEST});
        UsersService.getAllUsers(pageSize, pageNumber, filterObj).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_ALL_USERS_SUCCESS,
                    users: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_ALL_USERS_FAILURE})
            }
        })
    }
}

export function resetFetchAllUsers() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_USERS})
    }
}

// Get a user
export function fetchUser(user) {
    return dispatch => {
        dispatch({type: types.GET_USER_REQUEST});
        UsersService.getUser(user).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('firstName')) {
                return dispatch({
                    type: types.GET_USER_SUCCESS,
                    user: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_USER_FAILURE})
            }
        })
    }
}

export function resetFetchUser() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_USER})
    }
}

// Create a user
export function createUser(user) {
    return dispatch => {
        dispatch({type: types.CREATE_USER_REQUEST});
        UsersService.createUser(user).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('username')) {
                return dispatch({
                    type: types.CREATE_USER_SUCCESS,
                    newUser: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.CREATE_USER_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetCreateUser() {
    return dispatch => {
        return dispatch({type: types.RESET_CREATE_USER})
    }
}

// Update a user
export function updateUser(user) {
    return dispatch => {
        dispatch({type: types.UPDATE_USER_REQUEST});
        UsersService.updateUser(user).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('id')) {
                return dispatch({
                    type: types.UPDATE_USER_SUCCESS,
                    updatedUser: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.UPDATE_USER_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetUpdateUser() {
    return dispatch => {
        return dispatch({type: types.RESET_UPDATE_USER})
    }
}

// Delete a user
export function deleteUser(user) {
    return dispatch => {
        dispatch({type: types.DELETE_USER_REQUEST});
        UsersService.updateUser(user).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('id')) {
                return dispatch({
                    type: types.DELETE_USER_SUCCESS,
                    deletedUser: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.DELETE_USER_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetDeleteUser() {
    return dispatch => {
        return dispatch({type: types.RESET_DELETE_USER})
    }
}


/* ME ACTIONS */

// Get Me
export function fetchMe() {
    return dispatch => {
        dispatch({type: types.GET_ME_REQUEST});
        UsersService.getMe().then(response => {
            //console.log(response);
            if (response.hasOwnProperty('firstName')) {
                return dispatch({
                    type: types.GET_ME_SUCCESS,
                    me: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.GET_ME_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetFetchMe() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ME})
    }
}


// Update Me
export function updateMe(me) {
    return dispatch => {
        dispatch({type: types.UPDATE_ME_REQUEST});
        UsersService.updateMe(me).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.UPDATE_ME_FAILURE,
                    errors: response.error,
                })
            } else if (response) {
                return dispatch({
                    type: types.UPDATE_ME_SUCCESS,
                    updatedMe: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }
        })
    }
}

export function resetUpdateMe() {
    return dispatch => {
        return dispatch({type: types.RESET_UPDATE_ME})
    }
}



