import React, { useState } from 'react';
import { parse } from 'papaparse';
import { CsvToHtmlTable } from 'react-csv-to-table';
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

        const data = {
            clientId, 
            clientSecret,
        };

        // Run delete all tags function
        if (checked === true ) {
            if (window.confirm("Are you sure to delete all items?")) {
                Axios.post('https://localhost:8080/delete/all', data)
                .then((res) => {
                    alert("Delete operation successful!");
                    console.log(res);
                }).catch((e) => {
                    alert("Delete operation failed!");
                    console.log(e);
                });
            } else {
                alert("Delete operation cancelled!");
            }
        }
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
            <h5 style={{marginTop: 50}}>CSV Preview:</h5>
            <CsvToHtmlTable
                data={fileContents}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
            />
        </div>
    )
}

export default Delete;