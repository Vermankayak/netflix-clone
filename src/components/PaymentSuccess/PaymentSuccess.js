import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import regAction from '../../action/regAction'
import axios from 'axios'
import paymentAction from '../../action/paymentAction'
import accountAction from '../../action/accountAction'


class PaymentSuccess extends Component{
  constructor(props) {
    super(props)
    
  }
  async componentDidMount() {
    const stripeToken = this.props.match.params.stripeToken;
    console.log(stripeToken)
    const token = this.props.authReducer.token;
    const data = {stripeToken,token};
    const successUrl = window.reqUrl +"/payment/success";
    const resp = await axios.post(successUrl,data);
    console.log(resp.data);
    this.props.paymentAction(resp.data.reservationDetails)
    let newState = ["bg-primary", "bg-primary", "bg-primary", "bg-primary"]
    newState[resp.data.reservationDetails.diffDays] = "bg-success"
    console.log(newState)
    this.props.account({bg_color:newState, plan:resp.data.reservationDetails.diffDays}) 
    this.props.history.push("/browse")
    
  }
  render() {
    return(<></>)
  }
}
function mapStateToProps(state) {
return({
  authReducer:state.authReducer,
  payment:state.payment
})
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    regAction:regAction,
    account:accountAction,
    paymentAction:paymentAction
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)