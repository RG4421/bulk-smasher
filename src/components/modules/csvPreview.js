import React from 'react'
// import PropTypes from 'prop-types'
import { CsvToHtmlTable } from 'react-csv-to-table'

const csvPreview = ({fileName, fileContents}) => {
    return (
        <div className="form-group">
           <h5 className="componentElements"><b>{fileName}</b> Preview</h5>
            <div>
                <CsvToHtmlTable
                    data={fileContents}
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                />
            </div>
        </div>
    )
}

// csvPreview.propTypes = {
//     fileName: PropTypes.number.isRequired,
//     fileContents: PropTypes.number.isRequired
// }

export default csvPreview
