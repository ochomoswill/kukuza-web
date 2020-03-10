import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Get all kins */
    kins: [],
    kinsTracker: {status: 'idle'},
    kinsTimestamp: undefined,

    /* Get a kin */
    kin: [],
    kinTracker: {status: 'idle'},
    kinTimestamp: undefined,

    /* Create a kin */
    newKin: [],
    newKinTracker: {status: 'idle'},
    newKinTimestamp: undefined,

    /* Update a kin */
    updatedKin: [],
    updatedKinTracker: {status: 'idle'},
    updatedKinTimestamp: undefined,

    /* Delete a kin */
    deletedKin: [],
    deletedKinTracker: {status: 'idle'},
    deletedKinTimestamp: undefined,
});

export default function kinsReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get all kins */
        case types.GET_ALL_MY_KINS_REQUEST:
            return state.merge({
                kinsTracker: {status: 'processing'},
            });

        case types.GET_ALL_MY_KINS_SUCCESS:
            return state.merge({
                kinsTracker: {status: 'success'},
                kins: action.kins,
                kinsTimestamp: action.timestamp,
            });

        case types.GET_ALL_MY_KINS_FAILURE:
            return state.merge({
                kinsTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                kinsTimestamp: action.timestamp,
            });

        case types.RESET_GET_ALL_MY_KINS:
            return state.merge({
                kinsTracker: {status: 'idle'},
            });

        /* Get a kin */
        case types.GET_KIN_REQUEST:
            return state.merge({
                kinTracker: {status: 'processing'},
            });

        case types.GET_KIN_SUCCESS:
            return state.merge({
                kinTracker: {status: 'success'},
                kin: action.kin,
                kinTimestamp: action.timestamp,
            });

        case types.GET_KIN_FAILURE:
            return state.merge({
                kinTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                kinTimestamp: action.timestamp,
            });

        case types.RESET_GET_KIN:
            return state.merge({
                kinTracker: {status: 'idle'},
            });

        /* Create a kin */
        case types.CREATE_KIN_REQUEST:
            return state.merge({
                newKinTracker: {status: 'processing'},
            });

        case types.CREATE_KIN_SUCCESS:
            return state.merge({
                newKinTracker: {status: 'success'},
                newKin: action.newKin,
                newKinTimestamp: action.timestamp,
            });

        case types.CREATE_KIN_FAILURE:
            return state.merge({
                newKinTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                newKinTimestamp: action.timestamp,
            });

        case types.RESET_CREATE_KIN:
            return state.merge({
                newKinTracker: {status: 'idle'},
            });

        /* Update a kin */
        case types.UPDATE_KIN_REQUEST:
            return state.merge({
                updatedKinTracker: {status: 'processing'},
            });

        case types.UPDATE_KIN_SUCCESS:
            return state.merge({
                updatedKinTracker: {status: 'success'},
                updatedKin: action.updatedKin,
                updatedKinTimestamp: action.timestamp,
            });

        case types.UPDATE_KIN_FAILURE:
            return state.merge({
                updatedKinTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_UPDATE_KIN:
            return state.merge({
                updatedKinTracker: {status: 'idle'},
            });

        /* Delete a kin */
        case types.DELETE_KIN_REQUEST:
            return state.merge({
                deletedKinTracker: {status: 'processing'},
            });

        case types.DELETE_KIN_SUCCESS:
            return state.merge({
                deletedKinTracker: {status: 'success'},
                deletedKin: action.deletedKin,
                deletedKinTimestamp: action.timestamp,
            });

        case types.DELETE_KIN_FAILURE:
            return state.merge({
                deletedKinTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                deletedKinTimestamp: action.timestamp,
            });

        case types.RESET_DELETE_KIN:
            return state.merge({
                deletedKinTracker: {status: 'idle'},
            });

        default:
            return state
    }
}


