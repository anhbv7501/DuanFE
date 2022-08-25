import React from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/api.constants";
import FormatNumber from "../number/FormatNumber";

function ProductCart(props) {
  return (
    <div className="product__item">
      <Link to={`/catalog/${props.datas?.productId}`}>
        <div className="product__item__image">
          <img
            src={`${API.BASE_URL_IMAGE}${props.datas.images[0]?.path}`}
            alt={props.datas.title}
            className="product__item__image-img img1"
          />
          <img
            src={`${API.BASE_URL_IMAGE}${props.datas.images[0]?.path}`}
            alt={props.datas.title}
            className="product__item__image-img img2"
          />
        </div>
      </Link>
      <div className="product__item__info">
        <p className="product__item__info-title">{props.datas.name}</p>
        <p className="product__item__info-price">
          <span>
            {props.datas?.product_options[0]?.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
          <span>
            <del>399,000 VND</del>
          </span>
        </p>
        <div className="button">
          <span>
            <Link to={`/catalog/${props.datas?.id}`}>mua ngay</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
