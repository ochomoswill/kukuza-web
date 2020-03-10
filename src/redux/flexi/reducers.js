import {computeReducer} from "redux/helpers";

export const flexiReducer = (state = {}, action) => {
    return {
        ...state,
        ...computeReducer(state, action)
    };
};

//export default reducer;
