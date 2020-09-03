const router = require('express').Router();
const axios = require('axios');

// Utility functions
const auth = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const compare = require('./utilities/compare');

// Functions
const fetch = require('./upload-functions/fetch')
const deleteFunc = require('./delete-functions/delete');

router.route('/allTags').post((req, res) =>
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;

    async function deleteAllTags () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const tagIds = await fetch.tagId(authToken);
            const deleteTags = await deleteFunc.deleteAll(authToken, tagIds);

            return res.status(201).json('All Tags Deleted');
        }
    }
    deleteAllTags();
});

router.route('/tagList').post((req, res) => 
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function deleteTagList () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const tagIds = await fetch.tagId(authToken);
            const deleteList = await deleteFunc.deleteList(authToken, fileContents, tagIds);

            return res.status(201).json('Requested Tag List Deleted');
        }
    }
    deleteTagList();
});

router.route('/streamItems').post((req, res) => {
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function deleteStreamItems () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const csvData = await parse.CSV(fileContents);
            const deleteItems = await deleteFunc.deleteStreamItems(authToken, csvData);

            return res.status(201).json('Requested Stream Items Deleted');
        }
    }
    deleteStreamItems();
});

router.route('/hiddenItems').post((req, res) => {
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function deleteHiddenItems () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const csvData = await parse.CSV(fileContents);
            const hiddenItems = await fetch.hiddenStreamItems(authToken, csvData);
            const deleteItems = await deleteFunc.deleteStreamItems(authToken, hiddenItems);

            return res.status(201).json('Hidden Stream Items Deleted');
        }
    }
    deleteHiddenItems();
});

router.route('/pastContent').post((req, res) => {
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var selectDate = req.body.selectDate;
    var fileContents = req.body.fileContents;

    async function deletePastContent () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const csvData = await parse.CSV(fileContents);
            const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
            const deleteItems = await deleteFunc.deleteStreamItems(authToken, pastContent);

            console.log(deleteItems);

            return res.status(201).json('Old Stream Items Deleted');
        }
    }
    deletePastContent();
});

module.exports = router;