import React from "react";
import ProductCart from "./product_cart";

function Selling(props) {
  const { sellings } = props;
  console.log('tsts',sellings)
  return (
    <div className="selling">
      <div className="product__wrap">
        {sellings?.length > 0 && sellings.map((selling, i) => <ProductCart key={i} datas={selling} />)}
      </div>
    </div>
  );
}

export default Selling;
