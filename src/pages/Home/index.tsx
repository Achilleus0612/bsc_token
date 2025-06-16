import React from "react";
import Banner from "../../components/Banner/Banner";
import BuyToken from "../../components/BuyToken/BuyToken";
import Stake from "../../components/Stake/Stake";
import WhoWeAre from "../../components/WhoWeAre/WhoWeAre";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Sales from "../../components/Sales/Sales";
import Roadmap from "../../components/Roadmap/Roadmap";
import WhitePaper from "../../components/WhitePaper/WhitePaper";
import Team from "../../components/Team";
import Contact from "../../components/Contact";
import Layout from "../../layouts";

const Home: React.FC = () => {
  return (
    <Layout>
      <main className="fix">
        <Banner />
        <BuyToken />
        <Stake />
        <WhoWeAre />
        {/* <TopPartners /> */}
        <WhyChooseUs />
        <Sales />
        <div className="area-bg">
          <Roadmap />
          <WhitePaper />
        </div>
        <Team />
        <Contact />
      </main>
    </Layout>
  );
};

export default Home;
