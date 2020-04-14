import {all, call, put, takeEvery} from "redux-saga/effects";
import {ActionTypeStatus, ActionTypeSubString,  makeAction} from "./actions";
import {Entity} from "./actionTypes";
import {initiateAPIRequest} from "./services";

function* apiSideEffect(action, typeSubString, isMultiple = false){
	try {
		const response = yield call(initiateAPIRequest, action.payload);

		if (response.status === 200) {
			yield put(
				makeAction(
					{typeSubString, status: ActionTypeStatus.success,multiple: isMultiple},
					{...action, payload: response.data}
				)
			);
		} else {
			yield put(makeAction(
				{typeSubString, status: ActionTypeStatus.error, multiple: isMultiple},
				{...action, payload: [{ error: response.data.error, message: response.data.message}]}
				)
			);
		}
	} catch (error) {
		// console.log("Response Error: ", error);
		yield put(makeAction(
			{typeSubString, status: ActionTypeStatus.error, multiple: isMultiple},
			{...action, payload: [{ typeSubString: error.name, message: error.message}]}
			)
		);
	}
}

/*Worker Saga*/
function* entityCreateFlow(action) {
	yield call(apiSideEffect, action, ActionTypeSubString.create);
}

function* entityUpdateFlow(action) {
	yield call(apiSideEffect, action, ActionTypeSubString.update)
}

function* entityDeleteFlow(action) {
	yield call(apiSideEffect, action, ActionTypeSubString.delete);
}

function* entityRequestFlow(action) {
	yield call(apiSideEffect, action, ActionTypeSubString.read);
}

function* entitiesRequestFlow(action) {
	yield call(apiSideEffect, action, ActionTypeSubString.read, true);
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
