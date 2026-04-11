interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand: string
  category: string
  thumbnail: string
}

export default defineEventHandler(async () => {
  const data = await $fetch<{ products: Product[] }>('https://dummyjson.com/products?limit=100')
  return data.products
})
