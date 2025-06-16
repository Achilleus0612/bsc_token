import React from "react";
import { Link } from "react-router-dom";

export interface ImageItemType {
  src: string
  alt: string
  link: string
  title: string
  description: string
}

interface WhyChooseUsItemProps {
  item: ImageItemType
}

const WhyChooseUsItem = (props: WhyChooseUsItemProps) => {
  return (
    <div className="choose-item">
      <div className="choose-icon">
        <img src={props.item.src} alt={props.item.alt} />
      </div>
      <div className="choose-content">
        <h2 className="title">
          <Link to={props.item.link}>{props.item.title}</Link>
        </h2>
        <p>{props.item.description}</p>
      </div>
    </div>
  );
};

export default WhyChooseUsItem;
