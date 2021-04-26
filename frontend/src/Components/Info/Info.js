import React, { useEffect } from 'react'

function Info(props) {
    useEffect(() => {
        props.traceUser(window.location.pathname);
    }, [])

    return (
        <>
            Info
        </>
    )
}

export default Info
