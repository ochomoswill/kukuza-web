export function getMyDocuments(state) {
    const allDocuments = state.documentsReducer.myDocuments;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} documents`,
        total: allDocuments.totalCount,
        current: allDocuments.currentPage,
        pageSize: allDocuments.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    return {
        name: 'My Documents',
        tracker: state.documentsReducer.myDocumentsTracker,
        timestamp: state.documentsReducer.myDocumentsTimestamp,
        data: state.documentsReducer.myDocuments.records,
        noRecordMessage: 'No Documents Found',
        pagination: pagination,
    }
}

export function getMyNewDocument(state) {
    return {
        name: 'My New Document',
        tracker: state.documentsReducer.myNewDocumentTracker,
        timestamp: state.documentsReducer.myNewDocumentTimestamp,
        data: state.documentsReducer.myNewDocument,
    }
}

export function getMyUpdatedDocument(state) {
    return {
        name: 'My Updated Document',
        tracker: state.documentsReducer.myUpdatedDocumentTracker,
        timestamp: state.documentsReducer.myUpdatedDocumentTimestamp,
        data: state.documentsReducer.myUpdatedDocument,
    }
}

export function getMyDeletedDocument(state) {
    return {
        name: 'My Deleted Document',
        tracker: state.documentsReducer.myDeletedDocumentTracker,
        timestamp: state.documentsReducer.myDeletedDocumentTimestamp,
        data: state.documentsReducer.myDeletedDocument,
    }
}
