import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import Loader from 'react-loader-spinner'
import logo from '../images/logo.png'
import cross from '../images/cross.png'

function Auth (props) {

    const history = useHistory();
    const [password, setPassword] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    const [serverError, setServerError] = useState('');

    const [showServerError, setShowServerError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const ServerError = () => (
        <div className="form-group componentElements">
            <img style={{marginRight: 5}} src={cross} width="20" height="20" alt="Check"/>
            <label>{serverError.data.message}</label>
        </div>
    )

    const APILoader = () => (
        <div className="form-group" style={{marginTop: 30, marginLeft: -15}}>
            <div style={{display: "flex"}}>
                <Loader
                    type="Puff"
                    color="#0e8643"
                    height="30"
                    weight="30"
                />
                <label style={{marginLeft: -15, marginTop: 3}}>{serverSuccess}!</label>
            </div>
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowServerError(false);

        const data = {
            password
        };

        Axios.post('auth/getToken', data)
        .then((res) => {
            setShowLoader(true);
            if (res.data.accessToken) {
                console.log(res);
                localStorage.setItem(`bulksmasher-user`, JSON.stringify(res.data));
                setServerSuccess(res.data.message);
                setTimeout(() => {
                    setShowLoader(false);
                    history.push("/");
                }, 1500);
            }
        }).catch((e) => {
            setShowLoader(false);
            setServerError(e.response);
            setShowServerError(true);
        });
    }

    return (
    <>
        <style type="text/css">
            {`.navbar {
                display: none
            }`}
        </style>
        <form className="secure">
        <img id="image" src={logo} width="100" height="100" alt="logo"/><h5 className="authTitle" style={{display: "inline-block"}}>BULK SMASHER</h5>

        <br />
            <h6>Enter a valid passphrase</h6>
            <div className="form-group">
                <input
                    style={{paddingTop: 4}}
                    placeholder="Passphrase"
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                ></input>
            </div>

            { showServerError   ? <ServerError/> : null }
            { showLoader        ? <APILoader/> : null } 

            <div className="form-group">
                <input onClick={handleSubmit} type="submit" value="Bulk Smash!" className="btn btn-success"/>
            </div>
        </form>
    </>
    )
}

export default Auth;