const app = require('express')();
const { getAllCustomers, getCustomerById, addCustomer } = require('./database/usersDb');
const bodyParser = require('body-parser')


// REST

// GET: if id passed should return specific entity, else return all rows
// PUT: id should be passed in url, Update all column in entity, if no column provided they should be null. If no id passed should add new entity and return id
// PATCH: id should be passed in url, data should be passed in body. Update specific fields
// POST: add new data, should return id for specific entity
// DELETE: id should be passed in url, delete specific field


// const app = express()
const port = 3000;

app.use(bodyParser.json());

app.post('/customers', async (req, res) => {
    try {
        const body = req.body;

        const id = await addCustomer(body);
        res.json({ msg: 'ok', id }) //

    } catch (error) {
        res.status(500);
        res.json({ error })
    }
})


app.get('/customers', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.json(customers)
    } catch (error) {
        res.status(500);
        res.json({ error: true, message: 'Something went wrong' })
    }
})


app.get('/customers/:id', async (req, res) => {
    const id = req.params?.id;
    if (id) {
        try {
            const customers = await getCustomerById(id);
            res.json(customers)
        } catch (error) {
            res.status(500);
            res.json({ error: true, message: 'Something went wrong' })
        }
    } else {
        res.status(400);
        res.json('Bad request')
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})