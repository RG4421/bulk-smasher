import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios'
// import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom"
import { CsvToHtmlTable } from 'react-csv-to-table'

// MODULES
import Success from "./modules/serverSuccess"
import Error from "./modules/serverError"
import DataDownload from "./modules/logDownload"

// CSS
import newWindow from '../images/newWindow.png'
import Loader from 'react-loader-spinner'
import create from '../images/create.png'
import '../styles/container.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Create (props) {

    // const ENDPOINT = process.env.PUBLIC_URL;

    const [APIKey, setAPIKey] = useState('');
    const [APISecret, setAPISecret] = useState('');
    const [APISecretText, setAPISecretText] = useState('');
    const [selectValue, setSelectValue] = useState('null');
    const [fileContents, setFileContents] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    const [serverError, setServerError] = useState('');
    const [logURL, setLogURL] = useState('');
    const [fileName, setFileName] = useState('Choose file');
    const [fileSize, setFileSize] = useState(0);
    const [hubId, setHubId] = useState('');
    const [searchKey, setSearchKey] = useState('');

    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerSuccess, setShowServerSuccess] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [showSymbolReplace, setShowSymbolReplace] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showLogDownload, setShowLogDownload] = useState(false);
    const [showLegacyFields, setShowLegacyFields] = useState(false);

    // AUTHENTICATION
    const history = useHistory();

    const checkSessionStatus = () => {
        const token = JSON.parse(localStorage.getItem('bulksmasher-user'));        
        
        if (token) {
            Axios.get('auth/checkCreds', { headers: {Authorization: `Bearer ${token.accessToken}`}})
            .then((res) => {
                if (res.data.authSuccessful === true) {
                    history.push('/create');
                }
            }).catch((e) => {
                console.log(e);
                localStorage.removeItem('bulksmasher-user');
                history.push("/auth");
                console.log(e.response);
            });
        } else {
            localStorage.removeItem('bulksmasher-user');
            history.push("/auth");
        }
    }

    // On Component Mounted
    useEffect(() => {
        checkSessionStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "Streams" || selectValue === "Items" || selectValue === "User Profiles" || selectValue === "Test") {
            setAPISecretText('API Secret')
            setFileName('');
            setHubId('');
            setSearchKey('');
            setShowSymbolReplace(true)
            setShowUpload(true)
            setShowCSVPreview(false)
            setShowServerSuccess(false)
            setShowServerError(false)
            setShowLoader(false)
            setShowLogDownload(false)
            setShowLegacyFields(false)
        } else if (selectValue === "Tags") {
            setAPISecretText('API Secret')
            setFileName('');
            setHubId('');
            setSearchKey('');
            setShowSymbolReplace(false)
            setShowUpload(true)
            setShowCSVPreview(false)
            setShowServerSuccess(false)
            setShowServerError(false)
            setShowLoader(false)
            setShowLogDownload(false)
            setShowLegacyFields(false)
        } else if (selectValue === "PDF") {
            setAPISecretText('Signature')
            setFileName('');
            setHubId('');
            setSearchKey('');
            setShowSymbolReplace(true)
            setShowUpload(true)
            setShowCSVPreview(false)
            setShowServerSuccess(false)
            setShowServerError(false)
            setShowLoader(false)
            setShowLogDownload(false)
            setShowLegacyFields(true)
        } else {
            setAPISecretText('API Secret')
            setFileName('');
            setHubId('');
            setSearchKey('');
            setShowSymbolReplace(false)
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLoader(false);
            setShowLogDownload(false);
            setShowLegacyFields(false);
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
        setFileSize(file.size);
        setShowCSVPreview(true);
        setFileName(file.name);
        console.log(file.name);
    }

    const CSVUpload = () => (
        <div className="custom-file form-group">
            <input
                type="file" 
                className="custom-file-input" 
                id="customFile"
                accept=".csv"
                onChange={e => readFile(e.target.files[0])}
            />
            <label className="custom-file-label">{fileName}</label>
        </div>
    )

    const CSVPreview = () => (
        <div className="form-group">
           <h5 style={{marginTop: 30}}><b>{fileName}</b> ({fileSize}B)</h5>
            <div className='csv-preview'>
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
                <label style={{marginLeft: -15, marginTop: 2}}>Hold on, smashing...</label>
            </div>
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {

        }

        const payload = {
            APIKey, 
            APISecret,
            hubId,
            searchKey,
            fileContents,
            fileSize
        };

        switch(selectValue) {
            case "Tags":
                if (window.confirm("Are you sure you want to CREATE and TAG these items?")) {
                    setShowUpload(false);
                    setShowCSVPreview(false);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);
                    setShowLegacyFields(false);
                    setShowSymbolReplace(false)
                    setShowLoader(true);
    
                    Axios.post('/create/tags/', payload, options)
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
                break;

            case 'Streams':
                if (window.confirm("Are you sure you want to CREATE these STREAMS?")) {
                    setShowUpload(false);
                    setShowCSVPreview(false);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);
                    setShowLegacyFields(false);
                    setShowSymbolReplace(false)
                    setShowLoader(true);
    
                    Axios.post('create/streams', payload, options)
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
                break;

            case 'Items':
                if (window.confirm("Are you sure you want to CREATE these ITEMS?")) {
                    setShowUpload(false);
                    setShowCSVPreview(false);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);
                    setShowLegacyFields(false);
                    setShowSymbolReplace(false)
                    setShowLoader(true);
    
                    Axios.post('create/items', payload, options)
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
                break;

            case 'User Profiles':
                if (window.confirm("Are you sure you want to CREATE these ITEMS?")) {
                    setShowUpload(false);
                    setShowCSVPreview(false);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);
                    setShowLegacyFields(false);
                    setShowSymbolReplace(false)
                    setShowLoader(true);

                    Axios.post('create/items', payload)
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
                break;

            case 'PDF':
                if (window.confirm("Are you sure you want to CREATE these PDFs?")) {
                    setShowUpload(false);
                    setShowCSVPreview(false);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);
                    setShowLegacyFields(true);
                    setShowSymbolReplace(false)
                    setShowLoader(true);
    
                    Axios.post('create/pdfs', payload)
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
                break;

            case 'Test':

                if (window.confirm("Are you sure you want to run this TEST call?")) {
                    setShowUpload(false);
                    setShowCSVPreview(false);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);
                    setShowLegacyFields(false);
                    setShowSymbolReplace(false)
                    setShowLoader(true);
    
                    Axios.post('create/test', payload, options)
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
                break;
            
            default: console.log('No valid user input')
        }

        // const socket = socketIOClient(ENDPOINT);
        // socket.on("APIProgress", data => {
        //     console.log(data);
        // });
    }
    
    return (
    <>
        <div className="newContainer">
            <form>
            <img style={{marginRight: 5, marginTop: -10}} src={create} width="20" height="20" alt="create"/>
            <h3 style={{display: 'inline'}}>Bulk Create</h3>
                <h5 className="headerText"><a style={{color: '#212529'}} href="https://help.uberflip.com/hc/en-us/articles/360019084031-Get-Your-Uberflip-API-Key-and-Secret-Account-ID-and-Hub-IDs" rel="noopener noreferrer" target="_blank">API Credentials <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
                <div className="form-group">

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">API Key</span>
                        </div>
                        <input
                            type="text"
                            value={APIKey}
                            onChange={e => setAPIKey(e.target.value)}
                            required
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        ></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">{APISecretText}</span>
                        </div>
                        <input
                            type="text"
                            value={APISecret}
                            onChange={e => setAPISecret(e.target.value)}
                            required
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        ></input>
                    </div>
                </div>

                { showLegacyFields ? 
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Hub ID</span>
                        </div>
                        <input
                            type="text"
                            value={hubId}
                            onChange={e => setHubId(e.target.value)}
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        />
                    </div>
                : null }

                <h5 className="operatorSelect"><a style={{color: '#212529'}} href={process.env.PUBLIC_URL + "/#create"}>Operator <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
                <div className="form-group">
                    <select
                        className="form-control"
                        style= {{cursor: 'pointer'}}
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default value="null">Please select...</option>
                        <option value="Items">Items</option>
                        <option value="Tags">Tags</option>                        
                        <option value="PDF">PDFs</option>
                        <option value="Streams">Streams</option>
                        <option value="User Profiles">User Profiles</option>
                        {/* <option value="Test">***Test***</option> */}
                    </select>
                </div>

                { showSymbolReplace ? 
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Symbol Replace</span>
                        </div>
                        <input
                            type="text"
                            value={searchKey}
                            onChange={e => setSearchKey(e.target.value)}
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        ></input>
                    </div>
                : null }

                { showLoader        ? <APILoader/> : null } 
                { showServerSuccess ? <Success serverSuccess={serverSuccess}/> : null }
                { showServerError   ? <Error serverError={serverError}/> : null } 
                { showLogDownload   ? <DataDownload logURL={logURL}/> : null }
                { showUpload        ? <CSVUpload/> : null }
                { showCSVPreview    ? <CSVPreview/> : null }

                <div className="form-group" style={{marginTop: 30}}>
                    <input onClick={handleSubmit} type="submit" value="Bulk Smash!" className="btn btn-success"/>
                </div> 
            </form>
        </div>
    </>
    );
}

export default Create;