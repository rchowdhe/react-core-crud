import { combineReducers } from "redux";
import { findAllUsers, findUserById, saveUser, removeUser } from "./userdetails";
import { login } from "./login";

const rootReducer = combineReducers({
    findAllUsers,
    findUserById,
    saveUser,
    removeUser,
    login
});

export default rootReducer;