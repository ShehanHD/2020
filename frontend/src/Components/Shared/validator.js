import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom"
import { callNotification } from '../../Redux/reducers/notification';

export const LoginValidator = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.getItem("client-jwt") === "" && dispatch(callNotification("You have to login before you access to this applications"));
    }, [])

    return (
        <>
            {localStorage.getItem("client-jwt") === "" ? <Redirect to='/login' /> : props.children}
        </>
    )
}