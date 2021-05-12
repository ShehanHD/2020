import { callAuthentication } from "../reducers/authentication"
import { GET_AUTHENTICATION, SET_AUTHENTICATION } from "../types"

export const setAuth = (token) => dispatch => {
    dispatch(callAuthentication(SET_AUTHENTICATION, token))
}