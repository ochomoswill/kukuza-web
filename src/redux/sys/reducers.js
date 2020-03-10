import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Get Pre - Registration Reference */
    preRegRef: [],
    preRegRefTracker: 'idle',
    preRegRefTimestamp: undefined,
});

export default function sysReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get Pre - Registration Reference */
        case types.GET_PRE_REG_REF_REQUEST:
            return state.merge({
                preRegRefTracker: 'processing',
            });

        case types.GET_PRE_REG_REF_SUCCESS:
            return state.merge({
                preRegRefTracker: 'success',
                preRegRef: action.preRegRef,
                preRegRefTimestamp: action.timestamp,
            });

        case types.GET_PRE_REG_REF_FAILURE:
            return state.merge({
                preRegRefTracker: 'error',
            });

        case types.RESET_GET_PRE_REG_REF:
            return state.merge({
                preRegRefTracker: 'idle',
            });

        default:
            return state
    }
}
