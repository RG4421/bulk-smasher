import React from 'react'
import PropTypes from 'prop-types'
import cross from '../../images/cross.png'

const serverError = ({serverError}) => {
    return (
        <div className="alert alert-danger" role="alert">
            <div className="form-group componentElements alert-dismissible fade show">
                <img style={{marginRight: 5, marginBottom: 3}} src={cross} width="20" height="20" alt="Check"/>
                <label> [{serverError.status}] {serverError.data.message}</label>            
            </div>
        </div>
    )
}

serverError.propTypes = {
    serverError: PropTypes.object.isRequired
}

export default serverError