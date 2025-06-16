import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop, handleClickScroll } from "../../lib/helpers";
import { config } from "../../constant";

const Footer = () => {
  return (
    <footer>
      <div className="footer-area">
        <div className="container">
          <div className="footer-scroll-wrap">
            <button
              className="scroll-to-target"
              data-target="html"
              onClick={scrollToTop}
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
          <div className="footer-top">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div
                  className="footer-widget wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  <Link to="/" className="f-logo">
                    <img
                      src="/logo128.png"
                      alt="BigTech Logo"
                      width={128}
                      height={128}
                      style={{ width: 64, height: 64 }}
                    />
                  </Link>
                  <div className="footer-content">
                    <p>
                      Follow our journey through our socials to experience a new
                      way of finance.
                    </p>
                    <ul className="footer-social">
                      <li>
                        <Link to={config.socials.telegram} target="_blank">
                          <i className="fab fa-telegram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={config.socials.twitter} target="_blank">
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={config.socials.linkedin} target="_blank">
                          <i className="fab fa-linkedin"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={config.socials.instagram} target="_blank">
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-5 col-sm-6">
                <div
                  className="footer-widget  wow fadeInUp"
                  data-wow-delay=".4s"
                >
                  <h4 className="fw-title">Quick links</h4>
                  <div className="footer-link">
                    <ul>
                      <li>
                        <Link
                          to=""
                          target="_blank"
                          rel="noreferrer"
                        >
                          Testnet Faucet
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          target="_blank"
                          rel="noreferrer"
                        >
                          Testnet Explorer
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          target="_blank"
                          rel="noreferrer"
                        >
                          Mainnet Explorer
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          target="_blank"
                          rel="noreferrer"
                        >
                          Chainlist.org(Mainnet)
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          target="_blank"
                          rel="noreferrer"
                        >
                          Chainlist.org(Testnet)
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-sm-6">
                <div
                  className="footer-widget wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <h4 className="fw-title">Community</h4>
                  <div className="footer-link">
                    <ul>
                      <li>
                        <Link
                          to="#partner"
                          onClick={() => handleClickScroll("partner")}
                        >
                          Partners
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#team"
                          onClick={() => handleClickScroll("team")}
                        >
                          Our Team
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div
                  className="footer-widget wow fadeInUp"
                  data-wow-delay=".8s"
                >
                  <h4 className="fw-title">Subscribe Newsletter</h4>
                  <div className="footer-newsletter">
                    <p>
                      Exerci tation ullamcorper suscipit lobortis nisl aliquip
                      ex ea commodo
                    </p>
                    <form action="#">
                      <input
                        type="email"
                        placeholder="Info@gmail.com"
                        required
                      />
                      <button type="submit">
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="copyright-text">
                  <p>@{new Date().getFullYear()}. BSC software limited</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
