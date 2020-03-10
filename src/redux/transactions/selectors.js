export function getAllTransactions(state) {
    const allTransactions = state.transactionsReducer.allTransactions;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
        total: allTransactions.totalCount,
        current: allTransactions.currentPage,
        pageSize: allTransactions.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    return {
        name: 'All Transactions',
        tracker: state.transactionsReducer.allTransactionsTracker,
        timestamp: state.transactionsReducer.allTransactionsTimestamp,
        data: state.transactionsReducer.allTransactions.records,
        noRecordMessage: 'No Transactions Found',
        pagination: pagination,
    }
}

export function getAllMyTransactions(state) {
    const allTransactions = state.transactionsReducer.myTransactions;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
        total: allTransactions.totalCount,
        current: allTransactions.currentPage,
        pageSize: allTransactions.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    return {
        name: 'My Transactions',
        tracker: state.transactionsReducer.myTransactionsTracker,
        timestamp: state.transactionsReducer.myTransactionsTimestamp,
        data: state.transactionsReducer.myTransactions.records,
        noRecordMessage: 'No Transactions Found',
        pagination: pagination,
    }
}

export function getMyTransaction(state) {
    return {
        name: 'My Transaction',
        tracker: state.transactionsReducer.myTransactionTracker,
        timestamp: state.transactionsReducer.myTransactionTimestamp,
        data: state.transactionsReducer.myTransaction,
    }
}
