import BaseMethods from '../../baseMethods'
import {
  PRODUCT
} from '../../domain'

class Product extends BaseMethods {
  constructor() {
    super(PRODUCT)
  }
}

const productInstance = new Product();

const product = {
  getProduct(id) {
    return productInstance.get(`/${id}`)
  }
}

export default product
