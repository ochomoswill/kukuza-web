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
	},
	myTransactions: {
		url: "me/transactions",
		name: "myTransactions",
		fnGetMyTransaction: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myTransactions;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetMyTransactions: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myTransactions;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	},
	myWallets: {
		url: "me/wallets",
		name: "myWallets",
		fnGetMyWallet: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myWallets;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetMyWallets: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myWallets;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	}
}

