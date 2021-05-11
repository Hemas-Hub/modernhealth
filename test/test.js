const assert = require('assert');

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
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
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