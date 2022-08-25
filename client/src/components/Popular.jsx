import { Grid } from "@mui/material";
import React from "react";
import ProductCart from "./product_cart";

function Popular({ populars }) {
  return (
    <div className="popular">
      <div className="product__wrap">
        {populars.map((selling, i) => (
          <ProductCart key={i} datas={selling} />
        ))}
      </div>
    </div>
  );
}

export default Popular;
