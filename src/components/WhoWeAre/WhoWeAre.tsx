import React from "react";
import img01 from "../../assets/img/images/about_img01.png";
import img02 from "../../assets/img/images/about_img02.png";
import { handleClickScroll } from "../../lib/helpers";

const WhoWeAre = () => {
  return (
    <section id="about" className="about-area pt-130 pb-130">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-img wow fadeInLeft" data-wow-delay=".2s">
              <img src={img01} alt="" />
              <img src={img02} alt="" className="img-two" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-content wow fadeInRight" data-wow-delay=".2s">
              <div className="section-title mb-30">
                <span className="sub-title">Who we are</span>
                <h2 className="title">
                  A Decentralized Platform for <span>BSC</span>
                </h2>
              </div>
              <p>
                By investing in BSC, you are entering the future of trading,
                banking and financial advising. A platform composed of different
                complex layers that will enrich the user’s experience while
                trading and exchanging currencies.
              </p>
              <a
                href="#Buytoken"
                className="btn"
                onClick={() => handleClickScroll("Buytoken")}
              >
                Purchase Tokens
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
