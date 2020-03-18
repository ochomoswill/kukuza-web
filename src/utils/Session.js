import { getSecureStorageItem, hasSecureStorageItem } from './SecureLocalStorage'
import { AUTH_DETAILS_LOCAL_STORAGE_KEY } from '../constants/General'
import {store} from "../index"
import { revokeTokenRequest } from '../redux/auth/actions'
const AppEndpoint = 'https://api.kukuza.co.ke';
const host = 'https://portal.kukuza.co.ke';

/* Session Data */
function fetchSessionDetails(property){
	if (hasSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)) {
		let sessionDetails = JSON.parse(getSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY));

		if(property){
			if(sessionDetails.hasOwnProperty(property)){
				return sessionDetails[property]
			}
		}

		return sessionDetails
	} else {
		return undefined
	}
}


export function getAuthToken() {
	return fetchSessionDetails("accessToken");
}

export function getUserDetails() {
	return fetchSessionDetails("user");
}

export function getSessionTimeToLive(){
	// return 420;
	return fetchSessionDetails("expiry");
}

export function getSessionTimeUnit(){
	return fetchSessionDetails("timeUnit");
}

export function getLogInTime(){
	return fetchSessionDetails("dateCreated");
}


export function logout() {

	// Was a good idea till we found out about Tracking URL
	// saveToLocalStorage(store.getState().router.location.pathname, General.LAST_URL_ENTRY_LOCAL_STORAGE_KEY);

	// store.dispatch(logoutUser());

	store.dispatch(revokeTokenRequest())

	// clearLocalStorageOnLogout();


}


export function clearLocalStorageOnLogout() {
	if (localStorage.hasOwnProperty(AUTH_DETAILS_LOCAL_STORAGE_KEY)) {
		localStorage.removeItem(AUTH_DETAILS_LOCAL_STORAGE_KEY);
	}
}



export default {
    AppEndpoint,
    host,
    getAuthToken,
    getUserDetails,
}
