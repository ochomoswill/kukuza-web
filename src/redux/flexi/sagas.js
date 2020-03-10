import {all, call, put, takeEvery} from "redux-saga/effects";
import {ActionTypeStatus, ActionTypeSubString,  makeAction} from "./actions";
import {Entity} from "./actionTypes";
import {initiateAPIRequest} from "./services";


/*Worker Saga*/

function* entityCreateFlow(action) {
    // console.log('Saga eCF: ', action);
    try {
        const response = yield call(initiateAPIRequest, action.payload);


        if (response.status === 200) {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.create,
                    status: ActionTypeStatus.success
                }, {
                    ...action,
                    payload: response.data
                }));
        } else {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.create,
                    status: ActionTypeStatus.error
                }, {
                    ...action,
                    payload: [
                        {
                            error: response.data.error,
                            message: response.data.message
                        }
                    ]
                }));
        }
    } catch (error) {
        // console.log("Response Error: ", error);
        yield put(makeAction(
            {
                typeSubString: ActionTypeSubString.create,
                status: ActionTypeStatus.error
            }, {
                ...action,
                payload: [
                    {
                        typeSubString: error.name,
                        description: error.message
                    }
                ]
            }));
    }
}

function* entityUpdateFlow(action) {
    // console.log('Saga eUF: ', action);
    try {
        // yield delay(2000); // Helps to simulate loading state in reducer
        const response = yield call(initiateAPIRequest, action.payload);

        if (response.errors || response.error) {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.update,
                    status: ActionTypeStatus.error
                }, {
                    ...action,
                    payload: [
                        {
                            typeSubString: response.error,
                            description: response.message
                        }
                    ]
                }));
        } else {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.update,
                    status: ActionTypeStatus.success
                }, {
                    ...action,
                    payload: response.data
                }));
        }
    } catch (error) {
        // console.log("Response Error: ", error);
        yield put(makeAction(
            {
                typeSubString: ActionTypeSubString.update,
                status: ActionTypeStatus.error
            }, {
                ...action,
                payload: [
                    {
                        typeSubString: error.name,
                        description: error.message
                    }
                ]
            }));
    }
}

function* entityDeleteFlow(action) {
    // console.log('Saga eDF: ', action);
    try {
        //yield delay(2000); // Helps to simulate loading state in reducer
        const response = yield call(initiateAPIRequest, action.payload);

        if (response.status === 200) {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.delete,
                    status: ActionTypeStatus.success
                }, {
                    ...action,
                    payload: response.data
                }));
        } else {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.delete,
                    status: ActionTypeStatus.error
                }, {
                    ...action,
                    payload: [
                        {
                            error: response.data.error,
                            message: response.data.message
                        }
                    ]
                }));
        }

        /*if (response.errors || response.error) {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.delete,
                    status: ActionTypeStatus.error
                }, {
                    ...action,
                    payload: [
                        {
                            typeSubString: response.error,
                            description: response.message
                        }
                    ]
                }));
        } else {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.delete,
                    status: ActionTypeStatus.success
                }, {
                    ...action,
                    payload: response.data
                }));
        }*/
    } catch (error) {
        // console.log("Response Error: ", error);
        yield put(makeAction(
            {
                typeSubString: ActionTypeSubString.delete,
                status: ActionTypeStatus.error
            }, {
                ...action,
                payload: [
                    {
                        typeSubString: error.name,
                        description: error.message
                    }
                ]
            }));
    }
}

function* entityRequestFlow(action) {
    // console.log('Saga eRF: ', action);
    try {
        // yield delay(2000); // Helps to simulate loading state in reducer
        const response = yield call(initiateAPIRequest, action.payload);

        if (response.errors || response.error) {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.read,
                    status: ActionTypeStatus.error
                }, {
                    ...action,
                    payload: [
                        {
                            typeSubString: response.error,
                            description: response.message
                        }
                    ]
                }));
        } else {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.read,
                    status: ActionTypeStatus.success
                }, {
                    ...action,
                    payload: response.data
                }));
        }
    } catch (error) {
        // console.log("Response Error: ", error);
        yield put(makeAction(
            {
                typeSubString: ActionTypeSubString.read,
                status: ActionTypeStatus.error
            }, {
                ...action,
                payload: [
                    {
                        typeSubString: error.name,
                        description: error.message
                    }
                ]
            }));
    }
}

function* entitiesRequestFlow(action) {
    // console.log('Saga esRF: ', action);
    try {
        // yield delay(2000);
        const response = yield call(initiateAPIRequest, action.payload);

        if (response.errors || response.error) {
            yield put(
                makeAction(
                    {
                        typeSubString: ActionTypeSubString.read,
                        status: ActionTypeStatus.error,
                        multiple: true
                    }, {
                        ...action,
                        payload: [
                            {
                                typeSubString: response.error,
                                description: response.message
                            }
                        ]
                    }
                )
            );
        } else {
            yield put(makeAction(
                {
                    typeSubString: ActionTypeSubString.read,
                    status: ActionTypeStatus.success,
                    multiple: true
                }, {
                    ...action,
                    payload: response.data
                }));
        }
    } catch (error) {
        // console.log("Response Error: ", error);
        yield put(makeAction(
            {
                typeSubString: ActionTypeSubString.read,
                status: ActionTypeStatus.error,
                multiple: true
            }, {
                ...action,
                payload: [
                    {
                        typeSubString: error.name,
                        description: error.message
                    }
                ]
            }));
    }
}


function* entitiesWatcher() {
    yield takeEvery(Entity.ENTITY_CREATE_LOADING, entityCreateFlow);
    yield takeEvery(Entity.ENTITY_UPDATE_LOADING, entityUpdateFlow);
    yield takeEvery(Entity.ENTITY_READ_LOADING, entityRequestFlow);
    yield takeEvery(Entity.ENTITIES_READ_LOADING, entitiesRequestFlow);
    yield takeEvery(Entity.ENTITY_DELETE_LOADING, entityDeleteFlow);
}

export default function* rootSaga() {
    yield all([
        entitiesWatcher()
    ]);
}
