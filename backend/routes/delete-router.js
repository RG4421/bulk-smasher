const router = require('express').Router();

// Utility functions
const auth = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const fetch = require('./utilities/fetch');

// Functions
const deleteFunc = require('./delete-functions/delete');

router.route('/allTags').post((req, res) =>
{
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;

    async function deleteAllTags () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const tagIds = await fetch.tagId(authToken);
            await deleteFunc.deleteAll(authToken, tagIds);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('All Tags Deleted');
        }
    }
    deleteAllTags();
});

router.route('/tagList').post((req, res) => 
{
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;

    async function deleteTagList () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const tagIds = await fetch.tagId(authToken);
            await deleteFunc.deleteList(authToken, fileContents, tagIds);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Requested Tag List Deleted');
        }
    }
    deleteTagList();
});

router.route('/streamItems').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;

    async function deleteStreamItems () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            await deleteFunc.deleteStreamItems(authToken, csvData);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Requested Stream Items Deleted');
        }
    }
    deleteStreamItems();
});

router.route('/hiddenItems').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;

    async function deleteHiddenItems () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            const hiddenItems = await fetch.hiddenStreamItems(authToken, csvData);
            await deleteFunc.deleteStreamItems(authToken, hiddenItems);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Hidden Stream Items Deleted');
        }
    }
    deleteHiddenItems();
});

router.route('/pastContent').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const selectDate = req.body.selectDate;
    const fileContents = req.body.fileContents;

    async function deletePastContent () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');
            
            const csvData = await parse.CSV(fileContents);
            const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
            await deleteFunc.deleteStreamItems(authToken, pastContent);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Old Stream Items Deleted');
        }
    }
    deletePastContent();
});

router.route('/flipbookFolders').post((req, res) => {
    const key = req.body.APIKey;
    const signature = req.body.APISecret;
    const hubId = req.body.hubId;
    const fileContents = req.body.fileContents;

    async function deleteFlipbookFolders () {
        const authToken = await auth.authenticateCredsV1(key, signature, hubId);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            await parse.CSV(fileContents);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Old Stream Items Deleted');
        }
    }
    deleteFlipbookFolders();
});

module.exports = router;