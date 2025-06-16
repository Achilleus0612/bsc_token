import React from "react";
import { useHorizontalScroll } from "../../lib/hooks/useHorizontalScroll";
import RoadmapItem from "./RoadmapItem";

const Roadmap = () => {
  const roadmap_items = [
    {
      roadmapTitle: "2024",
      title: "MarketNews",
      info: [
        "A stock & crypto news channel that brings the most recent data to the people wanting to execute more precise trades.",
      ],
    },
    {
      roadmapTitle: "2024",
      title: "BSC",
      info: [
        "A cryptocurrency that serves as the bedrock for an ecosystem that includes a trading platform and an e-bank.",
      ],
    },
    {
      roadmapTitle: "2024",
      title: "Website & Business Partnerships",
      info: [
        "A plan to expand the coin to other businesses, thereby increasing liquidity and ensuring consistent coin usage.",
      ],
    },
    {
      roadmapTitle: "2025",
      title: "UniTrade",
      info: ["Full year of development of the platform"],
    },
    {
      roadmapTitle: "2025",
      title: "Bank Global",
      info: ["Beginning the development of the bank front end. "],
    },
    {
      roadmapTitle: "2026",
      title: "UniTrade",
      info: [
        "Release of the UniTrade trading platform for BSC owners first and towards the end of the year, it will be open to everyone.",
      ],
    },
    {
      roadmapTitle: "2026",
      title: "Bank Global",
      info: [
        "The bank should have almost everything developed, we have add function to all the features of the bank.",
      ],
    },
    {
      roadmapTitle: "2027",
      title: "Bank Global",
      info: [
        "Back-end development should be completed and released in several countries.",
      ],
    },
    {
      roadmapTitle: "2027",
      title: "Bank Global",
      info: ["Release our first debit card."],
    },
    {
      roadmapTitle: "2027",
      title: "Bank Global",
      info: ["Have our UniTrade trading platform integrated into the bank."],
    },
    {
      roadmapTitle: "2027",
      title: "UniCorp",
      info: [
        "Complete back-end of previous work and make it available to the public.",
      ],
    },
  ] as RoadmapItemType[];

  const scrollRef = useHorizontalScroll();

  return (
    <section id="roadmap" className="roadmap-area pt-130 pb-130">
      <div className="container custom-container-two">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-8">
            <div className="section-title text-center mb-60">
              <h2 className="title">OUR JOURNEY</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div
              className="bt-roadmap_x bt-roadmap-scrollbar"
              ref={scrollRef}
              style={{ overflow: "auto" }}
            >
              <div className="bt-roadmap-wrap">
                {roadmap_items.map((x, index) => (
                  <RoadmapItem key={index} item={x} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
