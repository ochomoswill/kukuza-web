import axios from 'axios';
import { getSessionTimeToLive, getSessionTimeUnit } from './Session'
import { getAuthToken, getLogInTime, logout } from './Session'
import timeUtils from './datetime'
import { refreshAccessToken } from '../redux/auth/services'
import { saveToLocalStorage } from '../redux/localStorage'
import {
	API_URL,
	AUTH_DETAILS_LOCAL_STORAGE_KEY,
	EXPIRY_ALLOWANCE, EXPIRY_ALLOWANCE_SI_UNIT,
	LOG_IN_TIME_LOCAL_STORAGE_KEY,
} from '../constants/General'
import { setAccessToken } from '../redux/auth/actions'
import moment from "moment"

import {store} from "../index"

var qs = require('qs');

const TIMEOUT_IN_MINUTES = 9;

function getTimeout(timeoutInMinutes) {
    return ((timeoutInMinutes * 60) + 30) * 1000
}

export default class HttpClient {
    constructor(endpoint) {

        /*if (this.port !== "") {
            this.endpoint = `${this.host}:${this.port}/`
        } else {
            this.endpoint = `${this.host}/`
        }*/
        this.endpoint = endpoint;

        this._axios = axios.create({
            baseURL: this.endpoint,
            timeout: getTimeout(TIMEOUT_IN_MINUTES)
        });
    }

    // Formatted display of the response
    static printResponse(response) {
        console.log("\n");
        console.log("=============:===================================================");
        console.log(" BASE URL    : ", response.config.baseURL);
        console.log("=============:===================================================");
        console.log(" URL         : ", response.config.url);
        console.log("=============:===================================================");
        console.log(" METHOD      : ", response.config.method);
        console.log("=============:===================================================");
        console.log(" STATUS      : ", response.status);
        console.log("=============:===================================================");
        console.log(" STATUS TEXT : ", response.statusText);
        console.log("=============:===================================================");
        console.log(" SERVER      : ", response.headers.server);
        console.log("=============:===================================================");
        console.log(" DATE        : ", response.headers.date);
        console.log("=============:===================================================");
        console.log(" TIMEOUT     : ", response.config.timeout);
        console.log("=============:===================================================");
        console.log(" HEADERS        ");
        console.log("-----------------------------------------------------------------");
        console.log(" ", response.config.headers);
        console.log("=================================================================");
        console.log(" REQUEST DATA        ");
        console.log("-----------------------------------------------------------------");
        console.log(" ", response.config.data);
        console.log("=================================================================");
        console.log(" RESPONSE DATA        ");
        console.log("-----------------------------------------------------------------");
        console.log(" ", response.data);
        console.log("=================================================================");
    }

    // Add a request interceptor.
    static async addRequestInterceptor(client) {
        client.interceptors.request.use(async function(config) {
					// The process before sending the request.
					//const token = localStorage.getItem("token");
					let token = getAuthToken();

					if (token != null) {
						config.headers.Authorization = `Bearer ${token}`;
					}

					const currentDateTime = timeUtils.CurrentDateTime();
					// httpClientLogger.customInfo("addRequestInterceptor()", "Current time is                   : " + timeUtils.formatDateTime(currentDateTime));


					// let sessionStartTime = '2019-4-9 19:10:23';
					const sessionStartTime = timeUtils.formatUSDateTime(getLogInTime());

					if (sessionStartTime !== undefined) {
						const expiryAllowance = EXPIRY_ALLOWANCE;

						const si_unit = EXPIRY_ALLOWANCE_SI_UNIT;

						const sessionTime = getSessionTimeToLive();
						const sessionTimeUnit = getSessionTimeUnit() ? getSessionTimeUnit() === "seconds" ? 's' : 's' : 's';
						const expiryDateTime = moment(timeUtils.formatISOString(sessionStartTime)).add(sessionTime, sessionTimeUnit);

						const lowerLimitExpiryDate = moment(timeUtils.formatISOString(sessionStartTime)).add(sessionTime - expiryAllowance, sessionTimeUnit);

						const diff = moment().diff(moment(timeUtils.formatISOString(lowerLimitExpiryDate), moment.ISO_8601), si_unit);


						const expiryAllowanceInMinutes = expiryAllowance / 60;

						const logoutThreshold = expiryAllowanceInMinutes - 1;


						if (diff >= 0 && diff < logoutThreshold) {
							// httpClientLogger.customInfo("addRequestInterceptor()", "The Access Token has an allowable time. Kindly refresh token!");

							// refreshing the token
							// console.log("@oldConfig ", config);
							// console.log("@newConfig ", newConfig);
							// return HttpClient.updateConfigWithAccessToken(config);
							return await HttpClient.updateConfigWithAccessToken(config);

						} else if (diff >= logoutThreshold) {
							// httpClientLogger.customInfo("addRequestInterceptor()", "The Access Token expired!");

							// Logout User
							logout();
						}
					}

					// check if token has expired

					// refresh token if the token has expired

					return config;
				}, function (error) {
            // Request error handling.
            return Promise.reject(error);
        });

        return client
    }

