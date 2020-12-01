import React, {Component} from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'

class NavBar extends Component{
  constructor(props) {
    super(props)
    this.props=props
    this.state={page:"browse"}
  }
  //if this.state.page==home ----> show NavBar 1 else show NavBar 2
  
  render() {
    let renderer;
    if (this.state.page === "home"){
     renderer = (<div className="row dig">
                        <ul className="nav">
                          <li className="nav-item navbars" style={{paddingRight:"5%", paddingTop:"2%"}}>
                            <Link to="/login">
                            <button className="nav-link float-right border border-0 rounded seventh-tag">Sign In</button>
                            </Link>
                          </li>
                          </ul>
                        </div>)
    }
    else if(this.state.page === "login") {
      renderer = ""
    }
    else{
      renderer = (<div class="row dig">
      <ul class="nav navbars">
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    </div>

      )
    }
  return renderer
  }
}
export default NavBar