import React from 'react'
import PropTypes from 'prop-types'
import warning from '../../images/warning.png';

const jobError = ({hubName}) => {
    return (
        <div className="alert alert-warning" role="alert">
            <div className="form-group componentElements alert-dismissible fade show">
            <img style={{marginRight: 5, marginBottom: 3}} src={warning} width="20" height="20" alt="Check"/>
            <label>There are <b>no jobs</b> found for <b>{hubName}</b></label>            
            </div>
        </div>
    )
}

jobError.propTypes = {
    hubName: PropTypes.string.isRequired
}

export default jobError
