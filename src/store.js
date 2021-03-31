import { combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';

//// action types
export const ADD_FILE = 'ADD_FILE';
export const REMOVE_FILE = 'REMOVE_FILE';
export const SELECT_FILE = 'SELECT_FILE';
export const CLOSE_FILE = 'CLOSE_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';

//// actions
export const addFile = ( name, content = '' ) => {
    return {
        type: ADD_FILE,
        payload: {
            fileID: uuid(),
            fileData: { name, content },
        },
    };
};

export const removeFile = ( fileID ) => {
    return {
        type: REMOVE_FILE,
        payload: { fileID },
    };
};

export const selectFile = ( fileID ) => {
    return {
        type: SELECT_FILE,
        payload: { fileID },
    };
};

export const closeFile = ( fileID ) => {
    return {
        type: CLOSE_FILE,
        payload: { fileID },
    };
};

export const editFile = ( fileID, content ) => {
    return {
        type: UPDATE_FILE,
        payload: { 
            fileID, 
            data: { content },
        },
    };
};

// selectors
export const getFiles = state => state.files;
export const getOpenFiles = state => state.openFiles;
export const getActiveFile = state => state.activeFile;

const filesReducer = ( files = {}, action ) => {
    switch ( action.type ) {
    case ADD_FILE:
        return {
            ...files,
            [ action.payload.fileID ]: action.payload.fileData,
        };
    case REMOVE_FILE:
        const { [ action.payload.fileID ]: removedFile, ...newFiles } = files;
        return newFiles;
    case UPDATE_FILE:
        return {
            ...files,
            [ action.payload.fileID ] : {
                ...files[ action.payload.fileID ],
                ...action.payload.data,
            },
        };
    default: return files;
    }
};

const openFilesReducer = ( openFiles = [], action ) => {
    switch ( action.type ) {
    case CLOSE_FILE:
    case REMOVE_FILE:
        return openFiles.filter( fileID => fileID !== action.payload.fileID );
    case ADD_FILE:
    case SELECT_FILE:
        return openFiles.concat( [ action.payload.fileID ] );
    default: return openFiles;
    }
};

const activeFileReducer = ( activeFile = null, action ) => {
    switch ( action.type ) {
    case CLOSE_FILE:
    case REMOVE_FILE:
        return activeFile === action.payload.fileID ? null : activeFile;
    case ADD_FILE:
    case SELECT_FILE:
        return action.payload.fileID;
    default: return activeFile;
    }
};

// reducers
export const appReducer = combineReducers( {
    files: filesReducer,
    openFiles: openFilesReducer,
    activeFile: activeFileReducer,
} );
