import React from "react";
import cn from "classnames";
import { handleClickScroll } from "../../lib/helpers";

const SalesTabContent = (props: TabContentType) => {
  return (
    <div
      className={cn("tab-pane fade", props.className)}
      id={props.id}
      role="tabpanel"
      aria-labelledby={props.ariaLabel}
    >
      <div className="chart-content-inner">
        <h2 className="title">{props.title}</h2>
        <p>{props.description}</p>
        <a
          href={props.link || ""}
          className="btn"
          onClick={() => handleClickScroll(props.link)}
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default SalesTabContent;
