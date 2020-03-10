import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Confirm Payment */
    paymentStatus: [],
    paymentStatusTracker: {status: 'idle'},
    paymentStatusTimestamp: undefined,

    /* Initiate STK Push */
    initiateSTKPush: [],
    initiateSTKPushTracker: {status: 'idle'},
    initiateSTKPushTimestamp: undefined,
});

export default function integrationReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Confirm Payment */
        case types.CONFIRM_PAYMENT_REQUEST:
            return state.merge({
                paymentStatusTracker: {status: 'processing'},
            });

        case types.CONFIRM_PAYMENT_SUCCESS:
            return state.merge({
                paymentStatusTracker: {status: 'success'},
                paymentStatus: action.paymentStatus,
                paymentStatusTimestamp: action.timestamp,
            });

        case types.CONFIRM_PAYMENT_FAILURE:
            return state.merge({
                paymentStatusTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_CONFIRM_PAYMENT:
            return state.merge({
                paymentStatusTracker: {status: 'idle'},
            });

        /* Initiate STK Push */
        case types.INITIATE_STK_PUSH_REQUEST:
            return state.merge({
                initiateSTKPushTracker: {status: 'processing'},
            });

        case types.INITIATE_STK_PUSH_SUCCESS:
            return state.merge({
                initiateSTKPushTracker: {status: 'success'},
                initiateSTKPush: action.initiateSTKPush,
                initiateSTKPushTimestamp: action.timestamp,
            });

        case types.INITIATE_STK_PUSH_FAILURE:
            return state.merge({
                initiateSTKPushTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_INITIATE_STK_PUSH:
            return state.merge({
                initiateSTKPushTracker: {status: 'idle'},
            });

        default:
            return state
    }
}
