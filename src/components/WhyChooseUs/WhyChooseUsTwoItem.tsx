import { Link } from "react-router-dom";
import React from "react";

interface WhyChooseUsTwoItemProps {
  item: {
    src: string
    title: string
    url: string
    desc: string
  }
}

const WhyChooseUsTwoItem = (props: WhyChooseUsTwoItemProps) => {
  return (
    <div className="choose-item-two wow fadeInUp" data-wow-delay=".2s">
      <div className="choose-icon-two">
        <img src={props.item.src} alt={props.item.title} />
      </div>
      <div className="choose-content">
        <h2 className="title">
          <Link to={props.item.url}>{props.item.title}</Link>
        </h2>
        <p>{props.item.desc}</p>
      </div>
    </div>
  );
};

export default WhyChooseUsTwoItem;
