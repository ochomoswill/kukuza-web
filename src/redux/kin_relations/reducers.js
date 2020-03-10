import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Get all kinRelations */
    kinRelations: [],
    kinRelationsTracker: {status: 'idle'},
    kinRelationsTimestamp: undefined,

    /* Get a kinRelation */
    kinRelation: [],
    kinRelationTracker: {status: 'idle'},
    kinRelationTimestamp: undefined,

    /* Create a kinRelation */
    newKinRelation: [],
    newKinRelationTracker: {status: 'idle'},
    newKinRelationTimestamp: undefined,

    /* Update a kinRelation */
    updatedKinRelation: [],
    updatedKinRelationTracker: {status: 'idle'},
    updatedKinRelationTimestamp: undefined,

    /* Delete a kinRelation */
    deletedKinRelation: [],
    deletedKinRelationTracker: {status: 'idle'},
    deletedKinRelationTimestamp: undefined,
});

export default function kinRelationsReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get all kinRelations */
        case types.GET_ALL_KIN_RELATIONS_REQUEST:
            return state.merge({
                kinRelationsTracker: {status: 'processing'},
            });

        case types.GET_ALL_KIN_RELATIONS_SUCCESS:
            return state.merge({
                kinRelationsTracker: {status: 'success'},
                kinRelations: action.kinRelations,
                kinRelationsTimestamp: action.timestamp,
            });

        case types.GET_ALL_KIN_RELATIONS_FAILURE:
            return state.merge({
                kinRelationsTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                kinRelationsTimestamp: action.timestamp,
            });

        case types.RESET_GET_ALL_KIN_RELATIONS:
            return state.merge({
                kinRelationsTracker: {status: 'idle'},
            });

        /* Get a kinRelation */
        case types.GET_KIN_RELATION_REQUEST:
            return state.merge({
                kinRelationTracker: {status: 'processing'},
            });

        case types.GET_KIN_RELATION_SUCCESS:
            return state.merge({
                kinRelationTracker: {status: 'success'},
                kinRelation: action.kinRelation,
                kinRelationTimestamp: action.timestamp,
            });

        case types.GET_KIN_RELATION_FAILURE:
            return state.merge({
                kinRelationTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                kinRelationTimestamp: action.timestamp,
            });

        case types.RESET_GET_KIN_RELATION:
            return state.merge({
                kinRelationTracker: {status: 'idle'},
            });

        /* Create a kinRelation */
        case types.CREATE_KIN_RELATION_REQUEST:
            return state.merge({
                newKinRelationTracker: {status: 'processing'},
            });

        case types.CREATE_KIN_RELATION_SUCCESS:
            return state.merge({
                newKinRelationTracker: {status: 'success'},
                newKinRelation: action.newKinRelation,
                newKinRelationTimestamp: action.timestamp,
            });

        case types.CREATE_KIN_RELATION_FAILURE:
            return state.merge({
                newKinRelationTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                newKinRelationTimestamp: action.timestamp,
            });

        case types.RESET_CREATE_KIN_RELATION:
            return state.merge({
                newKinRelationTracker: {status: 'idle'},
            });

        /* Update a kinRelation */
        case types.UPDATE_KIN_RELATION_REQUEST:
            return state.merge({
                updatedKinRelationTracker: {status: 'processing'},
            });

        case types.UPDATE_KIN_RELATION_SUCCESS:
            return state.merge({
                updatedKinRelationTracker: {status: 'success'},
                updatedKinRelation: action.updatedKinRelation,
                updatedKinRelationTimestamp: action.timestamp,
            });

        case types.UPDATE_KIN_RELATION_FAILURE:
            return state.merge({
                updatedKinRelationTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_UPDATE_KIN_RELATION:
            return state.merge({
                updatedKinRelationTracker: {status: 'idle'},
            });

        /* Delete a kinRelation */
        case types.DELETE_KIN_RELATION_REQUEST:
            return state.merge({
                deletedKinRelationTracker: {status: 'processing'},
            });

        case types.DELETE_KIN_RELATION_SUCCESS:
            return state.merge({
                deletedKinRelationTracker: {status: 'success'},
                deletedKinRelation: action.deletedKinRelation,
                deletedKinRelationTimestamp: action.timestamp,
            });

        case types.DELETE_KIN_RELATION_FAILURE:
            return state.merge({
                deletedKinRelationTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                deletedKinRelationTimestamp: action.timestamp,
            });

        case types.RESET_DELETE_KIN_RELATION:
            return state.merge({
                deletedKinRelationTracker: {status: 'idle'},
            });

        default:
            return state
    }
}


