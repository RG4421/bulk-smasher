import React, { useState, useEffect } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';

function Delete(props)
{
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [fileContents, setFileContents] = useState('');
    const [checked, setChecked] = useState(false);
    const [showDeleteAll, setShowDeleteAll] = useState(false);
    const [showDeleteList, setShowDeleteList] = useState(false);

    useEffect(() => {
        if (selectValue === "All Tags") {
            setShowDeleteAll(true);
            setShowDeleteList(false);

        } else if (selectValue === "Specific Tags") {
            setShowDeleteAll(false);
            setShowDeleteList(true);
        } else {
            setShowDeleteAll(false);
            setShowDeleteList(false);
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

            <h5 style={{marginTop: 50}}>CSV Preview:</h5>
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

        const bulkData = {
            clientId, 
            clientSecret,
        };

        const csvDelete = {
            clientId,
            clientSecret,
            fileContents
        }

        // Run delete all tags function
        if (checked === true ) {
            if (window.confirm("Are you sure you want to delete all tags?")) {
                Axios.post('https://localhost:8080/delete/allTags', bulkData)
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
            Axios.post('https://localhost:8080/delete/tagList', csvDelete)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
        } else if (selectValue === "Marketing Stream") {
            Axios.post('https://localhost:8080/delete/streamItems', csvDelete)
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
                <h5 style={{marginTop: 30}}>Select Bulk Operator</h5>
                <div className="form-group">
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default>Please Select...</option>
                        <option value="All Tags">All Tags</option>
                        <option value="Tag List">Tag List</option>
                    </select>
                </div>

                { showDeleteList ? <DeleteList/> : null } 
                { showDeleteAll  ? <DeleteAll /> : null }

                <div className="form-group">
                        <input onClick={handleSubmit} type="submit" value="Execute" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default Delete;