import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';
import { CsvToHtmlTable }from 'react-csv-to-table';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import check from '../check.png'

function Update(props) {

    const [APIKey, setAPIKey] = useState('');
    const [APISecret, setAPISecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [fileContents, setFileContents] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [selectDate, setSelectDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showCSVPreview, setShowCSVPreview] = useState(false);
    const [showServerResponse, setShowServerResponse] = useState(false);

    // Handling what fields are displayed depending on selectValue
    useEffect(() => {
        if (selectValue === "Hide Past Content" || selectValue === "Show Past Content") {
            setShowDatePicker(true);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerResponse(false);
        } else if (selectValue === "Author" || selectValue === "SEO" || selectValue === "Metadata" || selectValue === "Populate Stream") {
            setShowDatePicker(false);
            setShowUpload(true);
            setShowCSVPreview(true);
            setShowServerResponse(false);
        } else {
            setShowDatePicker(false);
            setShowUpload(false);
            setShowCSVPreview(false);
            setShowServerResponse(false);
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
    }

    const ServerResponse = () => (
        <div className="form-group">
            <img style={{marginRight: 5}} src={check} width="20" height="20" alt="Check"/>
            <label> {serverResponse.status} - {serverResponse.data}</label>
        </div>
    )

    const CSVUpload = () => (
        <div className="form-group">
            <label><a href="https://docs.google.com/spreadsheets/d/1iuoyIPQHMsxZiSOefFQCCPsMSY8eqKUXAPSeg9lWGts/edit?usp=sharing" target="_blank" rel="noopener noreferrer">CSV Templates</a></label>
            <div>
                <input type="file"
                    placeholder="Upload CSV"
                    accept=".csv"
                    onChange={e => ReadFile(e.target.files[0])}
                />
            </div>
        </div>   
    )

    const CSVPreview = () => (
        <div className="form-group">
           <h5 style={{marginTop: 20}}>CSV Preview:</h5>
            <div>
                <CsvToHtmlTable
                    data={fileContents}
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                />
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
                    isClearable
                />
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
            selectValue
        }

        // Updating past content to hidden
        if (selectValue === "Hide Past Content") {
            if (window.confirm("Are you sure you want to HIDE items prior to " + selectDate + "?")) {
                Axios.post('https://localhost:8080/update/hidePastContent', data)
                .then((res) => {
                    setShowUpload(false);
                    setShowCSVPreview(false);
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
                Axios.post('https://localhost:8080/update/showPastContent', data)
                .then((res) => {
                    setShowUpload(false);
                    setShowCSVPreview(false);
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
                Axios.post('https://localhost:8080/update/author', data)
                .then((res) => {
                    setShowUpload(false);
                    setShowCSVPreview(false);
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
                Axios.post('https://localhost:8080/update/seo', data)
                .then((res) => {
                    setShowUpload(false);
                    setShowCSVPreview(false);
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
                Axios.post('https://localhost:8080/update/metadata', data)
                .then((res) => {
                    setShowUpload(false);
                    setShowCSVPreview(false);
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
                Axios.post('https://localhost:8080/update/populateStreams', data)
                .then((res) => {
                    setShowUpload(false);
                    setShowCSVPreview(false);
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
                Axios.post('https://localhost:8080/update/itemContent', data)
                .then((res) => {
                    setShowUpload(false);
                    setShowCSVPreview(true);
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
                        <option valule="Item Embedded Content">Item Embedded Content</option>
                    </select>
                </div>

                { showServerResponse ? <ServerResponse/> : null } 
                { showDatePicker ? <DateSelector/> : null } 
                { showUpload ? <CSVUpload/> : null }
                { showCSVPreview ? <CSVPreview/> : null } 

                <div className="form-group">
                    <input onClick={HandleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div>
            </form>
        </div>
    )
}

export default Update;