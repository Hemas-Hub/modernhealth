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
 */

const getPrograms = async () => {
    return await pool.query('SELECT id, name, description FROM program')
    .then(results => { return results.rows; })
    .catch(err => { throw err; })
};
/**
 * Returns program information for a program id
 * 
 * @param {*} program_id passes program id as request param from service call
 */
const getProgramById = async (program_id) => {
    return await pool.query('SELECT s.id, s.name, s.img_path FROM section s ' +
        'WHERE s.prog_id = $1 ORDER BY s.name ASC',
        [program_id])
    .then(results => { return results.rows; })
    .catch(err => { throw err; })
};

/**
 * Returns all information related to a section
 * 
 * @param {*} section_id passes section id as request param from service call
 */
const getSectionById = async (section_id) => {
    return await pool.query('SELECT s.id, s.name, s.img_path, a.id as a_id, a.content, q.question , ARRAY_AGG(op.option) as options'
        + ' FROM section s, activity a'
        + ' LEFT JOIN activity_question q on a.type= 1 and q.act_id = a.id'
        + ' LEFT JOIN activity_question_option op on op.qid = q.id'
        + ' WHERE s.id = $1'
        + ' AND a.sec_id = s.id'
        + ' GROUP BY s.id, s.name, s.img_path, a.id, a.content, q.question '
        + ' ORDER BY a.sort_order ASC',
        [section_id])
    .then(results => { return results.rows; })
    .catch(err => { throw err; })
};

module.exports = {
    getPrograms,
    getProgramById,
    getSectionById
}
