import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';

function Delete(props)
{
    const [clientId, setClientId]                 = useState('');
    const [clientSecret, setClientSecret]         = useState('');
    const [selectValue, setSelectValue]           = useState('');
    const [fileContents, setFileContents]         = useState('');
    const [hubId, setHubId]                       = useState('');
    const [selectDate, setSelectDate]             = useState(new Date());
    const [checked, setChecked]                   = useState(false);
    const [showDeleteAll, setShowDeleteAll]       = useState(false);
    const [showDeleteList, setShowDeleteList]     = useState(false);
    const [showDatePicker, setShowDatePicker]     = useState(false);
    const [showLegacyFields, setShowLegacyFields] = useState(false);

    const clientIdRef = useRef();
    const clientSecretRef = useRef();

    useEffect(() => {
        if (selectValue === "All Tags") {
            clientIdRef.current.placeholder = "Client ID";
            clientSecretRef.current.placeholder = "Client Secret";
            setShowDeleteAll(true);
            setShowLegacyFields(false);
            setShowDeleteList(false);
            setShowDatePicker(false);
        } else if (selectValue === "Tag List" || selectValue === "Stream Items" || selectValue === "Hidden Items") {
            clientIdRef.current.placeholder = "Client ID";
            clientSecretRef.current.placeholder = "Client Secret";
            setShowDeleteAll(false);
            setShowLegacyFields(false);
            setShowDeleteList(true);
            setShowDatePicker(false);
        } else if (selectValue === "Past Content") {
            clientIdRef.current.placeholder = "Client ID";
            clientSecretRef.current.placeholder = "Client Secret";
            setShowDeleteAll(false);
            setShowLegacyFields(false);
            setShowDeleteList(false);
            setShowDatePicker(true);
        } else if (selectValue === "Flipbook Folders") {
            clientIdRef.current.placeholder = "API Key";
            clientSecretRef.current.placeholder = "Signature";
            setShowDeleteAll(false);
            setShowLegacyFields(true);
            setShowDeleteList(true);
            setShowDatePicker(false);
        } else {
            clientIdRef.current.placeholder = "Client ID";
            clientSecretRef.current.placeholder = "Client Secret";
            setShowDeleteAll(false);
            setShowLegacyFields(false);
            setShowDeleteList(false);
            setShowDatePicker(false);
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

    const DeleteAll = () => (
        <div className="form-group">
            <input 
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(!checked)}
            ></input>
            <label>Delete All</label>
        </div>
    )

    const DeleteList = () => (
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

    const DeleteDate = () => (
        <div className="form-group">
            <label>Select date to remove prior content: </label>
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

        const authData = {
            clientId, 
            clientSecret,
        };

        const csvData = {
            clientId,
            clientSecret,
            fileContents
        };

        const dateData = {
            clientId,
            clientSecret,
            selectDate,
            fileContents
        };

        const legacyData = {
            clientId,
            clientSecret,
            hubId,
            fileContents
        };


        // Run delete all tags function
        if (checked === true ) {
            if (window.confirm("Are you sure you want to delete all tags?")) {
                Axios.post('https://localhost:8080/delete/allTags', authData)
                .then((res) => {
                    console.log("Delete operation successful " + res);
                }).catch((e) => {
                    console.log("Delete operation failed " + e);
                });
            } else {
                console.log("Delete operation cancelled!");
            }
        // Delete specific tags based on CSV
        } else if (selectValue === "Tag List") {
            Axios.post('https://localhost:8080/delete/tagList', csvData)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
        // Delete stream items based on CSV
        } else if (selectValue === "Stream Items") {
            Axios.post('https://localhost:8080/delete/streamItems', csvData)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
        // Delete hidden items in streams based on CSV
        } else if (selectValue === "Hidden Items") {
            Axios.post('https://localhost:8080/delete/hiddenItems', csvData)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
        // Delete/hide past content based on date selected and CSV
        } else if (selectValue === "Past Content") {
            if (window.confirm("Are you sure you want to DELETE items prior to " + selectDate + "?")) {
                Axios.post('https://localhost:8080/delete/pastContent', dateData)
                .then((res) => {
                    console.log(res);
                }).catch((e) => {
                    console.log(e);
                });
            }
        } else if (selectValue === "Flipbook Folders") {
            Axios.post('https://localhost:8080/delete/flipbookFolders', legacyData)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    return (
        <div style={{marginTop: 10}}>
            <h3>Bulk Delete</h3>
            <form style={{marginLeft: 30}}>
                <h5 style={{marginTop: 30}}>Enter API Credentials</h5>
                <div className="form-group">
                    <input
                        ref={clientIdRef}
                        placeholder="Client ID"
                        type="text"
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <input 
                        ref={clientSecretRef}
                        placeholder="Client Secret"
                        type="text"
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
                        required
                    ></input>
                </div>

                { showLegacyFields ? <LegacyFields /> : null }

                <h5 style={{marginTop: 30}}>Select Operator:</h5>
                <div className="form-group">
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default>Please Select...</option>
                        <option value="All Tags">All Tags</option>
                        <option value="Tag List">Tag List</option>
                        <option value="Stream Items">Marketing Stream Items</option>
                        <option value="Hidden Items">Hidden Marketing Stream Items</option>
                        <option value="Past Content">Past Content</option>
                        <option value="Flipbook Folders">Flipbook Folders</option>
                    </select>
                </div>

                { showDeleteList ? <DeleteList/> : null }
                { showDeleteAll  ? <DeleteAll /> : null }
                { showDatePicker ? <DeleteDate /> : null }

                <div className="form-group">
                        <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default Delete;