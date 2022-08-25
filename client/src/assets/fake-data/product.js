const product_01_image_01 = require("../images/products/product-01 (1).jpg").default;
const product_01_image_02 = require("../images/products/product-01 (2).jpg").default;
// const product_01_image_03 = require('../images/products/product-01 (3).jpg').default

const product_02_image_01 = require("../images/products/product-02 (1).jpg").default;
const product_02_image_02 = require("../images/products/product-02 (2).jpg").default;

const product_03_image_01 = require("../images/products/product-03 (1).jpg").default;
const product_03_image_02 = require("../images/products/product-03 (2).jpg").default;

const product_04_image_01 = require("../images/products/product-04 (1).jpg").default;
const product_04_image_02 = require("../images/products/product-04 (2).jpg").default;

const product_05_image_01 = require("../images/products/product-05 (1).jpg").default;
const product_05_image_02 = require("../images/products/product-05 (2).jpg").default;

const product_06_image_01 = require("../images/products/product-06 (1).jpg").default;
const product_06_image_02 = require("../images/products/product-06 (2).jpg").default;

const product_07_image_01 = require("../images/products/product-07 (1).jpg").default;
const product_07_image_02 = require("../images/products/product-07 (2).jpg").default;

const product_08_image_01 = require("../images/products/product-08 (1).jpg").default;
const product_08_image_02 = require("../images/products/product-08 (2).jpg").default;

const product_09_image_01 = require("../images/products/product-09 (1).jpg").default;
const product_09_image_02 = require("../images/products/product-09 (2).jpg").default;

const product_10_image_01 = require("../images/products/product-10 (1).jpg").default;
const product_10_image_02 = require("../images/products/product-10 (2).jpg").default;

const product_11_image_01 = require("../images/products/product-11 (1).jpg").default;
const product_11_image_02 = require("../images/products/product-11 (2).jpg").default;

const product_12_image_01 = require("../images/products/product-12 (1).jpg").default;
const product_12_image_02 = require("../images/products/product-12 (2).jpg").default;

