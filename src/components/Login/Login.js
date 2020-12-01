import { faWeight } from '@fortawesome/free-solid-svg-icons'
import React, {Component} from 'react'
import './Login.css'


class Login extends Component{
  constructor(props) {
    super(props)
    this.props=props
    this.state={}
  }
  render() {
    return(
      <div className="container-fluid pos1">
        <div className="row">
          <div className="col imgPadder1">
            <div className="netflixImage1">
              Image
          </div>
          </div>
        </div>

        <div className="row">
          <div className="col gradient-im1">
          </div>
        </div>

        <div className="row gd-2">
          <div className="gradient-im2">
          </div>
        </div>
      
    <div className="row searchBox1">
      <div className="col">
        <h2>Sign In</h2>
        <form action="/action_page.php" className="was-validated">
          <div className="form-group">
            <input type="text" className="form-control" id="uname" placeholder="Email address" name="uname" required/>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please enter a valid email address or phone number.</div>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" required/>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please enter password.</div>
          </div>
          <div className="form-group form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="remember" required/> Remember Me.
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Check this checkbox to continue.</div>
            </label>
          </div>
          <button type="submit" className="btn btn-transparent col-sm-12" style={{backgroundColor:"red", color:"white", fontWeight:"bold"}}>Sign In</button>
        </form>
      </div>
      </div>
      </div>
  )
  }
}
export default Login