// REACT
import React, { 
    useState, 
    useEffect,
    useRef
} from 'react'
import { useHistory } from "react-router-dom"
import Axios from 'axios'

// SUB-COMPONENTS
import Progress from "./sub-components/serverProgress"
import Success from "./sub-components/serverSuccess"
import Error from "./sub-components/serverError"
import DataDownload from "./sub-components/logDownload"
import DataPreview from "./sub-components/csvPreview"

// CSS
import newWindow from '../images/newWindow.png'
import Loader from 'react-loader-spinner'
import create from '../images/create.png'
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
    const [hubId, setHubId] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerSuccess, setShowServerSuccess] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showLogDownload, setShowLogDownload] = useState(false);
    const [showLegacyFields, setShowLegacyFields] = useState(false);

    const clientIdRef = useRef();
    const clientSecretRef = useRef();

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

    useEffect(() => {
        checkSessionStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "Tags" || selectValue === "Streams" || selectValue === "Items" || selectValue === "User Profiles" || selectValue === "Test") {
            // clientIdRef.current.placeholder = "API Key";
            // clientSecretRef.current.placeholder = "API Secret";
            setShowUpload(true);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLoader(false);
            setShowLogDownload(false);
            setShowLegacyFields(false);
        } else if (selectValue === "PDF") {
            clientIdRef.current.placeholder = "API Key";
            clientSecretRef.current.placeholder = "Signature";
            setShowUpload(true);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowLoader(false);
            setShowLogDownload(false);
            setShowLegacyFields(true);
        } else {
            // clientIdRef.current.placeholder = "API Key";
            // clientSecretRef.current.placeholder = "API Secret";
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
        setShowCSVPreview(true);
        setFileName(file.name);
        console.log(file.name);
    }

    const ServerSuccess = () => (
        <Success serverSuccess={serverSuccess}/>
    )

    const ServerError = () => (
        <Error serverError={serverError}/>
    )

    const LogDownload = () => (
        <DataDownload logURL={logURL}/>
    )

    const CSVUpload = () => (
        <div className="form-group">
            <div className="custom-file">
                <input
                    type="file" 
                    className="custom-file-input" 
                    id="customFile"
                    accept=".csv"
                    onChange={e => readFile(e.target.files[0])}
                />
                <label className="custom-file-label">{fileName}</label>
            </div>
        </div>
    )

    const CSVPreview = () => (
        <DataPreview fileName={fileName} fileContents={fileContents}/>
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

            <Progress percentage={uploadPercentage}/>
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

        const options = {
            onUploadProgress: progressEvent => {
                setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
            }
        }

        const data = {
            APIKey, 
            APISecret,
            fileContents,
            hubId,
            searchKey
        };

        // Create tags
        if (selectValue === "Tags") {
            if (window.confirm("Are you sure you want to CREATE and TAG these items?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLegacyFields(false);
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
                setShowLegacyFields(false);
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
                setShowLegacyFields(false);
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
                setShowLegacyFields(false);
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
        } else if (selectValue === "PDF") {
            if (window.confirm("Are you sure you want to CREATE these PDFs?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLegacyFields(true);
                setShowLoader(true);

                Axios.post('create/pdfs', data)
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
        } else if (selectValue === "Test") {
            if (window.confirm("Are you sure you want to this TEST call?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);
                setShowLegacyFields(false);
                setShowLoader(true);

                Axios.post('create/test', data, options)
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
        <div className="newContainer">
            <form>
            <img style={{marginRight: 5, marginTop: -10}} src={create} width="20" height="20" alt="create"/>
            <h3 style={{display: 'inline'}}>Bulk Create</h3>
                <h5 className="headerText"><a style={{color: '#212529'}} href="https://help.uberflip.com/hc/en-us/articles/360019084031-Get-Your-Uberflip-API-Key-and-Secret-Account-ID-and-Hub-IDs" rel="noopener noreferrer" target="_blank">Enter REST API Credentials <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
                <div className="form-group">

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">API Key</span>
                        </div>
                        <input
                            type="text"
                            ref={clientIdRef}
                            value={APIKey}
                            onChange={e => setAPIKey(e.target.value)}
                            required
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        ></input>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">API Secret</span>
                        </div>
                        <input
                            type="text"
                            ref={clientSecretRef}
                            value={APISecret}
                            onChange={e => setAPISecret(e.target.value)}
                            required
                            className="form-control" 
                            aria-describedby="basic-addon1"
                        ></input>
                    </div>
                </div>

                { showLegacyFields ? <LegacyFields /> : null }

                <h5 className="operatorSelect"><a style={{color: '#212529'}} href={process.env.PUBLIC_URL + "/#create"}>Bulk Operator <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
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
                        <option value="Test">***Test***</option>
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