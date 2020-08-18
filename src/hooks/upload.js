import React, { Component } from 'react';

export default class Upload extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
            <h3>Bulk Uploader</h3>
            <form>
                <label>Select the bulk option you want create: </label>
                <div className="form-group">
                    <select>
                        <option value="Tag">Tag</option>
                        <option value="User Profile">User Profile</option>
                        <option value="Metadescription/SEO">Metadescription/SEO</option>
                        <option value="Marketing Stream">Marketing Stream</option>
                    </select>
                </div>
                <label>Upload CSV: </label>
                <div className="form-group">
                    <input type="file"/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Upload" className="btn btn-primary"/>
                </div>
            </form>
            </div>
        )
    }
}