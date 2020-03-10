import HttpClient from '../utils/httpClient'

const AppEndpoint = 'https://api.kukuza.co.ke';
const host = 'https://portal.kukuza.co.ke';

const client = new HttpClient(AppEndpoint);

export function makeRequest(method, url, config, withAuth = false) {
    return client.makeRequest(method, url, config, withAuth)
}

function getAuthToken() {
    if (localStorage.getItem('app.Authorization')) {
        //console.log(JSON.parse(sessionStorage.getItem("evrAccessToken")));
        return JSON.parse(localStorage.getItem('app.Authorization')).accessToken
    } else {
        return undefined
    }
}

function getUserDetails() {
    if (localStorage.getItem('app.Authorization')) {
        return JSON.parse(localStorage.getItem('app.Authorization'))
    } else {
        return undefined
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

function logout() {
    window.localStorage.setItem('app.Authorization', '');
    window.localStorage.setItem('app.Role', '')
}

export default {
    AppEndpoint,
    host,
    getAuthToken,
    getUserDetails,
    secureFetch,
    makeRequest
}
