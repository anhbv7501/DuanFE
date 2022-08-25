import React from "react";
import ProductCart from "./product_cart";

function New({ news }) {
  return (
    <div className="new">
      <div className="product__wrap">
        {news.map((selling, i) => (
          <ProductCart key={i} datas={selling} />
        ))}
      </div>
    </div>
  );
}

export default New;
