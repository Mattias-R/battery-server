const Products = new Map();
let productId = 1;

Products.set(productId.toString(), {
    ProductName: "Batterie",
    ProductPrice: 50,
    ProductCover: "../images/batterie1.jpg",
    ProductDescription: "Das ist die BESTE batterie YOU CAN GET",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Batterie2",
    ProductPrice: 50,
    ProductCover: "../images/batterie1.jpg",
    ProductDescription: "Das ist die BESTE batterie YOU CAN GET",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Batterie3",
    ProductPrice: 50,
    ProductCover: "../images/batterie1.jpg",
    ProductDescription: "Das ist die BESTE batterie YOU CAN GET",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Batterie4",
    ProductPrice: 50,
    ProductCover: "../images/batterie1.jpg",
    ProductDescription: "Das ist die BESTE batterie YOU CAN GET",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Batterie5",
    ProductPrice: 50,
    ProductCover: "../images/batterie1.jpg",
    ProductDescription: "Das ist die BESTE batterie YOU CAN GET",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Batterie6",
    ProductPrice: 50,
    ProductCover: "../images/batterie1.jpg",
    ProductDescription: "Das ist die BESTE batterie YOU CAN GET",
    ProductID: productId,
    ProductStockQuantity: 100
});

class Model{
    static getProduct(){
        let productArray = [];
        for(let [id, product] of Products){
            productArray.push({id,product});
        }
        return productArray;
    }
    static findProductsById(id){
        let product = Products.get(id);
        return product;
    }
    static updateProductById(id, product){
        Products.set(id,product);
    }
    static deleteProductById(id){
        Products.delete(id);
    }




}
module.exports = Model;