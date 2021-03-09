import { Product } from '../types'
import { MeliProduct, MeliProducts, MeliProductById } from './types'

// example: https://api.mercadolibre.com/sites/MLA/search?q=lucky%20luke
const MELI_API_PRODUCTS = query => `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}`

// example: https://api.mercadolibre.com/items/MLA741624051
const MELI_API_PRODUCT_BY_ID = id => `https://api.mercadolibre.com/items/${encodeURIComponent(id)}`

export default {
  search: async (query: string): Promise<Product[]> => {

    console.log(`about to fetch products for query "${query}" from ${MELI_API_PRODUCTS(query)}`)
    const result = await fetch(MELI_API_PRODUCTS(query))
    const products: MeliProducts = await result.json()
    return products.results.map((product: MeliProduct): Product => ({
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price,
      sold_quantity: product.sold_quantity,
      condition: product.condition,
      location: product?.address?.state_name ?? '',
    })
    )
  },

  fetch: async (id: string): Promise<Product> => {
    console.log(`about to fetch product with id: ${id} from ${MELI_API_PRODUCT_BY_ID(id)}`)
    const result = await fetch(MELI_API_PRODUCT_BY_ID(id))
    const product: MeliProductById = await result.json()

    return {
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price,
      sold_quantity: product.sold_quantity,
      condition: product.condition,
      location: product.seller_address.state.name,
    }
  }
}