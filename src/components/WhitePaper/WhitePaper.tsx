import React from "react";
import { config } from "../../constant";
import docImg from "../../assets/img/images/document_img.png";

const WhitePaper: React.FC = () => {
  return (
    <section className="document-area pt-60">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 order-2 order-lg-0">
            <div
              className="document-img text-center wow fadeInUp"
              data-wow-delay=".2s"
            >
              <img src={docImg} alt="" />
            </div>
          </div>

          <div className="col-lg-5 col-md-7">
            <div
              className="document-content mt-50 wow fadeInRight"
              data-wow-delay=".2s"
            >
              <div className="section-title mb-35">
                <span className="sub-title">Whitepaper</span>
                <h2 className="title">
                  Read <span>Documents</span>
                </h2>
              </div>
              <ul className="document-list">
                <li>White Paper</li>
              </ul>
              <a href={config.whitepaper} target="_blank" className="btn">
                White Paper View
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitePaper;
