import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';
import { CsvToHtmlTable }from 'react-csv-to-table';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Update(props) {

    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [fileContents, setFileContents] = useState('');
    const [selectDate, setSelectDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showUpdatePreview, setShowUpdatePreview] = useState(false);

    useEffect(() => {
        if (selectValue === "Hide Past Content" || selectValue === "Show Past Content") {
            setShowDatePicker(true);
            setShowUpdatePreview(false);
        } else if (selectValue === "Author" || selectValue === "SEO" || selectValue === "Metadata") {
            setShowDatePicker(false);
            setShowUpdatePreview(true);
        } else {
            setShowDatePicker(false);
            setShowUpdatePreview(false);
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

    const UpdateListPreview = () => (
        <div className="form-group">
            <label><a href="https://docs.google.com/spreadsheets/d/1VeXSwQ9Cq4uXct4fegW2er3vqa9RU4Yzc-oAFeFprL4/edit#gid=0" target="_blank" rel="noopener noreferrer">CSV Templates</a></label>
            <div>
                <input type="file"
                    placeholder="Upload CSV"
                    accept=".csv"
                    onChange={e => readFile(e.target.files[0])}
                />
            </div>

            <h5 style={{marginTop: 80}}>CSV Preview:</h5>
            <div>
                <CsvToHtmlTable
                    data={fileContents}
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                />
            </div>
        </div>   
    )

    const HideItemsPicker = () => (
        <div className="form-group">
            <label>Select date to remove past content: </label>
            <div>
                <DatePicker
                    selected={selectDate}
                    onChange={date => setSelectDate(date)}
                    isClearable
                />
            </div>

            <label style={{marginTop: 20}}><a href="https://docs.google.com/spreadsheets/d/1VeXSwQ9Cq4uXct4fegW2er3vqa9RU4Yzc-oAFeFprL4/edit#gid=0" target="_blank" rel="noopener noreferrer">CSV Templates</a></label>
            <div>
                <input type="file"
                    placeholder="Upload CSV"
                    accept=".csv"
                    onChange={e => readFile(e.target.files[0])}
                />
            </div>

            <h5 style={{marginTop: 80}}>CSV Preview:</h5>
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

        const dateData = {
            clientId,
            clientSecret,
            selectDate,
            fileContents,
            selectValue
        }

        if (selectValue === "Hide Past Content") {
            if (window.confirm("Are you sure you want to HIDE items prior to " + selectDate + "?")) {
                Axios.post('https://localhost:8080/update/hidePastContent', dateData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        } else if (selectValue === "Show Past Content") {
            if (window.confirm("Are you sure you want to SHOW items prior to " + selectDate + "?")) {
                Axios.post('https://localhost:8080/update/showPastContent', dateData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        } else if (selectValue === "Author") {
            if (window.confirm("Are you sure you want to UPDATE these items?")) {
                Axios.post('https://localhost:8080/update/author', dateData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        } else if (selectValue === "SEO") {
            if (window.confirm("Are you sure you want to UPDATE these items?")) {
                Axios.post('https://localhost:8080/update/seo', dateData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        } else if (selectValue === "Metadata") {
            if (window.confirm("Are you sure you want to UPDATE these items?")) {
                Axios.post('https://localhost:8080/update/metadata', dateData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                console.log("Update operation cancelled.");
            }
        }
    }

    return (
        <div className="newContainer">
            <form>
            <h3>Bulk Update</h3>
                <h5 style={{marginTop: 30}}>Enter API Credentials</h5>
                <div className="form-group">
                    <input
                        placeholder="Client ID"
                        type="text"
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <input 
                        placeholder="Client Secret"
                        type="text"
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
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
                        <option value="Hide Past Content">Hide Past Content</option>
                        <option value="Show Past Content">Show Past Content</option>
                        <option value="Author">Item Author</option>
                        <option value="SEO">Item SEO</option>
                        <option value="Metadata">Item Metadata</option>
                    </select>
                </div>

                { showDatePicker ? <HideItemsPicker /> : null }
                { showUpdatePreview ? <UpdateListPreview />: null }

                <div className="form-group">
                    <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-success"/>
                </div>
            </form>
        </div>
    )
}

export default Update;