const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'mh',
    password: 'password',
    port: 5432,
});

/**
 * Returns list of all programs in mental health
 * 
 * @param {*} request 
 * @param {*} response 
 */

const getPrograms = (request, response) => {
    pool.query('SELECT id, name, description FROM program', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
/**
 * Returns program information for a program id
 * @param {*} request 
 * @param {*} response 
 */
const getProgramById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT s.id, s.name, s.img_path FROM section s ' +
        'WHERE s.prog_id = $1 ORDER BY s.name ASC',
        [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
};

/**
 * Returns all information related to a section
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getSectionById = (request, response) => {
    const id = parseInt(request.params.sid)

    pool.query('SELECT s.id, s.name, s.img_path, a.id as a_id, a.content, q.question , ARRAY_AGG(op.option) as options'
        + ' FROM section s, activity a'
        + ' LEFT JOIN activity_question q on a.type= 1 and q.act_id = a.id'
        + ' LEFT JOIN activity_question_option op on op.qid = q.id'
        + ' WHERE s.id = $1'
        + ' AND a.sec_id = s.id'
        + ' GROUP BY s.id, s.name, s.img_path, a.id, a.content, q.question '
        + ' ORDER BY a.sort_order ASC',
        [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
};

module.exports = {
    getPrograms,
    getProgramById,
    getSectionById
}