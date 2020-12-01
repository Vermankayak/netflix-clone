import React, {Component} from 'react'
import './Home.css'
import NavBar from '../NavBar/NavBar'


class Home extends Component{
  constructor(props) {
    super(props)
    this.props=props
    this.state={}
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

        <div className="jumbotron searchBox">
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unlimited movies, TV</h1>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shows and more.</h1>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Watch anywhere. Cancel anytime.</h4>
            <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ready to watch? Enter your email to create or restart your membership.</h5>
            <div className="input-group">
                <input type="text" className="form-control col-sm-6" placeholder="Search"/>
            <div className="input-group-append">
                <button className="btn btn-danger start" type="submit">Go</button>
            </div>
          </div>
      </div>
        <NavBar />
      </div>
    )
  }
}
export default Home