let items = require('../items')
const {v4:createIdv4} = require('uuid')

const getItems = (req, reply) => {
    reply.send(items);
}

const getItemById = (req, reply) => {
    const { id } = req.params;

    const item = items.find(i => i.id === id);

    reply.send(item)
}

const addItem = (req, reply) => {
    const { name } = req.body;

    const item = {
        id: createIdv4(),
        name,
    }

    items = [...items, item];
    reply.code(201).send(item)
}

const deleteItem = (req, reply) => {
    const { id } = req.params;

    items = items.filter(i => i.id !== id);

    reply.send({message:`${id} deleted`})
}

const updateItem = (req, reply) => {
    const { id } = req.params;
    const { name } = req.body;
    
    let updated = {};

    items = items.map(i => {
        if (i.id === id) {
            updated = {
                ...i,
                name:name
            }
            return updated
        }
        return i
    })

    reply.send({message:'updated', item: {...updated}})

}


module.exports = {
    getItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
}