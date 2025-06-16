import React from "react";
import chartImg from "../../assets/img/images/chart.png";
import SalesTabButton from "./SalesTabButton";
import SalesTabContent from "./SalesTabContent";

const Sales: React.FC = () => {
  const chart_info_list = [
    "Utility",
    "Current Supply",
    "Max supply",
    "Distribution",
    "Investors",
    "Pre-Sale",
  ];

  return (
    <section id="tokenomics" className="chart-area chart-bg ">
      <div className="container">
        <div className="chart-inner">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-10 order-0 order-lg-2">
              <div className="chart-wrap wow fadeInRight" data-wow-delay=".2s">
                <img src={chartImg} alt="" />
                <ul>
                  {chart_info_list.map((x, index) => (
                    <li key={index}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6 col-md-10">
              <div
                className="chart-content wow fadeInLeft"
                data-wow-delay=".2s"
              >
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <SalesTabButton
                    title="Token Allocation"
                    className="active"
                    id="token-tab"
                    target="#token"
                    ariaControls="token"
                    ariaSelected={false}
                  />
                </ul>

                <div className="tab-content" id="myTabContent">
                  <SalesTabContent
                    className={"show active"}
                    id="token"
                    ariaLabel="token-tab"
                    title={`1SOL = ${"5"}BSC`}
                    description=" The World’s 1st ICO Platform That Offers Rewards and The
                    platform helps investors to make easy to purchase and
                    sell their tokens"
                    link="#Buytoken"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sales;
