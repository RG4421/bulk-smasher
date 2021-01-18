import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

import newWindow from '../images/newWindow.png'
import logo from '../images/uf.png'

function Jobs (props) {

    const [APIKey, setAPIKey] = useState('');
    const [APISecret, setAPISecret] = useState('');


    // AUTHENTICATION
    const history = useHistory();

    const checkSessionStatus = () => {
        const token = JSON.parse(localStorage.getItem('bulksmasher-user'));        
        
        if (token) {
            Axios.get('auth/checkCreds', { headers: {Authorization: `Bearer ${token.accessToken}`}})
            .then((res) => {
                if (res.data.authSuccessful === true) {
                    history.push('/jobs');
                }
            }).catch((e) => {
                console.log(e);
                localStorage.removeItem('bulksmasher-user');
                history.push("/auth");
                console.log(e.response);
            });
        } else {
            localStorage.removeItem('bulksmasher-user');
            history.push("/auth");
        }
    }

    useEffect(() => {
        checkSessionStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {

        }

        const payload = {
            APIKey, 
            APISecret
        };

        Axios.post('jobs/view', payload, options)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                console.log(res.data);    
            }
        }).catch((e) => {
            if (e.response) {
                console.log(e.response)
            } else if (e.request) {
                console.log('Client never recieved request: ' + e.request);
            } else {
                console.log('Error:' + e.message);
            }
        });
    }

    return (
        <div className="form-group">
            <div className="newContainer">
                <p>View all jobs status</p>

                <h5 className="headerText"><a style={{color: '#212529'}} href="https://help.uberflip.com/hc/en-us/articles/360019084031-Get-Your-Uberflip-API-Key-and-Secret-Account-ID-and-Hub-IDs" rel="noopener noreferrer" target="_blank">API Credentials <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>

                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">API Key</span>
                        </div>
                        <input
                            type="text"
                            value={APIKey}
                            onChange={e => setAPIKey(e.target.value)}
                            required
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        ></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">API Secret</span>
                        </div>
                        <input
                            type="text"
                            value={APISecret}
                            onChange={e => setAPISecret(e.target.value)}
                            required
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        ></input>
                    </div>
                </div>

                <div className="form-group" style={{marginTop: 30}}>
                    <input onClick={handleSubmit} type="submit" value="View Jobs" className="btn btn-success"/>
                </div> 
            </div>
        </div>
    )

}



export default Jobs;