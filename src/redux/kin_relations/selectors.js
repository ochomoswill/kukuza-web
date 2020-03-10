export function getKinRelations(state) {
    const allKinRelations = state.kinRelationsReducer.kinRelations;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} kinRelations`,
        total: allKinRelations.totalCount,
        current: allKinRelations.currentPage,
        pageSize: allKinRelations.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    return {
        name: 'KinRelations',
        tracker: state.kinRelationsReducer.kinRelationsTracker,
        timestamp: state.kinRelationsReducer.kinRelationsTimestamp,
        data: state.kinRelationsReducer.kinRelations.records,
        noRecordMessage: 'No KinRelations Found',
        pagination: pagination,
    }
}

export function getNewKinRelation(state) {
    return {
        name: 'New KinRelation',
        tracker: state.kinRelationsReducer.newKinRelationTracker,
        timestamp: state.kinRelationsReducer.newKinRelationTimestamp,
        data: state.kinRelationsReducer.newKinRelation,
    }
}
