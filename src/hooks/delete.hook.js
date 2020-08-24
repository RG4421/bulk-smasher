import React, { useState } from 'react';
import Axios from 'axios';

function Delete(props)
{
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            clientId, 
            clientSecret
        };

        console.log(data);

        Axios.post('https://localhost:8080/delete/all', data)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
    }

    return (
        <div style={{marginTop: 10}}>
            <h3>Bulk Delete</h3>
            <form style={{marginLeft: 30}}>
                <h5 style={{marginTop: 30}}>Enter API Credentials</h5>
                <div className="form-group">
                    <label>Client ID:</label>
                    <input
                        type="text"
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Client Secret:</label>
                    <input 
                        type="text"
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                        <input onClick={handleSubmit} type="submit" value="Delete All Tags" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default Delete;