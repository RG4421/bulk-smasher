import React, { 
    useState, 
    useEffect 
} from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';
import '../styles/container.css'

function Create(props) {

    const [APIKey, setAPIKey] = useState('');
    const [APISecret, setAPISecret] = useState('');
    const [selectValue, setSelectValue] = useState('null');
    const [fileContents, setFileContents] = useState('');
    const [showUpload, setShowUpload] = useState(false);

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "Tags" || selectValue === "Streams" || selectValue === "User Profiles") {
            setShowUpload(true);
        } else {
            setShowUpload(false);
        }
    }, [selectValue]);

    // Functions
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
            <label><a href="https://docs.google.com/spreadsheets/d/1iuoyIPQHMsxZiSOefFQCCPsMSY8eqKUXAPSeg9lWGts/edit?usp=sharing" target="_blank" rel="noopener noreferrer">CSV Templates</a></label>
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

        const csvData = {
            APIKey, 
            APISecret,
            fileContents
        };

        // Create tags
        if (selectValue === "Tags") {
            if (window.confirm("Are you sure you want to CREATE and TAG these items?")) {
                Axios.post('https://localhost:8080/create/tags', csvData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Create operation cancelled.");
            }
        // Create streams
        } else if (selectValue === "Streams") {
            if (window.confirm("Are you sure you want to CREATE these STREAMS?")) {
                Axios.post('https://localhost:8080/create/streams', csvData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Create operation cancelled.");
            }
        // Create user profiles
        } else if (selectValue === "User Profiles") {
            if (window.confirm("Are you sure you want to CREATE these USERS?")) {
                Axios.post('https://localhost:8080/create/users', csvData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Create operation cancelled.");
            }
        }
    }
    
    // Build of webpage
    return (
        <>
        <div className="container">
            <form>
            <h3>Bulk Create</h3>
                <h5 style={{marginTop: 30}}>Enter API Credentials</h5>
                <div className="form-group">
                    <input 
                        placeholder="API Key"
                        type="text"
                        value={APIKey}
                        onChange={e => setAPIKey(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <input
                        placeholder="API Secret"
                        type="text"
                        value={APISecret}
                        onChange={e => setAPISecret(e.target.value)}
                        required
                    ></input>
                </div>
                <h5 style={{marginTop: 30}}>Select Operator</h5>
                <div className="form-group">
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default value="null">Please Select...</option>
                        <option value="Tags">Tags</option>
                        <option value="Streams">Streams</option>
                        <option value="User Profiles">User Profiles</option>
                    </select>
                </div>

                { showUpload ? <CSVUpload/> : null } 

                <div className="form-group">
                        <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div>
            </form>
        </div>
        </>
    );
}

export default Create;
