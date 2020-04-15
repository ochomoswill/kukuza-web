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
	myLoans: {
		url: "me/loans",
		name: "myLoans",
		fnGetMyLoan: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myLoans;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetMyLoans: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myLoans;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnCreateLoan: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myLoans;
			const builtReqParams = new RequestParamsBuilder()
				.withMethod("put")
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).create(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetMyGuarantors: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myLoans;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(`${url}/${reqParams.data.loanId}/guarantors`)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetGuarantorshipRequests: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myLoans;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(`${url}/guarantorship-requests`)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetGuarantorshipRequest: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myLoans;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(`${url}/guarantorship-requests`)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnUpdateGuarantorship: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.myLoans;
			const builtReqParams = new RequestParamsBuilder()
				.withMethod("post")
				.withUrl(`${url}/update-guarantorship`)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).create(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
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
	},
	users: {
		url: "users/",
		name: "users",
		fnGetUser: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.users;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetUsers: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.users;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	},
	loanTypes: {
		url: "loan-types/",
		name: "loanTypes",
		fnGetLoanType: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.loanTypes;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetLoanTypes: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.loanTypes;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	},
	loanStatuses: {
		url: "loan-status/",
		name: "loanStatuses",
		fnGetLoanStatus: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.loanStatuses;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetLoanStatuses: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.loanStatuses;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).readMany(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	},
	confirmMPESAPayment: {
		url: "confirm-payment/sky-mpesa",
		name: "confirmMPESAPayment",
		fnConfirmMPESAPayment: (fnHandleRequest, reqParams = undefined) => {

			// type=MISC
			// &paymentReference=NKO87D18IG
			// &phoneNumber=0713000249
			const {name, url} = Entities.confirmMPESAPayment;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(url)
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).read(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	},
	stkPush: {
		url: "integrations/safaricom/stk-push",
		name: "stkPush",
		fnInitiateStkPush: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.stkPush;
			const builtReqParams = new RequestParamsBuilder()
				.withMethod("post")
				.withUrl(url)
				.isAuthenticated()
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).create(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		},
		fnGetStkPushLogs: (fnHandleRequest, reqParams = undefined) => {
			const {name, url} = Entities.stkPush;
			const builtReqParams = new RequestParamsBuilder()
				.withUrl(`${url}/logs`)
				.build();

			const options = new HandleRequestOptsDirector(new HandleRequestOptsBuilder()).create(name, {...builtReqParams, ...reqParams}).done();

			fnHandleRequest(options);
		}
	},
}

