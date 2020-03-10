import * as types from './actionTypes'
import KinRelationsService from './services'
import timeUtils from '../../utils/datetime'

// Get all kinRelations
export function fetchAllKinRelations(pageSize, pageNumber, filterObj) {
    return dispatch => {
        dispatch({type: types.GET_ALL_KIN_RELATIONS_REQUEST});
        KinRelationsService.getAllKinRelations(pageSize, pageNumber, filterObj).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_ALL_KIN_RELATIONS_SUCCESS,
                    kinRelations: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({
                    type: types.GET_ALL_KIN_RELATIONS_FAILURE,
                    errors: response.error,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }
        })
    }
}

export function resetFetchAllMyKinRelations() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_KIN_RELATIONS})
    }
}

// Get a kinRelation
export function fetchKinRelation(kinRelation) {
    return dispatch => {
        dispatch({type: types.GET_KIN_RELATION_REQUEST});
        KinRelationsService.getKinRelation(kinRelation).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('firstName')) {
                return dispatch({
                    type: types.GET_KIN_RELATION_SUCCESS,
                    kinRelation: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_KIN_RELATION_FAILURE})
            }
        })
    }
}

export function resetFetchKinRelation() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_KIN_RELATION})
    }
}

// Create a kinRelation
export function createKinRelation(kinRelation) {
    return dispatch => {
        dispatch({type: types.CREATE_KIN_RELATION_REQUEST});
        KinRelationsService.createKinRelation(kinRelation).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('kinRelationname')) {
                return dispatch({
                    type: types.CREATE_KIN_RELATION_SUCCESS,
                    newKinRelation: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.CREATE_KIN_RELATION_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetCreateKinRelation() {
    return dispatch => {
        return dispatch({type: types.RESET_CREATE_KIN_RELATION})
    }
}

// Update a kinRelation
export function updateKinRelation(kinRelation) {
    return dispatch => {
        dispatch({type: types.UPDATE_KIN_RELATION_REQUEST});
        KinRelationsService.updateKinRelation(kinRelation).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('id')) {
                return dispatch({
                    type: types.UPDATE_KIN_RELATION_SUCCESS,
                    updatedKinRelation: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.UPDATE_KIN_RELATION_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetUpdateKinRelation() {
    return dispatch => {
        return dispatch({type: types.RESET_UPDATE_KIN_RELATION})
    }
}

// Delete a kinRelation
export function deleteKinRelation(kinRelation) {
    return dispatch => {
        dispatch({type: types.DELETE_KIN_RELATION_REQUEST});
        KinRelationsService.deleteKinRelation(kinRelation).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('id')) {
                return dispatch({
                    type: types.DELETE_KIN_RELATION_SUCCESS,
                    deletedKinRelation: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.DELETE_KIN_RELATION_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetDeleteKinRelation() {
    return dispatch => {
        return dispatch({type: types.RESET_DELETE_KIN_RELATION})
    }
}
