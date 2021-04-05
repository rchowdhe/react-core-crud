import { put, takeLatest } from "redux-saga/effects";
import axios from "../../config/api";
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "../constants";

const API_URL = "https://localhost:44313/api/Login/";

function* login(action) {
    let result = yield axios.get(API_URL + 'authenticate/' + action.email)
        .then(data => {
            return ({
                type: LOGIN_SUCCESS,
                data: data
            })
        })
        .catch(err => {
            return ({
                type: LOGIN_ERROR,
                error: err
            })
        })
    yield put(result)
};

export function* watchLogin() {
    yield takeLatest(LOGIN, login);
};