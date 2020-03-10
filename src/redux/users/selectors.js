export function getUsers(state) {
    const allUsers = state.usersReducer.users;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
        total: allUsers.totalCount,
        current: allUsers.currentPage,
        pageSize: allUsers.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    return {
        name: 'Users',
        tracker: state.usersReducer.usersTracker,
        timestamp: state.usersReducer.usersTimestamp,
        data: state.usersReducer.users.records,
        noRecordMessage: 'No Users Found',
        pagination: pagination,
    }
}

export function getNewUser(state) {
    return {
        name: 'New User',
        tracker: state.usersReducer.newUserTracker,
        timestamp: state.usersReducer.newUserTimestamp,
        data: state.usersReducer.newUser,
    }
}


export function getMe(state) {
    return {
        name: 'Me',
        tracker: state.usersReducer.meTracker,
        timestamp: state.usersReducer.meTimestamp,
        data: state.usersReducer.me,
    }
}

export function getUpdatedMe(state) {
    return {
        name: 'Updated Me',
        tracker: state.usersReducer.updatedMeTracker,
        timestamp: state.usersReducer.updatedMeTimestamp,
        data: state.usersReducer.updatedMe,
    }
}
