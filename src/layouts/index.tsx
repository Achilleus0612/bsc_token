import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageLoader from "../components/PageLoader/PageLoader";
import cn from "classnames";

const LayoutOne = (props: ComponentProps) => {
  return (
    <div className={cn("")}>
      <PageLoader />
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default LayoutOne;
