import React from "react";
import Slider from "react-slick";
import Button from "./Button";

function Slide(props) {
  const { slides } = props;
  //   console.log(slides);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      {slides.map((slide, i) => (
        <div className="slide" key={i}>
          <div className="slide_slogan">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <a href="">xem chi tiết</a>
          </div>
          <div className="slide_img">
            <div className="slide_img_wrap">
              <img src={slide.img} alt="" />
              <span></span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Slide;
