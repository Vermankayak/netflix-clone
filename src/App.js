import React from 'react'
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Browse from './components/Browse/Browse'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess'

function App() {
  
  return (
    <Router>
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/:wid" component={Login} /> 
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/payment-success/:stripeToken" component={PaymentSuccess} />
    </div>
    </Router>
  );
}

export default App;
