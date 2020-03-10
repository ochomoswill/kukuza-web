export function getLoginStatus(state) {
    return {
        name: 'Log In',
        tracker: state.authReducer.loginTracker,
        timestamp: state.authReducer.loginTimestamp,
        data: state.authReducer.login,
    }
}

export function getAuthStatus(state) {
    return {
        name: 'Authenticate User',
        tracker: state.authReducer.authUserTracker,
        timestamp: state.authReducer.authUserTimestamp,
        data: state.authReducer.authUser,
    }
}


export function getResetPwdStatus(state) {

    console.log("@selector ", state.authReducer);
    return {
        name: 'Password Reset',
        tracker: state.authReducer.resetPasswordTracker,
        timestamp: state.authReducer.resetPasswordTimestamp,
        data: state.authReducer.resetPassword,
    }
}