    // Add a interceptor.
    static addResponseInterceptor(client) {
        client.interceptors.response.use(function (response) {
            // Processing for the response data.
            return response;
        }, function (error) {
            // Processing after the response error.
            return Promise.reject(error);
        });

        return client
    }

    // Get the endpoint
    getEndpoint() {
        console.log(`${this.endpoint} is our endpoint.`);
        return this.endpoint
    }

    // Get an instance of axios
    getAxiosInstance() {
        return this._axios;
    }

    // Make requests
    async makeRequest(method, url, config = {
			data: {}, headers: {}, params: {}, onUploadProgress: function(progressEvent) {
			}
		}, withAuth = false) {
			let client = this._axios;

			let requestConfig = {
				method: method,
				url: url,
				data: config.data,
				headers: config.headers,
				params: config.params,
				paramsSerializer: params => {
					return qs.stringify(params)
				},
				onUploadProgress: config.onUploadProgress
			};

			if (withAuth) {
				client = await HttpClient.addRequestInterceptor(client)
			}

			return new Promise((resolve, reject) => {
				client(requestConfig)
					.then(response => {
						HttpClient.printResponse(response);
						resolve(response);
					})
					.catch(error => {
						if (error.response) {
							// The request was made and the server responded with a status code
							// that falls out of the range of 2xx
							HttpClient.printResponse(error.response);
							resolve(error.response);
						} else if (error.request) {
							// The request was made but no response was received
							// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
							// http.ClientRequest in node.js
							console.log("Request ", error.request);
							reject(error);
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log('Error', error.message);
							reject(error);
						}
					});
			});
		}


	 static async updateConfigWithAccessToken(config) {
		try {
			const response = await refreshAccessToken(config.headers.Authorization);

			if (response.hasOwnProperty("status")) {
				if (response.status === 200) {
					if (response.hasOwnProperty("data")) {

						// console.log("@data ", response.data);

						const {accessToken, expiry, timeUnit, dateCreated } = response.data;

						let newAuthDetails = response.data;

						// console.log("@newAccessToken ", access_token);

						config.headers.Authorization = `${accessToken}`;

						newAuthDetails["user"] = store.getState().authReducer.user;
						newAuthDetails["accessToken"] = accessToken;
						newAuthDetails["timeToLive"] = expiry;
						newAuthDetails["timeUnit"] = timeUnit;
						newAuthDetails["dateCreated"] = dateCreated;

						// set auth details dispatch
						saveToLocalStorage(newAuthDetails, AUTH_DETAILS_LOCAL_STORAGE_KEY);

						// reset log in time dispatch
						// saveToLocalStorage(timeUtils.CurrentDateTime(), LOG_IN_TIME_LOCAL_STORAGE_KEY);

						// update access token
						store.dispatch(setAccessToken(accessToken));

						return config;
					}else{
						console.error("updateConfigWithAccessToken () [Response has no property data]") // todo throw console.error
					}
				}else{
					console.error("updateConfigWithAccessToken () [Response Status is not 200]")
				}
			}else{
				console.error("updateConfigWithAccessToken () [Response has no property status]")
			}
		} catch (e) {
			if (e.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				// console.log("Response Status ", e.response.status);
				// console.log("Err Msg ", e.response.data.error);
				if(e.response.status === 403){
					logout();
				}

				console.error("updateConfigWithAccessToken () [Response error]", e.response.data.error)
			} else if (e.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				// console.log("Err Msg ", "No Internet Connection!");
				console.error("updateConfigWithAccessToken () [Response error]", "No Internet Connection!");
			} else {
				// Something happened in setting up the request that triggered an Error
				// console.log("Err Msg ", "Unknown Error!");
				console.error("updateConfigWithAccessToken () [Response error]", "Unknown Error!", e);
			}
		}


		return config;
	}

    // Cancel HTTP Request still pending
    // ...

}


const apiClient = new HttpClient(API_URL);

export async function makeRequest(method, url, config, withAuth = false) {
	return await apiClient.makeRequest(method, url, config, withAuth);
}

/*
module.exports = {
    // code here
    HttpClient
}*/
