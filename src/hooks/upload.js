import React, { useState } from 'react';

function Upload(props) {

    const [selectValue, setSelectValue] = useState("");
    const [file, setFile] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        switch(selectValue) {
            case 'Tag':
                alert(`Select Value ${selectValue}\nFile ${file}`);
                break;
            case 'User Profile':
                alert(`Select Value ${selectValue}\nFile ${file}`);
                break;
            case 'Metadescription/SEO':
                alert(`Select Value ${selectValue}\nFile ${file}`);
                break;
            case 'Marketing Stream':
                alert(`Select Value ${selectValue}\nFile ${file}`);
                break;
            default:
                alert("Please make a valid selection!");
            }
        }

    return (
        <>
        <div style={{marginTop: 10}}>
            <h3>Bulk Uploader</h3>
            <form onSubmit={handleSubmit}>
                <label>Select the bulk option you want create: </label>
                <div className="form-group">
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option default>Please Select...</option>
                        <option value="Tag">Tag</option>
                        <option value="User Profile">User Profile</option>
                        <option value="Metadescription/SEO">Metadescription/SEO</option>
                        <option value="Marketing Stream">Marketing Stream</option>
                    </select>
                </div>
                <label>Upload CSV: </label>
                <div className="form-group">
                    <input type="file"
                        accept=".csv"
                        value={file}
                        onChange={e => setFile(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Upload" className="btn btn-primary"/>
                </div>
            </form>
            </div>
        </>
    );
}

export default Upload;