import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import PropTypes from 'prop-types';
import { connect, useDispatch } from "react-redux";
import { callNotification } from '../../Redux/reducers/notification';

import '../../Styles/notification.scss';

function Notification(props) {
    const propTypes = {
        isOpen: PropTypes.bool.isRequired,
        severity: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(callNotification(props.message, props.severity, false))
    }

    return (
        <Snackbar
            open={props.isOpen}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <Alert variant='filled' severity={props.severity} onClose={handleClose}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

const mapStateToProps = state => ({
    isOpen: state.notificationReducer.open,
    severity: state.notificationReducer.severity,
    message: state.notificationReducer.msg,
})

export default connect(mapStateToProps, null)(Notification)