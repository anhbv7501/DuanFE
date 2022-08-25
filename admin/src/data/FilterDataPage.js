import { products } from './products'

export const filter = {
  category: [{ content: 'Áo thun' }, { content: 'Áo somi' }, { content: 'Quần jean' }],
  color: [
    { content: 'white' },
    { content: 'pink' },
    { content: 'orange' },
    { content: 'yellow' },
    { content: 'blue' },
    { content: 'red' },
  ],
  size: [
    { content: 's' },
    { content: 'l' },
    { content: 'm' },
    { content: 'xl' },
    { content: 'xxl' },
  ],
}

export const fun = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })
}

export const MockFilterData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(filter)
    }, 1000)
  })
}

export const MockFilterProduct = () => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(products)
    }, 1000)
  })
}
