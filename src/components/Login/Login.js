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
             const pricePerNight = 175//this.state.singleVenue.pricePerNight;
             const diffDays = 3
             const totalPrice = pricePerNight * diffDays //diffDays;
             const scriptUrl = 'https://js.stripe.com/v3';
             const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';
            // We can Move the below code to it's own module
             await new Promise((resolve, reject)=>{
                 const script = document.createElement('script');
                 script.type = 'text/javascript';
                 script.src = scriptUrl;
                 script.onload = ()=>{
                     console.log("The script has loaded!")
                     resolve();
                 }
                 document.getElementsByTagName('head')[0].appendChild(script);
                 console.log("The script has been added to the head!")
             })
             //await loadScript(scriptUrl) // we dont need a variable, we just need to wait
             // console.log("Let's run some Stripe")
             const stripe = window.Stripe(stripePublicKey);
             const stripeSessionUrl = `${window.reqUrl}/payment/create-session`;
             const data = {
                 venueData: "London",
                 totalPrice,
                 diffDays,
                 pricePerNight,
                 checkIn: "05/12/2020",
                 checkOut: "07/12/2020",
                 token: resp.data.token,
                 numberOfGuests: 2,
                 currency: 'USD',
             }
             
             const sessionVar = await axios.post(stripeSessionUrl,data);
             // console.log(sessionVar.data);

             await new Promise((resolve, reject) => {
              stripe.redirectToCheckout({
                sessionId: sessionVar.data.id,//we have to send the private key sent to us by stripe in line 92 to checkout page. and it will return a promise
                
            }).then((result)=>{
               //  console.log('I am result',result);
                //if the network fails, this will run
               
            })
           
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
    regAction:regAction
  }, dispatch)
}
function mapStateToProps(state) {
  return({
    updateNav:state.updateNav,
    authReducer:state.authReducer
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)