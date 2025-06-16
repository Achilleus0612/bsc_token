import shape01 from "../../assets/img/banner/banner_shape01.png";
import shape02 from "../../assets/img/banner/banner_shape01.png";
import shape03 from "../../assets/img/banner/banner_shape01.png";


const Div = (attrs: any) => <div {...attrs} />;

const variables = {
  bnbPrice: 581,
  tokenPrice: 5,
  targetRaised: 0,
  progressValue: 0,
  saleDate: Date.now() + 5000,
};

const Banner = () => {

  return (
    <section className="banner-area banner-bg">
      <div className="banner-shape-wrap">
        <img src={shape01} alt="" className="img-one" />
        <img src={shape02} alt="" className="img-two" />
        <img src={shape03} alt="" className="img-three" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-content text-center">
              {/* <img src={fireIcon} alt="" /> */}
              <h2 className="title">
                Join the Future of a Synchronized Financial Ecosystem
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
