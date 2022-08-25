import React from "react";
import ProductCart from "./product_cart";
function List_Products({ products  }) {
  return (
    <div className="list-products">
      <div className="filter-icon"></div>
      <div className="product__wrap">
        {products.map((product, i) => (
          <ProductCart  key={i} datas={product} />
        ))}
      </div>
    </div>
  );
}

export default List_Products;
