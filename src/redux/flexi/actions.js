export const ActionTypeSubString = {
    create : "create",
    read : "read",
    update : "update",
    delete : "delete"
}


export const ActionTypeStatus = {
    loading : "loading",
    success : "success",
    error : "error",
    reset : "reset"
}



/*export interface IMakeAction extends AnyAction {
    type: string,
    payload?: any,
    entity: string
}

export interface IActionTypeMeta {
    typeSubString: IActionTypeSubString
    status: IActionTypeStatus
    multiple?: boolean
}

export interface IPayloadMeta {
    payload?: IAPIRequestParams | any
    entity: string
}*/


export const makeAction = (actionTypeMeta, payloadMeta) => {
    const {typeSubString, status, multiple = false} = actionTypeMeta;
    const {payload, entity} = payloadMeta;

    return {
        type: `ENTIT${multiple ? 'IES' : 'Y'}_${typeSubString.toUpperCase()}_${status.toUpperCase()}`,
        payload,
        entity,
    };
};
