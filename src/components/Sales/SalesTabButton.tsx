import React from "react";
import cn from "classnames";

const Button = (attrs: any) => <button {...attrs} />

const SalesTabButton = (props: TabContentType) => {
  return (
    <li className="nav-item" role="presentation">
      <Button
        className={cn("nav-link", props.className)}
        id={props.id}
        data-bs-toggle="tab"
        data-bs-target={props.target}
        type="button"
        role="tab"
        aria-controls={props.ariaControls}
        aria-selected={props.ariaSelected}
      >
        {props.title}
      </Button>
    </li>
  );
};

export default SalesTabButton;
