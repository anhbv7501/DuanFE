import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../../components/Helmet";
import { Section } from "../../components/Section";
import { RiDeleteBin2Line } from "react-icons/ri";
import FormatNumber from "../../number/FormatNumber";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { actionAddCart, getCart } from "../../redux/reducers/product.reducer";
import { API } from "../../constants/api.constants";
import useProduct from "../../hooks/product.hook";
import { toast } from "react-toastify";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

function Cart() {
  const { cartTotal, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart();
  const dispatch = useAppDispatch();
  const carts = useAppSelector(getCart);
  const { booking } = useProduct();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState("0");
  const [method, setMethod] = useState();

  useEffect(() => {
    const price = carts.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);
    setTotalPrice(price);
  }, [carts]);

  const handlequantityP = (index, priceInit) => {
    if (Number(carts[index]?.quantity) < Number(carts[index]?.number)) {
      dispatch(
        actionAddCart([
          ...carts.slice(0, index),
          { ...carts[index], quantity: carts[index]?.quantity + 1, price: priceInit * (carts[index]?.quantity + 1) },
          ...carts.slice(index + 1),
        ])
      );
    } else {
      toast.error("Số lượng sản phẩm trong kho không đủ để đặt hàng");

    }
  };
  const handlequantityM = (index, priceInit) => {
    if (carts[index]?.quantity > 1) {
      dispatch(
        actionAddCart([
          ...carts.slice(0, index),
          { ...carts[index], quantity: carts[index]?.quantity - 1, price: carts[index]?.price - priceInit },
          ...carts.slice(index + 1),
        ])
      );
    }
  };

  const handleRemoveItem = (index) => {
    dispatch(actionAddCart([...carts.slice(0, index), ...carts.slice(index + 1)]));
  };

  const BuyProduct = () => {
    if (!method) {
      toast.error("Vui lòng chọn hình thức thanh toán");

    } else {
      const products = carts.map((cart) => {
        return { quantity: cart?.quantity, productOptionId: cart?.productOptionId, price: cart?.priceInit };
      });
      if (products.length < 1) {
        toast.error("Không có sản phẩm nảo trong giỏ hàng");

      } else {
        booking({
          products,
          method,
          successCallback: (response) => {
            if (response.result?.success) {
              navigate("/products");
              dispatch(actionAddCart([]));
              toast.success("Đặt hàng thành công");
            }
          },
        });
      }
    }
  };

  return (
    <Helmet title="cart">
      <Section>
        <div className="cart">
          <div className="cart__checkout">
            <div className="cart__checkout__title">bạn đang có {carts?.length} sản phẩm trong giỏ hàng</div>
            <div className="cart__checkout__title">Chọn phương thức thanh toán :</div>
            <Box sx={{ fontSize: '1.4rem' }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={method}
                  onChange={({ target }) => {
                    setMethod(target.value)
                  }}
                >
                  <FormControlLabel value="direct" control={<Radio />} label="Thanh toán trực tiếp" />
                  <FormControlLabel value="banking" control={<Radio />} label="Chuyển khoản đại lý" />
                  <FormControlLabel value="other" control={<Radio />} label="Khác" />
                </RadioGroup>
              </FormControl>
            </Box>
            <div className="cart__checkout__total">
              <span>thành tiền:</span>
              <span>
                {totalPrice?.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                }) || 0}
              </span>
            </div>
            <div className="button" onClick={BuyProduct}>
              <span>đặt hàng</span>
            </div>
            <div className="button">
              <span>
                <Link to="/products">tiếp tục mua hàng </Link>
              </span>
            </div>
          </div>
          <div className="cart__info">
            {carts?.length > 0 ? carts.map((item, index) => (
              <div className="cart__info-item" key={index}>
                <div className="cart__info-item__img">
                  <img src={`${API.BASE_URL_IMAGE}${item.item?.images[0]?.path}`} alt="" />
                </div>
                <h3 className="cart__info-item__title">
                  {item.item?.name}
                  {item.options?.map((e) => (
                    <span>-{(item.item.product_options?.find((opt) => opt.value?.id === e)).value?.name}</span>
                  ))}
                </h3>
                <h3 className="cart__info-item__price">{FormatNumber(item.priceInit)}</h3>
                <li className="cart__info-item__quantity">
                  <span onClick={() => handlequantityM(index, item.priceInit)}>-</span>
                  <span> {item.quantity}</span>
                  <span onClick={() => handlequantityP(index, item.priceInit)}>+</span>
                  <RiDeleteBin2Line
                    className="cart__info-item__quantity-delete"
                    onClick={() => handleRemoveItem(index)}
                  />
                </li>
              </div>
            )) : <h2>Không có sản phẩm nào trong giỏ hàng!!</h2>}
          </div>
        </div>
      </Section>
    </Helmet>
  );
}

export default Cart;
