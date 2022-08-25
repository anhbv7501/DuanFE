import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner.png";

import Helmet from "../../components/Helmet";
import { Section, SectionTitle } from "../../components/Section";
import Slide from "../../components/Slide";
import Policy from "../../components/Policy";
import Selling from "../../components/Selling";
import New from "../../components/New";
import Popular from "../../components/Popular";

import heroSliderData from "../../assets/fake-data/slide";
import policy from "../../assets/fake-data/policy";
import data from "../../assets/fake-data/product";
import { useAppSelector } from "../../hooks/redux.hook";
import { getIsLogin } from "../../redux/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
import useHome from "../../hooks/home.hook";

function Home(props) {
  const [popularProduct, setPopularProduct] = useState([]);
  const [sellProduct, setSellProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const isLogin = useAppSelector(getIsLogin);
  const navigate = useNavigate();
  const { getProduct } = useHome();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      getProduct({
        option: "POPULAR",
        successCallback: (response) => {
          if (response.result?.success) {
            setPopularProduct(response.result.payload?.data);
          }
        },
      });
      getProduct({
        option: "BESTSELLER",
        successCallback: (response) => {
          if (response.result?.success) {
            setSellProduct(response.result.payload?.data);
          }
        },
      });
      getProduct({
        option: "NEW",
        successCallback: (response) => {
          if (response.result?.success) {
            setNewProduct(response.result.payload?.data);
          }
        },
      });
    }
  }, []);
  const sellingDatas = data.getProducts(4);
  const newDatas = data.getProducts(8);
  const popularDatas = data.getProducts(12);
  return (
    <Helmet title="Home">
      <Section>
        <Slide slides={heroSliderData} />
      </Section>
      <Section>
        <Policy policys={policy} />
      </Section>
      <SectionTitle>
        <h1>sản phẩm bán chạy trong tuần</h1>
      </SectionTitle>
      <Section>
        <Selling sellings={sellProduct?.slice(0,4)} />
      </Section>
      <SectionTitle>
        <h1>sản phẩm mới</h1>
      </SectionTitle>
      <Section>
        <New news={newProduct?.slice(0,4)} />
      </Section>
      <Section>
        <img className="home__banner" src={banner} alt="banner" />
      </Section>
      <SectionTitle>
        <h1>phổ biến</h1>
      </SectionTitle>
      <Section>
        <Popular populars={popularProduct?.slice(0,4)} />
      </Section>
    </Helmet>
  );
}

export default Home;
