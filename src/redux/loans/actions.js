import * as types from './actionTypes'
import LoansService from './services'
import timeUtils from '../../utils/datetime'

// Get all my loans
export function fetchAllMyLoans() {
    return dispatch => {
        dispatch({type: types.GET_ALL_MY_LOANS_REQUEST});
        LoansService.getAllMyLoans().then(response => {
            console.log('My Loans ', response);
            /*if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_ALL_MY_LOANS_SUCCESS,
                    myLoans: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_ALL_MY_LOANS_FAILURE})
            }*/

            if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.GET_ALL_MY_LOANS_FAILURE,
                    errors: response.error,
                })
            } else {
                return dispatch({
                    type: types.GET_ALL_MY_LOANS_SUCCESS,
                    myLoans: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }


        })
    }
}

export function resetFetchAllMyLoans() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_MY_LOANS})
    }
}

// Get my loan
export function fetchMyLoan(loanId) {
    return dispatch => {
        dispatch({type: types.GET_MY_LOAN_REQUEST});
        LoansService.getMyLoan(loanId).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_MY_LOAN_SUCCESS,
                    myLoan: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_MY_LOAN_FAILURE})
            }
        })
    }
}

export function resetFetchMyLoan() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_MY_LOAN})
    }
}

// Apply for loan
export function applyLoan(loanDetails) {
    return dispatch => {
        dispatch({type: types.APPLY_LOAN_REQUEST});
        LoansService.createLoan(loanDetails).then(response => {
            console.log('Loan application response ', response);
            /*if (response) {
                return dispatch({
                    type: types.APPLY_LOAN_SUCCESS,
                    loanCreation: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.APPLY_LOAN_FAILURE})
            }*/

            if (response.data.hasOwnProperty('error')) {
                return dispatch({
                    type: types.APPLY_LOAN_FAILURE,
                    errors: response.data.error,
                    message: response.data.message
                })
            } else {
                return dispatch({
                    type: types.APPLY_LOAN_SUCCESS,
                    loanCreation: response.data,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }
        })
    }
}

export function resetApplyLoan() {
    return dispatch => {
        return dispatch({type: types.RESET_APPLY_LOAN})
    }
}

// Get Loan Types
export function fetchLoanTypes() {
    return dispatch => {
        dispatch({type: types.GET_LOAN_TYPES_REQUEST});
        LoansService.getAllLoanTypes().then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_LOAN_TYPES_SUCCESS,
                    loanTypes: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_ALL_MY_LOANS_FAILURE})
            }
        })
    }
}

export function resetFetchLoanTypes() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_LOAN_TYPES})
    }
}

// Get Loan Status
export function fetchLoanStati() {
    return dispatch => {
        dispatch({type: types.GET_LOAN_STATI_REQUEST});
        LoansService.getAllLoanStatus().then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_LOAN_STATI_SUCCESS,
                    loanStati: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_LOAN_STATI_FAILURE})
            }
        })
    }
}

export function resetFetchLoanStati() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_LOAN_STATI})
    }
}

/* Get All My Guarantors */
export function fetchAllMyGuarantors(filterObj) {
    return dispatch => {
        dispatch({type: types.GET_ALL_MY_GUARANTORS_REQUEST});
        LoansService.getAllMyGuarantors(filterObj).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GET_ALL_MY_GUARANTORS_SUCCESS,
                    myGuarantors: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_ALL_MY_GUARANTORS_FAILURE})
            }
        })
    }
}

export function resetFetchAllMyGuarantors() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_MY_GUARANTORS})
    }
}

/* Get All My Guarantorship Requests */
export function fetchAllMyGuarantorshipRequests() {
    return dispatch => {
        dispatch({type: types.GUARANTORSHIP_REQUEST_REQUEST});
        LoansService.getAllMyGuarantorsRequests().then(response => {
            console.log(response);
            if (response.hasOwnProperty('domain')) {
                return dispatch({
                    type: types.GUARANTORSHIP_REQUEST_SUCCESS,
                    myGuarantorshipRequests: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GUARANTORSHIP_REQUEST_FAILURE})
            }
        })
    }
}

export function resetFetchAllMyGuarantorshipRequests() {
    return dispatch => {
        return dispatch({type: types.RESET_GUARANTORSHIP_REQUEST})
    }
}

/* Update Guarantorship Requests */
export function updateGuarantorshipRequests(filterObj) {
    return dispatch => {
        dispatch({type: types.UPDATE_GUARANTORSHIP_REQUEST_REQUEST});
        LoansService.updateGuarantorsRequests(filterObj).then(response => {
            console.log('Update Guarantorship Request ', response);
            if (response.hasOwnProperty('response')) {
                return dispatch({
                    type: types.UPDATE_GUARANTORSHIP_REQUEST_SUCCESS,
                    updateGuarantorshipRequests: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.UPDATE_GUARANTORSHIP_REQUEST_FAILURE})
            }
        })
    }
}

export function resetUpdateGuarantorshipRequests() {
    return dispatch => {
        return dispatch({type: types.RESET_UPDATE_GUARANTORSHIP_REQUEST})
    }
}
