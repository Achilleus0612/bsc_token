import React from "react";

const RoadmapItem = (props: {item: RoadmapItemType}) => {
  return (
    <div className="bt-roadmap-item">
      <span className="roadmap-title">{props.item.roadmapTitle}</span>
      <div className="roadmap-content">
        <span className="dot" />
        <h4 className="title">{props.item.title}</h4>

        {Array.isArray(props.item.info) && props.item.info.map((x, index) => (
          <span key={index}>{x}</span>
        ))}
      </div>
    </div>
  );
};

export default RoadmapItem;
