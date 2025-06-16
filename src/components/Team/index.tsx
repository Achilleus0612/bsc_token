import React from "react";
import maleImg from "../../assets/img/team/male.svg";
import CEOImg from "../../assets/img/team/toney.jpg";
import CMOImg from "../../assets/img/team/yevheniia.jpg";
import TeamItem from "./TeamItem";

const Team: React.FC = () => {
  const team_members = [
    {
      src: CEOImg,
      name: "Antonio G. Sunye",
      designation: "Founder, CEO",
      socials: {
        linkedin:
          "https://www.linkedin.com/in/antonio-g-sunye?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagram:
          "https://www.instagram.com/antonio.g.sunye?igsh=MWZ2a3E4cTcybXhrbA%3D%3D&utm_source=qr",
      },
    },
    {
      src: CMOImg,
      name: "Yevheniia Suslenska",
      designation: "Chief Marketing Officer, CMO",
      socials: {
        linkedin:
          "https://www.linkedin.com/in/yevheniia-suslenska-4981592a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagram: "https://www.instagram.com/koshe__nya?igsh=NG90NGVteGduMmN0",
        twitter: "https://x.com/kotenok_nya",
      },
    },
    {
      src: maleImg,
      name: "Elli Kassis",
      designation: "Full Stack & Blockchain Developer",
    },
  ];

  return (
    <section id="team" className="team-area pt-130">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-title text-center mb-70">
              <span className="sub-title">OUr team</span>
              <h2 className="title">
                The Leadership <br /> <span>Team</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {team_members.map((member, index) => (
            <div key={index} className="col-xl-3 col-md-4 col-sm-6">
              <TeamItem item={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
