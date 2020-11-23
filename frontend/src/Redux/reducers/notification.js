import { SET_NOTIFICATION } from "../types";

const initialState = {
    open: false,
    severity: 'error',
    msg: ''
};

export default function notification(state = initialState, action) {
    switch (action.type) {
        case SET_NOTIFICATION:
            // console.log(action);
            return state = action.payload;
        default:
            return state;
    }
}

export const callNotification = (msg = "", severity = "error", open = true) => ({
    type: SET_NOTIFICATION,
    payload: {
        open,
        msg,
        severity
    }
})
