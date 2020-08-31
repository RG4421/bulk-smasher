import React, { useState, useEffect } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';

function Upload(props) {

    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [selectValue, setSelectValue] = useState('null');
    const [fileContents, setFileContents] = useState('');
    const [showUpload, setShowUpload] = useState(false);

    useEffect(() => {
        if (selectValue !== "null") {
            setShowUpload(true);
        } else {
            setShowUpload(false);
        }
    }, [selectValue]);

    const handleFile = (e) => {
        const data = e.target.result;
        setFileContents(data);
    }
      
    const readFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(file);
    }

    const CSVUpload = () => (
        <div className="form-group">
            <label><a href="https://docs.google.com/spreadsheets/d/1iuoyIPQHMsxZiSOefFQCCPsMSY8eqKUXAPSeg9lWGts/edit?ouid=113458187230889125546&usp=sheets_home&ths=true" target="_blank" rel="noopener noreferrer">CSV Templates</a></label>
            <div>
                <input type="file"
                    placeholder="Upload CSV"
                    accept=".csv"
                    onChange={e => readFile(e.target.files[0])}
                />
            </div>

            <h5 style={{marginTop: 50}}>CSV Preview:</h5>
            <div>
                <CsvToHtmlTable
                    data={fileContents}
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                />
            </div>
        </div>   
    )

    const handleSubmit = (e) => {
        e.preventDefault();

        const tagData = {
            clientId, 
            clientSecret,
            fileContents
        };

        switch(selectValue) {
            case 'Tags':
                Axios.post('https://localhost:8080/upload/tags', tagData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
                break;
            case 'User Profiles':
                console.log(selectValue);
                break;
            case 'Metadescription/SEOs':
                console.log(selectValue);
                break;
            case 'Marketing Streams':
                console.log(selectValue);
                break;
            case 'Canonical URLs':
                console.log(selectValue);
                break;
            default:
                console.log("Please make a proper selection!");
                break;
        }
    }
        
    return (
        <>
        <div style={{marginTop: 10}}>
            <h3>Bulk Upload</h3>
            <form style={{marginLeft: 30}}>
                <h5 style={{marginTop: 30}}>Enter API Credentials</h5>
                <div className="form-group">
                    <input 
                        placeholder="Client ID"
                        type="text"
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <input
                        placeholder="Client Secret"
                        type="text"
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
                        required
                    ></input>
                </div>
                <h5 style={{marginTop: 30}}>Select Bulk Operator</h5>
                <div className="form-group">
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default value="null">Please Select...</option>
                        <option value="Tags">Tags</option>
                        <option value="User Profiles">User Profiles</option>
                        <option value="Metadescription/SEOs">Metadescription/SEOs</option>
                        <option value="Canonical URLs">Canonical URLs</option>
                        <option value="Marketing Streams">Marketing Streams</option>
                    </select>
                </div>

                { showUpload ? <CSVUpload/> : null } 

                <div className="form-group">
                        <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        </>
    );
}

export default Upload;
