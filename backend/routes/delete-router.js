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
            return res.status(200).json('All tags deleted!');
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
            return res.status(200).json('Tag list deleted!');
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
            return res.status(200).json('Stream list items deleted!');
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
            return res.status(200).json('Hidden stream items deleted!');
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
            return res.status(200).json('Past stream items deleted!');
        }
    }
    deletePastContent();
});

router.route('/streams').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;

    async function streams () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            await deleteFunc.streams(authToken, csvData);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Streams list deleted!');
        }
    }
    streams();
});

module.exports = router;