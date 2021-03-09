export type MeliProduct = {
  id: string
  title: string
  price: number
  sold_quantity: number
  condition: string
  thumbnail: string,
  address: {
    state_name: string,
  },
}

export type MeliProducts = {
  results: MeliProduct[]
}

export type MeliProductById = {
  id: string
  title: string
  price: number
  sold_quantity: number
  condition: string
  thumbnail: string,
  seller_address: {
    state: {
      name: string,
    }
  },
}
