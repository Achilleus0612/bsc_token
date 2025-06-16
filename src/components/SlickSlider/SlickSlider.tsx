import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, {Settings} from "react-slick";

interface SlickSliderProps extends ComponentProps {
  settings: Settings
}

const SlickSlider = (props: SlickSliderProps) => {
  return <Slider {...props.settings}>{props.children}</Slider>;
};

export default SlickSlider;
