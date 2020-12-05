import React, {Component} from 'react'
import api_key from '../../env'
import axios from 'axios'
import Browsing from './Browsing'
import Row from './Row'
import './Browse.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import updateNavBar from '../../action/navBarAction'
import Swal from 'sweetalert2'

class Browse extends Component{
  constructor(props) {
    super(props)
    this.props=props
    this.state={popularityArray:[],releaseDateArray:[],bestMovieArray:[],bestDramaArray:[],bestComediesArray:[],rRatedArrayArray:[], nowPlaying:[], src:"", overview:"", title:""}
  }

  async componentDidMount() {
    this.props.updateNavBar(this.props.match.params.wid,0)
    const popularityUrl = `${window.apiHost}/discover/movie?sort_by=popularity.desc&api_key=`+ api_key
    const releaseDateUrl = `${window.apiHost}/discover/movie?primary_release_date.gte=2020-09-10&primary_release_date.lte=2020-10-22&api_key=`+ api_key
    const bestMoviesUrl = `${window.apiHost}/discover/movie?primary_release_year=2020&sort_by=vote_average.desc&api_key=`+ api_key
    const bestDramasUrl = `${window.apiHost}/discover/movie?with_genres=18&primary_release_year=2020&api_key=`+ api_key
    const bestComediesUrl = `${window.apiHost}/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=`+ api_key
    const rRatedUrl = `${window.apiHost}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=`+ api_key
    const nowPlaying = `${window.apiHost}/movie/now_playing?api_key=`+ api_key

    const moviesArray = []

    moviesArray.push(axios.get(popularityUrl))
    moviesArray.push(axios.get(releaseDateUrl))
    moviesArray.push(axios.get(bestMoviesUrl))
    moviesArray.push(axios.get(bestDramasUrl))
    moviesArray.push(axios.get(bestComediesUrl))
    moviesArray.push(axios.get(rRatedUrl))

    moviesArray.push(axios.get(nowPlaying))
    let details = []
    Promise.all(moviesArray).then((data) => {
      const popularityArray = data[0].data.results.map((item,i)=>{
        details.push(item)
        if (item.poster_path) {
        return <Browsing key={i+10} data={item.poster_path} index={i+10}/>
      }})
     
      const releaseDateArray = data[1].data.results.map((item,i)=>{
        if (item.poster_path) {
        return <Browsing key={i+50} data={item.poster_path} index={i+50}/>
      }})
      
      const bestMovieArray = data[2].data.results.map((item,i)=>{
        if (item.poster_path) {
        return <Browsing key={i+90} text="Netflix Originals" data={item.poster_path} index={i+90}/>
      }})
      
      const bestDramaArray = data[3].data.results.map((item,i)=>{
        if (item.poster_path) {
        return <Browsing key={i+120} data={item.poster_path} index={i+120}/>
      }})
      
      const bestComediesArray = data[4].data.results.map((item,i)=>{
        if (item.poster_path) {
        return <Browsing key={i+179} data={item.poster_path} index={i + 179}/>
      }})
  
      const rRatedArrayArray = data[5].data.results.map((item,i)=>{
        if (item.poster_path) {
        return <Browsing key={i+212} data={item.poster_path} index={i + 212}/>
      }})

      const nowPlaying = data[6].data.results.map((item,i)=>{
        if (item.poster_path) {
        return <Browsing key={i + 245} data={item.poster_path} index={i + 245}/>
      }})
      console.log(details)
      const idx = Math.floor(Math.random() * details.length)
      const src =  "https://image.tmdb.org/t/p/original/" + details[idx].poster_path
      const overview = details[idx].overview.slice(0,160) + '....'
      const title = details[idx].original_title
      
      console.log(src)
      this.setState({
        popularityArray:popularityArray,
        releaseDateArray:releaseDateArray,
        bestMovieArray:bestMovieArray,
        bestDramaArray:bestDramaArray,
        bestComediesArray:bestComediesArray,
        rRatedArrayArray:rRatedArrayArray,
        nowPlaying:nowPlaying,
        src:src,
        overview:overview,
        title:title
      })
    })

  }
  componentDidUpdate(prevProp) {
    if (this.props.authReducer.token != prevProp.authReducer.token) {
      // console.log("I am in Browse.js")
      // console.log(prevProp.authReducer)
      // console.log(this.props.authReducer)
      Swal.fire({
        "title":"You are not Authorized to visit this page. Please Login First",
        "icon":"warning"
      })
      this.props.history.push("/")
     
    }
  }
  render() {
    
   console.log(this.state.authReducer)
    return(
      <div className="container-fluid searchTail__1">
        
        <header className="banner" style={{backgroundSize: "cover", backgroundImage: `url(${this.state.src})`, backgroundPosition: "center center", marginLeft:"-15px", marginRight:"-15px"}}>
        <div className="banner__contents">
        <h1 className="banner__title">{this.state.title}</h1>
        <h1 className="banner__description">{this.state.overview}</h1>
        <div className="banner__buttons">
        <button className="banner__button">Play</button>
        <button className="banner__button">My List</button>
        </div>
        
        </div>
        <div className="banner--fadeBottom"></div>
        </header>
       

      <div className="jumbotron jumbotron-fluid searchTail">
      <Row  data={this.state.popularityArray} text="Popular on Netflix" />
      <Row  data={this.state.releaseDateArray} text={"Latest Releases"} />
      <Row  data={this.state.bestComediesArray} text={"Trending Now"} />
      <Row data={this.state.bestDramaArray} text={"Best Drama Movies"} />
      <Row  data={this.state.bestMovieArray} text={"Netflix Originals"} />
      <Row data={this.state.rRatedArrayArray} text={"Adult Movies"} />
      <Row  data={this.state.nowPlaying} text={"Now Playing"} />
      
      </div>

        <div className="jumbotron jumbotron-fluid searchTail__1">
        <div className="col">
        </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNavBar:updateNavBar,
    
  }, dispatch)
}
function mapStateToProps(state) {
  return({
    authReducer:state.authReducer
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Browse)