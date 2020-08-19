import React, { useState } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Axios from 'axios';

function Upload(props) {

    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [file, setFile] = useState('');

    const sampleData = `
Model,mpg,cyl,disp,hp,drat,wt,qsec,vs,am,gear,carb
Mazda RX4,21,6,160,110,3.9,2.62,16.46,0,1,4,4
Mazda RX4 Wag,21,6,160,110,3.9,2.875,17.02,0,1,4,4
Datsun 710,22.8,4,108,93,3.85,2.32,18.61,1,1,4,1
Hornet 4 Drive,21.4,6,258,110,3.08,3.215,19.44,1,0,3,1
Hornet Sportabout,18.7,8,360,175,3.15,3.44,17.02,0,0,3,2
Valiant,18.1,6,225,105,2.76,3.46,20.22,1,0,3,1
Duster 360,14.3,8,360,245,3.21,3.57,15.84,0,0,3,4
Merc 240D,24.4,4,146.7,62,3.69,3.19,20,1,0,4,2
Merc 230,22.8,4,140.8,95,3.92,3.15,22.9,1,0,4,2
Merc 280,19.2,6,167.6,123,3.92,3.44,18.3,1,0,4,4
Merc 280C,17.8,6,167.6,123,3.92,3.44,18.9,1,0,4,4
Merc 450SE,16.4,8,275.8,180,3.07,4.07,17.4,0,0,3,3
Merc 450SL,17.3,8,275.8,180,3.07,3.73,17.6,0,0,3,3
Merc 450SLC,15.2,8,275.8,180,3.07,3.78,18,0,0,3,3
Cadillac Fleetwood,10.4,8,472,205,2.93,5.25,17.98,0,0,3,4
Lincoln Continental,10.4,8,460,215,3,5.424,17.82,0,0,3,4
Chrysler Imperial,14.7,8,440,230,3.23,5.345,17.42,0,0,3,4
Fiat 128,32.4,4,78.7,66,4.08,2.2,19.47,1,1,4,1
`;
    
    // useEffect(() => {
    //     const clientId_post = {clientId};
    //     Axios.post('http://localhost:8080/upload', clientId_post)
    //         .then((res) => {
    //             console.log(res);
    //         }).catch((e) => {
    //             console.log(e);
    //         });
    // }, [clientId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("test button");

        // const clientId_post = {
        //     clientId
        // };
        // Axios.post('http://localhost:8080/upload', clientId_post)
        //     .then((res) => {
        //         console.log(res);
        //     }).catch((e) => {
        //         console.log(e);
        //     });
    }
        
    return (
        <>
        <div style={{marginTop: 10}}>
            <h3>Bulk Uploader</h3>
            <form style={{marginLeft: 30}}>
                <h5 style={{marginTop: 30}}>Enter API Credentials</h5>
                <div className="form-group">
                    <label>Client ID:</label>
                    <input 
                        type="text"
                        value={clientId}
                        onChange={e => setClientId(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Client Secret:</label>
                    <input 
                        type="text"
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
                        required
                    ></input>
                </div>
                <h5 style={{marginTop: 30}}>Select Bulk Operator</h5>
                <div className="form-group">
                    <label>Create:</label>
                    <select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                        required
                    >
                        <option default>Please Select...</option>
                        <option value="Tags">Tags</option>
                        <option value="User Profiles">User Profiles</option>
                        <option value="Metadescription/SEOs">Metadescription/SEOs</option>
                        <option value="Marketing Streams">Marketing Streams</option>
                    </select>
                </div>
                <label>Upload CSV:</label>
                <div className="form-group">
                    <input type="file"
                        accept=".csv"
                        value={file}
                        onChange={e => setFile(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input onClick={handleSubmit} type="submit" value="Upload" className="btn btn-primary"/>
                </div>
            </form>

            <h5 style={{marginTop: 50}}>CSV Preview:</h5>
            <CsvToHtmlTable
                data={file}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
            />
            </div>
        </>
    );
}

export default Upload;