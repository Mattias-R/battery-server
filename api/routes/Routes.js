const {Router} = require('express');
const Routes = Router();

const Controller = require('../controller/Controller');

Routes.get('/', Controller.get_all_products);
Routes.get('/:id', Controller.getProductById);
Routes.put('/:id', Controller.updateProductById);
Routes.delete('/:id', Controller.deleteProductById);



module.exports = Routes;