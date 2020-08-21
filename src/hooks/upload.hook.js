import React, { useState } from 'react';
import { parse } from 'papaparse';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';

function Upload(props) {

    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [fileContents, setFileContents] = useState('');

    const handleFile = (e) => {
        const content = e.target.result;
        setFileContents(content);
        const result = parse(content, {header: true});
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
            selectValue,
            fileContents
        };

        console.log(data);

        Axios.post('https://localhost:8080/upload', data)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
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
                        placeholder="Upload CSV"
                        accept=".csv"
                        onChange={e => readFile(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <input onClick={handleSubmit} type="submit" value="Upload" className="btn btn-primary"/>
                </div>
            </form>

            <h5 style={{marginTop: 50}}>CSV Preview:</h5>
            <CsvToHtmlTable
                data={fileContents}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
            />
            </div>
        </>
    );
}

export default Upload;
