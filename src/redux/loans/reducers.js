import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Get all my loans */
    myLoans: [],
    myLoansTracker: 'idle',
    myLoansTimestamp: undefined,

    /* Get my loan */
    myLoan: [],
    myLoanTracker: 'idle',
    myLoanTimestamp: undefined,

    /* Apply for loan */
    loanCreation: [],
    loanCreationTracker: {status: 'idle'},
    loanCreationTimestamp: undefined,

    /* Get loan types */
    loanTypes: [],
    loanTypesTracker: 'idle',
    loanTypesTimestamp: undefined,

    /* Get loan stati */
    loanStati: [],
    loanStatiTracker: 'idle',
    loanStatiTimestamp: undefined,

    /* Get all my guarantors */
    myGuarantors: [],
    myGuarantorsTracker: 'idle',
    myGuarantorsTimestamp: undefined,

    /* Get all my guarantorship requests */
    myGuarantorshipRequests: [],
    myGuarantorshipRequestsTracker: 'idle',
    myGuarantorshipRequestsTimestamp: undefined,

    /* Update guarantorship requests */
    updateGuarantorshipRequests: [],
    updateGuarantorshipRequestsTracker: 'idle',
    updateGuarantorshipRequestsTimestamp: undefined,
});

export default function loansReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get all my loans */
        case types.GET_ALL_MY_LOANS_REQUEST:
            return state.merge({
                myLoansTracker: 'processing',
            });

        case types.GET_ALL_MY_LOANS_SUCCESS:
            return state.merge({
                myLoansTracker: 'success',
                myLoans: action.myLoans,
                myLoansTimestamp: action.timestamp,
            });

        case types.GET_ALL_MY_LOANS_FAILURE:
            return state.merge({
                myLoansTracker: 'error',
            });

        case types.RESET_GET_ALL_MY_LOANS:
            return state.merge({
                myLoansTracker: 'idle',
            });

        /* Get my loan */
        case types.GET_MY_LOAN_REQUEST:
            return state.merge({
                myLoanTracker: 'processing',
            });

        case types.GET_MY_LOAN_SUCCESS:
            return state.merge({
                myLoanTracker: 'success',
                myLoan: action.myLoan,
                myLoanTimestamp: action.timestamp,
            });

        case types.GET_MY_LOAN_FAILURE:
            return state.merge({
                myLoanTracker: 'error',
            });

        case types.RESET_GET_MY_LOAN:
            return state.merge({
                myLoanTracker: 'idle',
            });

        /* Apply for a loan */
        case types.APPLY_LOAN_REQUEST:
            return state.merge({
                loanCreationTracker: {status: 'processing'},
            });

        case types.APPLY_LOAN_SUCCESS:
            return state.merge({
                loanCreationTracker: {status: 'success'},
                loanCreation: action.loanCreation,
                loanCreationTimestamp: action.timestamp,
            });

        case types.APPLY_LOAN_FAILURE:
            return state.merge({
                loanCreationTracker: {
                    status: 'error',
                    errors: action.errors,
                    message: action.message
                }
            });

        case types.RESET_APPLY_LOAN:
            return state.merge({
                loanCreationTracker: {status: 'idle'},
            });

        /* Get Loan Types */
        case types.GET_LOAN_TYPES_REQUEST:
            return state.merge({
                loanTypesTracker: 'processing',
            });

        case types.GET_LOAN_TYPES_SUCCESS:
            return state.merge({
                loanTypesTracker: 'success',
                loanTypes: action.loanTypes,
                loanTypesTimestamp: action.timestamp,
            });

        case types.GET_LOAN_TYPES_FAILURE:
            return state.merge({
                loanTypesTracker: 'error',
            });

        case types.RESET_GET_LOAN_TYPES:
            return state.merge({
                loanTypesTracker: 'idle',
            });

        /* Get Loan Stati */
        case types.GET_LOAN_STATI_REQUEST:
            return state.merge({
                loanStatiTracker: 'processing',
            });

        case types.GET_LOAN_STATI_SUCCESS:
            return state.merge({
                loanStatiTracker: 'success',
                loanStati: action.loanStati,
                loanStatiTimestamp: action.timestamp,
            });

        case types.GET_LOAN_STATI_FAILURE:
            return state.merge({
                loanStatiTracker: 'error',
            });

        case types.RESET_GET_LOAN_STATI:
            return state.merge({
                loanStatiTracker: 'idle',
            });

        /* Get All My Guarantors */
        case types.GET_ALL_MY_GUARANTORS_REQUEST:
            return state.merge({
                myGuarantorsTracker: 'processing',
            });

        case types.GET_ALL_MY_GUARANTORS_SUCCESS:
            return state.merge({
                myGuarantorsTracker: 'success',
                myGuarantors: action.myGuarantors,
                myGuarantorsTimestamp: action.timestamp,
            });

        case types.GET_ALL_MY_GUARANTORS_FAILURE:
            return state.merge({
                myGuarantorsTracker: 'error',
            });

        case types.RESET_GET_ALL_MY_GUARANTORS:
            return state.merge({
                myGuarantorsTracker: 'idle',
            });

        /* Get All My Guarantorship Requests */
        case types.GUARANTORSHIP_REQUEST_REQUEST:
            return state.merge({
                myGuarantorshipRequestsTracker: 'processing',
            });

        case types.GUARANTORSHIP_REQUEST_SUCCESS:
            return state.merge({
                myGuarantorshipRequestsTracker: 'success',
                myGuarantorshipRequests: action.myGuarantorshipRequests,
                myGuarantorshipRequestsTimestamp: action.timestamp,
            });

        case types.GUARANTORSHIP_REQUEST_FAILURE:
            return state.merge({
                myGuarantorshipRequestsTracker: 'error',
            });

        case types.RESET_GUARANTORSHIP_REQUEST:
            return state.merge({
                myGuarantorshipRequestsTracker: 'idle',
            });

        /* Update Guarantorship Requests */
        case types.UPDATE_GUARANTORSHIP_REQUEST_REQUEST:
            return state.merge({
                updateGuarantorshipRequestsTracker: 'processing',
            });

        case types.UPDATE_GUARANTORSHIP_REQUEST_SUCCESS:
            return state.merge({
                updateGuarantorshipRequestsTracker: 'success',
                updateGuarantorshipRequests: action.updateGuarantorshipRequests,
                updateGuarantorshipRequestsTimestamp: action.timestamp,
            });

        case types.UPDATE_GUARANTORSHIP_REQUEST_FAILURE:
            return state.merge({
                updateGuarantorshipRequestsTracker: 'error',
            });

        case types.RESET_UPDATE_GUARANTORSHIP_REQUEST:
            return state.merge({
                updateGuarantorshipRequestsTracker: 'idle',
            });

        default:
            return state
    }
}
