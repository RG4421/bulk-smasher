import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

import newWindow from '../images/newWindow.png'
import logo from '../images/uf.png'

function Home (props) {

    // AUTHENTICATION
    const history = useHistory();

    const checkSessionStatus = () => {
        const token = JSON.parse(localStorage.getItem('bulksmasher-user'));        
        
        if (token) {
            Axios.get('auth/checkCreds', { headers: {Authorization: `Bearer ${token.accessToken}`}})
            .then((res) => {
                if (res.data.authSuccessful === true) {
                    history.push('/');
                }
            }).catch((e) => {
                console.log(e);
                localStorage.removeItem('bulksmasher-user');
                history.push("/auth");
                console.log(e.response);
            });
        } else {
            localStorage.removeItem('bulksmasher-user');
            history.push("/auth");
        }
    }

    useEffect(() => {
        checkSessionStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Create = () => (
        <Accordion style={{cursor: 'pointer'}}>
            <h5 style={{marginTop: 30}}><a style={{color: '#0e8643'}} name="create" href="https://docs.google.com/spreadsheets/d/1iuoyIPQHMsxZiSOefFQCCPsMSY8eqKUXAPSeg9lWGts/edit?usp=sharing" rel="noopener noreferrer" target="_blank">Create Operators<img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
            Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
            <Card.Body>
                
            This operator has the capability to create blog items in within a Hub. 
            
            <br />
            <br />
            
            The template requires a Hub ID and Stream ID to create and store the items; along with many other fields that can be configured to a specified value.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
            Tags
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
            <Card.Body>

            This operator can tag items with one or many tags.

            <br />
            <br />

            If the tag doesn't exist within the Hub, it will be created and then applied to the item.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
            PDFs
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
            <Card.Body>
                
            This operator can create PDFs within an Uberflip Hub.

            <br />
            <br />

            Within the template, you can include Folder ID's and Title to upload to your PDFs.

            <br />
            <br />

            <Alert variant="warning">
                <p>
                    The PDF must be hosted on an external source at a reachable URL in order to successfully run this operator.
                </p>
            </Alert>
            
            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
            Streams
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
            <Card.Body>
                
            This operator can create streams within an Uberflip Hub.

            <br />
            <br />

            Within the template, you can include item ID's to upload to your newly created stream.
            
            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
            User Profiles
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
            <Card.Body>

            This operator can create users and assign them to a group within Uberflip.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        </Accordion>
    )

    const Update = () => (
        <Accordion style={{cursor: 'pointer'}}>
            <h5 style={{marginTop: 30}}><a style={{color: '#0e8643'}} name="update" href="https://docs.google.com/spreadsheets/d/1IoKWwlaJFmgkLYsGBh-2frUKVbSwNupsMdWeZOUH9qI/edit?usp=sharing" rel="noopener noreferrer" target="_blank">Update Operators<img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                Populate Stream
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                <Card.Body>
                    
                This operator can populate existing streams with items based on their item ID.

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="5">
                Hide Past Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="5">
                <Card.Body>
                    
                This operator can look for items before the selected date, and set all past items to <b>hidden</b>.

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="6">
                Show Past Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="6">
                <Card.Body>
                    
                This operator can look for items before the selected date, and set all past items to <b>show</b>.

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="7">
                Items
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="7">
                <Card.Body>
                    
                This operator can update items across an Uberflip account.

                <br />
                <br />

                <b>NOTE</b> Depending on what fields are updated, it could sever the connection to the item's source.

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="8">
                Item Author
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="8">
                <Card.Body>

                This operator can update an item's author.

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="9">
                Item SEO
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="9">
                <Card.Body>

                This operator can update item's SEO metadata.

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="10">
                Item Metadata
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="10">
                <Card.Body>
                    
                This operator can update item's metadata.

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="11">
                All Item's Source Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="11">
                <Card.Body>
                    
                This operator can update all item's source embedded content by using this operator as a 'Find and Replace'. 
                
                <hr />

                It will search through all item's source content that match the <b>Unique Search Key</b> to fetch a list of items.

                <br />
                <br />

                Once that list is acquired, the <b>Search Token</b> will locate what is required to be replaced.

                <br />
                <br />

                The <b>Replace Token</b> field is the value to replace the search token.

                <hr />

                Example:

                <br />
                <br />

                <b>Unique Search Key</b> = 'src="https:www.youtube.com/abcd"'

                <br />

                <b>Search Token</b> = 'youtube.com'

                <br />

                <b>Replace Token</b> = 'youtube-nocookie.com'

                <br />
                <br />

                This will result all items with the search key in their source content to be updated to 'src="https:www.<b>youtube-nocookie.com</b>/abcd"'

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="12">
                Stream Item's Source Content
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="12">
                <Card.Body>

                This operator can update stream specific item's source embedded content by using this operator as a 'Find and Replace'. 
                
                <hr />

                It will search through all item's source content that match the <b>Unique Search Key</b> to fetch a list of items.

                <br />
                <br />

                Once that list is acquired, the <b>Search Token</b> will locate what is required to be replaced.

                <br />
                <br />

                The <b>Replace Token</b> field is the value to replace the search token.

                <hr />

                Example:

                <br />
                <br />

                <b>Unique Search Key</b> = 'src="https:www.youtube.com/abcd"'

                <br />

                <b>Search Token</b> = 'youtube.com'

                <br />

                <b>Replace Token</b> = 'youtube-nocookie.com'

                <br />
                <br />

                This will result in stream specific items with the search key in their source content to be updated to 'src="https:www.<b>youtube-nocookie.com</b>/abcd"'

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="13">
                Tag Search
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="13">
                <Card.Body>

                This operator fetches items that are/are not tagged with the <b>Tag Search Key</b> and updates the canonical URL.

                <br />
                <br />

                The user can decide whether to prepend/append to the existing canonical URL.

                <hr />

                Example:

                <br />
                <br />

                <b>Tag Search Key</b> = 'Test Tag'

                <br />

                <input type="checkbox" style={{width: '15px'}} checked readOnly></input> <b>Item is tagged with Tag Search Key</b>

                <br />

                <b>Prepend or Append...</b> = 'Append'

                <br />

                <b>Prepend/append value to Canonical</b> = 'testPrepend'

                <br />
                <br />

                This is result in the canonical URL's of the found items to www.testurl.com/<b>testPrepend</b>

                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )

    const Delete = () => (
        <Accordion style={{cursor: 'pointer'}}>
            <h5 style={{marginTop: 30}}><a style={{color: '#0e8643'}} name="delete" href="https://docs.google.com/spreadsheets/d/1VeXSwQ9Cq4uXct4fegW2er3vqa9RU4Yzc-oAFeFprL4/edit" rel="noopener noreferrer" target="_blank">Delete Operators<img style={{marginLeft: 5}} src={newWindow} width="20" height="20" alt="newWindow"/></a></h5>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="14">
            Tag List
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="14">
            <Card.Body>
                
            This operator will delete a list of tags that are provided in CSV file.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="20">
            Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="20">
            <Card.Body>
                
            This operator will delete a list of items that are provided in CSV file.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="15">
            Marketing Stream Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="15">
            <Card.Body>

            This operator will delete listed item ID's from a specified stream. 

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="16">
            Hidden Marketing Stream Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="16">
            <Card.Body>
                
            This operator will delete any hidden items inside the provided list of streams.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="17">
            Past Items
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="17">
            <Card.Body>

            This operator will delete any items prior to the selected created date.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="18">
            Streams
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="18">
            <Card.Body>
                
            This operator will delete the streams provided in the .csv file.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="19">
            All Tags
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="19">
            <Card.Body>
                
            This operator will delete <b>all tags</b> inside the account.

            </Card.Body>
            </Accordion.Collapse>
        </Card>
        </Accordion>
    )

    // Build of webpage
    return (
        <div className="form-group">
            <div className="newContainer">
                <p>This tool performs bulk tasks by leveraging the Uberflip API.</p>

                <p>Upon each successful run of the tool, a <b>log file</b> will be generated with detailed information on the API calls that were made, and their result.</p>

                <Alert variant="warning">
                <Alert.Heading>CSV Template Requirements</Alert.Heading>
                    <p>
                        Each .csv file that is uploaded in the bulk tool requires the file header to mirror the template header.

                        If there are any differences, it could result in a <b>failed execution</b> of the operator.
                    </p>
                </Alert>

                <p>Detailed <b>documentation</b> of each operator can be found below:</p>

                <Create/>
                <Update/>
                <Delete/>    

                <br />
                <br />
                
                <img style={{position: "absolute", right: "0px", paddingRight: "10px", paddingBottom: "10px"}} src={logo} width="40" height="40" alt="logo"/>
            </div>
        </div>
    )
}

export default Home;