import { put, takeLatest } from "redux-saga/effects";
import {
    REMOVE_USER_BY_ID, REMOVE_USER_BY_ID_FAILURE, REMOVE_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAILURE,
    GET_ALL_USERS, GET_ALL_USERS_FAILURE, GET_ALL_USERS_SUCCESS,
    SAVE_USER, SAVE_USER_FAILURE, SAVE_USER_SUCCESS
} from "../constants";

import axios from "../../config/api";
import inMemoryJWT from './../../utils/inMemoryJwt';

const API_URL = "https://localhost:44313/api/User/";

function* findAllUsers(action) {
    let result = yield axios.get(API_URL + 'getallusers', { headers: { "Authorization": `Bearer ${ inMemoryJWT.getToken() }` } })
        .then(data => {
            return ({
                type: GET_ALL_USERS_SUCCESS,
                data: data
            })
        })
        .catch(err => {
            return ({
                type: GET_ALL_USERS_FAILURE,
                error: err
            })
        })
    yield put(result)
}

function* findUserById(action) {
    let result = yield axios.get(API_URL + `getuser/${ action.id }`, { headers: { "Authorization": `Bearer ${ inMemoryJWT.getToken() }` } })
        .then(data => {
            return ({
                type: GET_USER_BY_ID_SUCCESS,
                data: data
            })
        })
        .catch(err => {
            return ({
                type: GET_USER_BY_ID_FAILURE,
                error: err
            })
        })
    yield put(result)
}

function* saveUser(action) {
    let model = action.model;
    let method = 'POST',
        url = 'adduser';

    if (model.id) {
        method = "PUT";
        url = 'updateuser/' + model.id
    }

    var form_data = new FormData();
    for (var key in model) {
        form_data.append(key, model[key]);
    }

    let result = yield axios({
        url: API_URL + url,
        method: method,
        data: form_data,
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${ inMemoryJWT.getToken() }`
        }
    }).then(data => {
        return {
            type: SAVE_USER_SUCCESS,
            data: data
        }
    }).catch(e => {
        return {
            type: SAVE_USER_FAILURE,
            error: e
        }
    })

    yield put(result)
}

function* removeUser(action) {
    let result = yield axios.delete(API_URL + 'removeuser/' + action.id, { headers: { "Authorization": `Bearer ${ inMemoryJWT.getToken() }` } })
        .then(data => {
            return ({
                type: REMOVE_USER_BY_ID_SUCCESS,
                data: data.list
            })
        })
        .catch(err => {
            return ({
                type: REMOVE_USER_BY_ID_FAILURE,
                error: err
            })
        })
    yield put(result)
}

export function* watchFindAllUsers() {
    yield takeLatest(GET_ALL_USERS, findAllUsers)
}

export function* watchFindUserById() {
    yield takeLatest(GET_USER_BY_ID, findUserById)
}

export function* watchSaveUser() {
    yield takeLatest(SAVE_USER, saveUser)
}

export function* watchRemoveUser() {
    yield takeLatest(REMOVE_USER_BY_ID, removeUser)
}