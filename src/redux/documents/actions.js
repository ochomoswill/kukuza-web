import * as types from './actionTypes'
import DocumentsService from './services'
import timeUtils from '../../utils/datetime'

// Get all documents
export function fetchAllMyDocuments(pageSize, pageNumber, filterObj) {
    return dispatch => {
        dispatch({type: types.GET_ALL_MY_DOCUMENTS_REQUEST});
        DocumentsService.getAllMyDocuments(pageSize, pageNumber, filterObj).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('domain')) {
                console.log("Fetch was successful");
                return dispatch({
                    type: types.GET_ALL_MY_DOCUMENTS_SUCCESS,
                    myDocuments: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({
                    type: types.GET_ALL_MY_DOCUMENTS_FAILURE,
                    errors: response.error,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }
        })
    }
}

export function resetFetchAllMyDocuments() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_ALL_MY_DOCUMENTS})
    }
}

// Get a document
export function fetchMyDocument(document) {
    return dispatch => {
        dispatch({type: types.GET_MY_DOCUMENT_REQUEST});
        DocumentsService.getMyDocument(document).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('attachmentTypeId')) {
                return dispatch({
                    type: types.GET_MY_DOCUMENT_SUCCESS,
                    myDocument: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else {
                return dispatch({type: types.GET_MY_DOCUMENT_FAILURE})
            }
        })
    }
}

export function resetFetchMyDocument() {
    return dispatch => {
        return dispatch({type: types.RESET_GET_MY_DOCUMENT})
    }
}

// Create a document
export function createMyDocument(document) {
    return dispatch => {
        dispatch({type: types.CREATE_MY_DOCUMENT_REQUEST});
        DocumentsService.createMyDocument(document).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('nextOfDocumentRelationId')) {
                return dispatch({
                    type: types.CREATE_MY_DOCUMENT_SUCCESS,
                    myNewDocument: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            } else if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.CREATE_MY_DOCUMENT_FAILURE,
                    errors: response.error,
                })
            }
        })
    }
}

export function resetCreateMyDocument() {
    return dispatch => {
        return dispatch({type: types.RESET_CREATE_MY_DOCUMENT})
    }
}

// Update a document
export function updateMyDocument(document) {
    return dispatch => {
        dispatch({type: types.UPDATE_MY_DOCUMENT_REQUEST});
        DocumentsService.updateMyDocument(document).then(response => {
            //console.log(response);

            if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.UPDATE_MY_DOCUMENT_FAILURE,
                    errors: response.error,
                })
            } else if (response) {
                return dispatch({
                    type: types.UPDATE_MY_DOCUMENT_SUCCESS,
                    myUpdatedDocument: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }
        })
    }
}

export function resetUpdateMyDocument() {
    return dispatch => {
        return dispatch({type: types.RESET_UPDATE_MY_DOCUMENT})
    }
}

// Delete a document
export function deleteMyDocument(document) {
    return dispatch => {
        dispatch({type: types.DELETE_MY_DOCUMENT_REQUEST});
        DocumentsService.deleteMyDocument(document).then(response => {
            //console.log(response);
            if (response.hasOwnProperty('error')) {
                return dispatch({
                    type: types.DELETE_MY_DOCUMENT_FAILURE,
                    errors: response.error,
                })
            } else if (response) {
                return dispatch({
                    type: types.DELETE_MY_DOCUMENT_SUCCESS,
                    myDeletedDocument: response,
                    timestamp: timeUtils.CurrentUSDateTime(),
                })
            }
        })
    }
}

export function resetDeleteDocument() {
    return dispatch => {
        return dispatch({type: types.RESET_DELETE_MY_DOCUMENT})
    }
}
