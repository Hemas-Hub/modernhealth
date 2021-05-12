const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Modern Health Node.js, Express, and Postgres API' })
})

app.get('/programs', async function (request, response) {
    const result = await db.getPrograms();
    response.status(200).json(result);
})

app.get('/program/:id', async function (request, response) {
    const program_id = parseInt(request.params.id);
    const result = await db.getProgramById(program_id);
    response.status(200).json(result);
})

app.get('/section/:sid', async function (request, response) {
    const section_id = parseInt(request.params.sid);
    const result = await db.getSectionById(section_id);
    response.status(200).json(result);
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
