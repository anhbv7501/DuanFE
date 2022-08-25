import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Helmet(props) {
  document.title = "Yolo - " + props.title;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="helmet">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default Helmet;
