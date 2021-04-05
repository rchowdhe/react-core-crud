import {
    LOGIN, LOGIN_ERROR, LOGIN_SUCCESS
} from "../constants";

const initialState = { data: null, isLoading: false, error: null };

export const login = (state = { ...initialState, data: false }, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            console.log(action.data)
            return {
                data: action.data, isLoading: false, error: null
            };
        case LOGIN_ERROR:
            return {
                data: false, isLoading: false, error: action.error
            };
        default:
            return state;
    }
}