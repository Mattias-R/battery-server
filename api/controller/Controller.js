const Model = require('../models/Model');

class Controller{
    static get_all_products(req, res){
        const productArray = Model.getProduct();
        res.send(productArray);
    }

    static getProductById(req, res){
        const {id} = req.params;
        const getProduct = Model.findProductsById(id);
        if(getProduct){
            res.send(getProduct);
        }else{
            res.status(404).send('Product not found');
        }
    }


    static createProduct (req, res) {
        let newProduct = req.body;
        Model.createProduct(newProduct);
        res.send("Product created!");
    }

    static updateProductById(req, res){
        let newProduct = req.body;
        let {id} = req.params;
        Model.updateProductById(id,newProduct);
        res.send("Product is updated");
    }

    static deleteProductById(req, res){
        let {id} = req.params;
        Model.deleteProductById(id);
        res.send("Product deleted");
    }


}


module.exports = Controller;