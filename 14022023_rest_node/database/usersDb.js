const { knex } = require('./knex/knex');

const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        knex.select('*').from('customers')
            .then(customers => {
                resolve(customers);
            })
            .catch(err => {
                reject(err)
            })
    })
}

const getCustomerById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await knex.select('*').from('customers').where('customerNumber', '=', id)
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}


const addCustomer = async (customer) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = await knex('customers').insert(customer);
            resolve(id)
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer
}