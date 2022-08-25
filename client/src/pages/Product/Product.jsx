import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailProduct from "../../components/Detail_product";
import Helmet from "../../components/Helmet";
import ProductCart from "../../components/product_cart";
import { Section, SectionTitle } from "../../components/Section";
import useProduct from "../../hooks/product.hook";

function Product() {
  const { getDetailProduct, getProduct } = useProduct();
  const [product, setProduct] = useState({});
  const [suggestProduct, setSuggestProduct] = useState([]);
  const { slug } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getProduct({
      page: 1,
      per_page: 20,
      successCallback: (response) => {
        console.log("te", response);
        if (response.result?.success) {
          console.log("aaa", response.result.payload.data?.sort(() => Math.random() - 0.5).slice(0, 8));
          setSuggestProduct(response.result.payload.data?.sort(() => Math.random() - 0.5).slice(0, 8));
        }
      },
    });
    getDetailProduct({
      id: slug,
      successCallback: (response) => {
        if (response.result?.success) {
          setProduct(response.result.payload?.product);
        }
      },
    });
  }, [slug]);


  return (
    <Helmet title={product?.name}>
      <Section>
        <DetailProduct datas={product} />
      </Section>
      <SectionTitle>
        <h1> khám phá thêm </h1>
      </SectionTitle>
      <Section>
        <div className="product__wrap">
          {suggestProduct.length > 0 && suggestProduct.map((item, i) => <ProductCart key={i} datas={item} />)}
        </div>
      </Section>
    </Helmet>
  );
}

export default Product;
