import faker from 'faker'

const products = Array(6).fill(3).map(() => {
  return {
    sku:         faker.random.uuid(),
    name:        faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price:       faker.commerce.price(),
    image:       faker.image.imageUrl(200,200,null, true)
  }
})
export function fetchProducts() {
  return new Promise((resolve) => setTimeout(() => resolve(products), 1000))
}

