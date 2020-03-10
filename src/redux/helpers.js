import {ActionTypeStatus} from "redux/flexi/actions";

export const EntityPropertyTypes = {
    create : "create",
    update : "update",
    delete : "delete",
    readOne : "readOne",
    readMany : "readMany"
}


const computeActionKey = (actionType) => {
    if (actionType.includes('CREATE')) {
        return EntityPropertyTypes.create;
    }
    if (actionType.includes('S_READ')) {
        return EntityPropertyTypes.readMany;
    }
    if (actionType.includes('READ')) {
        return EntityPropertyTypes.readOne;
    }
    if (actionType.includes('UPDATE')) {
        return EntityPropertyTypes.update;
    }
    if (actionType.includes('DELETE')) {
        return EntityPropertyTypes.delete;
    }
    return '';
};

export const computeReducer = (state, action) => {

    const actionKey = computeActionKey(action.type);

    if (action.type.includes('LOADING')) {
        return {
            [action.entity]: {
                // @ts-ignore
                ...state[action.entity],
                [actionKey]: {
                    tracker: {status: ActionTypeStatus.loading},
                    data: {},
                    timestamp: new Date().getTime()
                }
            }
        };
    }
    if (action.type.includes('SUCCESS')) {
        return {
            [action.entity]: {
                // @ts-ignore
                ...state[action.entity],
                [actionKey]: {
                    tracker: {status: ActionTypeStatus.success},
                    data: action.payload,
                    timestamp: new Date().getTime()
                }
            }
        };
    }
    if (action.type.includes('ERROR')) {
        return {
            [action.entity]: {
                // @ts-ignore
                ...state[action.entity],
                [actionKey]: {
                    tracker: {status: ActionTypeStatus.error, errors: action.payload},
                    data: {},
                    timestamp: new Date().getTime()
                }
            }
        };
    }
    if (action.type.includes('RESET')) {
        return {
            [action.entity]: {
                // @ts-ignore
                ...state[action.entity],
                [actionKey]: {
                    // @ts-ignore
                    ...state[action.entity][actionKey],
                    tracker: {status: ActionTypeStatus.reset},
                    timestamp: new Date().getTime()
                }
            }
        };
    }

    return state;
};
