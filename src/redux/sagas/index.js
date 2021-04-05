import { all } from "redux-saga/effects";
import { watchFindAllUsers, watchFindUserById, watchSaveUser, watchRemoveUser } from "./userdetails";
import { watchLogin } from "./login";

export default function* rootSaga() {
    yield all([
        watchFindAllUsers(), watchFindUserById(), watchSaveUser(), watchRemoveUser(), watchLogin(),
    ]);
}