import React, { 
    useState, 
    useEffect 
} from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';

import create from '../images/create.png'
import check from '../images/check.png'
import cross from '../images/cross.png'
import newWindow from '../images/newWindow.png'
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
    const [logURL, setLogURL] = useState('');
    const [fileName, setFileName] = useState('');

    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerSuccess, setShowServerSuccess] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showLogDownload, setShowLogDownload] = useState(false);

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "Tags" || selectValue === "Streams" || selectValue === "Items" || selectValue === "User Profiles" || selectValue === "Test") {
            setShowUpload(true);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLoader(false);
            setShowLogDownload(false);
        } else {
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLoader(false);
            setShowLogDownload(false);
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
        setFileName(file.name);
        console.log(file.name);
    }

    const ServerSuccess = () => (
        <div className="form-group" style={{marginTop: 30}}>
            <img style={{marginRight: 5}} src={check} width="20" height="20" alt="Check"/>
            <label> {serverSuccess}</label>
        </div>
    )

    const ServerError = () => (
        <div className="form-group" style={{marginTop: 30}}>
            <img style={{marginRight: 5}} src={cross} width="20" height="20" alt="Check"/>
            <label> {serverError.status} {serverError.data.message}</label>
        </div>
    )

    const LogDownload = () => (
        <div className="form-group">
            <a href={'http://localhost:3000/server-logs/' + logURL} rel="noopener noreferrer" target="_blank">View Bulk Smasher Log
            <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a>
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
           <h5 style={{marginTop: 30}}><b>{fileName}</b></h5>
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
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLoader(true);

                Axios.post('/create/tags/', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowLoader(false);
                        setServerSuccess(res.data.message);
                        setLogURL(res.data.log_name);
                        setShowServerSuccess(true);
                        setShowLogDownload(true);
                        console.log(res.data);    
                    }
                }).catch((e) => {
                    if (e.response) {
                        setShowLoader(false);
                        setShowUpload(false);
                        setShowCSVPreview(false);
                        setShowLogDownload(false);
                        setServerError(e.response)
                        setShowServerError(true);
                    } else if (e.request) {
                        console.log('Client never recieved request: ' + e.request);
                    } else {
                        console.log('Error:' + e.message);
                    }
                });
            } else {
                console.log("Create operation cancelled.");
            }
        // Create streams
        } else if (selectValue === "Streams") {
            if (window.confirm("Are you sure you want to CREATE these STREAMS?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLoader(true);

                Axios.post('create/streams', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowLoader(false);
                        setServerSuccess(res.data.message);
                        setLogURL(res.data.log_name);
                        setShowServerSuccess(true);
                        setShowLogDownload(true);
                        console.log(res.data);    
                    }
                }).catch((e) => {
                    if (e.response) {
                        setShowLoader(false);
                        setShowUpload(false);
                        setShowCSVPreview(false);
                        setShowLogDownload(false);
                        setServerError(e.response);
                        setShowServerError(true);
                    } else if (e.request) {
                        console.log('Client never recieved request: ' + e.request);
                    } else {
                        console.log('Error:' + e.message);
                    }
                });
            } else {
                console.log("Create operation cancelled.");
            }
        // Create user profiles
        } else if (selectValue === "Items") {
            if (window.confirm("Are you sure you want to CREATE these ITEMS?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLoader(true);

                Axios.post('create/items', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowLoader(false);
                        setServerSuccess(res.data.message);
                        setLogURL(res.data.log_name);
                        setShowServerSuccess(true);
                        setShowLogDownload(true);
                        console.log(res.data);    
                    }
                }).catch((e) => {
                    if (e.response) {
                        setShowLoader(false);
                        setShowUpload(false);
                        setShowCSVPreview(false);
                        setShowLogDownload(false);
                        setServerError(e.response);
                        setShowServerError(true);
                    } else if (e.request) {
                        console.log('Client never recieved request: ' + e.request);
                    } else {
                        console.log('Error:' + e.message);
                    }
                });
            } else {
                console.log("Create operation cancelled.");
            }
        } else if (selectValue === "User Profiles") {
            if (window.confirm("Are you sure you want to CREATE these USERS?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLoader(true);

                Axios.post('create/users', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowLoader(false);
                        setServerSuccess(res.data.message);
                        setLogURL(res.data.log_name);
                        setShowServerSuccess(true);
                        setShowLogDownload(true);
                        console.log(res.data);    
                    }
                }).catch((e) => {
                    console.log(e);
                    console.debug(e);

                    if (e.response) {
                        setShowLoader(false);
                        setShowUpload(false);
                        setShowCSVPreview(false);
                        setShowLogDownload(false);
                        setServerError(e.response);
                        setShowServerError(true);
                    } else if (e.request) {
                        console.log('Client never recieved request: ' + e.request);
                    } else {
                        console.log('Error:' + e.message);
                    }
                });
            } else {
                console.log("Create operation cancelled.");
            }
        } else if (selectValue === "Test") {
            if (window.confirm("Are you sure you want to this TEST call?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLoader(true);

                Axios.post('create/test', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowLoader(false);
                        setServerSuccess(res.data.message);
                        setLogURL(res.data.log_name);
                        setShowServerSuccess(true);
                        setShowLogDownload(true);
                        console.log(res.data);    
                    } else if (res.status <= 300){
                        throw new Error('API ERROR');
                    }
                }).catch((e) => {
                    console.log(e);
                    console.debug(e);

                    if (e.response) {
                        setShowLoader(false);
                        setShowUpload(false);
                        setShowCSVPreview(false);
                        setShowLogDownload(false);
                        setServerError(e.response);
                        setShowServerError(true);
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
            <img style={{marginRight: 5, marginTop: -10}} src={create} width="20" height="20" alt="create"/>
            <h3 style={{display: 'inline'}}>Bulk Create</h3>
                <h5 style={{marginTop: 30}}><a style={{color: '#212529'}} href="https://help.uberflip.com/hc/en-us/articles/360019084031-Get-Your-Uberflip-API-Key-and-Secret-Account-ID-and-Hub-IDs" rel="noopener noreferrer" target="_blank">Enter REST API Credentials <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
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
                        <option value="Items">Items</option>
                        <option value="Tags">Tags</option>
                        <option value="Streams">Streams</option>
                        <option value="User Profiles">User Profiles</option>
                        {/* <option value="Test">***Test***</option> */}
                    </select>
                </div>

                { showLoader        ? <APILoader/> : null } 
                { showServerSuccess ? <ServerSuccess/> : null }
                { showServerError   ? <ServerError/> : null } 
                { showLogDownload   ? <LogDownload/> : null }
                { showUpload        ? <CSVUpload/> : null }
                { showCSVPreview    ? <CSVPreview/> : null }

                <div className="form-group" style={{marginTop: 30}}>
                    <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div> 
            </form>
        </div>
    </>
    );
}

export default Create;