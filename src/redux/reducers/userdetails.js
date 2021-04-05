import {
    REMOVE_USER_BY_ID, REMOVE_USER_BY_ID_FAILURE, REMOVE_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAILURE,
    GET_ALL_USERS, GET_ALL_USERS_FAILURE, GET_ALL_USERS_SUCCESS,
    SAVE_USER, SAVE_USER_FAILURE, SAVE_USER_SUCCESS
} from "../constants";

const initialState = { data: null, isLoading: false, error: null };

export const findAllUsers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, isLoading: true };
        case GET_ALL_USERS_SUCCESS:
            return {
                data: action.data, isLoading: false, error: null
            };
        case GET_ALL_USERS_FAILURE:
            return {
                data: null, isLoading: false, error: action.error
            };
        default:
            return { ...state, data: null };
    }
}

export const findUserById = (state = { ...initialState, data: false }, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            return { ...state, isLoading: true };
        case GET_USER_BY_ID_SUCCESS:
            console.log(action.data)
            return {
                data: action.data, isLoading: false, error: null
            };
        case GET_USER_BY_ID_FAILURE:
            return {
                data: false, isLoading: false, error: action.error
            };
        default:
            return state;
    }
}

export const saveUser = (state = { ...initialState }, action) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state, data: null, isLoading: true
            };
        case SAVE_USER_SUCCESS:
            return {
                data: action.data, isLoading: false, error: null
            };
        case SAVE_USER_FAILURE:
            return {
                data: null, isLoading: false, error: null
            };
        default:
            return {
                ...state, data: null
            };
    }
}

export const removeUser = (state = { ...initialState, data: false }, action) => {
    switch (action.type) {
        case REMOVE_USER_BY_ID:
            return {
                ...state, data: false, loading: true
            }
        case REMOVE_USER_BY_ID_SUCCESS:
            return {
                data: true, loading: false, error: null
            }
        case REMOVE_USER_BY_ID_FAILURE:
            return {
                data: false, isLoading: false, error: action.error
            };
        default:
            return { ...state, data: false };
    }
}