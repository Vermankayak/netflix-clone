import React, {Component} from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import updateNavBar from '../../action/navBarAction'
import logout from '../../action/logout'
import accountAction from '../../action/accountAction'

class NavBar extends Component{
  constructor(props) {
    super(props)
    this.props=props
    console.log(this.props)
  }
  //if this.state.page==home ----> show NavBar 1 else show NavBar 2
  handleLogout = () => {
    this.props.accountAction({bg_color:["bg-success","bg-primary", "bg-primary", "bg-primary"], plan:0})
    this.props.logout({})
  }
  render() {
    let renderer;
    if (this.props.history.location.pathname === "/"){
     renderer = (<div className="row">
                        <ul className="nav">
                          <li className="nav-item navbars" style={{paddingRight:"5%", paddingTop:"2%"}}>
                            <Link to="/auth/signin">
                            <button className="nav-link float-right border border-0 rounded seventh-tag">Sign In</button>
                            </Link>
                          </li>
                          </ul>
                        </div>)
    }
    else if(this.props.history.location.pathname === "signIn" || this.props.history.location.pathname === "signUp") {
      renderer = ""
    }
    else{
      renderer = (<div className="row nav__bar">
      <ul className="nav navbars justify-content-end nav__bar">
        <li className="nav-item">
    <a className="nav-link" style={{color:"white", fontWeight:"bold"}} href="#">Logged In as: {this.props.authReducer.email}</a>
        </li>

        <li className="nav-item"><Link className="nav-link" style={{color:"white", fontWeight:"bold"}} to="/account">Account</Link></li>
        <li className="nav-item">
          
    <button onClick={this.handleLogout} className="nav-link border border-0" style={{color:"white", fontWeight:"bold", background:"transparent"}}>Logout</button>
        </li>
      </ul>
    </div>

      )
    }
    console.log(this.props.authReducer)
  return renderer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout:logout,
    accountAction:accountAction
  }, dispatch)
}
function mapStateToProps(state) {
  return({
    updateNav:state.updateNav,
    authReducer:state.authReducer
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)