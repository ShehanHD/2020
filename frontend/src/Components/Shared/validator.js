import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom"
import { callNotification } from '../../Redux/reducers/notification';

export const LoginValidator = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        (localStorage.getItem("client-jwt") === "" && props.logged) && dispatch(callNotification("You have to login before you access to this applications"));
    }, [])

    return (
        <>
            {(localStorage.getItem("client-jwt") === "" && props.logged) ? <Redirect to='/login' /> : props.children}
        </>
    )
}