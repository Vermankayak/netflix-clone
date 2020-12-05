import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from '../Slider/Slider';
import './Row.css'


function Row(props) {
  return(
              <div className="slider__margin">
                <div className="text__tag">
                <h4 className="text__font">{props.text}</h4>
                </div>
              <SlickSlider text={props.text} elements={props.data} />
              </div>
          )
}

export default Row