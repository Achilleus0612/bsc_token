import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import $ from "jquery";
import { handleClickScroll } from "../../lib/helpers";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { config } from "../../constant";

const HeaderOne = () => {
  // sticky nav bar
  const [stickyClass, setStickyClass] = useState({
    fixed: "",
    header: "",
  });

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight < 245
        ? setStickyClass({ fixed: "", header: "" })
        : setStickyClass({ fixed: "active-height", header: "sticky-menu" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  // mobile menu
  useEffect(() => {
    //SubMenu Dropdown Toggle
    if ($(".menu-area li.menu-item-has-children ul").length) {
      $(".menu-area .navigation li.menu-item-has-children").append(
        '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
      );
    }

    //Mobile Nav Hide Show
    if ($(".mobile-menu").length) {
      //Menu Toggle Btn
      $(".mobile-nav-toggler").on("click", function () {
        $("body").addClass("mobile-menu-visible");
      });

      //Menu Toggle Btn
      $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
    }
  }, []);

  // active link switching
  const { hash } = useLocation();
  const isActiveLink = (id: string) => {
    return id === hash ? "active" : "";
  };

  return (
    <header id="header">
      <div id="header-fixed-height" className={cn(stickyClass.fixed)} />

      <div id="sticky-header" className={cn("menu-area", stickyClass.header)}>
        <div className={cn("container custom-container")}>
          <div className="row">
            <div className="col-12">
              <div className={"mobile-nav-toggler"}>
                <i className="fas fa-bars" />
              </div>

              {/* Mobile Wallet Button - Always Visible on Mobile */}
          

              <div className="menu-wrap">
                <nav className={"menu-nav"}>
                  <div className="logo">
                    <Link to={"/"}>
                      <img
                        src="/logo128.png"
                        alt="BigTech Logo"
                        width={128}
                        height={128}
                        style={{ width: 64, height: 64 }}
                      />
                      BSC
                    </Link>
                  </div>
                  <div className={cn("navbar-wrap main-menu d-none d-lg-flex")}>
                    <ul className={"navigation"}>
                      <li className={cn(hash === "#header" && "active")}>
                        <Link
                          to="#header"
                          className={"section-link"}
                          onClick={() => handleClickScroll("header")}
                        >
                          Home
                        </Link>
                      </li>
                      <li className={cn(hash === "#about" && "active")}>
                        <Link
                          to="#about"
                          className={"section-link"}
                          onClick={() => handleClickScroll("about")}
                        >
                          About us
                        </Link>
                      </li>
                      <li className={isActiveLink("#tokenomics")}>
                        <Link
                          to="#tokenomics"
                          className={"section-link"}
                          onClick={() => handleClickScroll("tokenomics")}
                        >
                          TOKENOMICS
                        </Link>
                      </li>
                      <li className={isActiveLink("#roadmap")}>
                        <Link
                          to="#roadmap"
                          className={"section-link"}
                          onClick={() => handleClickScroll("roadmap")}
                        >
                          Roadmap
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className={cn("header-action", "d-none d-md-block")}>
                    <ul>
                      <li className={"header-btn"}>
                        <WalletMultiButton className="wallet-adapter-button" />
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* <!-- Mobile Menu  --> */}
              <div className={"mobile-menu"}>
                <nav className={"menu-box"}>
                  <div className={"close-btn"}>
                    <i className="fas fa-times"></i>
                  </div>
                  <div className={"nav-logo"}>
                    <Link to="/">
                      <img
                        src="/logo128.png"
                        alt="BigTech Logo"
                        width={128}
                        height={128}
                        style={{ width: 64, height: 64 }}
                      />
                    </Link>
                  </div>

                  <div className={"menu-outer"}>
                    {/* Mobile Navigation Menu */}
                    <ul className={"navigation"}>
                      <li className={cn(hash === "#header" && "active")}>
                        <Link
                          to="#header"
                          className={"section-link"}
                          onClick={() => {
                            handleClickScroll("header");
                            $("body").removeClass("mobile-menu-visible");
                          }}
                        >
                          Home
                        </Link>
                      </li>
                      <li className={cn(hash === "#about" && "active")}>
                        <Link
                          to="#about"
                          className={"section-link"}
                          onClick={() => {
                            handleClickScroll("about");
                            $("body").removeClass("mobile-menu-visible");
                          }}
                        >
                          About us
                        </Link>
                      </li>
                      <li className={isActiveLink("#tokenomics")}>
                        <Link
                          to="#tokenomics"
                          className={"section-link"}
                          onClick={() => {
                            handleClickScroll("tokenomics");
                            $("body").removeClass("mobile-menu-visible");
                          }}
                        >
                          TOKENOMICS
                        </Link>
                      </li>
                      <li className={isActiveLink("#roadmap")}>
                        <Link
                          to="#roadmap"
                          className={"section-link"}
                          onClick={() => {
                            handleClickScroll("roadmap");
                            $("body").removeClass("mobile-menu-visible");
                          }}
                        >
                          Roadmap
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Mobile Wallet Connect Button */}
                  <div className={"mobile-wallet-connect"}>
                    <WalletMultiButton className="wallet-adapter-button mobile-wallet-btn" />
                  </div>

                  <div className={"social-links"}>
                    <ul className="clearfix">
                      <li>
                        <a href={config.socials.telegram} target="_blank">
                          <i className="fab fa-telegram"></i>
                        </a>
                      </li>
                      <li>
                        <a href={config.socials.twitter} target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href={config.socials.linkedin} target="_blank">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a href={config.socials.instagram} target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className={"menu-backdrop"} />
              {/* <!-- End Mobile Menu --> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOne;
