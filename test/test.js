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
        afterEach(() => {
            `remove the rows inserted`
        })
        it('Returns the total array of programs in database', function () {
            // `INSERT INTO program (name, description) VALUES ('Test1', 'Describes Test1'), ('Test2', 'Describes Test2');`
            const response = db.getPrograms();
            console.log(response);
            assert.equal(response.length, 2);
            assert.match(response, [{"id":1,"name":"Leadership Development Program","description":"Describes how to develop leadership skills"},{"id":2,"name":"Cognitive Behavioral Therapy","description":"Improves mental health"}]);
        });

        it('Return an empty array as no programs exist', function () {
            const response = db.getPrograms();
            assert.equal(response, []);
        });
    });

    describe('Get Program By Id', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });

    describe('Get Section By Id', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});