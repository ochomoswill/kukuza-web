export function getPaymentStatus(state) {
    return {
        name: 'Confirm Payment',
        tracker: state.integrationReducer.paymentStatusTracker,
        timestamp: state.integrationReducer.paymentStatusTimestamp,
        data: state.integrationReducer.paymentStatus,
    }
}

export function getInitiateSTKPushStatus(state) {
    return {
        name: 'Initiate STK Push',
        tracker: state.integrationReducer.initiateSTKPushTracker,
        timestamp: state.integrationReducer.initiateSTKPushTimestamp,
        data: state.integrationReducer.initiateSTKPush,
    }
}
