import React from "react";

const TeamItem = (props: { item: any }) => {
  const socials: any = props?.item?.socials;

  return (
    <div className="team-item">
      <div className="team-thumb">
        <img
          src={props.item.src}
          alt={props.item.name}
          width={512}
          height={512}
          style={{ width: 197, height: 197 }}
        />
      </div>
      <div className="team-content">
        <h2 className="title">{props.item.name}</h2>
        <span>{props.item.designation}</span>
        {Object.keys(socials || {}).length > 0 && (
          <ul className="team-social">
            {Object.keys(props?.item?.socials || {}).map((key: string) => {
              return (
                <li key={key}>
                  <a href={socials[key] || ""}>
                    <i className={`fab fa-${key}`}></i>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamItem;
