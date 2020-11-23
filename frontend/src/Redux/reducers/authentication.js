import { SET_LOGIN } from "../types";
import { SET_AUTHENTICATION } from "../types";

const initialState = {
    logged: false
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return state = action.payload;
        default:
            return state;
    }
}

export const callAuthentication = (logged = true) => ({
    type: SET_AUTHENTICATION,
    payload: {
        logged,
    }
})