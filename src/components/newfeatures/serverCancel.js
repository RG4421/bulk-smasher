import React from 'react'
import PropTypes from 'prop-types'
import warning from '../../images/warning.png'

const abort = ({cancelMessage}) => {
    return (
        <div className="alert alert-warning" role="alert">
            <div className="form-group componentElements alert-dismissible fade show">
                <img style={{marginRight: 5, marginBottom: 3}} src={warning} width="20" height="20" alt="Check"/>
                <label> {cancelMessage}</label>            
            </div>
        </div>
    )
}

abort.propTypes = {
    cancelMessage: PropTypes.string.isRequired,
}

export default abort