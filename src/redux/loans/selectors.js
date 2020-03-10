export function getAllMyLoans(state) {
    const allLoans = state.loansReducer.myLoans;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} loans`,
        total: allLoans.totalCount,
        current: allLoans.currentPage,
        pageSize: allLoans.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    return {
        name: 'My Loans',
        tracker: state.loansReducer.myLoansTracker,
        timestamp: state.loansReducer.myLoansTimestamp,
        data: state.loansReducer.myLoans.records,
        noRecordMessage: 'No Loans Found',
        pagination: pagination,
    }
}

export function getMyLoan(state) {
    return {
        name: 'My Loan',
        tracker: state.loansReducer.myLoanTracker,
        timestamp: state.loansReducer.myLoanTimestamp,
        data: state.loansReducer.myLoan.records,
    }
}

export function loanCreation(state) {
    return {
        name: 'Loan Creation',
        tracker: state.loansReducer.loanCreationTracker,
        timestamp: state.loansReducer.loanCreationTimestamp,
        data: state.loansReducer.loanCreation,
    }
}

export function getLoanTypes(state) {
    return {
        name: 'Loan Types',
        tracker: state.loansReducer.loanTypesTracker,
        timestamp: state.loansReducer.loanTypesTimestamp,
        data: state.loansReducer.loanTypes.records,
    }
}

export function getLoanStati(state) {
    return {
        name: 'Loan Stati',
        tracker: state.loansReducer.loanStatiTracker,
        timestamp: state.loansReducer.loanStatiTimestamp,
        data: state.loansReducer.loanStati.records,
    }
}

/* Get All My Guarantors */
export function getAllMyGuarantors(state) {
    return {
        name: 'My Guarantors',
        tracker: state.loansReducer.myGuarantorsTracker,
        timestamp: state.loansReducer.myGuarantorsTimestamp,
        data: state.loansReducer.myGuarantors.records,
    }
}

/* Get All My Guarantorship Requests */
export function getAllMyGuarantorshipRequests(state) {
    return {
        name: 'My Guarantorship Requests',
        tracker: state.loansReducer.myGuarantorshipRequestsTracker,
        timestamp: state.loansReducer.myGuarantorshipRequestsTimestamp,
        data: state.loansReducer.myGuarantorshipRequests.records,
    }
}

/* Update Guarantorship Requests */
export function getUpdateGuarantorshipRequests(state) {
    return {
        name: 'Update Guarantorship Requests',
        tracker: state.loansReducer.updateGuarantorshipRequestsTracker,
        timestamp: state.loansReducer.updateGuarantorshipRequestsTimestamp,
        data: state.loansReducer.updateGuarantorshipRequests.records,
    }
}
