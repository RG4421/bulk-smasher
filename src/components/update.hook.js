import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";
import { CsvToHtmlTable }from 'react-csv-to-table';
import DatePicker from 'react-datepicker';

import update from '../images/update.png'
import check from '../images/check.png'
import cross from '../images/cross.png'
import newWindow from '../images/newWindow.png'
import Loader from 'react-loader-spinner'
import "react-datepicker/dist/react-datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Update(props) {

    const [APIKey, setAPIKey] = useState('');
    const [APISecret, setAPISecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [fileContents, setFileContents] = useState('');
    const [uniqueSearch, setUniqueSearch] = useState('');
    const [streamId, setStreamId] = useState('');
    const [itemSearch, setItemSearch] = useState('');
    const [itemReplace, setItemReplace] = useState('');
    const [tagSearch, setTagSearch] = useState('');
    const [canonAppend, setCanonAppend] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    const [serverError, setServerError] = useState('');
    const [logURL, setLogURL] = useState('');
    const [fileName, setFileName] = useState('');
    const [pendValue, setPendValue] = useState('');
    const [searchKey, setSearchKey] = useState('');

    const [selectDate, setSelectDate] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [showStreamId, setShowStreamId] = useState(false);
    const [showTagSearch, setShowTagSearch] = useState(false);
    const [showFindReplaceContent, setShowFindReplaceContent] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerSuccess, setShowServerSuccess] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showLogDownload, setShowLogDownload] = useState(false);

    // AUTHENTICATION
    const history = useHistory();

    const checkSessionStatus = () => {
        const token = JSON.parse(localStorage.getItem('bulksmasher-user'));        
        
        if (token) {
            Axios.get('auth/checkCreds', { headers: {Authorization: `Bearer ${token.accessToken}`}})
            .then((res) => {
                if (res.data.authSuccessful === true) {
                    history.push('/update');
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
        if (selectValue === "Hide Past Content" || selectValue === "Show Past Content") {
            setShowLoader(false);
            setShowDatePicker(true);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowFindReplaceContent(false);
            setShowStreamId(false);
            setShowTagSearch(false);
            setShowLogDownload(false);
        } else if (selectValue === "Author" || selectValue === "SEO" || selectValue === "Metadata" || selectValue === "Populate Stream" || selectValue === "Items") {
            setShowLoader(false);
            setShowDatePicker(false);
            setShowUpload(true);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowFindReplaceContent(false);
            setShowStreamId(false);
            setShowTagSearch(false);
            setShowLogDownload(false);
        } else if (selectValue === "Item Embedded Content") {
            setShowLoader(false);
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowStreamId(false);
            setShowFindReplaceContent(true);
            setShowTagSearch(false);
            setShowLogDownload(false);
        } else if (selectValue === "Stream Embedded Content") {
            setShowLoader(false);
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowStreamId(true);
            setShowFindReplaceContent(true);
            setShowTagSearch(false);
            setShowLogDownload(false);
        } else if (selectValue === "Tag Search") {
            setShowLoader(false);
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowStreamId(false);
            setShowFindReplaceContent(false);
            setShowTagSearch(true);
            setShowLogDownload(false);
        } else {
            setShowLoader(false);
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerSuccess(false);
            setShowServerError(false);
            setShowStreamId(false);
            setShowFindReplaceContent(false);
            setShowTagSearch(false);
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

    const ServerSuccess = () => (
        <Alert variant="success">
            <div className="form-group componentElements">
                <img style={{marginRight: 5, marginBottom: 3}} src={check} width="20" height="20" alt="Check"/>
                <label> {serverSuccess}</label>
            </div>
        </Alert>
    )

    const ServerError = () => (
        <Alert variant="danger">
            <div className="form-group componentElements">
                <img style={{marginRight: 5, marginBottom: 3}} src={cross} width="20" height="20" alt="Check"/>
                <label> {serverError.status} {serverError.data.message}</label>
            </div>
        </Alert>
    )

    const LogDownload = () => (
        <Alert variant="info">
            <div className="form-group" style={{marginTop: 15}}>
                <a href={process.env.PUBLIC_URL + '/server-logs/' + logURL} rel="noopener noreferrer" target="_blank">View Bulk Smasher Log
                <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a>
            </div>
        </Alert>
    )

    const CSVUpload = () => (
        <div className="form-group">
            <input
                placeholder="Unique Search and Replace Key"
                type="text"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
            ></input>
            <div className="componentElements">
                <input type="file"
                    accept=".csv"
                    onChange={e => ReadFile(e.target.files[0])}
                />
            </div>
        </div>   
    )

    const CSVPreview = () => (
        <div className="form-group">
           <h5 className="componentElements"><b>{fileName}</b></h5>
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

    const Streams = () => (
        <div className="form-group">
            <input
                placeholder="Stream ID"
                type="text"
                value={streamId}
                onChange={e => setStreamId(e.target.value)}
                required
            ></input>
        </div>
    )

    const TagSearch = () => (
        <div>
            <div className="form-group">
                <input
                    placeholder="Tag Search Key"
                    type="text"
                    value={tagSearch}
                    onChange={e => setTagSearch(e.target.value)}
                    required
                ></input>
            </div>
            <div className="form-group">
                <input 
                    style={{marginRight: 5, width: '10px'}}
                    type="checkbox"
                    checked={checked}
                    onChange={e => setChecked(!checked)}
                />
                <label>Item is tagged with 'Tag Search Key'</label>
            </div>
            <div className="form-group">
                <select
                    style= {{cursor: 'pointer'}}
                    value={pendValue}
                    onChange={e => setPendValue(e.target.value)}
                >
                    <option default>Prepend or Append...</option>
                    <option value="Prepend">Prepend</option>
                    <option value="Append">Append</option>
                </select>
            </div>
            <div className="form-group">
                <input
                    placeholder="Prepend/Append value to Canonical"
                    type="text"
                    value={canonAppend}
                    onChange={e => setCanonAppend(e.target.value)}
                    required
                ></input>
            </div>
        </div>
    )

    const FindAndReplace = () => (

        <div className="form-group">
            <div className="form-group">
                <input 
                    placeholder="Unique Search Key"
                    type="text"
                    value={uniqueSearch}
                    onChange={e => setUniqueSearch(e.target.value)}
                    required
                ></input>
            </div>
            <div className="form-group">
                <input 
                    placeholder="Search Token"
                    type="text"
                    value={itemSearch}
                    onChange={e => setItemSearch(e.target.value)}
                    required
                ></input>
            </div>
            <div className="form-group">
                <input 
                    placeholder="Replace Token"
                    type="text"
                    value={itemReplace}
                    onChange={e => setItemReplace(e.target.value)}
                    required
                ></input>
            </div>
        </div>
    )

    const HandleSubmit = (e) => {
        e.preventDefault();

        const data = {
            APIKey,
            APISecret,
            selectDate,
            fileContents,
            selectValue,
            uniqueSearch,
            streamId,
            itemSearch,
            itemReplace,
            tagSearch,
            canonAppend,
            pendValue,
            checked,
            searchKey
        }

        // Updating past content to hidden
        if (selectValue === "Hide Past Content") {
            if (window.confirm("Are you sure you want to HIDE items prior to " + selectDate + "?")) {
                setShowDatePicker(false);
                setShowUpload(false);
                setShowTagSearch(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/hidePastContent', data)
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
                console.log("Update operation cancelled.");
            }
        // Updated past content to be shown
        } else if (selectValue === "Show Past Content") {
            if (window.confirm("Are you sure you want to SHOW items prior to " + selectDate + "?")) {
                setShowDatePicker(false);
                setShowUpload(false);
                setShowTagSearch(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/showPastContent', data)
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
                console.log("Update operation cancelled.");
            }
        // Update author of stream items
        } else if (selectValue === "Author") {
            if (window.confirm("Are you sure you want to UPDATE the AUTHOR of these items?")) {
                setShowDatePicker(false);
                setShowUpload(false);
                setShowTagSearch(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/author', data)
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
                console.log("Update operation cancelled.");
            }
        // Update SEO metadata of stream items
        } else if (selectValue === "SEO") {
            if (window.confirm("Are you sure you want to UPDATE the SEO of these items?")) {
                setShowDatePicker(false);
                setShowTagSearch(false);
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/seo', data)
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
                console.log("Update operation cancelled.");
            }
        // Update items metadata
        } else if (selectValue === "Metadata") {
            if (window.confirm("Are you sure you want to UPDATE the METADATA of these items?")) {
                setShowDatePicker(false);
                setShowTagSearch(false);
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/metadata', data)
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
                console.log("Update operation cancelled.");
            }
        // Populate stream with items
        } else if (selectValue === "Populate Stream") {
            if (window.confirm("Are you sure you want to UPDATE these STREAMS?")) {
                setShowDatePicker(false);
                setShowUpload(false);
                setShowTagSearch(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/populateStreams', data)
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
                console.log("Update operation cancelled.");
            }
        // Populate items embedded content
        } else if (selectValue === "Item Embedded Content") {
            if (window.confirm("Are you sure you want to UPDATE these ITEMS EMBEDDED CONTENT?")) {
                setShowStreamId(false);
                setShowTagSearch(false);
                setShowFindReplaceContent(false);
                setShowDatePicker(false);
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/itemContent', data)
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
                console.log("Update operation cancelled.");
            }
        } else if (selectValue === "Stream Embedded Content") {
            if (window.confirm(`Are you sure you want to UPDATE stream ${streamId} ITEM EMBEDDED CONTENT?`)) {
                setShowStreamId(false);
                setShowTagSearch(false);
                setShowFindReplaceContent(false);
                setShowDatePicker(false);
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/streamItemContent', data)
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
                console.log("Update operation cancelled.");
            }
        } else if (selectValue === "Items") {
            if (window.confirm(`Are you sure you want to UPDATE the listed ITEMS?`)) {
                setShowStreamId(false);
                setShowTagSearch(false);
                setShowFindReplaceContent(false);
                setShowDatePicker(false);
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/items', data)
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
                console.log("Update operation cancelled.");
            }
        } else if (selectValue === "Tag Search") {
            if (window.confirm(`Are you sure you want to UPDATE the found ITEMS?`)) {
                setShowStreamId(false);
                setShowTagSearch(false);
                setShowFindReplaceContent(false);
                setShowDatePicker(false);
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);

                Axios.post('/update/tagSearch', data)
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
                console.log("Update operation cancelled.");
            }
        }
    }

    // Build of webpage
    return (
    <>
        <div className="newContainer">
            <form>
            <img style={{marginRight: 5, marginTop: -10}} src={update} width="20" height="20" alt="update"/>
            <h3 style={{display: 'inline'}}>Bulk Update</h3>
                <h5 className="headerText"><a style={{color: '#212529'}} href="https://help.uberflip.com/hc/en-us/articles/360019084031-Get-Your-Uberflip-API-Key-and-Secret-Account-ID-and-Hub-IDs" rel="noopener noreferrer" target="_blank">Enter REST API Credentials <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
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
                <h5 className="operatorSelect"><a style={{color: '#212529'}} href={process.env.PUBLIC_URL + "/#update"}>Select Operator <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
                <div className="form-group">
                    <select
                        style= {{cursor: 'pointer'}}
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default>Please Select...</option>
                        <option value="Populate Stream">Populate Stream</option>
                        <option value="Hide Past Content">Hide Past Content</option>
                        <option value="Show Past Content">Show Past Content</option>
                        <option value="Items">Items</option>
                        <option value="Author">Item Author</option>
                        <option value="SEO">Item SEO</option>
                        <option value="Metadata">Item Metadata</option>
                        <option value="Item Embedded Content">All Item's Source Content</option>
                        <option value="Stream Embedded Content">Stream Item's Source Content</option>
                        <option value="Tag Search">Tag Search</option>
                    </select>
                </div>

                { showLoader             ? <APILoader/> : null }
                { showServerSuccess      ? <ServerSuccess/> : null }
                { showServerError        ? <ServerError/> : null }
                { showLogDownload        ? <LogDownload/> : null }
                { showStreamId           ? <Streams/> : null }
                { showTagSearch          ? <TagSearch/> : null }
                { showFindReplaceContent ? <FindAndReplace/> : null } 
                { showDatePicker         ? <DateSelector/> : null } 
                { showUpload             ? <CSVUpload/> : null }
                { showCSVPreview         ? <CSVPreview/> : null } 

                <div className="form-group" style={{marginTop: 30}}>
                    <input onClick={HandleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div>
            </form>
        </div>
    </>
    )
}

export default Update;