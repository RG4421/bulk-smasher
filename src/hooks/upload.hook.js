import React, { useState } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';

function Upload(props) {

    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("test button");

        // const clientId_post = {
        //     clientId
        // };
        // Axios.post('http://localhost:8080/upload', clientId_post)
        //     .then((res) => {
        //         console.log(res);
        //     }).catch((e) => {
        //         console.log(e);
        //     });
    }
        
    return (
        <>
        <div style={{marginTop: 10}}>
            <h3>Bulk Uploader</h3>
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
                <h5 style={{marginTop: 30}}>Select Bulk Operator</h5>
                <div className="form-group">
                    <label>Create:</label>
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                        required
                    >
                        <option default>Please Select...</option>
                        <option value="Tags">Tags</option>
                        <option value="User Profiles">User Profiles</option>
                        <option value="Metadescription/SEOs">Metadescription/SEOs</option>
                        <option value="Marketing Streams">Marketing Streams</option>
                    </select>
                </div>
                <label>Upload CSV:</label>
                <div className="form-group">
                    <input type="file"
                        accept=".csv"
                        value={file}
                        onChange={e => setFile(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input onClick={handleSubmit} type="submit" value="Upload" className="btn btn-primary"/>
                </div>
            </form>

            <h5 style={{marginTop: 50}}>CSV Preview:</h5>
            <CsvToHtmlTable
                data={file}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
            />
            </div>
        </>
    );
}

export default Upload;