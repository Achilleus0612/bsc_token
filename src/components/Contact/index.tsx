import React from "react";
import ContactInfoItem from "./ContactInfoItem";
import { config } from "../../constant";

const Contact: React.FC = () => {
  const info_items = [
    {
      icon: "fas fa-envelope",
      content: <a href={`mailto:${config.mail}`}>{config.mail}</a>,
    },
    {
      icon: "fab fa-telegram",
      content: <a href={config.socials.telegram}>Telegram Chanel</a>,
    },
    {
      icon: "fas fa-map-marker-alt",
      content: <a>{config.address}</a>,
    },
  ];

  return (
    <section id="contact" className="contact-area pt-70 pb-110">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-70">
              <span className="sub-title">Contact</span>
              <h2 className="title">
                <span>Contact</span> Us
              </h2>
            </div>
          </div>
        </div>
        <div className="contact-info-wrap">
          <div className="row justify-content-center">
            {info_items.map((x, index) => (
              <div key={index} className="col-lg-4 col-sm-6">
                <ContactInfoItem item={x} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
