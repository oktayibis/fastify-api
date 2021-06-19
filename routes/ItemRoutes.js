

const {getItems, getItemById,addItem,updateItem,deleteItem} = require('../controller/ItemController')
// Item Schema

const Item = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        }
    }
};

// option for get all items

const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    },
    handler:getItems
}

const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItemById
}

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {
                    type:'string'
                }
            }
        },
        response: {
            201: Item
        }
    },
    handler: addItem
}

const updateItemOpts = {
    schema: {
        response: {
            201: {
                type:'string'
            }
        }
    },
    handler:updateItem
}

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    },
    handler: deleteItem
}
// creating route
function itemRoute(fastify, options, done) {
    // Return All item
    fastify.get('/items', getItemsOpts)
          
     // Get single item
    fastify.get('/items/:id', getItemOpts)

    // add itemn

    fastify.post('/items', postItemOpts);
    
    fastify.put('/items/:id', updateItemOpts)
    fastify.delete('/items/:id', deleteItemOpts)

    done();
}


module.exports = itemRoute;