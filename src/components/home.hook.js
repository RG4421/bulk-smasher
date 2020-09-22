import React from 'react';

function home (props) {

    // Build of webpage
    return (
        <div className="newContainer">
            <p>This tool performs bulk tasks using the Uberflip API.</p>

            <p>Navigate to the various tabs in the nav bar to perform bulk actions.</p>

            <h5 style={{marginTop: 40}}>CSV Templates</h5>
            <div>
                <label><a href="https://docs.google.com/spreadsheets/d/1iuoyIPQHMsxZiSOefFQCCPsMSY8eqKUXAPSeg9lWGts/edit?ouid=113458187230889125546&usp=sheets_home&ths=true" target="_blank" rel="noopener noreferrer">CREATE</a></label>
            </div>
            <div>
                <label><a href="https://docs.google.com/spreadsheets/d/1IoKWwlaJFmgkLYsGBh-2frUKVbSwNupsMdWeZOUH9qI/edit#gid=0" target="_blank" rel="noopener noreferrer">UPDATE</a></label>
            </div>
            <div>
                <label><a href="https://docs.google.com/spreadsheets/d/1VeXSwQ9Cq4uXct4fegW2er3vqa9RU4Yzc-oAFeFprL4/edit#gid=0" target="_blank" rel="noopener noreferrer">DELETE</a></label>
            </div>
        </div>
    )
}

export default home;