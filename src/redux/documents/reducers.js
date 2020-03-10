import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    /* Get all my documents */
    myDocuments: [],
    myDocumentsTracker: {status: 'idle'},
    myDocumentsTimestamp: undefined,

    /* Get my document */
    myDocument: [],
    myDocumentTracker: {status: 'idle'},
    myDocumentTimestamp: undefined,

    /* Create my document */
    myNewDocument: [],
    myNewDocumentTracker: {status: 'idle'},
    myNewDocumentTimestamp: undefined,

    /* Update my document */
    myUpdatedDocument: [],
    myUpdatedDocumentTracker: {status: 'idle'},
    myUpdatedDocumentTimestamp: undefined,

    /* Delete my document */
    myDeletedDocument: [],
    myDeletedDocumentTracker: {status: 'idle'},
    myDeletedDocumentTimestamp: undefined,
});

export default function documentsReducer(state = initialState, action = {}) {
    switch (action.type) {
        /* Get all documents */
        case types.GET_ALL_MY_DOCUMENTS_REQUEST:
            return state.merge({
                myDocumentsTracker: {status: 'processing'},
            });

        case types.GET_ALL_MY_DOCUMENTS_SUCCESS:
            return state.merge({
                myDocumentsTracker: {status: 'success'},
                myDocuments: action.myDocuments,
                myDocumentsTimestamp: action.timestamp,
            });

        case types.GET_ALL_MY_DOCUMENTS_FAILURE:
            return state.merge({
                myDocumentsTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                myDocumentsTimestamp: action.timestamp,
            });

        case types.RESET_GET_ALL_MY_DOCUMENTS:
            return state.merge({
                myDocumentsTracker: {status: 'idle'},
            });

        /* Get my document */
        case types.GET_MY_DOCUMENT_REQUEST:
            return state.merge({
                myDocumentTracker: {status: 'processing'},
            });

        case types.GET_MY_DOCUMENT_SUCCESS:
            return state.merge({
                myDocumentTracker: {status: 'success'},
                myDocument: action.myDocument,
                myDocumentTimestamp: action.timestamp,
            });

        case types.GET_MY_DOCUMENT_FAILURE:
            return state.merge({
                myDocumentTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                myDocumentTimestamp: action.timestamp,
            });

        case types.RESET_GET_MY_DOCUMENT:
            return state.merge({
                myDocumentTracker: {status: 'idle'},
            });

        /* Create my document */
        case types.CREATE_MY_DOCUMENT_REQUEST:
            return state.merge({
                myNewDocumentTracker: {status: 'processing'},
            });

        case types.CREATE_MY_DOCUMENT_SUCCESS:
            return state.merge({
                myNewDocumentTracker: {status: 'success'},
                myNewDocument: action.myNewDocument,
                myNewDocumentTimestamp: action.timestamp,
            });

        case types.CREATE_MY_DOCUMENT_FAILURE:
            return state.merge({
                myNewDocumentTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                myNewDocumentTimestamp: action.timestamp,
            });

        case types.RESET_CREATE_MY_DOCUMENT:
            return state.merge({
                myNewDocumentTracker: {status: 'idle'},
            });

        /* Update my document */
        case types.UPDATE_MY_DOCUMENT_REQUEST:
            return state.merge({
                myUpdatedDocumentTracker: {status: 'processing'},
            });

        case types.UPDATE_MY_DOCUMENT_SUCCESS:
            return state.merge({
                myUpdatedDocumentTracker: {status: 'success'},
                myUpdatedDocument: action.myUpdatedDocument,
                myUpdatedDocumentTimestamp: action.timestamp,
            });

        case types.UPDATE_MY_DOCUMENT_FAILURE:
            return state.merge({
                myUpdatedDocumentTracker: {
                    status: 'error',
                    errors: action.errors,
                },
            });

        case types.RESET_UPDATE_MY_DOCUMENT:
            return state.merge({
                myUpdatedDocumentTracker: {status: 'idle'},
            });

        /* Delete my document */
        case types.DELETE_MY_DOCUMENT_REQUEST:
            return state.merge({
                myDeletedDocumentTracker: {status: 'processing'},
            });

        case types.DELETE_MY_DOCUMENT_SUCCESS:
            return state.merge({
                myDeletedDocumentTracker: {status: 'success'},
                myDeletedDocument: action.myDeletedDocument,
                myDeletedDocumentTimestamp: action.timestamp,
            });

        case types.DELETE_MY_DOCUMENT_FAILURE:
            return state.merge({
                myDeletedDocumentTracker: {
                    status: 'error',
                    errors: action.errors,
                },
                myDeletedDocumentTimestamp: action.timestamp,
            });

        case types.RESET_DELETE_MY_DOCUMENT:
            return state.merge({
                myDeletedDocumentTracker: {status: 'idle'},
            });

        default:
            return state
    }
}


