import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import regAction from '../../action/regAction'


class PaymentSuccess extends Component{
  componentDidMount() {
 
    console.log("i am here")
    console.log(this.props.authReducer)
    this.props.history.push("/browse")
    
  }
  render() {
    return(<></>)
  }
}
function mapStateToProps(state) {
return({
  authReducer:state.authReducer
})
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    regAction:regAction
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)