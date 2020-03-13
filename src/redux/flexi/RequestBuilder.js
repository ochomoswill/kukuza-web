class RequestParams {
	/* Receives the builder and assigns the values */
	constructor(builder) {
		this.url = builder.url;
		this.method = builder.method;
		this.data = builder.data|| {};
		this.headers = builder.headers || {};
		this.urlParams = builder.urlParams || [];
		this.compositeKey = builder.compositeKey || [];
		this.getParams = builder.getParams || {};
		this.withAuth = builder.withAuth || false;
	}

	/* Some Business logic and abstract/generic methods here */
}

export class RequestParamsBuilder {
	methods = new Map([
		["post", "POST"],
		["get", "GET"],
		["put", "PUT"],
		["delete", "DELETE"],
		["patch", "PATCH"],
	])

	constructor(){}

	// Urls
	withUrl(url) {
		this.url = url;
		return this;
	};

	withMethod(method){
		this.method = this.methods.get(method)
		return this;
	}

	// data
	withData(data){
		this.data = data;
		return this;
	}

	// headers
	withHeaders(headers){
		this.headers = headers;
		return this;
	}

	// urlParams
	withUrlParams(urlParams){
		this.urlParams = urlParams;
		return this;
	}

	// composite key
	withCompositeKey(compositeKey){
		this.compositeKey = compositeKey;
		return this;
	}

	// get params
	withGetParams(getParams){
		this.getParams = getParams;
		return this;
	}

	// with Auth
	isAuthenticated(){
		this.withAuth = true;
		return this;
	}

	/* Could also be called getProfile() */
	build() {
		return new RequestParams(this);
	}
}


class HandleRequestOpts {
	/* Receives the builder and assigns the values */
	constructor(builder) {
		this.typeSubString = builder.typeSubString;
		this.reqParams = builder.reqParams;
		this.entity = builder.entity;
		this.multiple = builder.multiple|| false;
		this.status = builder.status|| "loading";
	}

	/* Some Business logic and abstract/generic methods here */
}

export class HandleRequestOptsBuilder {
	types = new Map([
		["create", "create"],
		["update", "update"],
		["delete", "delete"],
		["read", "read"]
	])

	constructor(){}

	withType(type, isMultiple = false) {
		this.typeSubString = this.types.get(type);

		if(type === "read"){
			this.multiple = isMultiple;
		}

		return this;
	};

	withReqParams(reqParams){
		switch (this.typeSubString) {
			case "read":
				reqParams.method = "GET"
				break;

			case "delete":
				reqParams.method = "DELETE"
				break;

			case "update":
				reqParams.method = "PATCH"
				break;

			case "create":
				if(reqParams.method){
					if(reqParams.method === "POST" || reqParams.method === "PUT"){
						console.log("Taking the assigned method on Request Params")
					}else{
						throw new Error(`Invalid Request Method, ${reqParams.method}, assigned! It should either be a PUT or POST.`)
					}
				}else{
					reqParams.method = "PUT"
				}

				break;

		}
		this.reqParams = reqParams
		return this;
	}

	withEntity(entity){
		this.entity = entity;
		return this;
	}

	withStatus(status){
		this.status = status
		return this;
	}

	build() {
		return new HandleRequestOpts(this);
	}
}



export class HandleRequestOptsDirector {
	constructor(builder){
		this.builder = builder;
	}

	create(entity, reqParams) {

		this.builder = this.builder
			.withType("create")
			.withReqParams(reqParams)
			.withEntity(entity);

		return this;
	};

	update(entity, reqParams) {


		this.builder = this.builder
			.withType("update")
			.withReqParams(reqParams)
			.withEntity(entity);

		return this;
	};

	read(entity, reqParams) {
		this.builder = this.builder
			.withType("read")
			.withReqParams(reqParams)
			.withEntity(entity);

		return this;
	};

	delete(entity, reqParams) {

		this.builder = this.builder
			.withType("delete")
			.withReqParams(reqParams)
			.withEntity(entity);

		return this;
	};

	reset(){
		return this.builder.withStatus("reset").build();
	}

	done(){
		return this.builder.build();
	}
}





