import baseMethods from '../BaseMethods'
import {
  PRODUCT
} from '../../domain'

class SailingProduct extends baseMethods {
  constructor() {
    console.log(PRODUCT)
    super(PRODUCT, '/api/users')
  }
}
export default new SailingProduct()
