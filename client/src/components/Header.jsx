import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaCartArrowDown, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo-2.png";
import Avatar from '../assets/images/products/avartar.jpg';
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import { actionLogout, getIsLogin, getUser } from "../redux/reducers/auth.reducer";
import { getCart } from "../redux/reducers/product.reducer";

function Header(props) {
  const carts = useAppSelector(getCart);
  const isLogin = useAppSelector(getIsLogin);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [menu, setMenu] = useState(false);
  const handleToggleMenu = () => {
    setMenu((p) => !p);
  };

  const handleLogout = () => {
    navigate("/login");
    localStorage.setItem("token", undefined);
    dispatch(actionLogout());
  };
  const changePass = () => {
    const token =  localStorage.getItem("token");
    navigate(`/change-pass/${token}`);
  };

  const headerRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
        headerRef.current?.classList.add("shrink");
      } else {
        headerRef.current?.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className="container__header" ref={headerRef}>
      <div className="header">
        <div className="header__iconMenu" onClick={handleToggleMenu}>
          {menu === false ? <FaBars className="icon" /> : <FaTimes className="icon" />}
        </div>
        <div className={menu === false ? "header__navleft" : "header__navleft active"}>
          <NavLink to="/" className="header__navleft__link">
            trang chủ
          </NavLink>
          <NavLink to="/products" className="header__navleft__link">
            sản phẩm
          </NavLink>
          <NavLink to="/detail" className="header__navleft__link">
            phụ kiện
          </NavLink>
          <NavLink to="/contacs" className="header__navleft__link">
            liên hệ
          </NavLink>
        </div>
        <div className="header__logo">
          <img src={logo} alt="" className="header__logo_img" style={{width:250,height:55}} />
        </div>
        <div className="header__navRight">
          <span>
            <FaSearch icon="faSearch" />
          </span>
          <span>
            <Link to="/cart" className="cart-icon">
              <FaCartArrowDown icon="faCartArrowDown" />
              {carts.length > 0 && <span className="number">{carts.length}</span>}
            </Link>
          </span>
          <span>
            {isLogin ? (
              <div className="info-user">
                <div className="d-flex align-items-center gap-2 ">
                  <img src={Avatar} alt="" className="img-avt" />
                  <h4 className="fs-5">{user?.first_name}</h4>
                </div>
                <ul className="sub-avt">
                <li className="sub-avt__item">
                    <Link to="/profile">Thông tin tài khoản</Link>
                  </li>
                  <li className="sub-avt__item">
                  <span onClick={changePass}>Đổi pass</span>
                  </li>
                  <li className="sub-avt__item">
                    <Link to="/history">Đơn hàng đã mua</Link>
                  </li>
                  <li className="sub-avt__item">
                    <span onClick={handleLogout}>Đăng xuất</span>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink exact to={"/login"}>
                <FaUser icon="faUser" />
              </NavLink>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
