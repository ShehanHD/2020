import { combineReducers } from "redux";
import notification from "./notification";


export default combineReducers({
    notificationReducer: notification,
});