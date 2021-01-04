import React from 'react'
import PropTypes from 'prop-types'
import newWindow from '../../images/newWindow.png'

const logDownload = ({logURL}) => {
    return (
        <div class="alert alert-info" role="alert">
            <div className="form-group" style={{marginTop: 15}}>
                <a href={process.env.PUBLIC_URL + '/server-logs/' + logURL} rel="noopener noreferrer" target="_blank">View Bulk Smasher Log
                <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a>
            </div>
        </div>
    )
}

logDownload.propTypes = {
    logURL: PropTypes.number.isRequired
}

export default logDownload
