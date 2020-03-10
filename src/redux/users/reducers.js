import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    /* Get all users */
    users: [],
    usersTracker: 'idle',
    usersTimestamp: undefined,

    /* Get a user */
    user: [],
    userTracker: 'idle',
    userTimestamp: undefined,

    /* Create a user */
    newUser: [],
    newUserTracker: {status: 'idle'},
    newUserTimestamp: undefined,

    /* Update a user */
    updatedUser: [],
    updatedUserTracker: {status: 'idle'},
    updatedUserTimestamp: undefined,

    /* Delete a user */
    deletedUser: [],
    deletedUserTracker: {status: 'idle'},
    deletedUserTimestamp: undefined,

    /* Get me */
    me: [],
    meTracker: {status: 'idle'},
    meTimestamp: undefined,

    /* Update me */
    updatedMe: [],
    updatedMeTracker: {status: 'idle'},
    updatedMeTimestamp: undefined,
});

export default function usersReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get all users */
        case types.GET_ALL_USERS_REQUEST:
            return state.merge({
                usersTracker: 'processing',
            });

        case types.GET_ALL_USERS_SUCCESS:
            return state.merge({
                usersTracker: 'success',
                users: action.users,
                usersTimestamp: action.timestamp,
            });

        case types.GET_ALL_USERS_FAILURE:
            return state.merge({
                usersTracker: 'error',
            });

        case types.RESET_GET_ALL_USERS:
            return state.merge({
                usersTracker: 'idle',
            });

        /* Get a user */
        case types.GET_USER_REQUEST:
            return state.merge({
                userTracker: 'processing',
            });

        case types.GET_USER_SUCCESS:
            return state.merge({
                userTracker: 'success',
                user: action.user,
                userTimestamp: action.timestamp,
            });

        case types.GET_USER_FAILURE:
            return state.merge({
                userTracker: 'error',
            });

        case types.RESET_GET_USER:
            return state.merge({
                userTracker: 'idle',
            });

        /* Create a user */
        case types.CREATE_USER_REQUEST:
            return state.merge({
                newUserTracker: {status: 'processing'},
            });

        case types.CREATE_USER_SUCCESS:
            return state.merge({
                newUserTracker: {status: 'success'},
                newUser: action.newUser,
                newUserTimestamp: action.timestamp,
            });

        case types.CREATE_USER_FAILURE:
            return state.merge({
                newUserTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_CREATE_USER:
            return state.merge({
                newUserTracker: {status: 'idle'},
            });

        /* Update a user */
        case types.UPDATE_USER_REQUEST:
            return state.merge({
                updatedUserTracker: {status: 'processing'},
            });

        case types.UPDATE_USER_SUCCESS:
            return state.merge({
                updatedUserTracker: {status: 'success'},
                updatedUser: action.updatedUser,
                updatedUserTimestamp: action.timestamp,
            });

        case types.UPDATE_USER_FAILURE:
            return state.merge({
                updatedUserTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_UPDATE_USER:
            return state.merge({
                updatedUserTracker: {status: 'idle'},
            });

        /* Delete a user */
        case types.DELETE_USER_REQUEST:
            return state.merge({
                deletedUserTracker: {status: 'processing'},
            });

        case types.DELETE_USER_SUCCESS:
            return state.merge({
                deletedUserTracker: {status: 'success'},
                deletedUser: action.deletedUser,
                deletedUserTimestamp: action.timestamp,
            });

        case types.DELETE_USER_FAILURE:
            return state.merge({
                deletedUserTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_DELETE_USER:
            return state.merge({
                deletedUserTracker: {status: 'idle'},
            });

        /*      ME      */

        /* Get me */
        case types.GET_ME_REQUEST:
            return state.merge({
                meTracker: {status: 'processing'},
            });

        case types.GET_ME_SUCCESS:
            return state.merge({
                meTracker: {status: 'success'},
                me: action.me,
                meTimestamp: action.timestamp,
            });

        case types.GET_ME_FAILURE:
            return state.merge({
                meTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_GET_ME:
            return state.merge({
                meTracker: {status: 'idle'},
            });


        /* Update me */
        case types.UPDATE_ME_REQUEST:
            return state.merge({
                updatedMeTracker: {status: 'processing'},
            });

        case types.UPDATE_ME_SUCCESS:
            return state.merge({
                updatedMeTracker: {status: 'success'},
                updatedMe: action.updatedMe,
                updatedMeTimestamp: action.timestamp,
            });

        case types.UPDATE_ME_FAILURE:
            return state.merge({
                updatedMeTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_UPDATE_ME:
            return state.merge({
                updatedMeTracker: {status: 'idle'},
            });

        default:
            return state
    }
}

/*const addNewUserToList = (newUser, usersList) => {
    console.log("Updating list after adding user");
    const node = newUser;
    const userDetails = {node};

    let newList = Immutable.asMutable(usersList, {deep: true});
    newList.push(userDetails);
    return newList;
};

const updatedUserInList = (updatedUser, usersList) => {
    console.log("Updating list after updating user");

    // converting immutable list to mutable
    let newList = Immutable.asMutable(usersList, {deep: true});
    newList.map((item, index) => {
        if (item.node.uid === updatedUser.uid) {
            item.node.email = updatedUser.email;
            item.node.phoneNumber = updatedUser.phoneNumber;
            item.node.firstName = updatedUser.firstName;
            item.node.lastName = updatedUser.lastName;
            item.node.username = updatedUser.username;
        }
    });
    return newList;
};

const removeUserFromList = (updatedUserId, usersList) => {
    console.log("Updating list after removing user");

    let newList = Immutable.asMutable(usersList, {deep: true});
    newList.map((item, index) => {
        if (item.node.id === updatedUserId) {
            //get index of item
            const index = newList.indexOf(item);
            // ensure its not the sentinel value (if and only if)
            if (index !== -1) {
                //remove item
                newList.splice(index, 1);
            }
        }
    });
    return newList;
};*/
