import React, { 
    useState, 
    useEffect, 
    useRef 
} from 'react';
import Axios from 'axios';
import { CsvToHtmlTable } from 'react-csv-to-table';
import DatePicker from 'react-datepicker';

import deleteImg from '../images/delete.png';
import check from '../images/check.png'
import cross from '../images/cross.png'
import newWindow from '../images/newWindow.png'
import Loader from 'react-loader-spinner'
import '../styles/container.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Delete (props)
{
    const [APIKey, setAPIKey] = useState('');
    const [APISecret, setAPISecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [fileContents, setFileContents] = useState('');
    const [hubId, setHubId] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    const [serverError, setServerError] = useState('');
    const [selectDate, setSelectDate] = useState(new Date());
    const [logURL, setLogURL] = useState('');
    const [fileName, setFileName] = useState('');

    const [checked, setChecked] = useState(false);
    const [showDeleteAll, setShowDeleteAll] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showLegacyFields, setShowLegacyFields] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerSuccess, setShowServerSuccess] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showLogDownload, setShowLogDownload] = useState(false);

    const clientIdRef = useRef();
    const clientSecretRef = useRef();

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "All Tags") {
            clientIdRef.current.placeholder = "API Key";
            clientSecretRef.current.placeholder = "API Secret";
            setShowDeleteAll(true);
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLegacyFields(false);
            setShowLoader(false);
            setShowLogDownload(false);
        } else if (selectValue === "Tag List" || selectValue === "Stream Items" || selectValue === "Hidden Items" || selectValue === "Streams") {
            clientIdRef.current.placeholder = "API Key";
            clientSecretRef.current.placeholder = "API Secret";
            setShowDeleteAll(false);
            setShowDatePicker(false);
            setShowUpload(true);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);            
            setShowLegacyFields(false);
            setShowLoader(false);
            setShowLogDownload(false);
        } else if (selectValue === "Past Content") {
            clientIdRef.current.placeholder = "API Key";
            clientSecretRef.current.placeholder = "API Secret";
            setShowDeleteAll(false);
            setShowDatePicker(true);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);            
            setShowLegacyFields(false);
            setShowLoader(false);
            setShowLogDownload(false);
        } else if (selectValue === "Flipbook Folders") {
            clientIdRef.current.placeholder = "API Key";
            clientSecretRef.current.placeholder = "Signature";
            setShowDeleteAll(false);
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);            
            setShowLegacyFields(true);
            setShowLoader(false);
            setShowLogDownload(false);
        } else {
            clientIdRef.current.placeholder = "API Key";
            clientSecretRef.current.placeholder = "API Secret";
            setShowDeleteAll(false);
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLegacyFields(false);
            setShowLoader(false);
            setShowLogDownload(false);
        }
    }, [selectValue]);

    // Functions
    const HandleFile = (e) => {
        const data = e.target.result;
        setFileContents(data);
    }
      
    const ReadFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = HandleFile;
        fileData.readAsText(file);
        setShowCSVPreview(true);
        setFileName(file.name);
        console.log(file.name);
    }

    const DeleteAll = () => (
        <div className="form-group">
            <input 
                style={{marginRight: 5, width: '10px'}}
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(!checked)}
            />
            <label>Delete All</label>
        </div>
    )

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
            <a href={'http://bulksmasher-env-1.eba-mj2ywdju.us-east-2.elasticbeanstalk.com/server-logs/' + logURL} rel="noopener noreferrer" target="_blank">View Bulk Smasher Log
            <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a>        
        </div>
    )

    const CSVUpload = () => (
        <div className="form-group">
            <div style={{marginTop: 30}}>
                <input type="file"
                    accept=".csv"
                    onChange={e => ReadFile(e.target.files[0])}
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

    const DateSelector = () => (
        <div className="form-group">
            <label>Select date to remove past content: </label>
            <div>
                <DatePicker
                    selected={selectDate}
                    onChange={date => setSelectDate(date)}
                />
            </div>
        </div>
    )

    const LegacyFields = () => (
        <div className="form-group">
            <div className="form-group">
                <input
                    placeholder="Hub ID"
                    type="text"
                    value={hubId}
                    onChange={e => setHubId(e.target.value)}
                    required
                ></input>
            </div>
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            APIKey,
            APISecret,
            selectDate,
            fileContents
        };

        // Run delete all tags function
        if (checked === true ) {
            let ans = window.prompt("Type 'DELETE ALL TAGS' to execute.");
            if (ans === "DELETE ALL TAGS") {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowDeleteAll(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLoader(true);
                setShowLogDownload(false);

                Axios.post('/delete/allTags', data)
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
               alert("Delete operation cancelled.");
            }
        // Delete specific tags based on CSV
        } else if (selectValue === "Tag List") {
            let ans = window.prompt("Type 'DELETE TAG LIST' to execute.");
            if (ans === "DELETE TAG LIST") {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLoader(true);
                setShowLogDownload(false);

                Axios.post('/delete/tagList', data)
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
                        setServerError(e.response);
                        setShowLogDownload(false);
                        setShowServerError(true);
                    } else if (e.request) {
                        console.log('Client never recieved request: ' + e.request);
                    } else {
                        console.log('Error:' + e.message);
                    }
                });
            } else {
                alert("Delete operation cancelled.");
            }
        // Delete stream items based on CSV
        } else if (selectValue === "Stream Items") {
            let ans = window.prompt("Type 'DELETE STREAM ITEMS' to execute.");
            if (ans === "DELETE STREAM ITEMS") {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLoader(true);
                setShowLogDownload(false);

                Axios.post('/delete/streamItems', data)
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
                alert("Delete operation cancelled.");
            }
        // Delete hidden items in streams based on CSV
        } else if (selectValue === "Hidden Items") {
            let ans = window.prompt("Type 'DELETE HIDDEN ITEMS' to execute.");
            if (ans === "DELETE HIDDEN ITEMS") {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLoader(true);
                setShowLogDownload(false);

                Axios.post('/delete/hiddenItems', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowLoader(false);
                        setServerSuccess(res.data.message);
                        setLogURL(res.data.log_name);
                        setShowLogDownload(true);
                        setShowServerSuccess(true);
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
                alert("Delete operation cancelled.");
            }
        // Delete/hide past content based on date selected and CSV
        } else if (selectValue === "Past Content") {
            let ans = window.prompt("Type 'DELETE PAST ITEMS' to delete items before " + selectDate + ".");
            if (ans === "DELETE PAST ITEMS") {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowDatePicker(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLoader(true);
                setShowLogDownload(false);

                Axios.post('/delete/pastItems', data)
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
                alert("Delete operation cancelled.");
            }
        } else if (selectValue === "Streams") {
            let ans = window.prompt("Type 'DELETE STREAMS' to delete these streams.");
            if (ans === "DELETE STREAMS") {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLoader(true);
                setShowLogDownload(false);

                Axios.post('/delete/streams', data)
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
                alert("Delete operation cancelled.");
            }
        }
    }

    // Build of webpage
    return (
        <div className="newContainer">
            <form>
            <img style={{marginRight: 5, marginTop: -10}} src={deleteImg} width="20" height="20" alt="delete"/>
            <h3 style={{display: 'inline'}}>Bulk Delete</h3>
                <h5 className="headerText"><a style={{color: '#212529'}} href="https://help.uberflip.com/hc/en-us/articles/360019084031-Get-Your-Uberflip-API-Key-and-Secret-Account-ID-and-Hub-IDs" rel="noopener noreferrer" target="_blank">Enter REST API Credentials <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
                <div className="form-group">
                    <input
                        ref={clientIdRef}
                        placeholder="API Key"
                        type="text"
                        value={APIKey}
                        onChange={e => setAPIKey(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <input 
                        ref={clientSecretRef}
                        placeholder="API Secret"
                        type="text"
                        value={APISecret}
                        onChange={e => setAPISecret(e.target.value)}
                        required
                    ></input>
                </div>

                { showLegacyFields ? <LegacyFields /> : null }

                <h5 className="operatorSelect"><a style={{color: '#212529'}} href={process.env.PUBLIC_URL + "/#delete"}>Select Operator <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
                <div className="form-group">
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default>Please Select...</option>
                        <option value="Tag List">Tag List</option>
                        <option value="Stream Items">Marketing Stream Items</option>
                        <option value="Hidden Items">Hidden Marketing Stream Items</option>
                        <option value="Past Content">Past Items</option>
                        <option value="Streams">Streams</option>
                        <option value="All Tags">All Tags</option>
                    </select>
                </div>

                { showLoader ? <APILoader/> : null } 
                { showServerSuccess ? <ServerSuccess/> : null }
                { showServerError   ? <ServerError/> : null } 
                { showLogDownload   ? <LogDownload/> : null }
                { showDeleteAll  ? <DeleteAll /> : null }
                { showDatePicker ? <DateSelector/> : null } 
                { showUpload ? <CSVUpload/> : null }
                { showCSVPreview ? <CSVPreview/> : null } 

                <div className="form-group" style={{marginTop: 30}}>
                    <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div>
            </form>
        </div>
    )
}

export default Delete;