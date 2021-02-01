import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { CsvToHtmlTable }from 'react-csv-to-table';
import DatePicker from 'react-datepicker';

// MODULES
import Success from "./modules/serverSuccess"
import Error from "./modules/serverError"
import DataDownload from "./modules/logDownload"

// CSS
import update from '../images/update.png'
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
    const [fileName, setFileName] = useState('Choose file');
    const [fileSize, setFileSize] = useState(0);
    const [pendValue, setPendValue] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [showHide, setShowHide] = useState('');

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
    const [showSymbolReplace, setShowSymbolReplace] = useState(false);


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
        if (selectValue === "Hide Past Content") {
            setFileName('Choose file');
            setSearchKey('');
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
            setShowSymbolReplace(false);
            setShowHide('hide');
        } else if (selectValue === "Show Past Content") {
            setFileName('Choose file');
            setSearchKey('');
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
            setShowSymbolReplace(false);
            setShowHide('show');
        } else if (selectValue === "Author" || selectValue === "SEO" || selectValue === "Metadata" || selectValue === "Populate Stream" || selectValue === "Items") {
            setFileName('Choose file');
            setSearchKey('');
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
            setShowSymbolReplace(true);
        } else if (selectValue === "Item Embedded Content") {
            setFileName('Choose file');
            setSearchKey('');
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
            setShowSymbolReplace(false);
        } else if (selectValue === "Stream Embedded Content") {
            setFileName('Choose file');
            setSearchKey('');
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
            setShowSymbolReplace(false);
        } else if (selectValue === "Tag Search") {
            setFileName('Choose file');
            setSearchKey('');
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
            setShowSymbolReplace(false);
        } else {
            setFileName('Choose file');
            setSearchKey('');
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
            setShowSymbolReplace(false);
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
        setFileSize(file.size);
        setShowCSVPreview(true);
        setFileName(file.name);
        console.log(file.name);
    }

    const CSVUpload = () => (
        <div className="form-group">
            <div className="custom-file">
                <input
                    type="file"
                    className="custom-file-input" 
                    id="customFile"
                    accept=".csv"
                    onChange={e => ReadFile(e.target.files[0])}
                />
                <label className="custom-file-label">{fileName}</label>
            </div>
        </div>   
    )

    const CSVPreview = () => (
        <div className="form-group">
           <h6 style={{marginTop: 30}}><b>{fileName}</b> ({fileSize}B)</h6>
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

    const DateSelector = () => (
        <div className="form-group">
            <label>Select date to <b>{showHide}</b> past content: </label>
            <div style={{width: '100px'}}>
                <DatePicker
                    selected={selectDate}
                    onChange={date => setSelectDate(date)}
                />
            </div>
        </div>
    )

    const HandleSubmit = (e) => {
        e.preventDefault();

        const options = {

        }

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

        switch(selectValue) {
            case "Hide Past Content":
                if (window.confirm("Are you sure you want to HIDE items prior to " + selectDate + "?")) {
                    setShowDatePicker(false);
                    setShowUpload(false);
                    setShowTagSearch(false);
                    setShowCSVPreview(false);
                    setShowLoader(true);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);
    
                    Axios.post('/update/hidePastContent', data, options)
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
            break;

            case "Show Past Content": 
                if (window.confirm("Are you sure you want to SHOW items prior to " + selectDate + "?")) {
                    setShowDatePicker(false);
                    setShowUpload(false);
                    setShowTagSearch(false);
                    setShowCSVPreview(false);
                    setShowLoader(true);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);

                    Axios.post('/update/showPastContent', data, options)
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
            break;

            case "Author":
                if (window.confirm("Are you sure you want to UPDATE the AUTHOR of these items?")) {
                setShowDatePicker(false);
                setShowUpload(false);
                setShowTagSearch(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/author', data, options)
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
            break;
            
            case "SEO":
                if (window.confirm("Are you sure you want to UPDATE the SEO of these items?")) {
                    setShowDatePicker(false);
                    setShowTagSearch(false);
                    setShowUpload(false);
                    setShowCSVPreview(false);
                    setShowLoader(true);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);

                    Axios.post('/update/seo', data, options)
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
            break;

            case "Metadata":
               if (window.confirm("Are you sure you want to UPDATE the METADATA of these items?")) {
                setShowDatePicker(false);
                setShowTagSearch(false);
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);
                setShowServerSuccess(false);
                setShowServerError(false);
                setShowLogDownload(false);

                Axios.post('/update/metadata', data, options)
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
            break;

            case "Populate Stream":
                if (window.confirm("Are you sure you want to UPDATE these STREAMS?")) {
                    setShowDatePicker(false);
                    setShowUpload(false);
                    setShowTagSearch(false);
                    setShowCSVPreview(false);
                    setShowLoader(true);
                    setShowServerSuccess(false);
                    setShowServerError(false);
                    setShowLogDownload(false);

                    Axios.post('/update/populateStreams', data, options)
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
            break;

            case "Item Embedded Content":
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

                    Axios.post('/update/itemContent', data, options)
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
            break;

            case "Stream Embedded Content":
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

                    Axios.post('/update/streamItemContent', data, options)
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
            break;

            case "Items":
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

                    Axios.post('/update/items', data, options)
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
            break;

        case "Tag Search":
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

                Axios.post('/update/tagSearch', data, options)
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
        break;
            default: console.log('No valid user input')
        }
    }

    // Build of webpage
    return (
    <>
        <div className="newContainer">
            <form>
            <img style={{marginRight: 5, marginTop: -10}} src={update} width="20" height="20" alt="update"/>
            <h4 style={{display: 'inline'}}>Bulk Update</h4>
                <h6 className="headerText"><a style={{color: '#212529'}} href="https://help.uberflip.com/hc/en-us/articles/360019084031-Get-Your-Uberflip-API-Key-and-Secret-Account-ID-and-Hub-IDs" rel="noopener noreferrer" target="_blank">API Credentials <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h6>
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
                        <span className="input-group-text" id="basic-addon1">API Secret</span>
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
                <h6 className="operatorSelect"><a style={{color: '#212529'}} href={process.env.PUBLIC_URL + "/#update"}>Operator <img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h6>
                <div className="form-group">
                    <select
                        className="form-control"
                        style= {{cursor: 'pointer'}}
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default>Please select...</option>
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

                { showLoader             ? <APILoader/> : null }
                { showServerSuccess      ? <Success serverSuccess={serverSuccess}/> : null }
                { showServerError        ? <Error serverError={serverError}/> : null } 
                { showLogDownload        ? <DataDownload logURL={logURL}/> : null }
                
                { showStreamId           ? 
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Stream ID</span>
                        </div>
                        <input
                            type="text"
                            value={streamId}
                            onChange={e => setStreamId(e.target.value)}
                            className="form-control" 
                            aria-describedby="basic-addon1"
                            required
                        ></input>
                    </div>
                : null }

                { showTagSearch          ?     
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tag Search Key</span>
                            </div>
                            <input
                                type="text"
                                value={tagSearch}
                                onChange={e => setTagSearch(e.target.value)}
                                className="form-control" 
                                aria-describedby="basic-addon1"
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
                                className="form-control"
                                style= {{cursor: 'pointer'}}
                                value={pendValue}
                                onChange={e => setPendValue(e.target.value)}
                            >
                                <option default>Prepend or Append...</option>
                                <option value="Prepend">Prepend</option>
                                <option value="Append">Append</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Value</span>
                            </div>
                            <input
                                type="text"
                                value={canonAppend}
                                onChange={e => setCanonAppend(e.target.value)}
                                className="form-control" 
                                aria-describedby="basic-addon1"
                                required
                            ></input>
                        </div>
                    </div>
                : null }

                { showFindReplaceContent ? 
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Unique Key</span>
                            </div>
                            <input 
                                type="text"
                                value={uniqueSearch}
                                onChange={e => setUniqueSearch(e.target.value)}
                                className="form-control" 
                                aria-describedby="basic-addon1"
                                required
                            ></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Search Token</span>
                            </div>
                            <input 
                                type="text"
                                value={itemSearch}
                                onChange={e => setItemSearch(e.target.value)}
                                className="form-control" 
                                aria-describedby="basic-addon1"
                                required
                            ></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Replace Token</span>
                            </div>
                            <input 
                                type="text"
                                value={itemReplace}
                                onChange={e => setItemReplace(e.target.value)}
                                className="form-control" 
                                aria-describedby="basic-addon1"
                                required
                            ></input>
                        </div>
                    </div>
                : null } 
                
                { showDatePicker         ? <DateSelector/> : null } 
                { showUpload             ? <CSVUpload/> : null }
                { showCSVPreview         ? <CSVPreview/> : null } 

                <div className="form-group" style={{marginTop: 30}}>
                    <input onClick={HandleSubmit} type="submit" value="Bulk Smash!" className="btn btn-success"/>
                </div>
            </form>
        </div>
    </>
    )
}

export default Update;