const products = [
  {
    id: 6,
    product_code: "san-pham-3",
    name: "Sản phẩm 3",
    description: "",
    status: "draft",
    label: "BESTSELLER",
    created_at: "2022-05-22T02:06:00.197Z",
    updated_at: "2022-05-22T02:06:00.197Z",
    deleted_at: null,
    images: [
      {
        id: 5,
        path: "temporary/2022/4/22/9/file1653185155551.jpg",
        fullpath: "temporary/2022/4/22/9/file1653185155551.jpg",
      },
      {
        id: 6,
        path: "temporary/2022/4/22/9/file1653185155549.jpg",
        fullpath: "temporary/2022/4/22/9/file1653185155549.jpg",
      },
    ],
    product_options: [
      {
        id: 9,
        price: 200000,
        option: {
          id: 5,
          option_code: "color",
          name: "Color",
          type: "text",
        },
        value: {
          id: 8,
          value_code: "vang",
          name: "Vàng",
        },
      },
      {
        id: 10,
        price: 200000,
        option: {
          id: 5,
          option_code: "color",
          name: "Color",
          type: "text",
        },
        value: {
          id: 9,
          value_code: "do",
          name: "Đỏ",
        },
      },
      {
        id: 11,
        price: 50000,
        option: {
          id: 4,
          option_code: "size",
          name: "Size",
          type: "text",
        },
        value: {
          id: 12,
          value_code: "l",
          name: "L",
        },
      },
      {
        id: 12,
        price: 50000,
        option: {
          id: 4,
          option_code: "size",
          name: "Size",
          type: "text",
        },
        value: {
          id: 13,
          value_code: "s",
          name: "S",
        },
      },
    ],
  },
  {
    id: 5,
    product_code: "san-pham-ao-do",
    name: "Sản phẩm áo đỏ",
    description: "",
    status: "draft",
    label: "BESTSELLER",
    created_at: "2022-05-22T02:05:16.252Z",
    updated_at: "2022-05-22T02:05:16.252Z",
    deleted_at: null,
    images: [
      {
        id: 3,
        path: "temporary/2022/4/22/9/file1653185108656.png",
        fullpath: "temporary/2022/4/22/9/file1653185108656.png",
      },
      {
        id: 4,
        path: "temporary/2022/4/22/9/file1653185108654.jpg",
        fullpath: "temporary/2022/4/22/9/file1653185108654.jpg",
      },
    ],
    product_options: [
      {
        id: 5,
        price: 50000,
        option: {
          id: 5,
          option_code: "color",
          name: "Color",
          type: "text",
        },
        value: {
          id: 8,
          value_code: "vang",
          name: "Vàng",
        },
      },
      {
        id: 6,
        price: 50000,
        option: {
          id: 5,
          option_code: "color",
          name: "Color",
          type: "text",
        },
        value: {
          id: 9,
          value_code: "do",
          name: "Đỏ",
        },
      },
      {
        id: 7,
        price: 50000,
        option: {
          id: 4,
          option_code: "size",
          name: "Size",
          type: "text",
        },
        value: {
          id: 12,
          value_code: "l",
          name: "L",
        },
      },
      {
        id: 8,
        price: 50000,
        option: {
          id: 4,
          option_code: "size",
          name: "Size",
          type: "text",
        },
        value: {
          id: 13,
          value_code: "s",
          name: "S",
        },
      },
    ],
  },
  {
    id: 4,
    product_code: "san-pham-ao-thun",
    name: "Sản phẩm áo thun",
    description: "",
    status: "draft",
    label: "BESTSELLER",
    created_at: "2022-05-22T02:04:30.150Z",
    updated_at: "2022-05-22T02:04:30.150Z",
    deleted_at: null,
    images: [
      {
        id: 1,
        path: "temporary/2022/4/22/9/file1653185053714.jpg",
        fullpath: "temporary/2022/4/22/9/file1653185053714.jpg",
      },
      {
        id: 2,
        path: "temporary/2022/4/22/9/file1653185063030.jpg",
        fullpath: "temporary/2022/4/22/9/file1653185063030.jpg",
      },
    ],
    product_options: [
      {
        id: 1,
        price: 200000,
        option: {
          id: 5,
          option_code: "color",
          name: "Color",
          type: "text",
        },
        value: {
          id: 8,
          value_code: "vang",
          name: "Vàng",
        },
      },
      {
        id: 2,
        price: 200000,
        option: {
          id: 5,
          option_code: "color",
          name: "Color",
          type: "text",
        },
        value: {
          id: 10,
          value_code: "xanh",
          name: "Xanh",
        },
      },
      {
        id: 3,
        price: 30000,
        option: {
          id: 4,
          option_code: "size",
          name: "Size",
          type: "text",
        },
        value: {
          id: 11,
          value_code: "m",
          name: "M",
        },
      },
      {
        id: 4,
        price: 30000,
        option: {
          id: 4,
          option_code: "size",
          name: "Size",
          type: "text",
        },
        value: {
          id: 12,
          value_code: "l",
          name: "L",
        },
      },
    ],
  },
];

const getAllProducts = () => products;

const getProducts = (count) => {
  const max = products.length - count;
  const min = 0;
  const start = Math.floor(Math.random() * (max - min) + min);
  return products.slice(start, start + count);
};

const getProductBySlug = (slug) => products.find((e) => e.slug === slug);

const getCartItemsInfo = (cartItems) => {
  let res = [];
  if (cartItems.length > 0) {
    cartItems.forEach((e) => {
      let product = getProductBySlug(e.slug);
      res.push({
        ...e,
        product: product,
      });
    });
  }
  // console.log(res)
  // console.log('sorted')
  // console.log(res.sort((a, b) => a.slug > b.slug ? 1 : (a.slug < b.slug ? -1 : 0)))
  return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
};

const productData = {
  getAllProducts,
  getProducts,
  getProductBySlug,
  getCartItemsInfo,
};

export default productData;
