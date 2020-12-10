import { faWeight } from '@fortawesome/free-solid-svg-icons'
import React, {Component} from 'react'
import './Login.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import updateNavBar from '../../action/navBarAction'
import Swal from 'sweetalert2'
import axios from 'axios'
import regAction from '../../action/regAction'
import moment from 'moment';
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess'
import accountAction from '../../action/accountAction'

class Login extends Component{
  constructor(props) {
    super(props)
    this.props=props
    this.state={email:"", password:""}
  }
  componentDidMount(){
    this.props.updateNavBar(this.props.match.params.wid,0)
  }
  handleEmail = (e) => {
    this.setState({email:e.target.value})
  }
  handlePassword = (e) => {
    this.setState({password:e.target.value})
  }

  handleSubmit = async(e) => {
    e.preventDefault();

    if (!this.state.email.includes('@')) {
      Swal.fire({
        title: 'Please enter a valid Email Id',
        icon: 'error',
      })
    }
    if (this.props.updateNav === "signIn"){
  
    const authUrl = window.reqUrl + '/users/login'
    const data = {
      email:this.state.email,
      password:this.state.password
    }
    const response = await axios.post(authUrl, data)
    
      
        // -- noEmail
        if(response.data.msg === "noEmail"){
          Swal.fire({
              title: "That email is not registered.",
              icon: "error",
            })
      // -- badPass
      }else if(response.data.msg === "badPass"){
          Swal.fire({
              title: "Invalid email/password",
              text: "We don't have a match for that user name and password.",
              icon: "error",
            })
      // -- loggedIn
      }else if(response.data.msg === "loggedIn"){
          Swal.fire({
              title: "Success!",
              icon: "success",
            });
          console.log(response.data)
          const accountUrl = `${window.reqUrl}/users/getBookings`;
          const data = {
              token: response.data.token,
          }
          const resp = await axios.post(accountUrl,data);
          let index = resp.data[resp.data.length - 1].numberOfGuests
          const newState = ["bg-primary", "bg-primary", "bg-primary", "bg-primary"]
          newState[index] = "bg-success"
          this.props.accountAction({bg_color:newState, plan:index})
          this.props.regAction(response.data);
      }
  }
else if(this.props.updateNav === "signUp") {
  const url = `${window.reqUrl}/users/signup`;
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        const resp = await axios.post(url,data);
        this.props.regAction(resp.data);
        // - userAdded
        if(resp.data.msg === "userExists"){
            Swal.fire({
                title: "Email Exists",
                text: "The email you provided is already registered. Please try another.",
                icon: "error",
              })            
        }else if(resp.data.msg === "invalidData"){
            Swal.fire({
                title: "Invalid email/password",
                text: "Please provide a valid email and password",
                icon: "error",
              })
        }else if(resp.data.msg === "userAdded"){
             
          Swal.fire({
            title: "You have been successfully registered",
            icon: "success",
          }).then((result) => {
            if (result.value) {
              this.props.history.push("/account")
            }
          })
             
            
            // console.log(resp.data)
         //console.log(resp.data)
         
            
        }
}
}
componentDidUpdate(prevProp) {
  if (this.props.authReducer.token !== prevProp.authReducer.token && this.props.updateNav !== "signUp") {
    // console.log("I am in Login.js")
    // console.log(prevProp.authReducer)
    // console.log(this.props.authReducer)
    this.props.history.push("/browse")
   
  }
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
        <h2>{this.props.updateNav === "signIn" ? "Sign In":"Sign Up"}</h2>
        <form onSubmit={this.handleSubmit} action="/action_page.php" className="was-validated">
          <div className="form-group">
            <input onChange={this.handleEmail} className="form-control" type="text" id="uname" placeholder="Email address" name="uname" value={this.state.email} required/>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please enter a valid email address or phone number.</div>
          </div>
          
          {this.props.updateNav === "signUp" ? (<div className="form-group">
            <input className="form-control" type="text" id="uname" placeholder="Name" name="uname" required/>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please enter your Name</div>
        
         </div>) : <></>}
          

          <div className="form-group">
            <input onChange={this.handlePassword} className="form-control" type="password" id="pwd" placeholder="Enter password" name="pswd" value={this.state.passowrd} required/>
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
    <button type="submit" className="btn btn-transparent col-sm-12" style={{backgroundColor:"red", color:"white", fontWeight:"bold"}}>{this.props.updateNav === "signIn" ? "Sign In":"Sign Up"}</button>
        </form>
      </div>
      </div>
      </div>
  )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNavBar:updateNavBar,
    regAction:regAction,
    accountAction:accountAction
  }, dispatch)
}
function mapStateToProps(state) {
  return({
    updateNav:state.updateNav,
    authReducer:state.authReducer
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)