import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../redux/reducers/index";
import rootSaga from "../redux/sagas/index";

const sagaMiddleWare = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare))

sagaMiddleWare.run(rootSaga)

export default store;