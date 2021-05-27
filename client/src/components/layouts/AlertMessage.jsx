import React from 'react'
import Alert from 'react-bootstrap/Alert'
const AlertMessage = ({info}) => {
    return (
        info.type!==""?<Alert variant={info.type}><i class="fas fa-exclamation-circle    "> </i>{info.message}</Alert>:null
    )
}

export default AlertMessage
