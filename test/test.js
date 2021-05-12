const assert = require('assert');
const db = require('../queries');
/**
 * Cases to test
 * 
 * 1. Get Programs
 *    a. Check the count of programs to what you have
 *    b. No programs
 * 2. Get Program By Id
 *    a. Program have sections, check the count
 *    b. The id sen't doesn't have any sections
 * 3. Get Section By Id
 *    a. All Activities are html statements
 *    b. All Activities are multiple choice 
 *    c. Sections don't have activities
 * 
 */
describe('Modern Health Programs', function () {
    describe('Get Programs', function () {
        // For test DB
        afterEach(() => {
            // `remove the rows inserted`
        });

        it('Should return the total array of programs in database', async function () {
            const response = await db.getPrograms();
            assert.equal(response.length, 2);
            assert.deepEqual(response, [{"id":1,"name":"Leadership Development Program","description":"Describes how to develop leadership skills"},{"id":2,"name":"Cognitive Behavioral Therapy","description":"Improves mental health"}]);
        });
        
        // Can be implemented in test DB
        it.skip('should return an empty array as no programs exist', function () {
            const response = db.getPrograms();
            assert.equal(response.length, 0);
            assert.deepEqual(response, []);
        });
    });

    describe('Get Program By Id', function () {
        // For test DB
        afterEach(() => {
            // `remove the rows inserted`
        });

        it('Should return Sections based on program id', async function () {
            const program_id = 1;
            const response = await db.getProgramById(program_id);
            assert.equal(response.length, 2);
            assert.deepEqual(response, [{"id":2,"name":"Action","img_path":"/s3/imgs/sections/1.png"},{"id":1,"name":"Values","img_path":"/s3/imgs/sections/1.png"}]);
        });

        it('Should return Empty Array of Sections if invalid program id is passed', async function () {
            const program_id = -1;
            const response = await db.getProgramById(program_id);
            assert.equal(response.length, 0);
            assert.deepEqual(response, []);
        });
    });

    describe('Get Section By Id', function () {
        // For test DB
        afterEach(() => {
            // `remove the rows inserted`
        });

        it('Should return all activities with html content and multiple choice options for a section id', async function () {
            const section_id = 1;
            const response = await db.getSectionById(section_id);
            assert.equal(response.length, 2);
            // First object has html content but null question and options 
            assert.notEqual(response[0].content, null);
            // assert.match(response[0].content, /<.+?>/, "is html content");
            assert.equal(response[0].question, null);
            assert.deepEqual(response[0].options, [null]);

            // Second object has null html content but has question and options
            assert.equal(response[1].content, null);
            assert.equal(response[1].question, "How do you want to use mindfulness to improve your work?");
            assert.deepEqual(response[1].options, ["Increase focus","Improve concentration"]);
        });

        it('Should return all activities with only multiple choice options for a section id', async function () {
            const section_id = 2;
            const response = await db.getSectionById(section_id);
            assert.equal(response.length, 1);

            // Object has null html content but has question and options
            assert.equal(response[0].content, null);
            assert.equal(response[0].question, "How do you improve yourself?");
            assert.deepEqual(response[0].options, ["Mental clarity","Reduce stress"]);
        });

        it('Should return empty array of activities for an invalid section id', async function () {
            const section_id = -1;
            const response = await db.getSectionById(section_id);
            assert.equal(response.length, 0);
            assert.deepEqual(response, [])
        });
    });
});