import {all, call, put, takeEvery} from 'redux-saga/effects'
import * as actions from './actions'
import { REVOKE_TOKEN_REQUESTING } from './actionTypes'
import { revokeAccessToken } from './services'

/* Revoke access token flow */
function* revokeTokenRequestFlow() {
    try {
        const revokeToken = yield call(revokeAccessToken);

        console.log("@revoke ", revokeToken);

        if (revokeToken.hasOwnProperty("status")) {
            if (revokeToken.status === 200) {
                console.log("Revoking of access token was a success");
                // Revoke Token is successful
                yield put(actions.revokeTokenRequestSuccess(revokeToken));

                console.log("Logging user out @saga");
                // Logout user
                yield put(actions.logoutUser());

                // Reset revoke access token
                yield put(actions.resetRevokeTokenRequest())
            }
        } else {
            yield put(actions.revokeTokenRequestError(revokeToken.error))
        }
    } catch (error) {
        yield put(actions.revokeTokenRequestError(error))
    }
}

/* Watcher */
function* authWatcher() {
    yield takeEvery(REVOKE_TOKEN_REQUESTING, revokeTokenRequestFlow);
}

// export default authWatcher
export default function* authSaga() {
    yield all([
        authWatcher()
    ]);
}
