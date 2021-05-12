import { SET_AUTHENTICATION } from "../types";
import { GET_AUTHENTICATION } from "../types";

const initialState = {
    token: ""
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return state = action.payload;
        default:
            return state;
    }
}

export const callAuthentication = (type, token) => ({
    type,
    payload: {
        token: token
    }
})