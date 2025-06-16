import React, { JSX } from "react";

interface ContactItemType {
  icon: string;
  content: JSX.Element;
}

const ContactInfoItem = (props: { item: ContactItemType }) => {
  return (
    <div className="contact-info-item">
      <div className="icon">
        <span className="icon-background"></span>
        <i className={props.item.icon}></i>
      </div>
      <div className="content">
        <p>{props.item.content}</p>
      </div>
    </div>
  );
};

export default ContactInfoItem;
