import {getSecureStorageItem, setSecureStorageItem} from "../utils/SecureLocalStorage";

export const loadStateReducer = (key) => {
	try {
		let serializedState = null;
		if (key) {
			serializedState = getSecureStorageItem(key);

			if (serializedState === null) {
				return undefined;
			}
			return JSON.parse(serializedState);
		}

		return undefined;

	} catch (err) {
		return undefined;
	}
};


export const saveStateReducer = (stateEntry , key) => {
	try {
		if (key) {
			const serializedState = JSON.stringify(stateEntry);
			setSecureStorageItem(key, serializedState);
		}
	} catch {
		// ignore write errors
	}
};


export const isolateStateReducer = (reducer, store) => {
	let strippedState = {};
	strippedState[reducer] = store.getState()[reducer];
	return strippedState
};


export const saveToLocalStorage = (itemToBeSaved, key) => {
	try {
		if (key) {
			const serializedState = JSON.stringify(itemToBeSaved);
			setSecureStorageItem(key, serializedState);
		}
	} catch (e) {
		// ignore write errors
		throw new Error(e)
	}
};

export const loadFromLocalStorage = (key) => {
	try {
		let serializedState = null;
		if (key) {
			serializedState = getSecureStorageItem(key);

			if (serializedState === null) {
				return undefined;
			}
			return JSON.parse(serializedState);
		}

		return undefined;

	} catch (err) {
		return undefined;
	}
};
