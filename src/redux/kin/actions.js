import * as types from "./actionTypes";
import KinsService from "./services";
import timeUtils from "../../utils/datetime";

// Get all kins
export function fetchAllMyKins(pageSize, pageNumber, filterObj) {
    return dispatch => {
        dispatch({type: types.GET_ALL_MY_KINS_REQUEST});
        KinsService.getAllMyKins(pageSize, pageNumber, filterObj).then(response => {
            //console.log(response);
            if (response.hasOwnProperty("domain")) {
                console.log("Fetch was successful");
                return dispatch({
                    type: types.GET_ALL_MY_KINS_SUCCESS,
                    kins: response,
                    timestamp: timeUtils.CurrentUSDateTime()
                });
            } else {
                return dispatch({
                    type: types.GET_ALL_MY_KINS_FAILURE,
                    errors: response.error,
                    timestamp: timeUtils.CurrentUSDateTime()
                });
            }
        });
    };
}

export function resetFetchAllMyKins() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_MY_KINS});
    };
}

// Get a kin
export function fetchKin(kin) {
    return dispatch => {
        dispatch({type: types.GET_KIN_REQUEST});
        KinsService.getKin(kin).then(response => {
            //console.log(response);
            if (response.hasOwnProperty("firstName")) {
                return dispatch({
                    type: types.GET_KIN_SUCCESS,
                    kin: response,
                    timestamp: timeUtils.CurrentUSDateTime()
                });
            } else {
                return dispatch({type: types.GET_KIN_FAILURE});
            }
        });
    };
}

export function resetFetchKin() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_KIN});
    };
}

// Create a kin
export function createKin(kin) {
    return dispatch => {
        dispatch({type: types.CREATE_KIN_REQUEST});
        KinsService.createKin(kin).then(response => {
            //console.log(response);
            if (response.hasOwnProperty("nextOfKinRelationId")) {
                return dispatch({
                    type: types.CREATE_KIN_SUCCESS,
                    newKin: response,
                    timestamp: timeUtils.CurrentUSDateTime()
                });
            } else if (response.hasOwnProperty("error")) {
                return dispatch({
                    type: types.CREATE_KIN_FAILURE,
                    errors: response.error
                });
            }
        });
    };
}

export function resetCreateKin() {
    return dispatch => {
        return dispatch({type: types.RESET_CREATE_KIN});
    };
}

// Update a kin
export function updateKin(kin) {
    return dispatch => {
        dispatch({type: types.UPDATE_KIN_REQUEST});
        KinsService.updateKin(kin).then(response => {
            //console.log(response);

            if (response.hasOwnProperty("error")) {
                return dispatch({
                    type: types.UPDATE_KIN_FAILURE,
                    errors: response.error
                });
            } else if (response) {
                return dispatch({
                    type: types.UPDATE_KIN_SUCCESS,
                    updatedKin: response,
                    timestamp: timeUtils.CurrentUSDateTime()
                });
            }
        });
    };
}

export function resetUpdateKin() {
    return dispatch => {
        return dispatch({type: types.RESET_UPDATE_KIN});
    };
}

// Delete a kin
export function deleteKin(kin) {
    return dispatch => {
        dispatch({type: types.DELETE_KIN_REQUEST});
        KinsService.deleteKin(kin).then(response => {
            //console.log(response);
            if (response.hasOwnProperty("error")) {
                return dispatch({
                    type: types.DELETE_KIN_FAILURE,
                    errors: response.error
                });
            } else if (response) {
                return dispatch({
                    type: types.DELETE_KIN_SUCCESS,
                    deletedKin: response,
                    timestamp: timeUtils.CurrentUSDateTime()
                });
            }
            /*if (response.hasOwnProperty('id')) {
                      return dispatch({
                          type: types.DELETE_KIN_SUCCESS,
                          deletedKin: response,
                          timestamp: timeUtils.CurrentUSDateTime(),
                      })
                  } else if (response.hasOwnProperty('error')) {
                      return dispatch({
                          type: types.DELETE_KIN_FAILURE,
                          errors: response.error,
                      })
                  }*/
        });
    };
}

export function resetDeleteKin() {
    return dispatch => {
        return dispatch({type: types.RESET_DELETE_KIN});
    };
}
