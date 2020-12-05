import React from 'react'
import './Browsing.css'

function Browsing(props) {
  let source =  "https://image.tmdb.org/t/p/w500/" + props.data
  if (props.text === "Netflix Originals") {
    return(
  
<img className="border border-0 img__poster img__large_poster" src={source} style={{height:"35vw", width:"19vw"}}/>
)
  }
    return(
 
<img className="border border-0 img__poster" src={source} style={{height:"20vw", width:"10vw", marginRight:"10px"}}/>
            )}


export default Browsing