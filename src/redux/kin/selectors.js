export function getKins(state) {
    const allKins = state.kinsReducer.kins;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} kins`,
        total: allKins.totalCount,
        current: allKins.currentPage,
        pageSize: allKins.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    return {
        name: 'Kins',
        tracker: state.kinsReducer.kinsTracker,
        timestamp: state.kinsReducer.kinsTimestamp,
        data: state.kinsReducer.kins.records,
        noRecordMessage: 'No Kins Found',
        pagination: pagination,
    }
}

export function getNewKin(state) {
    return {
        name: 'New Kin',
        tracker: state.kinsReducer.newKinTracker,
        timestamp: state.kinsReducer.newKinTimestamp,
        data: state.kinsReducer.newKin,
    }
}

export function getUpdatedKin(state) {
    return {
        name: 'Updated Kin',
        tracker: state.kinsReducer.updatedKinTracker,
        timestamp: state.kinsReducer.updatedKinTimestamp,
        data: state.kinsReducer.updatedKin,
    }
}

export function getDeletedKin(state) {
    return {
        name: 'Deleted Kin',
        tracker: state.kinsReducer.deletedKinTracker,
        timestamp: state.kinsReducer.deletedKinTimestamp,
        data: state.kinsReducer.deletedKin,
    }
}
