import * as types from './actionTypes'
import SysService from './services'
import timeUtils from '../../utils/datetime'

// Get Pre - Registration Reference
export function fetchPreRegReference() {
    return dispatch => {
        dispatch({type: types.GET_PRE_REG_REF_REQUEST});
        SysService.getPreRegistrationRef().then(response => {
            //console.log(response);
            if (response.hasOwnProperty('ref')) {
                return dispatch({
                    type: types.GET_PRE_REG_REF_SUCCESS,
                    preRegRef: response.ref,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_PRE_REG_REF_FAILURE})
            }
        })
    }
}

export function resetFetchPreRegReference() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_PRE_REG_REF})
    }
}
