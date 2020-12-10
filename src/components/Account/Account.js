import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import accountAction from '../../action/accountAction'
import axios from "axios"
import paymentAction from '../../action/paymentAction'

async function PaymentConfirmation(args, price, i) {
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
       totalPrice:price[i], //contains total price
       diffDays:i, //contains index
       pricePerNight,
       checkIn: "05/12/2020",
       checkOut: "07/12/2020",
       token: args,
       numberOfGuests:i, //contains index
       currency: 'USD',
   }
   
   const sessionVar = await axios.post(stripeSessionUrl,data);
   console.log(sessionVar.data.id)
   await new Promise((resolve, reject) => {
    stripe.redirectToCheckout({
      sessionId: sessionVar.data.id,//we have to send the private key sent to us by stripe in line 92 to checkout page. and it will return a promise
      
  }).then((result)=>{
     console.log('I am result',result);
      //if the network fails, this will run
     
  })
})
}

class Account extends Component{
  constructor(props) {
    super(props)
    
  }
 async componentDidUpdate(prevProp) {
    
    // console.log(resp.data.reservationDetails)

    if (this.props.authReducer.token !== prevProp.authReducer.token){
      console.log(prevProp.authReducer.token)
      console.log(this.props.authReducer.token)
      this.props.history.push("/")
    }
  }
 
  changeColor = async(i, price) => {
    const newState = ["bg-primary","bg-primary", "bg-primary", "bg-primary"]
    console.log(this.props.action)
    if(i !== this.props.action.plan) {
    await Swal.fire({
      "title":"Are you sure you want to change your subscription?",
      "icon":"warning",
      showCancelButton: true,
  }).then(async(result) => {
    if(result.value){
     const resp = await new Promise((resolve,reject) => {resolve(PaymentConfirmation(this.props.authReducer.token, price, i))})
      newState[i] = "bg-success"
      this.props.accountAction({bg_color:newState, plan:i})
    }else if(result.dismiss === Swal.DismissReason.cancel || result.dismiss === Swal.DismissReason.backdrop) {
      console.log("did not subscribe")
    }
  })
  
}
 
}
  render() {
    console.log(this.props.action)
    const plans = ["Free Plan", "Basic Plan", "Standard Plan", "HD Plan"]
    const desc = ["30 days Free try-out", "1 Mobile Screen", "2 Mobile Screens + 1 Computer Screen", "2 Mobile Screens + 2 Computer Screens"]
    const price = ["Free",199, 699, 899]
    const renderer = plans.map((items, i) => {
      return(
      <Link key={i} onClick={() => this.changeColor(i, price)} to="#" style={{color:"white", textDecoration: "none"}}>
      <div  className={`${this.props.action.bg_color[i]} card`}>
          <div className="card-body text-center">
            <p className="card-text">{plans[i]}</p>
            <p className="card-text">{desc[i]}</p>
            <p className="card-text">Rs {price[i]}</p>
          </div>
        </div>
        </Link>)
    })

    return(
      <div className="container">
      <h2>Account Info</h2>
      <p>Please select your subscription</p>
      
      <div className="card-deck">
        {renderer}  
      </div>
    </div>
    )
  }
}
function mapStateToProps(state) {
  return{
    authReducer:state.authReducer,
    action:state.action
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    accountAction:accountAction,
    paymentAction:paymentAction
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)