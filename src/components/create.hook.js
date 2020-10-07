import React, { 
    useState, 
    useEffect 
} from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';
import check from '../check.png'
import cross from '../cross.png'
import Loader from 'react-loader-spinner'
import '../styles/container.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Create (props) {

    const [APIKey, setAPIKey] = useState('');
    const [APISecret, setAPISecret] = useState('');
    const [selectValue, setSelectValue] = useState('null');
    const [fileContents, setFileContents] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    const [serverError, setServerError] = useState('');

    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerSuccess, setShowServerSuccess] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "Tags" || selectValue === "Streams" || selectValue === "User Profiles" || selectValue === "Test") {
            setShowUpload(true);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLoader(false);
        } else {
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLoader(false);
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
        setShowCSVPreview(true);
        console.log(file.name);
    }

    const ServerSuccess = () => (
        <div className="form-group" style={{marginTop: 30}}>
            <img style={{marginRight: 5}} src={check} width="20" height="20" alt="Check"/>
            <label> {serverSuccess.status} - {serverSuccess.data}</label>
        </div>
    )

    const ServerError = () => (
        <div className="form-group" style={{marginTop: 30}}>
            <img style={{marginRight: 5}} src={cross} width="20" height="20" alt="Check"/>
            <label> {serverError.status} - {serverError}</label>
        </div>
    )

    const CSVUpload = () => (
        <div className="form-group">
            <div style={{marginTop: 30}}>
                <input type="file"
                    accept=".csv"
                    onChange={e => readFile(e.target.files[0])}
                />
            </div>
        </div>   
    )

    const CSVPreview = () => (
        <div className="form-group">
           <h5 style={{marginTop: 30}}>Data Preview:</h5>
            <div>
                <CsvToHtmlTable
                    data={fileContents}
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                />
            </div>
        </div>
    )

    const APILoader = () => (
        <div className="form-group" style={{marginTop: 30}}>
            <div style={{display: "flex"}}>
                <Loader
                    type="Bars"
                    color="#0e8643"
                    height="30"
                    weight="30"
                />
                <label style={{marginLeft: -15}}>Executing operator...</label>
            </div>
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            APIKey, 
            APISecret,
            fileContents
        };

        // Create tags
        if (selectValue === "Tags") {
            if (window.confirm("Are you sure you want to CREATE and TAG these items?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/create/tags', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerSuccess(res);
                    setShowServerSuccess(true);
                    console.log(res);
                }).catch((e) => {
                    setServerSuccess(e);
                    setShowServerError(true);
                    console.log(e);
                });
            } else {
                console.log("Create operation cancelled.");
            }
        // Create streams
        } else if (selectValue === "Streams") {
            if (window.confirm("Are you sure you want to CREATE these STREAMS?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/create/streams', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerSuccess(res);
                    setShowServerSuccess(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerSuccess(e);
                    setShowServerSuccess(true);
                });
            } else {
                console.log("Create operation cancelled.");
            }
        // Create user profiles
        } else if (selectValue === "User Profiles") {
            if (window.confirm("Are you sure you want to CREATE these USERS?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/create/users', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerSuccess(res);
                    setShowServerSuccess(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerSuccess(e);
                    setShowServerSuccess(true);
                });
            } else {
                console.log("Create operation cancelled.");
            }
        } else if (selectValue === "Test") {
            if (window.confirm("Are you sure you want to this TEST call?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/create/test', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowLoader(false);
                        setServerSuccess(res);
                        setShowServerSuccess(true);
                        console.log(res);    
                    } else if (res.status <= 300){
                        throw new Error('API ERROR');
                    }
                }).catch((e) => {
                    if (e.response) {
                        setShowUpload(false);
                        setShowCSVPreview(false);
                        setServerError(e.response);
                        setShowServerSuccess(true);
                    } else if (e.request) {
                        console.log('Client never recieved request: ' + e.request);
                    } else {
                        console.log('Error:' + e.message);
                    }
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
                        <option value="Test">Test</option>
                    </select>
                </div>

                { showLoader ? <APILoader/> : null } 
                { showServerSuccess ? <ServerSuccess/> : null }
                { showServerError ? <ServerError/> : null } 
                { showUpload ? <CSVUpload/> : null }
                { showCSVPreview ? <CSVPreview/> : null } 

                <div className="form-group" style={{marginTop: 30}}>
                        <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div>
            </form>
        </div>
        </>
    );
}

export default Create;