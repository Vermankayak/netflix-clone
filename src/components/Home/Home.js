import React, {Component} from 'react'
import './Home.css'
import NavBar from '../NavBar/NavBar'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import updateNavBar from '../../action/navBarAction'


class Home extends Component{
  constructor(props) {
    super(props)
    this.props=props
    this.state={}
  }
  componentDidMount() {
    this.props.updateNavBar(this.props.match.path,0)
  }
  render() {
    
   
    return(
      <div className="container-fluid pos">
        <div className="row">
          <div className="col imgPadder">
            <div className="netflixImage">
              Image
          </div>
          </div>
        </div>

        <div className="row">
          <div className="col gradient-im">
          </div>
        </div>

        <div className="jumbotron jumbotron-fluid searchBox">
           <div className="row"> <h1 className="h1__tag">Unlimited movies, TV</h1></div> 
           <div className="row"><h1 className="h1__2__tag">shows and more.</h1></div>
           <div className="row"> <h4 className="h4__1">Watch anywhere. Cancel anytime.</h4></div>
           <div className="row"> <h4 className="h4__1__tag">Ready to watch? Enter your email to create</h4></div>
           <div className="row"> <h4 className="h4__1__tag">or restart your membership.</h4></div>
           <div className="row"><h5 className="h31">Ready to watch? Enter your email to create or restart your membership.</h5></div> 
           <div className="row grouper"><div className="input-group">
                <input type="text" className="input1" placeholder="Enter your Email"/>
            <div className="input-group-append">
             
                <button className="btn btn-danger start" type="submit"><h3 className="button__text"> <Link style={{color:"white"}} to="/auth/signup">GET STARTED ></Link></h3></button>
                
            </div>
          </div></div>
      </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNavBar:updateNavBar
  }, dispatch)
}
export default connect(null, mapDispatchToProps)(Home)