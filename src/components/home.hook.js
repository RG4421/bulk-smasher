import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import newWindow from '../images/newWindow.png'
import logo from '../images/uf.png'

function home (props) {

    const Create = () => (
        <Accordion>
            <h5 style={{marginTop: 30}}><a style={{color: '#0e8643'}} href="https://docs.google.com/spreadsheets/d/1iuoyIPQHMsxZiSOefFQCCPsMSY8eqKUXAPSeg9lWGts/edit?usp=sharing" rel="noopener noreferrer" target="_blank">Create Operators<img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
            Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
            Tags
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
            Streams
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
            User Profiles
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        </Accordion>
    )

    const Update = () => (
        <Accordion>
            <h5 style={{marginTop: 30}}><a style={{color: '#0e8643'}} href="https://docs.google.com/spreadsheets/d/1IoKWwlaJFmgkLYsGBh-2frUKVbSwNupsMdWeZOUH9qI/edit?usp=sharing" rel="noopener noreferrer" target="_blank">Update Operators<img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                Populate Stream
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                Hide Past Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                Show Past Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                Items
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                Item Author
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                Item SEO
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                Item Metadata
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                All Item's Embedded Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                Stream Item's Embedded Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                Tag Search
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )

    const Delete = () => (
        <Accordion>
            <h5 style={{marginTop: 30}}><a style={{color: '#0e8643'}} href="https://docs.google.com/spreadsheets/d/1IoKWwlaJFmgkLYsGBh-2frUKVbSwNupsMdWeZOUH9qI/edit?usp=sharing" rel="noopener noreferrer" target="_blank">Delete Operators<img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
            Tag List
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
            Marketing Stream Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
            Hidden Marketing Stream Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
            Past Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
            Streams
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
            All Tags
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        </Accordion>
    )

    // Build of webpage
    return (
        <div className="newContainer">
            <p>This tool performs bulk tasks using the Uberflip API.</p>

            <p>Navigate to the various tabs in the navigation bar to perform bulk actions.</p>

            <p>Detailed <b>documentation</b> of each operator can be found below:</p>

            <Create/>
            <Update/>
            <Delete/>

            <img style={{position: "absolute", right: "0px"}} src={logo} width="30" height="30" alt="logo"/>

        </div>
    )
}

export default home;