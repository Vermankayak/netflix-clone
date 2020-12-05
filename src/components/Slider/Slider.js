import React, {Component} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css';
import SlickSlider from 'react-slick'

class Slider extends Component{
  constructor(props) {
    super(props)
    this.props = props
    this.state = {}
  }
  render() {
    const settings = {
      dots: false, //means if we want to show dots at the end of carousel or not.
      infinite: true, //means if we want to continue looping event after last slide.
      speed: 500, //speed at which slides will appear one after another
      arrows: true, //means if we want arrows at the left and right of carousel
      slidesToShow: 9, //How many images should be in our slide
      slidesToScroll: 10,//means how many slides to scroll
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 9,
      //       slidesToScroll: 3,
      //       infinite: true,
      //       dots: true
      //     }
      //   },
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2
      //     }
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1
      //     }
      //   }
      //   // You can unslick at a given breakpoint now by adding:
      //   // settings: "unslick"
      //   // instead of a settings object
      // ]
  }
  if (this.props.text === "Netflix Originals") {
     settings["slidesToShow"] = 4
     settings["slidesToScroll"] = 1
  }
  //In below return statement {...settings} <===> dots=false infinite=true .... so on (like they are props)
    return(
      <div className="slick">
                <SlickSlider {...settings}>
                    {this.props.elements}
                </SlickSlider>
            </div>
    )
  }
}
export default Slider