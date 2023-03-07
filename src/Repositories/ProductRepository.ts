import Products from "../Model/Products";

class ProductRepository {
    async showAllProducts() {
        let findProducts = await Products.query()

        return findProducts
    }

    async showProduct(id: string) {
        let findProduct = await Products.query().where("id", id).first()

        return findProduct
    }

    async createProduct(product: Products | undefined, id: string | undefined = undefined) {
        let findProduct;

        if (id) {
            findProduct = await Products.query().where("id", id).first()
        }

        if (!findProduct) {
            findProduct = new Products()
        }

        findProduct.name = product.name || findProduct.name
        findProduct.amounts = product.amounts || findProduct.amounts
        findProduct.value = product.value || findProduct.value
        findProduct.activated = product.activated || findProduct.activated

        await findProduct.save()

        return findProduct
    }

    async deleteProduct(id: number) {
        let findProduct = await Products.query().where("id", id).first()

        if (findProduct) {
            findProduct.delete()
        }

        return findProduct
    }
}

export default ProductRepository;