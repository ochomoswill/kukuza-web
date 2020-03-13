import HttpClient from '../utils/httpClient'
import { getSecureStorageItem, hasSecureStorageItem } from './SecureLocalStorage'
import { AUTH_DETAILS_LOCAL_STORAGE_KEY, LOG_IN_TIME_LOCAL_STORAGE_KEY } from '../constants/General'
import {store} from "../index"
import { revokeTokenRequest } from '../redux/auth/actions'
const AppEndpoint = 'https://api.kukuza.co.ke';
const host = 'https://portal.kukuza.co.ke';

const client = new HttpClient(AppEndpoint);

/* Session Data */
export const sessionTime = getSessionTime() ? getSessionTime() :3600; // TODO :: Pick the value from the API
export const sessionTimeUnit = getSessionTimeUnit() ? getSessionTimeUnit() === "seconds" ? 's' : 's' : 's';
export const expiryAllowance = 300; // 5 minutes
export const si_unit = "minutes";

export function makeRequest(method, url, config, withAuth = false) {
    return client.makeRequest(method, url, config, withAuth)
}


export function getSessionTime() {
	if (hasSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)) {
		return JSON.parse(getSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)).expiry;
	} else {
		return undefined
	}
}

export function getSessionTimeUnit() {
	if (hasSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)) {
		return JSON.parse(getSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)).timeUnit;
	} else {
		return undefined
	}
}

export function getAuthToken() {
	if (hasSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)) {
		return JSON.parse(getSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)).accessToken
	} else {
		return undefined
	}
}

export function getUserDetails() {
	if (hasSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)) {
		return JSON.parse(getSecureStorageItem(AUTH_DETAILS_LOCAL_STORAGE_KEY)).user
	} else {
		return undefined
	}
}

export function getLogInTime() {
	if (hasSecureStorageItem(LOG_IN_TIME_LOCAL_STORAGE_KEY)) {
		return JSON.parse(getSecureStorageItem(LOG_IN_TIME_LOCAL_STORAGE_KEY))
	} else {
		return undefined
	}
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

	if (localStorage.hasOwnProperty(LOG_IN_TIME_LOCAL_STORAGE_KEY)) {
		localStorage.removeItem(LOG_IN_TIME_LOCAL_STORAGE_KEY);
	}
}


function secureFetch(url, request) {
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(response => {
                // response only can be ok in range of 2XX
                if (response.ok) {
                    // you can call response.json() here too if you want to return json
                    resolve(response)
                } else {
                    //handle errors in the way you want to
                    switch (response.status) {
                        case 403:
                            console.log('Forbidden');
                            console.log(response);
                            logout();
                            break
                        /*case 404:
                                                console.log('Object not found');
                                                break;
                                            case 500:
                                                console.log('Internal server error');
                                                break;
                                            default:
                                                console.log('Some error occured');
                                                break;*/
                    }

                    //here you also can throw custom error too
                    resolve(response)
                }
            })
            .catch(error => {
                //it will be invoked mostly for network errors
                //do what ever you want to do with error here
                console.log(error);
                reject(error)
            })
    })
}



export default {
    AppEndpoint,
    host,
    getAuthToken,
    getUserDetails,
    secureFetch,
    makeRequest
}
