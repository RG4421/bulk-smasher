import React from 'react'
import PropTypes from 'prop-types'
import check from '../../images/check.png';

const serverSuccess = ({serverSuccess}) => {
    return (
        <div className="alert alert-success" role="alert">
            <div className="form-group componentElements alert-dismissible fade show">
                <img style={{marginRight: 5, marginBottom: 3}} src={check} width="20" height="20" alt="Check"/>
                <label> {serverSuccess}</label>
            </div>
        </div>
    )
}

serverSuccess.propTypes = {
    serverSuccess: PropTypes.string.isRequired
}

export default serverSuccess