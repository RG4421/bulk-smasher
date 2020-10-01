import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';
import { CsvToHtmlTable }from 'react-csv-to-table';
import DatePicker from 'react-datepicker';
import check from '../check.png'
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
    const [serverResponse, setServerResponse] = useState('');

    const [selectDate, setSelectDate] = useState(new Date());
    const [showStreamId, setShowStreamId] = useState(false);
    const [showFindReplaceContent, setShowFindReplaceContent] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerResponse, setShowServerResponse] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "Hide Past Content" || selectValue === "Show Past Content") {
            setShowDatePicker(true);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerResponse(false);
            setShowFindReplaceContent(false);
            setShowStreamId(false);
        } else if (selectValue === "Author" || selectValue === "SEO" || selectValue === "Metadata" || selectValue === "Populate Stream") {
            setShowDatePicker(false);
            setShowUpload(true);
            setShowCSVPreview(false);
            setShowServerResponse(false);
            setShowFindReplaceContent(false);
            setShowStreamId(false);
        } else if (selectValue === "Item Embedded Content") {
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerResponse(false);
            setShowStreamId(false);
            setShowFindReplaceContent(true);
        } else if (selectValue === "Stream Embedded Content") {
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerResponse(false);
            setShowStreamId(true);
            setShowFindReplaceContent(true);
        } else {
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerResponse(false);
            setShowStreamId(false);
            setShowFindReplaceContent(false);
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
    }

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

    const FindAndReplace = () => (

        <div className="form-group">
            <div className="form-group">
                <input 
                    placeholder="Unique Item Search"
                    type="text"
                    value={uniqueSearch}
                    onChange={e => setUniqueSearch(e.target.value)}
                    required
                ></input>
            </div>
            <div className="form-group">
                <input 
                    placeholder="Search Value"
                    type="text"
                    value={itemSearch}
                    onChange={e => setItemSearch(e.target.value)}
                    required
                ></input>
            </div>
            <div className="form-group">
                <input 
                    placeholder="Replace Value"
                    type="text"
                    value={itemReplace}
                    onChange={e => setItemReplace(e.target.value)}
                    required
                ></input>
            </div>
        </div>
    )

    const ServerResponse = () => (
        <div className="form-group" style={{marginTop: 30}}>
            <img style={{marginRight: 5}} src={check} width="20" height="20" alt="Check"/>
            <label> {serverResponse.status} - {serverResponse.data}</label>
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

    const DateSelector = () => (
        <div className="form-group">
            <label>Select date to remove past content: </label>
            <div style={{width: 600}}>
                <DatePicker
                    selected={selectDate}
                    onChange={date => setSelectDate(date)}
                    isClearable
                />
            </div>
        </div>
    )

    const HandleSubmit = (e) => {
        setShowServerResponse(false);
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
            itemReplace
        }

        // Updating past content to hidden
        if (selectValue === "Hide Past Content") {
            if (window.confirm("Are you sure you want to HIDE items prior to " + selectDate + "?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/hidePastContent', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        // Updated past content to be shown
        } else if (selectValue === "Show Past Content") {
            if (window.confirm("Are you sure you want to SHOW items prior to " + selectDate + "?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/showPastContent', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        // Update author of stream items
        } else if (selectValue === "Author") {
            if (window.confirm("Are you sure you want to UPDATE the AUTHOR of these items?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/author', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        // Update SEO metadata of stream items
        } else if (selectValue === "SEO") {
            if (window.confirm("Are you sure you want to UPDATE the SEO of these items?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/seo', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        // Update items metadata
        } else if (selectValue === "Metadata") {
            if (window.confirm("Are you sure you want to UPDATE the METADATA of these items?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/metadata', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        // Populate stream with items
        } else if (selectValue === "Populate Stream") {
            if (window.confirm("Are you sure you want to UPDATE these STREAMS?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/populateStreams', data)
                .then((res) => {
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        // Populate items embedded content
        } else if (selectValue === "Item Embedded Content") {
            if (window.confirm("Are you sure you want to UPDATE these ITEMS EMBEDDED CONTENT?")) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/itemContent', data)
                .then((res) => {
                    setShowStreamId(false);
                    setShowFindReplaceContent(false);
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        }
        else if (selectValue === "Stream Embedded Content") {
            if (window.confirm(`Are you sure you want to UPDATE stream ${streamId} ITEM EMBEDDED CONTENT?`)) {
                setShowUpload(false);
                setShowCSVPreview(false);
                setShowLoader(true);

                Axios.post('https://localhost:8080/update/streamItemContent', data)
                .then((res) => {
                    setShowStreamId(false);
                    setShowFindReplaceContent(false);
                    setShowLoader(false);
                    setServerResponse(res);
                    setShowServerResponse(true);
                    console.log(res);
                }).catch((e) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
                    setServerResponse(e);
                    setShowServerResponse(true);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        }
    }

    // Build of webpage
    return (
        <div className="container">
            <form>
            <h3>Bulk Update</h3>
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
                        <option default>Please Select...</option>
                        <option value="Populate Stream">Populate Stream</option>
                        <option value="Hide Past Content">Hide Past Content</option>
                        <option value="Show Past Content">Show Past Content</option>
                        <option value="Author">Item Author</option>
                        <option value="SEO">Item SEO</option>
                        <option value="Metadata">Item Metadata</option>
                        <option value="Item Embedded Content">All Items Embedded Content</option>
                        <option value="Stream Embedded Content">Stream Items Embedded Content</option>
                    </select>
                </div>

                { showLoader ? <APILoader/> : null }
                { showServerResponse ? <ServerResponse/> : null }
                { showStreamId ? <Streams/> : null }
                { showFindReplaceContent ? <FindAndReplace/> : null } 
                { showDatePicker ? <DateSelector/> : null } 
                { showUpload ? <CSVUpload/> : null }
                { showCSVPreview ? <CSVPreview/> : null } 

                <div className="form-group" style={{marginTop: 30}}>
                    <input onClick={HandleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div>
            </form>
        </div>
    )
}

export default Update;