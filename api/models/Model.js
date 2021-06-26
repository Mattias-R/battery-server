const Products = new Map();
let productId = 1;

Products.set(productId.toString(), {
    ProductName: "Bosch",
    ProductPrice: 25.00,
    ProductCover: "../images/batterie1.jpg",
    ProductDescription: "Description: 12V, 45Ah",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Talamex",
    ProductPrice: 87.00,
    ProductCover: "../images/batterie2.jpg",
    ProductDescription: "Description: 12V, 10A Allround-Ladegerät",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "ACCUPOWER",
    ProductPrice: 57.00,
    ProductCover: "../images/batterie3.jpg",
    ProductDescription: "Description: AAA bis Micro, 9V, USB3",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Absaar",
    ProductPrice: 13.00,
    ProductCover: "../images/batterie4.jpg",
    ProductDescription: "Description: 12V, 22A, 30Ah - 225Ah",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "Ryobi",
    ProductPrice: 75.00,
    ProductCover: "../images/batterie5.jpg",
    ProductDescription: "Description: 7,2V - 20V, Li-ion",
    ProductID: productId,
    ProductStockQuantity: 100
});
productId++;
Products.set(productId.toString(), {
    ProductName: "RA 431 B",
    ProductPrice: 5.00,
    ProductCover: "../images/batterie6.jpg",
    ProductDescription: "Description: 24V, USB3",
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

    static createProduct(product) {
        productId++;
        Products.set(productId,product);
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
    //test

}
module.exports = Model;