import { combineReducers } from "redux";
import notification from "./notification";
import authentication from "./authentication";


export default combineReducers({
    notificationReducer: notification,
    authenticationReducer: authentication,
});