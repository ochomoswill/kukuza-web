import {RequestParamsBuilder, HandleRequestOptsDirector, HandleRequestOptsBuilder} from "./flexi/RequestBuilder"

// Object structure for the dynamic redux store.
export const initialEntityVal = {
    tracker: {
        status: '',
        errors: null
    },
    data: {},
    timestamp: new Date().getTime()
};


export const Entities = {
  login: {
    url: "o/token",
    name: "login",
		fnLogin: (fnHandleRequest, reqParams = undefined) => {
    	const {name, url} = Entities.login;
			const builtReqParams = new RequestParamsBuilder()
				.withMethod("post")
				.withUrl(url)
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).create(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
  },
	resetPassword: {
		url: "o/reset-password",
		name: "resetPassword",
		fnResetPassword: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.resetPassword;
			const builtReqParams = new RequestParamsBuilder()
				.withMethod("post")
				.withUrl(url)
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).create(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	}
}

