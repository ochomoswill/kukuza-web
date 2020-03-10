export function getPreRegRef(state) {
    return {
        name: 'Pre-Registration-Reference',
        tracker: state.sysReducer.preRegRefTracker,
        timestamp: state.sysReducer.preRegRefTimestamp,
        data: state.sysReducer.preRegRef,
    }
}
