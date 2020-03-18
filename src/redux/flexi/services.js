import { makeRequest } from '../../utils/HttpClient'

export const APIRequestMethod =  {
    "GET" : "GET",
    "POST" : "POST",
    "PUT" : "PUT",
    "PATCH" : "PATCH",
    "DELETE" : "DELETE",
    "COPY" : "COPY",
    "HEAD" : "HEAD",
    "OPTION" : "OPTION"
}

/*export const defaultReqParams = {
    url: "/some-get-url",
    method: APIRequestMethod.GET,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    getParams: {
        activePage: "/some-activePage-url",
        page: initialParams.pageNumber,
        pageSize: initialParams.pageSize,
        fields: initialParams.fields,
        filter: initialParams.filter,
    },
    withAuth: true
};*/

export async function initiateAPIRequest(reqParams){
    /*const reqParams = {
        url: "/",
        method: "put",
        data: {},
        headers: {},
        urlParams: ['appCode'],
        compositeKey: [], // special urlparam for composite keys
        getParams: {
            page: 1,
            pageSize: 10,
            activePage: "",
            fields: "*",
            filter: '',
            //strategy: "and",
        },
        withAuth: true
    };*/

    try {

        let url = "/change-this-url";
        let method = APIRequestMethod.PUT;
        let withAuth = false;
        const config = {};

        if (reqParams.hasOwnProperty("url")) {
            url = reqParams.url;
        }

        if (reqParams.hasOwnProperty("method")) {
            method = reqParams.method;
        }

        if (reqParams.hasOwnProperty("data")) {
            config["data"] = reqParams.data;
        }

        if (reqParams.hasOwnProperty("headers")) {
            config["headers"] = reqParams.headers;
        }


        if (reqParams.hasOwnProperty("compositeKey") && reqParams.compositeKey) {
            // NOTE :: All the compositeKey should be a part of the data property on reqParams
            reqParams.compositeKey.forEach((urlParam, urlParamKey) => {
                const delimitter = ",";
                if (urlParamKey === 0) {
                    url = `${url}${reqParams.data[urlParam]}`;
                } else {
                    url = `${url}${delimitter}${reqParams.data[urlParam]}`;
                }
            });
        }

        if (reqParams.hasOwnProperty("urlParams") && reqParams.urlParams) {
            // NOTE :: All the urlParams should be a part of the data property on reqParams
            reqParams.urlParams.forEach((urlParam, urlParamKey) => {
                const delimitter = ",";
                if (urlParamKey === 0) {
                    url = `${url}${reqParams.data[urlParam]}`;
                } else {
                    url = `${url}${delimitter}${reqParams.data[urlParam]}`;
                }
            });

        }

        if (reqParams.hasOwnProperty("getParams") && reqParams.getParams) {
            // NOTE :: The get param NAME should similar to the get param required by the api

            // The first element in the array is the active page from which the request was made
            // let reqParamArr= [`activePage=${store.getState().router.location.pathname}`];
            let reqParamArr= [];

            const {filter, filterArr, strategy, ...rest} = reqParams.getParams;

            Object.entries(rest).forEach((getParamKey) => {
                if (getParamKey[0] !== "activePage")
                    reqParamArr.push(`${getParamKey[0]}=${getParamKey[1]}`);
            });

            if (reqParams.getParams.hasOwnProperty("filterArr")) {
                const {filterArr} = reqParams.getParams;

                if (filterArr.length > 0) {
                    filterArr.map((filter) => {
                        return reqParamArr.push(`filter={${filter}}`)
                    });

                    if (reqParams.getParams.hasOwnProperty("strategy")) {
                        //reqParamArr.push(`strategy=${reqParams.getParams.strategy}`)
                    }
                }
            }


            if (reqParamArr.length > 0) {
                reqParamArr[0] = '?' + reqParamArr[0];
                url = `${url}${reqParamArr.join('&')}`;
            }

            if (filter) {
                if (filter !== '') {
                    const encodedFilter = `filter={${filter}}`;
                    //const encodedFilter = encodeURI(`filter={${filter}}`);
                    url = `${url}&${encodedFilter}`;
                }
            }


        }

        if (reqParams.hasOwnProperty("withAuth") && reqParams.withAuth) {
            withAuth = reqParams.withAuth;
        }

        const response = await makeRequest(method, encodeURI(url), config, withAuth);

        // console.log("Response at Service ", response);

        return response
    } catch (e) {
        return e
    }
}

