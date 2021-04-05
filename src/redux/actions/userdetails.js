import { GET_ALL_USERS, GET_USER_BY_ID, SAVE_USER, REMOVE_USER_BY_ID } from "../constants";

export function findAll(action) {

    return {
        type: GET_ALL_USERS,
        action
    }
}

export function findById(id) {
    return {
        type: GET_USER_BY_ID,
        id
    }
}

export function save(model) {
    return {
        type: SAVE_USER,
        model
    }
}

export function removeById(id) {
    return {
        type: REMOVE_USER_BY_ID,
        id
    }
}
