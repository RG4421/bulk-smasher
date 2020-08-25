import React, { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import Axios from 'axios';

function Delete(props)
{
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [checked, setChecked] = useState(false);
    const [fileContents, setFileContents] = useState('');


    const handleFile = (e) => {
        const data = e.target.result;
        setFileContents(data);
        const result = parse(data, {header: true});
        console.log(result);
    }
      
    const readFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (checked === true ) {
            alert("Delete all is enabled")
            window.confirm("Are you sure to delete these items?")
            console.log(checked);
        }

        const data = {
            clientId, 
            clientSecret,
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
                <label>Upload CSV:</label>
                <div className="form-group">
                    <input type="file"
                        placeholder="Upload CSV"
                        accept=".csv"
                        onChange={e => readFile(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="checkbox"
                        checked={checked}
                        onChange={e => setChecked(!checked)}
                    ></input>
                    <label>Delete All</label>
                </div>
                <div className="form-group">
                        <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default Delete;